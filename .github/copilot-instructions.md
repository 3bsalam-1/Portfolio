# GitHub Copilot / AI Agent Instructions

Purpose: Make AI coding agents productive in this small static portfolio site by describing the project architecture, key patterns, and actionable change recipes.

## Project at a glance

- Simple static site: core source is `index.html` with extracted assets in `assets/css/style.css` and `assets/js/main.js` (no build system, no package.json). Static assets (images) live in `img/` if present.
- Sections: `#home`, `#about`, `#projects`, `#contact` — navigation uses anchor links and smooth scrolling.
- Vanilla JS: animations, theme toggle, and project filtering are implemented with plain DOM APIs. CSS and JS are extracted to `assets/css/style.css` and `assets/js/main.js`.

## Project structure

- `index.html` — main markup and content
- `assets/css/style.css` — site styles (extracted from `index.html`)
- `assets/js/main.js` — interactivity and animations (loaded with `defer`)
- `img/` — optional static images
- `LICENSE` — MIT License

## Quick tasks (examples)

- Add a new featured project:
  - Add a `div.project-card` inside the `#projects .projects-grid`.
  - Set `data-category` to one of the existing categories (e.g., `ml`, `cv`, `api`, `nlp`, `rl`) so filtering works.
  - Include `project-image`, `project-info`, `project-tags`, and a link to the repo.

Example snippet (copy/paste and edit):

```html
<div class="project-card" data-category="ml">
  <div class="project-image">🏥</div>
  <div class="project-info">
    <div class="project-tags"><span class="tag">Healthcare</span></div>
    <h3>Project Title</h3>
    <p>Short description.</p>
    <div class="project-links">
      <a href="https://github.com/owner/repo" target="_blank">View Code →</a>
    </div>
  </div>
</div>
```

- Theme behavior: toggles `data-theme="light"` on `<body>` and updates the theme icon. Refer to `#themeToggle` and CSS rules keyed by `[data-theme="light"]` for variables like `--accent`.
- Neural background: animated canvas uses `id="neuralCanvas"` and a `Node` class; if you change animation size, update `initNodes()` on resize.
- Fallbacks: avatar image uses `onerror` to hide the remote image and show an emoji fallback — preserve fallback behavior for remote images.

## Local preview & dev guidance

- No build step. Open `index.html` directly in a browser, or serve from the repo root for proper relative paths:
  - Python: `python -m http.server 8000` (then open http://localhost:8000)
  - VS Code Live Server extension: open `index.html` and "Go Live".
- Test these flows when making changes: dark/light theme toggle, responsive breakpoints (<=768px), section animations (IntersectionObserver), and filter buttons.

## Conventions & patterns to preserve

- Keep CSS variables instead of hard-coded colors; use the `[data-theme="light"]` overrides for light-mode.
- JavaScript patterns are minimal and live in `assets/js/main.js` and are loaded with `defer`. When adding features, prefer small isolated functions and DOM listeners to match existing style.
- Project filtering relies on `data-filter` attributes on `.filter-btn` and `data-category` on `.project-card` — keep these attributes consistent.

## PR guidance for humans & agents

- Make small, focused PRs (site changes are easy to review visually). Include a screenshot and indicate `index.html` lines changed.

**Quick PR checklist:**

- ✅ Add one screenshot of the home page and one mobile-sized screenshot (≤768px).
- ✅ Verify theme toggle works (light/dark) and that the neural background renders.
- ✅ Check project filter buttons and at least one project card link.
- ✅ Confirm no console errors in browser devtools.

- If adding dependencies or tooling (build, linters, formatters), add `package.json` at repo root and document `README.md` with install/preview commands.

## Common pitfalls

- External images/avatars: preserve `onerror` fallback and `alt` attributes for accessibility.
- Links: external project links use `target="_blank"`. Prefer also adding `rel="noopener noreferrer"` for security when adding new external links.

## When in doubt

- Ask for clarification via an Issue or a draft PR before changing site-wide behaviors (theme, major layout changes, or replacing animations).

---

If anything here is unclear or you want more examples (e.g., a checklist for adding a project or standard PR template), tell me which part to expand and I'll update this file. ✅
