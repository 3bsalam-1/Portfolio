# Ahmed Mohamed — AI/ML Portfolio

A modern, responsive portfolio website built with **React**, **Vite**, and **Framer Motion**. It showcases AI/ML projects with a stunning neural network background, glassmorphism design, and smooth animations.

## 🚀 Features

- **Modern Tech Stack**: Built with React 19 + Vite for blazing fast performance.
- **Interactive UI**: Glassmorphism design with backdrop blurred elements.
- **Dynamic Animations**:
  - Smooth page transitions and scroll reveals driven by Framer Motion.
  - Interactive neural network background using HTML5 Canvas.
  - Typewriter effects and hover interactions.
- **Theme System**: Toggles between Dark (default) and Light modes with persistent preference.
- **Project Filtering**: Filter projects by category (ML, CV, NLP, etc.) with animated layout changes.
- **Responsive Design**: Fully responsive layout that looks great on mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite
- **Styling**: CSS Modules, CSS Variables, Glassmorphism
- **Animations**: Framer Motion, HTML5 Canvas
- **Icons**: React Icons

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/3bsalam-1/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for Production**
   ```bash
   npm run build
   ```
   The output will be in the `dist/` directory, ready for deployment.

## 🌐 Deployment

- **GitHub Pages (recommended default)**
  1. Push to `main` with the included workflow at `.github/workflows/deploy.yml`.
  2. In the repo settings, enable GitHub Pages with source set to “GitHub Actions.”
  3. The action builds with `BASE_PATH` set to `/<repo-name>/` so asset URLs work under the Pages subpath.
  4. If you use a custom domain on Pages, set `BASE_PATH=/` in the workflow env.

- **Local preview of the Pages build**
  ```bash
  # replace <repo-name> with your repository name
  BASE_PATH="/<repo-name>/" npm run build
  npm run preview
  ```

- **Other hosts**
  - **Vercel / Netlify**: Build command `npm run build`, output folder `dist`. Keep `BASE_PATH=/` (default).
  - **Static file hosts / S3 + CloudFront**: Upload the `dist/` directory; no extra configuration needed as long as assets stay at the root.

## 📂 Project Structure

```
src/
├── components/
│   ├── Effects/      # Visual effects (NeuralBackground, Typewriter)
│   ├── Layout/       # Core layout (Navbar, Footer)
│   ├── Sections/     # Page sections (Hero, About, Projects, Contact)
│   └── UI/           # Reusable UI components
├── data/             # Static data (projects.js, skills.js)
├── hooks/            # Custom React hooks
├── App.jsx           # Main application layout
├── index.css         # Global styles & design system
└── main.jsx          # Entry point
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Contact

**Ahmed Mohamed** - AI/ML Engineer
- Email: [3bsalam0@gmail.com](mailto:3bsalam0@gmail.com)
- LinkedIn: [Ahmed Mohamed](https://linkedin.com/in/ahmed-mohamed)
- GitHub: [@3bsalam-1](https://github.com/3bsalam-1)
