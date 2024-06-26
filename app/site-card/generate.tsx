"use client"

import { useCallback, useRef, useState } from "react"
import { ExportConfig } from "@/types"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import DownloadButton from "@/components/download-button"
import ExportEditForm from "@/components/export-edit-form"
import SiteCard from "@/components/site-card"
import SubmitSiteButton from "@/components/submit-site-button"

import { defaultExportConfig } from "./const"

export default function SiteGenerate() {
  const cardPreviewRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [exportConfig, setExportConfig] =
    useState<ExportConfig>(defaultExportConfig)
  const { url } = exportConfig
  const handleGenerate = useCallback(
    async (e: any) => {
      e.preventDefault()
      if (!url) {
        return
      }
      try {
        setLoading(true)
        const response = await fetch(`/api/summarize?url=${url}`)
        const res = await response.json()
        if (res.error) {
          toast({
            title: "error occurred",
            description: res.error,
            variant: "destructive",
          })
        } else {
          setExportConfig({
            ...exportConfig,
            ...res,
          })
        }
      } catch (error: any) {
      } finally {
        setLoading(false)
      }
    },
    [url, exportConfig]
  )

  return (
    <>
      <div className="flex flex-col space-y-3">
        <h1 className="mb-8 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent">
          Generate shareable web card with one click
        </h1>
        <div className="flex items-center space-x-3">
          <Input
            type="url"
            placeholder="https://www.example.com"
            value={url}
            onChange={(e) =>
              setExportConfig({ ...exportConfig, url: e.target.value })
            }
          />
          <Button
            className="w-56 px-2"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-6 animate-spin" />
                Please wait
              </>
            ) : (
              "preview"
            )}
          </Button>
        </div>
      </div>

      {exportConfig.screenshot_url && (
        <div className="container mx-auto p-8">
          <div className="mb-10 flex w-full max-w-7xl gap-10">
            <ExportEditForm
              exportConfig={exportConfig}
              setExportConfig={setExportConfig}
            />
            <SiteCard exportConfig={exportConfig} ref={cardPreviewRef} />
          </div>
          <div className="flex justify-center space-x-8">
            <DownloadButton cardPreviewRef={cardPreviewRef} url={url} />
            <SubmitSiteButton exportConfig={exportConfig} />
          </div>
        </div>
      )}
    </>
  )
}
