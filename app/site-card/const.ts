import { BG_COLOR } from "@/types"

import { generateRandomGradient } from "@/lib/utils"

export const defaultExportConfig = {
  url: "",
  title: "",
  description: "",
  screenshot_url: "",
  randomColors: generateRandomGradient(),
  singleColor: "#14b8a6",
  aspectRatio: "3/4",
  showQrCode: false,
  font: "font-serif",
  bgColorType: BG_COLOR.gradient,
  icon: "",
}
