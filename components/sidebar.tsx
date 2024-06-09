"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Category } from "@prisma/client"

import { cn } from "@/lib/utils"

export interface SidebarProps {
  className?: string
  navItems: Pick<Category, "title" | "icon" | "id">[]
}

export function Sidebar({ navItems }: SidebarProps) {
  const [activeTabId, setActiveTabId] = useState(navItems[0].id)
  useEffect(() => {
    const ele = document.getElementById(activeTabId)
    const elePosition = ele?.getBoundingClientRect().top || 0
    const offsetPosition = elePosition + window.pageYOffset - 75
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }, [activeTabId])
  return (
    <div className={cn("pb-12")}>
      <div className="space-y-4">
        <div className="px-4 py-2">
          <div className="space-y-1">
            {navItems.map((category) => {
              return (
                <div
                  className={`block cursor-pointer rounded-lg ${
                    activeTabId === category.id
                      ? "bg-black text-white"
                      : "text-primary hover:text-purple-500"
                  }`}
                  key={category.id}
                  onClick={() => setActiveTabId(category.id)}
                >
                  <div className="scale relative mb-2 flex items-center gap-2 rounded-r-lg p-2 transition-colors ease-in-out before:transition-colors hover:no-underline sm:border-l-0 sm:pl-4 sm:before:absolute sm:before:left-[-5px] sm:before:top-[2px] sm:before:h-[calc(100%-4px)] sm:before:w-[10px] sm:before:rounded-full sm:before:transition-colors">
                    <div className="relative flex shrink-0">
                      <Image
                        src={category.icon}
                        alt=""
                        className="block"
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="text-md truncate font-medium">
                      {category.title}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
