import { useState } from "react"
import Image from "next/image"
import { ExportConfig } from "@/types"
import { Category } from "@prisma/client"

import { LinkItem } from "./link-content"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { toast } from "./ui/use-toast"

interface Props {
  exportConfig: ExportConfig
}

export default function SubmitSiteButton(props: Props) {
  const { exportConfig } = props
  const [categorys, setCategorys] = useState<Category[]>([])
  const [chooseCategoryId, setChooseCategoryId] = useState("")
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false)
  const handleOpenSubmitDialog = async (open: boolean) => {
    if (!open) return
    const response = await fetch("/api/links")
    const res = await response.json()
    setCategorys(res)
    setChooseCategoryId(res[0].id)
  }

  const handleSubmit = async () => {
    const { title, description, screenshot_url, favicon, url } = exportConfig
    const response = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        screenshot_url,
        cid: chooseCategoryId,
        url,
        icon: favicon,
      }),
    })
    const res = await response.json()
    if (res.error) {
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Success",
      description: "Your site info has been submitted.",
    })
    setOpenSubmitDialog(false)
  }

  return (
    <Dialog onOpenChange={handleOpenSubmitDialog} open={openSubmitDialog}>
      <DialogTrigger asChild>
        <Button className="w-56 px-2" onClick={() => setOpenSubmitDialog(true)}>
          request add to webnav
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogDescription>
            Submit your website then it will included in webnav and show
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="name" className="w-[100px] text-center">
              Category:
            </Label>
            <div className="flex-1">
              <Select
                value={chooseCategoryId}
                onValueChange={(value) => setChooseCategoryId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categorys.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        <div className="flex items-center">
                          <Image
                            src={item.icon}
                            alt={item.title}
                            width={24}
                            height={24}
                            className="mr-2"
                          />
                          {item.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between gap-4 self-start">
            <Label htmlFor="name" className="w-[100px] text-center">
              Preview:
            </Label>
            <div className="flex-1">
              <LinkItem link={exportConfig} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setOpenSubmitDialog(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
