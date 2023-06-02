/* eslint-disable @next/next/no-img-element */
export default function BgImage() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[-1] flex justify-center overflow-hidden">
      <div className="flex w-[100rem] flex-none justify-end dark:hidden">
        <img src="https://apps.umbrel.com/_next/static/media/background.95b19baa.jpg" alt="" className="w-[75rem] max-w-none flex-none blur-xl"/>
      </div>
    </div>
  )
}