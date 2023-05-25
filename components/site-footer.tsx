
export function SiteFooter() {
  return (
    <div className="mx-auto -mt-24 w-full px-4 md:px-6">
      <footer className="block py-4">
          <div className=" mx-auto px-4">
            <hr className="border-b-1 border-blueGray-200 mb-4" />
            <div className="flex flex-wrap items-center justify-center md:justify-between">
                <div className="w-full px-4 md:w-4/12">
                  <div className="mb-2 text-center md:mb-0 md:text-left"><a href="https://www.creative-tim.com/?ref=npr-footeradmin" target="_blank" className="text-blueGray-500 py-1 text-center text-sm font-semibold md:text-left" rel="noreferrer">Copyright © 2021 Creative Tim</a></div>
                </div>
                <div className="w-full px-4 md:w-8/12">
                  <ul className="flex list-none flex-wrap justify-center  md:justify-end">
                      <li><a href="https://www.creative-tim.com?ref=npr-footeradmin" target="_blank" className="text-blueGray-700 hover:text-blueGray-900 block px-3 py-1 text-sm font-semibold" rel="noreferrer">Creative Tim</a></li>
                      <li><a href="https://www.creative-tim.com/presentation?ref=npr-footeradmin" target="_blank" className="text-blueGray-700 hover:text-blueGray-900 block px-3 py-1 text-sm font-semibold" rel="noreferrer">About Us</a></li>
                      <li><a href="https://www.creative-tim.com/blog/?ref=npr-footeradmin" target="_blank" className="text-blueGray-700 hover:text-blueGray-900 block px-3 py-1 text-sm font-semibold" rel="noreferrer">Blog</a></li>
                      <li><a href="https://www.creative-tim.com/license?ref=npr-footeradmin" target="_blank" className="text-blueGray-700 hover:text-blueGray-900 block px-3 py-1 text-sm font-semibold" rel="noreferrer">Licenses</a></li>
                  </ul>
                </div>
            </div>
          </div>
      </footer>
    </div>
  )
}
