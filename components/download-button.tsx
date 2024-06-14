import domtoimage from "dom-to-image"
import slugify from "slugify"

import { Button } from "./ui/button"

export default function DownloadButton(props: {
  cardPreviewRef: React.RefObject<HTMLDivElement>
  url: string
}) {
  const { cardPreviewRef, url } = props
  async function saveImage(data: string) {
    const a = document.createElement("a")
    a.href = data
    a.download = `${slugify(url)}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  const downloadImage = async () => {
    const element = cardPreviewRef.current!
    try {
      let data = await domtoimage.toPng(element, {
        height: element.offsetHeight * 3,
        width: element.offsetWidth * 3,
        style: {
          transform: "scale(3)",
          transformOrigin: "center center",
        },
      })
      await saveImage(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button className="w-56 px-2" onClick={downloadImage}>
      Download
    </Button>
  )
}
