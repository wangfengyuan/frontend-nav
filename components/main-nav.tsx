"use client"

import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Sidebar } from "./sidebar"
import { Button } from "./ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"

interface MainNavProps {
  items?: NavItem[]
  navItems: any
}

export function MainNav({ items, navItems }: MainNavProps) {
  return (
    <>
      <Drawer direction="left" noBodyStyles>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="px-2">
            <Icons.menu className="size-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-screen w-3/5 rounded-none">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>WebNav</DrawerTitle>
            </DrawerHeader>
            <Sidebar navItems={navItems} />
            <DrawerFooter>
              <div className="text-center">
                {items?.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-lg font-medium"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
