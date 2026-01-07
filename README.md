<div align="center">

# Ahmed Mohamed — AI/ML Portfolio

A modern, responsive portfolio built with **React**, **Vite**, and **Framer Motion**.  
Showcasing AI/ML projects with a neural-network background, glassmorphism UI, and smooth micro‑interactions.

<br />

<img alt="Status" src="https://img.shields.io/badge/Status-Live-brightgreen" />
<img alt="React" src="https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=black" />
<img alt="Vite" src="https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white" />
<img alt="License" src="https://img.shields.io/badge/License-MIT-yellow" />

<br /><br />

**Live (GitHub Pages)**  
`https://<your-username>.github.io/Portfolio/`  
Example: `https://3bsalam-1.github.io/Portfolio/`

</div>

---

## 🚀 Overview

- **Role-focused**: Tailored for an **AI / ML Engineer** profile
- **Modern UX**: Glassmorphism, neural background, and subtle motion
- **Fast & lightweight**: React 19 + Vite 7 for quick loads and smooth navigation
- **Content-driven**: Projects, skills, and certificates powered by structured data files

---

## ✨ Features

- **Modern Tech Stack** – React 19 + Vite for blazing fast performance
- **Interactive UI** – Glassmorphism with blurred panels and layered depth
- **Dynamic Animations**:
  - Scroll & section reveals via Framer Motion
  - Interactive neural network background (HTML5 Canvas)
  - Typewriter effects and hover interactions
- **Theme System** – Dark (default) / Light with persistent preference (localStorage)
- **Project Filtering** – Filter ML/CV/NLP projects with animated layout changes
- **Responsive Layout** – Optimized for mobile, tablet, and desktop
- **SEO Ready** – Meta tags and semantic HTML to improve discoverability

---

## 🛠 Tech Stack

| Layer      | Tools                                     |
| ---------- | ----------------------------------------- |
| Framework  | React 19                                  |
| Bundler    | Vite 7                                    |
| Styling    | CSS Modules, CSS Variables, Glassmorphism |
| Animation  | Framer Motion, HTML5 Canvas               |
| Icons      | React Icons                               |
| Deployment | GitHub Pages (via GitHub Actions)         |

---

## ⚙️ Prerequisites

Make sure you have:

