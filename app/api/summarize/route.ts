import { NextResponse } from "next/server"
import { S3 } from "aws-sdk"

import { extractWebsiteInfo, isValidUrl } from "../screenshot/route"

const slugify = require("slugify")

const s3 = new S3({
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  endpoint: process.env.R2_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  if (!url || !isValidUrl(url)) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    )
  }
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
  //     query: url,
  //     stream: false,
  //   }),
  // })

  // const result = await response.json()
  // const answerChoice = result.messages.find((m: any) => m.type === "answer")
  // const content = answerChoice.content.replace(/\```(json)?/g, "")
  // let res: any = {}
  // try {
  //   res = JSON.parse(content)
  //   const urlRes = await extractWebsiteInfo(url)
  //   const { screenshot } = urlRes!
  //   const filename = `${slugify(url)}.png`
  //   const params = {
  //     Bucket: process.env.R2_BUCKET_NAME!,
  //     Key: filename,
  //     Body: screenshot,
  //     ContentType: "image/png",
  //   }
  //   const uploadResult = await s3.upload(params).promise()
  //   res.screenshot_url = `${process.env.CDN_CUSTOM_DOMAIN}/${encodeURIComponent(filename)}`
  //   console.log(uploadResult)
  //   return NextResponse.json(res)
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: "coze return content is not json" },
  //     { status: 400 }
  //   )
  // }

  const urlRes = await extractWebsiteInfo(url)
  console.log(urlRes?.meta)

  const res = {
    title: "GitHub",
    description:
      "GitHub是全球领先的AI驱动开发者平台，提供丰富的功能如Actions、Packages、Security、Codespaces和Copilot，帮助开发者自动化工作流、管理项目并提升代码质量。平台支持企业、团队和教育等多种解决方案，提供高级安全和全天候支持服务。GitHub还通过Sponsors项目资助开源开发者，吸引了超过一亿开发者使用，成为全球最大的开发者平台，致力于推动人类创新。",
    screenshot_url: "https://webnav-cdn.codefe.top/https%3Agithub.com.png",
  }

  return NextResponse.json(res)
}
