import { NextResponse } from "next/server"
import puppeteer from "puppeteer-core"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json(
      { message: "A url query-parameter is required" },
      { status: 400 }
    )
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://browserless.codefe.top?token=${process.env.BROWSERLESS_TOKEN}`,
  })

  const page = await browser.newPage()
  // 获取设备像素比
  const devicePixelRatio = 3
  const viewportWidth = 390

  // 先设置一个较小的初始高度
  await page.setViewport({
    width: viewportWidth,
    height: 800,
    deviceScaleFactor: devicePixelRatio,
  })

  await page.goto(url, {
    waitUntil: ["load", "networkidle2"],
    timeout: 60000,
  })

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
    const mainContent: any = document.querySelector("#poster")

    // 获取元素的完整高度，包括padding和border
    const height =
      mainContent.getBoundingClientRect().height || document.body.offsetHeight

    // 考虑到可能的margin collapse，取最大值
    return Math.max(height, window.innerHeight)
  })

  // 更新viewport高度，保持移动端宽度和设备像素比
  await page.setViewport({
    width: viewportWidth,
    height: pageHeight,
    deviceScaleFactor: devicePixelRatio,
  })

  const screenshot = await page.screenshot({ type: "png" })
  await browser.close()
  return new NextResponse(screenshot, {
    status: 200,
    headers: { "Content-Type": "image/png" },
  })
}
