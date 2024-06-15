import fs from "node:fs"
import path from "node:path"
import { NextResponse } from "next/server"
import html2md from "html-to-md"
import urlMetadata from "url-metadata"

import {
  isDev,
  localExecutablePath,
  remoteExecutablePath,
  userAgent,
} from "@/lib/utils"

const chromium = require("@sparticuz/chromium-min")
const puppeteer = require("puppeteer-core")

export const maxDuration = 60

export async function extractWebsiteInfo(url: string) {
  let browser = null
  try {
    browser = await puppeteer.launch({
      ignoreDefaultArgs: ["--enable-automation"],
      args: isDev
        ? [
            "--disable-blink-features=AutomationControlled",
            "--disable-features=site-per-process",
            "-disable-site-isolation-trials",
          ]
        : [...chromium.args, "--disable-blink-features=AutomationControlled"],
      defaultViewport: { width: 1920, height: 1080 },
      executablePath: isDev
        ? localExecutablePath
        : await chromium.executablePath(remoteExecutablePath),
      headless: isDev ? false : "new",
      debuggingPort: isDev ? 9222 : undefined,
    })

    const page = await browser.newPage()
    await page.setUserAgent(userAgent)
    await page.setViewport({ width: 1920, height: 1080 })
    const preloadFile = fs.readFileSync(
      path.join(process.cwd(), "/lib/preload.js"),
      "utf8"
    )
    await page.evaluateOnNewDocument(preloadFile)
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    })

    const [htmlContent, screenshot] = await Promise.all([
      page.content(),
      page.screenshot({
        type: "png",
        encoding: "binary",
      }),
    ])

    const response = new Response(htmlContent, {
      headers: {
        "Content-Type": "text/html",
      },
    })
    const metadata = await urlMetadata(null, {
      parseResponseObject: response,
      ensureSecureImageRequest: true,
    })
    const { title, description, favicons } = metadata
    const faviconHref = (
      favicons.find((f: any) => f.rel === "mask_icon" || f.rel === "icon") || {}
    ).href
    const hostname = new URL(url).hostname
    const favicon = faviconHref.startsWith("http")
      ? faviconHref
      : hostname + faviconHref

    return {
      htmlContent,
      screenshot,
      mdContent: html2md(
        htmlContent,
        {
          ignoreTags: [
            "",
            "style",
            "head",
            "!doctype",
            "form",
            "svg",
            "noscript",
            "script",
            "meta",
          ],
          skipTags: [
            "div",
            "html",
            "body",
            "nav",
            "section",
            "footer",
            "main",
            "aside",
            "article",
            "header",
          ],
          emptyTags: [],
          aliasTags: {
            figure: "p",
            dl: "p",
            dd: "p",
            dt: "p",
            figcaption: "p",
          },
          renderCustomTags: true,
        },
        true
      ),
      meta: {
        title,
        description,
        icon: favicon,
        og_image: metadata["og:image"],
      },
    }
  } catch (err) {
    console.error(err)
  } finally {
    await browser.close()
  }
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const type = searchParams.get("type")
  if (!url || !isValidUrl(url)) {
    return NextResponse.json(
      { error: "Missing required url parameter or url is invalid" },
      { status: 500 }
    )
  }
  const res = await extractWebsiteInfo(url)
  if (!res) {
    return NextResponse.json(
      { error: "Failed to get screenshot" },
      { status: 500 }
    )
  }
  const { screenshot } = res

  if (type === "json") {
    return NextResponse.json({
      ...res,
      screenshot: `data:image/png;base64,${screenshot.toString("base64")}`,
    })
  } else {
    const headers = new Headers()
    headers.set("Content-Type", "image/png")
    headers.set("Content-Length", screenshot.length.toString())
    return new NextResponse(screenshot, {
      status: 200,
      statusText: "OK",
      headers,
    })
  }
}
