# product empowers users to go from concept to viral meme in under 30 seconds, combining fun with functional design.
# FEATURES:
- Browse & filter meme templates (fetched from IMGFLIP)
- Search for templates by keyword or category
- Create memes via a simple editor (add text on top of images)
- Start from a blank canvas
- View on mobile and desktop (responsive design)

# TECH STACK:
- React + TypeScript
- TailwindCSS
- IMGFLIP API (for meme images)
- Vercel (for deployment)
- GitHub (version control)

# Live Demo : 
https://memeize-meme-generator.vercel.app/


```
project
├─ .bolt
│  ├─ config.json
│  └─ prompt
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ memeize-logo.svg
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ components
│  │  ├─ common
│  │  │  └─ Logo.tsx
│  │  ├─ editor
│  │  │  ├─ MemeCanvas.tsx
│  │  │  ├─ ShareModal.tsx
│  │  │  └─ TextToolbar.tsx
│  │  ├─ layout
│  │  │  ├─ Footer.tsx
│  │  │  └─ Navbar.tsx
│  │  └─ templates
│  │     └─ TemplateGrid.tsx
│  ├─ index.css
│  ├─ lib
│  │  └─ supabase.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ auth
│  │  │  ├─ Login.tsx
│  │  │  └─ SignUp.tsx
│  │  ├─ Home.tsx
│  │  ├─ MyMemes.tsx
│  │  └─ Templates.tsx
│  └─ vite-env.d.ts
├─ supabase
│  └─ migrations
│     └─ 20250528063222_bronze_hat.sql
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

# How To Run:
Download and extract.
npm i in project folder.
create an .env with your backend credentials.
npm run dev.

