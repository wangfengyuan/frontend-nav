import Image from "next/image"
import { CategoryWithLinks } from "@/app/links"
import { Link as SiteLink } from "@prisma/client"
import Link from "next/link"

export function LinkItem({ link }: { link: SiteLink }) {
  return (
    <Link
      href={link.url}
      target="_blank"
    >
      <div className="w-full lg:w-6/12 xl:w-4/12">
        <div className="relative mb-6 flex min-w-0 cursor-pointer flex-col break-words rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-lg xl:mb-0">
          <div className="flex items-center">
            <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={link.icon}
                alt=""
                width={40}
                height={40}
              />
            </div>
            <span className="text-xl font-bold text-primary">{ link.title }</span>
          </div>
          <div className="mt-2 line-clamp-2 text-sm text-primary">
            { link.description }   
          </div>
        </div>
      </div>
    </Link>
  )
}

export function LinkContent({ navResources }: { navResources: CategoryWithLinks }) {
  return (
    <div className="w-full pt-4">
      <div className="mx-auto w-full px-4 md:px-6">
        {
          navResources.map((category) => {
            return (
              <div id={category.id}>
                <div className="my-4">
                  <h1 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">{ category.title }</h1>
                </div>
                <div className="flex flex-wrap">
                  {
                    category.links.map((link) => (
                      <LinkItem link={link} key={link.id} />
                    ))
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
