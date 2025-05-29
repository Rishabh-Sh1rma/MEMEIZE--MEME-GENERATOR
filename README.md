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

![image](https://github.com/user-attachments/assets/9f62bc64-fc52-48f3-845b-c97493d51d7e)
![image](https://github.com/user-attachments/assets/af63f3cc-6ecd-4911-81aa-353ce1294f42)
![image](https://github.com/user-attachments/assets/8ff7ec78-d8f4-4a93-82d1-1f2594555088)
![image](https://github.com/user-attachments/assets/45ae2e1b-a705-4fd0-a10f-d40301be2ebc)
![image](https://github.com/user-attachments/assets/2aa7048b-62fa-42ff-ad29-7bcf530328e8)
![image](https://github.com/user-attachments/assets/6bf15c50-b345-460f-9d11-94d906773308)
![image](https://github.com/user-attachments/assets/64a5c637-0ed8-4474-98b7-ce68be219c0b)
![image](https://github.com/user-attachments/assets/89bc1477-0ac3-487d-af3e-91550402cabd)


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

