import Image from "next/image"
import Link from "next/link"
import { ExportConfig } from "@/types"
import { Link as SiteLink } from "@prisma/client"
import { Share2 } from "lucide-react"

import { CategoryWithLinks } from "@/app/links"

export function LinkItem({ link }: { link: SiteLink | ExportConfig }) {
  return (
    <Link
      href={`${link.url}?utm_source=webnav&utm_medium=referral`}
      target="_blank"
    >
      <div className="relative mb-6 flex min-h-[122px] min-w-0 cursor-pointer flex-col break-words rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:bg-border hover:shadow-lg  xl:mb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 flex size-10 justify-between overflow-hidden rounded-full">
              {link.icon ? (
                <Image
                  src={link.icon}
                  className="object-fill"
                  alt=""
                  width={40}
                  height={40}
                />
              ) : (
                <span className="size-full rounded-full bg-purple-500 text-center font-bold leading-10">
                  {link.title.slice(0, 1)}
                </span>
              )}
            </div>
            <span className="text-xl font-bold text-primary">{link.title}</span>
          </div>
          <div className="ml-auto flex items-center">
            {(link as any).is_crawled && (
              <Link href={`/site-card?url=${link.url}`} target="_blank">
                <Share2 className="size-5" />
              </Link>
            )}
          </div>
        </div>
        <div className="mt-2 line-clamp-2 text-sm text-primary">
          {link.description}
        </div>
      </div>
    </Link>
  )
}

export function LinkContent({
  navResources,
}: {
  navResources: CategoryWithLinks
}) {
  return (
    <div className="w-full pt-4">
      <div className="mx-auto w-full px-4 md:px-6">
        {navResources.map((category) => {
          return (
            <div id={category.id} key={category.id} className="mb-12">
              <div className="my-4">
                <h1 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">
                  {category.title}
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
                {category.links.map((link) => (
                  <LinkItem link={link} key={link.id} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
