## WebNav

Front-end navigation website, used to collect high-quality front-end related websites from both domestic and foreign sources for convenient personal use

> This project is highly inspired by [Taxonomy](https://github.com/shadcn/taxonomy), For learning purpose, to > learn how to build a modern app using Next.js 13(with many features like authentication, API routes, static pages for docs, orm, ...etc)

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

## Todo
- [x] Add tailwindcss
- [x] Light/Dark mode
- [x] Database concention
- [x] Authentication
- [x] Adapt to mobile devices
- [ ] One click deploy
- [ ] User like and collection


## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env
```

3. Start the development server:

```sh
pnpm dev
```