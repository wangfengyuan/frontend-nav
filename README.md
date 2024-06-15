<p align="center">
  <a href="https://webnav.codefe.top/">
    <img alt="Example demo page" src="https://cos.codefe.top/images/webnav-screenshot-demo.png" width="680">
  </a>
</p>
<p align="center">
  <a href="https://webnav.codefe.top/">
    <img alt="Example demo page" src="https://static.codefe.top/2024/06/a0fd6c1ad67002f06e18dae22b0b3eb2.png" width="680">
  </a>
</p>

## WebNav

Front-end navigation website, used to collect high-quality front-end related websites from both domestic and foreign sources for convenient personal use, and can also capture web page information with one click to generate shareable cards.

> This project is highly inspired by [Taxonomy](https://github.com/shadcn/taxonomy), For learning purpose, to learn how to build a modern app using Next.js 13(with many features like authentication, API routes, static pages for docs, orm, ...etc)


## Features

- New /app dir
- Server and Client Components
- UI Components built using **Radix UI**
- Styled using **Tailwind CSS**
- Dark mode with **`next-themes`**
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- MySQL Database on **PlanetScale**
- Written in **TypeScript**
- Screenshot by use **Puppeteer**
- call **Coze** Api

## Deploy Your Own
You can clone & deploy it to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwangfengyuan%2Ffrontend-nav&env=DATABASE_URL,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=DATABASE_URL%E3%80%81CLIENT_ID%E3%80%81CLIENT_SECRET%20are%20used%20to%20store%20user%20infomation&demo-title=Front-end%20navigation%20website&demo-url=https%3A%2F%2Fwebnav.codefe.top%2F&demo-image=https%3A%2F%2Fcos.codefe.top%2Fimages%2Fwebnav-screenshot-demo.png)

## Todo
- [x] Add tailwindcss
- [x] Light/Dark mode
- [x] Database concention
- [x] Authentication
- [x] Adapt to mobile devices
- [x] One click deploy



## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env
```

3. sync database table and add some data
```sh
npx prisma db push
pnpm run seed
```

4. Start the development server:

```sh
pnpm dev
```
