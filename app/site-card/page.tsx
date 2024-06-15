/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { getLinkByUniqueUrl } from "../links"
import { defaultExportConfig } from "./const"
import SiteGenerate from "./generate"
import Preview from "./preview"

export default async function SummarizePage(props: any) {
  console.log(props)
  const {
    searchParams: { url = "" },
  } = props
  let siteInfo
  if (url) {
    siteInfo = await getLinkByUniqueUrl(url)
  }
  return (
    <div className="relative z-20 flex size-full h-full flex-col items-center pb-12 pt-10 text-primary">
      <div className="absolute top-0 -z-10 size-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 size-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      {siteInfo ? (
        <Preview
          exportConfig={{
            ...defaultExportConfig,
            ...siteInfo,
          }}
        />
      ) : (
        <SiteGenerate />
      )}
    </div>
  )
}
