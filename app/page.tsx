import { Sidebar } from "@/components/sidebar"
import getNavLinks from "./links"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LinkContent } from "@/components/link-content"

export default async function IndexPage() {
  const navResources = await getNavLinks();
  return <div className="min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <div className="flex min-h-screen">
        <Sidebar navResources={navResources} />
        <LinkContent navResources={navResources} />
      </div>
      <SiteFooter />
    </div>
}
