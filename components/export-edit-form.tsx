import { ChangeEvent } from "react"
import { BG_COLOR, ExportConfig } from "@/types"

import { generateRandomGradient } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Textarea } from "./ui/textarea"

interface Props {
  exportConfig: ExportConfig
  setExportConfig: (value: ExportConfig) => void
}

export default function ExportEditForm(props: Props) {
  const { exportConfig, setExportConfig } = props

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof ExportConfig
  ) => {
    setExportConfig({ ...exportConfig, [key]: e.target.value })
  }

  const setConfigValue = (
    key: keyof ExportConfig,
    value: string | string[] | boolean
  ) => {
    setExportConfig({ ...exportConfig, [key]: value })
  }

  return (
    <div className="flex flex-1 flex-col space-y-3">
      <div className="space-y-2">
        <Label>标题</Label>
        <Input
          value={exportConfig.title}
          onChange={(e) => handleChange(e, "title")}
        />
      </div>
      <div className="space-y-2">
        <Label>描述</Label>
        <Textarea
          value={exportConfig.description}
          onChange={(e) => handleChange(e, "description")}
        />
      </div>
      <div className="space-y-2">
        <Label>截图</Label>
        <Input
          value={exportConfig.screenshot_url}
          onChange={(e) => handleChange(e, "screenshot_url")}
        />
      </div>
      <div className="flex gap-4">
        <div className="space-y-2">
          <Label>字体</Label>
          <Select
            value={exportConfig.font}
            onValueChange={(v: string) => setConfigValue("font", v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="font-sans">font-sans</SelectItem>
                <SelectItem value="font-serif">font-serif</SelectItem>
                <SelectItem value="font-mono">font-mono</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>背景颜色</Label>
          <div className="flex space-x-4">
            <Select
              value={exportConfig.bgColorType}
              onValueChange={(v: string) => setConfigValue("bgColorType", v)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={BG_COLOR.gradient}>随机渐变</SelectItem>
                  <SelectItem value={BG_COLOR.single}>纯背景色</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {exportConfig.bgColorType === BG_COLOR.gradient ? (
              <div
                onClick={() =>
                  setConfigValue("randomColors", generateRandomGradient())
                }
                className="flex cursor-pointer items-center gap-2 hover:text-purple-500"
              >
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.20313 3.75781C4.89063 4.23698 4.53385 4.94792 4.13281 5.89062C4.01823 5.65625 3.92188 5.46875 3.84375 5.32812C3.76563 5.18229 3.65885 5.01562 3.52344 4.82812C3.39323 4.64062 3.26042 4.49479 3.125 4.39062C2.99479 4.28125 2.83073 4.1901 2.63281 4.11719C2.4401 4.03906 2.22917 4 2 4H0.25C0.177083 4 0.117188 3.97656 0.0703125 3.92969C0.0234375 3.88281 0 3.82292 0 3.75V2.25C0 2.17708 0.0234375 2.11719 0.0703125 2.07031C0.117188 2.02344 0.177083 2 0.25 2H2C3.30208 2 4.36979 2.58594 5.20313 3.75781ZM13.9297 9.82031C13.9766 9.86719 14 9.92708 14 10C14 10.0729 13.9766 10.1328 13.9297 10.1797L11.4297 12.6797C11.3828 12.7266 11.3229 12.75 11.25 12.75C11.1823 12.75 11.1224 12.724 11.0703 12.6719C11.0234 12.625 11 12.5677 11 12.5V11C10.8333 11 10.612 11.0026 10.3359 11.0078C10.0599 11.0078 9.84896 11.0104 9.70313 11.0156C9.55729 11.0156 9.36719 11.013 9.13281 11.0078C8.89844 10.9974 8.71354 10.9844 8.57813 10.9687C8.44271 10.9479 8.27604 10.9193 8.07813 10.8828C7.88021 10.8464 7.71615 10.7995 7.58594 10.7422C7.45573 10.6797 7.30469 10.6042 7.13281 10.5156C6.96094 10.4271 6.80729 10.3229 6.67188 10.2031C6.53646 10.0833 6.39323 9.94531 6.24219 9.78906C6.09115 9.6276 5.94531 9.44531 5.80469 9.24219C6.11198 8.75781 6.46615 8.04687 6.86719 7.10937C6.98177 7.34375 7.07813 7.53385 7.15625 7.67969C7.23438 7.82031 7.33854 7.98437 7.46875 8.17188C7.60417 8.35937 7.73698 8.50781 7.86719 8.61719C8.0026 8.72135 8.16667 8.8125 8.35938 8.89062C8.55729 8.96354 8.77083 9 9 9H11V7.5C11 7.42708 11.0234 7.36719 11.0703 7.32031C11.1172 7.27344 11.1771 7.25 11.25 7.25C11.3125 7.25 11.375 7.27604 11.4375 7.32812L13.9297 9.82031ZM13.9297 2.82031C13.9766 2.86719 14 2.92708 14 3C14 3.07292 13.9766 3.13281 13.9297 3.17969L11.4297 5.67969C11.3828 5.72656 11.3229 5.75 11.25 5.75C11.1823 5.75 11.1224 5.72656 11.0703 5.67969C11.0234 5.6276 11 5.56771 11 5.5V4H9C8.75 4 8.52344 4.03906 8.32031 4.11719C8.11719 4.19531 7.9375 4.3125 7.78125 4.46875C7.625 4.625 7.49219 4.78646 7.38281 4.95312C7.27344 5.11458 7.15625 5.3151 7.03125 5.55469C6.86458 5.8776 6.66146 6.32292 6.42188 6.89062C6.27083 7.23437 6.14063 7.52344 6.03125 7.75781C5.92708 7.99219 5.78646 8.26562 5.60938 8.57812C5.4375 8.89062 5.27083 9.15104 5.10938 9.35937C4.95313 9.56771 4.76042 9.78385 4.53125 10.0078C4.30729 10.2318 4.07292 10.4115 3.82812 10.5469C3.58854 10.6771 3.3125 10.7865 3 10.875C2.6875 10.9583 2.35417 11 2 11H0.25C0.177083 11 0.117188 10.9766 0.0703125 10.9297C0.0234375 10.8828 0 10.8229 0 10.75V9.25C0 9.17708 0.0234375 9.11719 0.0703125 9.07031C0.117188 9.02344 0.177083 9 0.25 9H2C2.25 9 2.47656 8.96094 2.67969 8.88281C2.88281 8.80469 3.0625 8.6875 3.21875 8.53125C3.375 8.375 3.50781 8.21615 3.61719 8.05469C3.72656 7.88802 3.84375 7.6849 3.96875 7.44531C4.13542 7.1224 4.33854 6.67708 4.57813 6.10937C4.72917 5.76562 4.85677 5.47656 4.96094 5.24219C5.07031 5.00781 5.21094 4.73437 5.38281 4.42187C5.5599 4.10937 5.72656 3.84896 5.88281 3.64062C6.04427 3.43229 6.23698 3.21615 6.46094 2.99219C6.6901 2.76823 6.92448 2.59115 7.16406 2.46094C7.40885 2.32552 7.6875 2.21615 8 2.13281C8.3125 2.04427 8.64583 2 9 2H11V0.5C11 0.427083 11.0234 0.367187 11.0703 0.320312C11.1172 0.273437 11.1771 0.25 11.25 0.25C11.3125 0.25 11.375 0.276041 11.4375 0.328125L13.9297 2.82031Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div className="w-20">切换</div>
              </div>
            ) : (
              <Input
                type="color"
                className="w-12"
                value={exportConfig.singleColor}
                onChange={(e) => handleChange(e, "singleColor")}
              ></Input>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>比例</Label>
        <Select
          value={exportConfig.aspectRatio}
          onValueChange={(value) => setConfigValue("aspectRatio", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="4/3">4:3</SelectItem>
              <SelectItem value="3/4">3:4</SelectItem>
              <SelectItem value="16/9">16:9</SelectItem>
              <SelectItem value="9/16">9:16</SelectItem>
              <SelectItem value="1/1">1:1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="qrcode_switch">是否展示二维码</Label>
        <Switch
          id="qrcode_switch"
          checked={exportConfig.showQrCode}
          onCheckedChange={(value) => setConfigValue("showQrCode", value)}
        />
      </div>
    </div>
  )
}
