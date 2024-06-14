export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "WebNav",
  description:
    "WebNav is a resource navigation website that collects excellent sites for front-end developers, and can also capture web page information with one click to generate shareable cards.",
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
