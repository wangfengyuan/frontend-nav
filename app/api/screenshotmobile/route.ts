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
            "--font-render-hinting=medium",
            "--enable-font-antialiasing",
            "--disable-gpu",
            "--font-render-hinting=none",
            "--force-color-profile=srgb",
          ]
        : [
            ...chromium.args,
            "--disable-blink-features=AutomationControlled",
            "--font-render-hinting=medium",
            "--enable-font-antialiasing",
            "--disable-gpu",
            "--font-render-hinting=none",
            "--force-color-profile=srgb",
          ],
      defaultViewport: { width: 375, height: 1080 },
      executablePath: isDev
        ? localExecutablePath
        : await chromium.executablePath(remoteExecutablePath),
      headless: "new",
      debuggingPort: isDev ? 9222 : undefined,
    })

    const page = await browser.newPage()
    await page.setUserAgent(userAgent)

    const totalCount = 10
    const seriesCount = 4
    const totalValue = 123

    const html = `
        <html lang="zh-CN">
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <head>
            <style>
              @font-face {
                font-family: 'PingFang SC';
                src: local('PingFang SC');
                font-display: swap;
              }
              body {
                font-family: 'PingFang SC', Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(180deg, #FFF5F5 0%, #FFE0E0 100%);
                font-family: Arial, sans-serif;
                width: 375px;
                height: 600px;
              }
              .header {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
              }
              .avatar {
                width: 50px;
                height: 50px;
                border-radius: 25px;
                margin-right: 10px;
              }
              .title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .subtitle {
                color: #666;
                font-size: 14px;
              }
              .collection-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                margin: 20px 0;
              }
              .collection-item {
                background: white;
                border-radius: 8px;
                padding: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .collection-item img {
                width: 100%;
                height: auto;
              }
              .stats {
                display: flex;
                justify-content: space-between;
                margin: 20px 0;
              }
              .stat-item {
                text-align: center;
              }
              .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #FF6B6B;
              }
              .stat-label {
                font-size: 12px;
                color: #666;
              }
              .qrcode {
                text-align: center;
                margin-top: 20px;
              }
              .qrcode-text {
                font-size: 12px;
                color: #666;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <img class="avatar" src="https://placeholder.com/50x50" alt="avatar">
              <div>
                <div class="title">迪藏家</div>
                <div class="subtitle">已收藏${totalCount}个迪士尼玩偶</div>
              </div>
            </div>
            <div class="title">我的迪士尼收藏</div>
            <div class="subtitle">收藏于「迪藏家」小程序</div>
            <div class="stats">
              <div class="stat-item">
                <div class="stat-value">${totalCount}</div>
                <div class="stat-label">总数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${seriesCount}</div>
                <div class="stat-label">系列数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${totalValue}</div>
                <div class="stat-label">总价值</div>
              </div>
            </div>
            <div class="qrcode">
              <img src="https://placeholder.com/100x100" alt="qrcode">
              <div class="qrcode-text">扫描二维码，记录你的迪士尼收藏</div>
            </div>
          </body>
        </html>
      `

    await page.setContent(html)

    // 获取设备像素比
    const devicePixelRatio = 3
    const viewportWidth = 390

    // 先设置一个较小的初始高度
    await page.setViewport({
      width: viewportWidth,
      height: 800,
      deviceScaleFactor: devicePixelRatio,
    })

    // await page.goto(url, {
    //   waitUntil: ["load", "networkidle2"],
    //   timeout: 60000,
    // })

    // 等待所有图片和字体加载完成
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
      // 获取页面主要内容区域的高度
      const mainContent: any =
        document.querySelector("#poster") || document.body

      // 获取元素的完整高度，包括padding和border
      const height = mainContent.getBoundingClientRect().height

      // 考虑到可能的margin collapse，取最大值
      return Math.max(height, mainContent.offsetHeight)
    })

    // 更新viewport高度，保持移动端宽度和设备像素比
    await page.setViewport({
      width: viewportWidth,
      height: parseInt(pageHeight),
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
