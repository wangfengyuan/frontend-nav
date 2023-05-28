import Image from "next/image"
import { CategoryWithLinks } from "@/app/links"
import { Link } from "@prisma/client"

export function LinkItem({ link }: { link: Link }) {
  return (
    <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
      <div className="relative mb-6 flex min-w-0 cursor-pointer flex-col break-words rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-lg xl:mb-0">
          <div className="">
          <div className="flex items-center">
            <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={link.icon}
                alt=""
                width={40}
                height={40}
              />
            </div>
            <span className="text-xl font-bold text-cyan-500">{ link.title }</span>
          </div>
          <div className="mt-2 line-clamp-2 text-sm text-emerald-500">
            { link.description }   
          </div>
        </div>
      </div>
    </div>
  )
}

export function LinkContent({ navResources }: { navResources: CategoryWithLinks }) {
  return (
    <div className="relative flex w-full pt-4 lg:pl-[16rem]">
      <div className="mx-auto w-full px-4 md:px-6">
        <div>
          <div className="flex flex-wrap">
            {
              navResources.map((category) => (
                category.links.map((link) => (
                  <LinkItem link={link} />
                ))
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
