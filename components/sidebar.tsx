import {
  LayoutGrid,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CategoryWithLinks } from "@/app/links"

interface SidebarProps { 
  className?: string, 
  navResources: CategoryWithLinks,
}


export function Sidebar({ className, navResources }: SidebarProps) {
  return (
    <div className="fixed inset-0 top-16 z-20 hidden w-[16rem] transition-all duration-300 ease-in-out sm:block">
      <nav className="block w-64 flex-row flex-nowrap bg-white px-6 shadow-xl">
        <div className="relative z-40 mt-4 flex h-auto w-full flex-1 flex-col items-center overflow-y-auto overflow-x-hidden rounded bg-white opacity-100">
          <div className="flex list-none flex-col md:min-w-full md:flex-col">
            <div className={cn("w-32 flex-none pb-12", className)}>
              <div className="space-y-4 pb-4">
                <div className="py-2">
                  <div className="space-y-1">
                    { navResources.map((category) => {
                      return (
                        <Button key={category.title} className="w-full justify-start" variant="ghost" size="sm" >
                          <LayoutGrid className="mr-2 h-4 w-4" />
                          {category.title}
                        </Button>
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
