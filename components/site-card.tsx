/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react"
import { BG_COLOR, ExportConfig } from "@/types"
import { useQRCode } from "next-qrcode"

import { cn } from "@/lib/utils"

interface Props {
  exportConfig: ExportConfig
}

const SiteCard = React.forwardRef<HTMLDivElement, Props>(
  ({ exportConfig }, ref) => {
    const isHorizontalOrientation = useMemo(() => {
      const [w, h] = exportConfig.aspectRatio.split("/")
      return parseInt(w) >= parseInt(h)
    }, [exportConfig.aspectRatio])

    const { Canvas } = useQRCode()
    return (
      <div
        className={cn(
          "relative mx-auto flex w-full items-center justify-center overflow-hidden",
          exportConfig.font
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center gap-6 rounded-lg bg-gradient-to-br p-8",
            isHorizontalOrientation ? "w-[720px]" : "w-[360px] flex-col",
            exportConfig.bgColorType === BG_COLOR.gradient
              ? [...exportConfig.randomColors]
              : ""
          )}
          ref={ref}
          style={{
            aspectRatio: exportConfig.aspectRatio,
            backgroundColor:
              exportConfig.bgColorType === BG_COLOR.single
                ? exportConfig.singleColor
                : undefined,
          }}
        >
          <div className="text-center text-white">
            <h1 className="mb-2 text-3xl font-semibold">
              {exportConfig.title}
            </h1>
            <p className="line-clamp-5 overflow-hidden text-ellipsis break-all text-lg">
              {exportConfig.description}
            </p>
          </div>
          <div>
            <div className="width-[260px] aspect-video">
              {/* TODO 这里使用Image标签，导出图片无该图片，先使用img标签 */}
              <img
                src={exportConfig.screenshot_url}
                width={260}
                height={260}
                alt="screenshot"
                className="w-full rounded-md"
              />
            </div>
            {exportConfig.showQrCode && (
              <div className="mt-4 flex items-center justify-center">
                <Canvas
                  text={exportConfig.url}
                  options={{
                    errorCorrectionLevel: "M",
                    width: 60,
                    margin: 2,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

SiteCard.displayName = "SiteCard"

export default SiteCard