- **Node.js 18+** – [Download](https://nodejs.org/)
- **npm** (bundled with Node) or **yarn**
- **Git** – [Download](https://git-scm.com/)

---

## 🧪 Quick Start

```bash
git clone https://github.com/3bsalam-1/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📦 Installation & Scripts

### Install dependencies

```bash
npm install
```

### Available scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production (`dist/`)
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

---

## 🌐 Deploying to GitHub Pages

This repo includes a ready‑to‑use workflow at `.github/workflows/deploy.yml`.

### 1. Enable GitHub Pages

1. Go to **Settings → Pages**
2. Under **Source**, choose **GitHub Actions**
3. Save

### 2. Push to `main`

The workflow will:

- Build the app with the correct `BASE_PATH` for GitHub Pages
- Upload the `dist` folder as an artifact
- Deploy to GitHub Pages

```bash
git add .
git commit -m "Deploy portfolio to GitHub Pages"
git push origin main
```

### 3. Monitor the workflow

1. Open the **Actions** tab
2. Look for **“Deploy to GitHub Pages”**
3. Wait for the run to complete with a green checkmark

### 4. Visit your site

```text
https://<your-username>.github.io/<repository-name>/
```

Example: `https://3bsalam-1.github.io/Portfolio/`

> It can take a few minutes for the first deployment to become available.

---

## 🌍 Custom Domain (Optional)

If you use a custom domain like `3bsalam.dev`:

1. In **Settings → Pages**, set your custom domain
2. Update `.github/workflows/deploy.yml`:

```yaml
BASE_PATH: /
```

This replaces the default `/${{ github.event.repository.name }}/` value.

---

## 🧷 Preview GitHub Pages Build Locally

To simulate the GitHub Pages path locally:

```bash
# Replace <repository-name> with your repo name
BASE_PATH="/<repository-name>/" npm run build
npm run preview
```

Example:

```bash
BASE_PATH="/Portfolio/" npm run build
npm run preview
```

---

## 🩺 Troubleshooting

**Build fails in GitHub Actions**

- Confirm Node.js 18+ in the workflow
- Ensure dependencies are correctly listed in `package.json`
- Open the Action logs and look for the first error message

**Assets not loading correctly**

- Check that `BASE_PATH` is set correctly in `deploy.yml`
- Verify asset paths are relative to the configured base
- Hard refresh the browser (Ctrl/⌘ + Shift + R)

**GitHub Pages returns 404**

- Wait a few minutes after the first deployment
- Verify the repository name in the URL
- Confirm Pages **Source** is set to **GitHub Actions**

**Manual deployment (fallback)**

```bash
BASE_PATH="/<repository-name>/" npm run build
npm install -g gh-pages
gh-pages -d dist
```

---

## ☁️ Alternative Hosting

### Vercel

1. Import the repo on [Vercel](https://vercel.com)
2. Build command: `npm run build`
3. Output directory: `dist`

### Netlify

1. Import the repo on [Netlify](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`

### Any Static Host (S3, Cloudflare, etc.)

- Build with `npm run build`
- Upload the contents of `dist/`
- Use `BASE_PATH=/` when hosting from the root

---

## 📂 Project Structure

```text
Portfolio/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml          # GitHub Actions deployment workflow
├─ public/
│  ├─ cv.pdf                 # Resume/CV file
│  └─ vite.svg               # Favicon
├─ src/
│  ├─ components/
│  │  ├─ Effects/            # Neural background, typewriter, etc.
│  │  ├─ Layout/             # Navbar, Footer
│  │  ├─ Sections/           # Hero, About, Projects, Contact
│  │  └─ UI/                 # Reusable UI components
│  ├─ config/
│  │  └─ animationConfig.js  # Animation configuration
│  ├─ data/
│  │  ├─ certificates.js     # Certificates data
│  │  ├─ projects.js         # Projects data
│  │  └─ skills.js           # Skills data
│  ├─ hooks/                 # Custom React hooks
│  ├─ styles/
│  │  └─ shared.css          # Shared styles
│  ├─ App.jsx                # Root React component
│  ├─ App.css                # App-level styles
│  ├─ index.css              # Global styles & design system
│  └─ main.jsx               # Application entry point
├─ .gitignore                # Git ignore rules
├─ eslint.config.js          # ESLint configuration
├─ index.html                # HTML template
├─ package.json              # Dependencies and scripts
├─ vite.config.js            # Vite configuration
└─ README.md                 # Project documentation
```

---

## 🎨 Customization Guide

**Update personal information**

- Contact: `src/components/Sections/Contact.jsx`
- About: `src/components/Sections/About.jsx`
- Projects: `src/data/projects.js`
- Skills: `src/data/skills.js`
- Resume: replace `public/cv.pdf`

**Change theme / colors**

- Edit CSS variables in `src/index.css`

**Add new sections**

- Create a new component in `src/components/Sections/`
- Import and render it in `src/App.jsx`
- Add a link in `src/components/Layout/Navbar.jsx`

---

## 📄 License

This project is licensed under the **MIT License** – see [`LICENSE`](LICENSE) for details.

---

## 💬 Contact

**Ahmed Mohamed** — AI/ML Engineer

- Email: [3bsalam0@gmail.com](mailto:3bsalam0@gmail.com)
- LinkedIn: [Ahmed Mohamed](https://linkedin.com/in/ahmed-mohamed)
- GitHub: [@3bsalam-1](https://github.com/3bsalam-1)

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

---

⭐ If you find this portfolio template useful, consider giving it a star!
