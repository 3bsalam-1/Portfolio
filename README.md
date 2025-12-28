# Ahmed Mohamed — Portfolio

Professional static portfolio showcasing AI/ML projects and skills.

## 🚀 Overview
A minimalist, single-page static site built with semantic HTML, plain CSS, and vanilla JavaScript. It highlights selected projects (ML, CV, RL, APIs) and includes a neural-canvas background, theme toggle, and client-side project filtering.

## 🔧 Features
- Clean single-page layout: `index.html` (content) + `assets/css/style.css` (styles) + `assets/js/main.js` (behavior)
- Project filtering powered by `data-filter` / `data-category` attributes
- Neural animated background rendered to a `<canvas id="neuralCanvas">`
- Light/dark theme via `data-theme="light"` and `#themeToggle`
- Favicon support (`img/favicon.png`)

## 📁 Project structure
- `index.html` — main markup and content
- `assets/css/style.css` — extracted site styles
- `assets/js/main.js` — interactivity and animations (loaded with `defer`)
- `img/` — static images (avatar, favicon)
- `.github/copilot-instructions.md` — agent guidance for helpers and bots
- `LICENSE` — MIT License

## ▶️ Quick start (local preview)
Open `index.html` in your browser or serve the repo root for correct relative paths:

- Python: `python -m http.server 8000` (visit http://localhost:8000)
- VS Code Live Server: open `index.html` and click **Go Live**

Check flows after changes: theme toggle, neural animation, filter buttons, and responsive behavior (≤768px).

## ✍️ How to add or update a featured project
1. Edit `index.html` and add a `div.project-card` inside `#projects .projects-grid`.
2. Set `data-category` to one of: `ml`, `cv`, `rl`, `api`, `nlp`.
3. Include `project-image`, `project-info`, `project-tags`, and a `project-link`.

Example snippet:

```html
<div class="project-card" data-category="ml">
  <div class="project-image">🏥</div>
  <div class="project-info">
    <div class="project-tags"><span class="tag">Healthcare</span></div>
    <h3>Project Title</h3>
    <p>Short description.</p>
    <div class="project-links"><a href="https://github.com/owner/repo" target="_blank" rel="noopener noreferrer">View Code →</a></div>
  </div>
</div>
```

## ✅ PR checklist (visual & functional)
- Add a full-size screenshot + a mobile screenshot (≤768px)
- Verify theme toggle (light & dark) and neural canvas render correctly
- Confirm project filters work and links open in a new tab (use `rel="noopener noreferrer"`)
- No console errors in browser devtools

## ⚖️ License
This repository is licensed under the MIT License — see the `LICENSE` file for details.

## 💬 Contact
Author: Ahmed Mohamed — `3bsalam0@gmail.com`

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Ahmed Abdulsalam

</div>