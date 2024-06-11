import fs from "node:fs"
import path from "node:path"
import { NextResponse } from "next/server"
import { S3 } from "aws-sdk"

import {
  isDev,
  localExecutablePath,
  remoteExecutablePath,
  userAgent,
} from "@/lib/utils"

const chromium = require("@sparticuz/chromium-min")
const puppeteer = require("puppeteer-core")

const slugify = require("slugify")

const s3 = new S3({
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  endpoint: process.env.R2_ENDPOINT,
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: "v4",
})

export const maxDuration = 60

function urlToSlug(url: string) {
  // 去掉协议部分
  url = url.replace(/^https?:\/\//, "").replace(/\/$/, "")
  // 替换特殊字符
  const slug = url.replace(/\./g, "-")
  return slug
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const urlStr = url.searchParams.get("url")
  if (!urlStr) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    )
  }
  console.log("start request")
  // const response = await fetch("https://api.coze.com/open_api/v2/chat", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.COZE_API_TOKEN}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     conversation_id: "123",
  //     bot_id: process.env.COZE_BOT_ID,
  //     user: "123333333",
  //     query: urlStr,
  //     stream: false,
  //   }),
  // })
  // console.log("response status:", response.status)

  // const result = await response.json()
  // const answerChoice = result.messages.find((m: any) => m.type === "answer")
  // const content = answerChoice.content.replace(/\```(json)?/g, "")
  // let res: any = {}
  // try {
  //   res = JSON.parse(content)
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: "coze return content is not json" },
  //     { status: 400 }
  //   )
  // }
  // console.log(content)

  const res = {
    title: "GitHub",
    description:
      "GitHub是全球领先的AI驱动开发者平台，提供丰富的功能如Actions、Packages、Security、Codespaces和Copilot，帮助开发者自动化工作流、管理项目并提升代码质量。平台支持企业、团队和教育等多种解决方案，提供高级安全和全天候支持服务。GitHub还通过Sponsors项目资助开源开发者，吸引了超过一亿开发者使用，成为全球最大的开发者平台，致力于推动人类创新。",
    screenshot_url:
      "https://storage.googleapis.com/reader-6b7dc.appspot.com/screenshots/ec5ca22e-7d91-476e-9549-6e25446be676?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=563569098173-compute%40developer.gserviceaccount.com%2F20240610%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240610T100306Z&X-Goog-Expires=14400&X-Goog-SignedHeaders=host&X-Goog-Signature=2af060a7de9f88a97020b9ded7e1b8b54f8764573357755af26bf16b48e662cafbbc2f3cc61866c1f3b014c28c39198fd621fe2541f1631896aa61aec2e4ed3b71875a88c942ab27c444e54d2a5f6f0b4d427e6b788c17b941d0662721a4e7e82c06ea5abb029a9d5c29229476b515b06fef4ec8efb2db51302b9f01e39f5220de6ed7c358cfd3b0f3b5f5911fef6fa82000abe8e6650e2d949b06514b30073a0d2910369f202d8281b7182c7bd2f616ef753e6542b876922235e010d9372d2375c74e9383ad8c6410b9774abf53d008b4990ecc0381951d587f378979e1452aa15d7ccb6f0ff6fb84f49ebb1e4ad7fe010e08b2abc3fb78a7129c95e2ae0aee",
  }

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
    await page.goto(urlStr, {
      waitUntil: "networkidle2",
      timeout: 60000,
    })

    console.log("page title", await page.title())
    const blob = await page.screenshot({ type: "png" })

    const headers = new Headers()

    headers.set("Content-Type", "image/png")
    headers.set("Content-Length", blob.length.toString())

    // or just use new Response ❗️
    return new NextResponse(blob, { status: 200, statusText: "OK", headers })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await browser.close()
  }

  // const imageResponse = await fetch(res.screenshot_url)
  // const contentType = imageResponse.headers.get("content-type")!
  // const arrayBuffer = await imageResponse.arrayBuffer()
  // const buffer = Buffer.from(arrayBuffer)
  // const filename = `${slugify(res.title)}.png`
  // const params = {
  //   Bucket: process.env.R2_BUCKET_NAME!,
  //   Key: filename,
  //   Body: buffer,
  //   ContentType: contentType,
  // }
  // const uploadResult = await s3.upload(params)
  // console.log(uploadResult)

  return NextResponse.json(res)
}
