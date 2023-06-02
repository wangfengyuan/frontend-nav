"use client"
import Image from "next/image"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { Category } from "@prisma/client"


interface SidebarProps { 
  className?: string,
  navItems: Pick<Category, "title" | "icon" | "id">[],
}

export function Sidebar({ className, navItems }: SidebarProps) {
  const hash = window.location.hash.substr(1);
  const [activeTabId, setActiveTabId] = useState(hash || navItems[0].id);
  return (
    <div className="fixed z-20 hidden min-h-screen w-[16rem] transition-all duration-300 ease-in-out sm:block ">
      <nav className="after:h-[calc(100vh - 65px)] block w-64 flex-row flex-nowrap px-6 font-semibold sm:pb-6">
        <a href="" className="mx-6 hidden h-16 flex-col items-center justify-center sm:flex">
          <Image
            src="https://cos.codefe.top/images/web-nav-icon.png"
            alt=""
            width={200}
            height={60}
          />
        </a>
        <div className="relative z-40 mt-4 flex h-auto w-full flex-1 flex-col items-center overflow-y-auto overflow-x-hidden rounded opacity-100">
          <div className="flex list-none flex-col md:min-w-full md:flex-col">
            <div className={cn("flex-none pb-12", className)}>
              <div className="space-y-4 pb-4">
                <div className="py-2">
                  <div className="space-y-1">
                    { navItems.map((category) => {
                      return (
                        <Link
                          href={`#${category.id}`}
                          className={`${activeTabId === category.id ? "text-purple-500" : "text-primary"}`}
                          key={category.id}
                          onClick={() => setActiveTabId(category.id)}
                        >
                          <div className="scale relative mb-2 flex gap-2 rounded-r-lg p-2 transition-colors ease-in-out before:transition-colors hover:no-underline sm:border-l-0 sm:pl-6 sm:before:absolute sm:before:left-[-5px] sm:before:top-[2px] sm:before:h-[calc(100%-4px)] sm:before:w-[10px] sm:before:rounded-full sm:before:transition-colors">
                            <div className="relative flex shrink-0">
                              <Image
                                src={category.icon}
                                alt=""
                                width={24}
                                height={24}
                              />
                            </div>
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{category.title}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
