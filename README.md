<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=Q13+Blog+%E2%80%94+Modern+Headless+Blog;Built+with+Next.js+14+%2B+Hygraph;GraphQL+Powered+%7C+Dark+Mode+Ready" alt="Typing SVG" />

<br/>

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E535AB?style=for-the-badge&logo=graphql&logoColor=white)
![Hygraph](https://img.shields.io/badge/Hygraph-CMS-000000?style=for-the-badge&logo=graphql&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![Telegram Bot](https://img.shields.io/badge/Telegram-Bot-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)


**A clean, fast, headless blog built with Next.js 14 and Hygraph CMS.**
Posts, categories, tags, authors, newsletter — all managed from Hygraph Studio.

[🌐 Live Demo](https://q13-blog.vercel.app)

</div>

---

## 📸 Pages

| Route | Description |
|---|---|
| `/` | Home — hero + recent posts |
| `/blogs` | All blog posts |
| `/blogs/[slug]` | Single post with author & tags |
| `/blogs/archive` | Full post archive |
| `/about` | About page |
| `/contact` | Contact form |
| `/tags/[tag]` | Posts filtered by tag |
| `/categories/[category]` | Posts filtered by category |

---

## ✨ Features

- 🚀 **Next.js 14** App Router — SSR & SSG out of the box
- 📡 **Hygraph CMS** — posts, authors, tags, categories managed from Studio
- 🔍 **Search** — find posts instantly
- 🏷️ **Tags & Categories** — organized content filtering
- 👤 **Author profiles** — each post has a linked author with avatar
- ⏱️ **Read time** — displayed per post
- 📬 **Newsletter subscription** — email capture on homepage
- 📬 **Contact form** — validated with React Hook Form + Zod
- 🌙 **Dark / Light mode** — via `next-themes`
- 🔔 **Toast notifications** — via Sonner
- 🔄 **Top loading bar** — smooth navigation UX

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS + Radix UI |
| **CMS** | Hygraph (GraphQL Studio) |
| **Data Fetching** | graphql-request |
| **Forms** | React Hook Form + Zod |
| **Theming** | next-themes |
| **Notifications** | Sonner |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/M1rzo99/blog-web.git
cd blog-web

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

Add your **Hygraph** endpoint to `.env.local`:

```env
NEXT_PUBLIC_HYGRAPH_ENDPOINT=your_hygraph_graphql_endpoint
```

```bash
# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
blog-web/
├── app/
│   ├── blogs/          # Blog list, single post, archive
│   ├── about/          # About page
│   ├── contact/        # Contact form
│   ├── tags/           # Tag filtered posts
│   └── categories/     # Category filtered posts
├── components/         # Reusable UI components
├── lib/                # GraphQL queries & utilities
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

---

## By [M1rzo99](https://github.com/M1rzo99)
