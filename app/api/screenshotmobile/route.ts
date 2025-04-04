import { NextResponse } from "next/server"

import {
  isDev,
  localExecutablePath,
  remoteExecutablePath,
  userAgent,
} from "@/lib/utils"

const chromium = require("@sparticuz/chromium-min")
const puppeteer = require("puppeteer-core")

export const maxDuration = 60

async function extractWebsiteInfo(url: string) {
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
      defaultViewport: { width: 375, height: 1080 },
      executablePath: isDev
        ? localExecutablePath
        : await chromium.executablePath(remoteExecutablePath),
      headless: isDev ? false : "new",
      debuggingPort: isDev ? 9222 : undefined,
    })

    const page = await browser.newPage()
    await page.setUserAgent(userAgent)

    // 获取设备像素比
    const devicePixelRatio = 3

    const viewportWidth = 390
    const initialHeight = 1080

    // 设置初始viewport，考虑设备像素比
    await page.setViewport({
      width: viewportWidth,
      height: initialHeight,
      deviceScaleFactor: devicePixelRatio,
    })

    await page.goto(url, {
      waitUntil: ["load", "networkidle2"],
      timeout: 60000,
    })

    // 等待所有图片加载完成
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((resolve) => {
                img.onload = img.onerror = resolve
              })
          )
      )
    })

    const pageHeight = await page.evaluate(() => {
      return Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.clientHeight
      )
    })

    // 更新viewport高度，保持移动端宽度和设备像素比
    await page.setViewport({
      width: viewportWidth,
      height: pageHeight,
      deviceScaleFactor: devicePixelRatio,
    })

    const screenshot = await page.screenshot({
      type: "png",
      encoding: "binary",
      fullPage: true,
      scale: devicePixelRatio,
    })

    return {
      screenshot,
    }
  } catch (err) {
    console.error(err)
  } finally {
    await browser.close()
  }
}

const isValidUrl = (url: string) => {
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
  console.log("url", url)
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
