import { LinkContent } from "@/components/link-content"
import { Sidebar } from "@/components/sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

import getNavLinks from "./links"

export const revalidate = 24 * 60 * 60

export default async function IndexPage() {
  const navResources = await getNavLinks()
  const navItems = navResources.map((n) => {
    return {
      title: n.title,
      icon: n.icon,
      id: n.id,
    }
  })
  return (
    <div className="relative mx-auto min-h-screen w-full">
      {/* @ts-expect-error Async Server Component */}
      <SiteHeader navItems={navItems} />
      <div className="relative flex items-start justify-between">
        <div className="absolute inset-0 -z-10 size-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="sticky left-0 top-[65px] hidden h-full w-48 sm:block">
          <Sidebar navItems={navItems} />
        </div>
        <LinkContent navResources={navResources} />
      </div>
      <SiteFooter />
    </div>
  )
}
