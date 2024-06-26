import { LinkContent } from "@/components/link-content"
import { Sidebar } from "@/components/sidebar"

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
    <div className="relative flex items-start justify-between bg-background">
      <div className="sticky left-0 top-[65px] hidden h-full w-48 sm:block">
        <Sidebar navItems={navItems} />
      </div>
      <LinkContent navResources={navResources} />
    </div>
  )
}
