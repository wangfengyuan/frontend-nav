export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "WebNav",
  description:
    "WebNav is a website navigation that collects excellent sites for frontend developers, and can also capture web page information with one click to generate shareable cards.It includes a large number of high-quality front-end related websites, providing users with learning websites, learning directions, learning methods, the latest front-end frameworks and other content. It collects front-end websites from both domestic and foreign sources",
  keywords: [
    "webnav",
    "前端导航",
    "网址导航",
    "FrontEndNav",
    "程序员导航",
    "前端开发学习",
    "前端网址大全",
    "网页卡片生成",
    "网页内容抓取",
  ],
  mainNav: [
    {
      title: "Generate Site Card",
      href: "/site-card",
    },
  ],
  links: {
    github: "https://github.com/wangfengyuan/frontend-nav",
    docs: "",
  },
}
