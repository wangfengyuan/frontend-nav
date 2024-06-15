import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { SidebarProps } from "./sidebar"
import { UserAccountNav } from "./user-account-nav"

export async function SiteHeader({ navItems }: SidebarProps) {
  const user = await getCurrentUser()
  return (
    <header className="sticky top-0 z-40 w-full bg-background pl-4 pr-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center sm:justify-between sm:space-x-0">
        <div className="block sm:hidden">
          <MainNav items={siteConfig.mainNav} navItems={navItems} />
        </div>
        <div className="hidden items-center sm:flex">
          <a
            href="/"
            className="mr-6 hidden h-16 flex-col items-center justify-center sm:flex"
          >
            <Image
              src="https://cos.codefe.top/images/web-nav-icon.png"
              alt=""
              width={150}
              height={45}
            />
          </a>
          {siteConfig.mainNav.length > 0 &&
            siteConfig.mainNav.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn("block rounded-md px-3 py-2 font-medium")}
                >
                  {item.title}
                </Link>
              )
            })}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="size-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
