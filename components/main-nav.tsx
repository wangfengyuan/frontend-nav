"use client"
import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import { MobileSidebar } from "./mobile-sidebar"

interface MainNavProps {
  items?: NavItem[]
  navItems: any
}

export function MainNav({ items, navItems }: MainNavProps) {
  const [showMobileSidebar, setShowMobileSidebar] = React.useState<boolean>(false)
  return (
    <>
      <div className="flex gap-6 md:gap-10">
        <div className="sm:hidden" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
          <Icons.menu />
        </div>
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </div>
      { showMobileSidebar && <MobileSidebar navItems={navItems} setShowMobileSidebar={setShowMobileSidebar} /> }
    </>
  )
}
