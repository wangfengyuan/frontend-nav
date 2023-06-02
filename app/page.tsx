import { Sidebar } from "@/components/sidebar"
import getNavLinks from "./links"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LinkContent } from "@/components/link-content"
import BgImage from "@/components/bg-image"

export const revalidate = 24 * 60 * 60;

export default async function IndexPage() {
  const navResources = await getNavLinks();
  const navItems = navResources.map(n => {
    return {
      title: n.title,
      icon: n.icon,
      id: n.id,
    }
  })
  return <div className="container relative mx-auto min-h-screen w-full">
      <BgImage />
      <div className="flex">
        <Sidebar navItems={navItems} />
        <div className="pl-[16rem]">
          <SiteHeader />
          <LinkContent navResources={navResources} />
          <SiteFooter />
        </div>
      </div>
    </div>
}
