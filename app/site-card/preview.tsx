"use client"

import { useRef, useState } from "react"
import { ExportConfig } from "@/types"

import DownloadButton from "@/components/download-button"
import ExportEditForm from "@/components/export-edit-form"
import SiteCard from "@/components/site-card"

export default function Preview(props: { exportConfig: ExportConfig }) {
  const [exportConfig, setExportConfig] = useState<ExportConfig>(
    props.exportConfig
  )
  console.log(exportConfig)
  const cardPreviewRef = useRef<HTMLDivElement | null>(null)
  return (
    <div className="container mx-auto p-8">
      <div className="mb-10 flex w-full max-w-7xl gap-10">
        <ExportEditForm
          exportConfig={exportConfig}
          setExportConfig={setExportConfig}
        />
        <SiteCard exportConfig={exportConfig} ref={cardPreviewRef} />
      </div>
      <div className="flex justify-center space-x-8">
        <DownloadButton
          cardPreviewRef={cardPreviewRef}
          url={exportConfig.url}
        />
      </div>
    </div>
  )
}
