"use client"
import { Category } from "@prisma/client"
import { Sidebar } from "./sidebar"


interface SidebarProps { 
  className?: string;
  navItems: Pick<Category, "title" | "icon" | "id">[];
  setShowMobileSidebar: Function
}

export function MobileSidebar({ navItems, setShowMobileSidebar }: SidebarProps) {
  return (
    <>
      <div className="fixed inset-0 z-20 mx-0 h-screen w-60">
        <Sidebar navItems={navItems} />
      </div>
      <div className="fixed inset-0 z-10 h-full w-full bg-gray-900/50 dark:bg-gray-900/50" onClick={() => setShowMobileSidebar(false)}>
      </div>
    </>
  )
}
