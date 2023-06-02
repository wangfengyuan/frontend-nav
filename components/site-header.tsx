import Link from "next/link"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { getCurrentUser } from "@/lib/session"
import { UserAccountNav } from "./user-account-nav"

export async function SiteHeader() {
  const user = await getCurrentUser()
  return (
    <header className="sticky top-0 z-40 w-full dark:border-slate-50/[0.06] lg:border-b lg:border-slate-900/10">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
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
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            {
              user ? (
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
              )
            }
          </nav>
        </div>
      </div>
    </header>
  )
}
