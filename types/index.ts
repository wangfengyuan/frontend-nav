export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export enum BG_COLOR {
  /** 渐变 */
  gradient = "gradient",
  /** 单色 */
  single = "color",
}

export interface ExportConfig {
  url: string
  title: string
  description: string
  screenshot_url: string
  randomColors: string[]
  singleColor: string
  aspectRatio: string
  showQrCode: boolean
  font: string
  bgColorType: BG_COLOR
  favicon: string
}
