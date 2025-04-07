/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      "puppeteer-core",
      "@sparticuz/chromium-min",
    ],
  },
  images: {
    domains: ["cos.codefe.top", "webnav-cdn.codefe.top"],
  },
  output: "standalone",
}

export default nextConfig
