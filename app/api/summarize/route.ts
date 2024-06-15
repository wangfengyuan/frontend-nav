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

export const maxDuration = 60

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  if (!url || !isValidUrl(url)) {
    return NextResponse.json(
      { error: "Missing url parameter or url is invalid format" },
      { status: 400 }
    )
  }
  const [response, urlRes] = await Promise.all([
    fetch("https://api.coze.com/open_api/v2/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COZE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation_id: "123",
        bot_id: process.env.COZE_BOT_ID,
        user: "123333333",
        query: url,
        stream: false,
      }),
    }),
    extractWebsiteInfo(url),
  ])

  const result = await response.json()
  const answerChoice = result.messages.find((m: any) => m.type === "answer")
  const content = answerChoice.content.replace(/\```(json)?/g, "")
  let res: any = {}
  try {
    res = JSON.parse(content)
    const { screenshot, meta } = urlRes!
    const filename = `${slugify(url)}.png`
    const params = {
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: filename,
      Body: screenshot,
      ContentType: "image/png",
    }
    const uploadResult = await s3.upload(params).promise()
    res.screenshot_url = `${process.env.CDN_CUSTOM_DOMAIN}/${encodeURIComponent(filename)}`
    res.icon = meta.icon
    return NextResponse.json(res)
  } catch (error) {
    return NextResponse.json(
      { error: "coze return content is not json" },
      { status: 400 }
    )
  }
}
