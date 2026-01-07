# GitHub Copilot / AI Agent Instructions

**Purpose:** Guide AI agents to be immediately productive in this React+Vite portfolio site that showcases AI/ML projects with glassmorphism design, theme switching, and interactive project filtering.

## Architecture Overview

- **Framework:** React 19 + Vite (module-based, fast HMR)
- **Entry:** `src/main.jsx` → `src/App.jsx` (theme state, global layout)
- **Key Patterns:** 
  - **One-way data flow:** `App.jsx` manages theme state → passes `theme` and `toggleTheme()` to `Navbar` → DOM updates via `data-theme` attribute
  - **Effect-driven:** `NeuralBackground`, `Navbar` use `useEffect()` for canvas/scroll listeners; scroll-based navbar styling, localStorage theme persistence
  - **Static data:** Projects/skills/certificates live in `src/data/` (decoupled from components)
  - **Framer Motion for animations:** Section reveals on `whileInView`, mobile menu transitions

## Core Subsystems

1. **Navbar** (`src/components/Layout/Navbar.jsx`): Logo with orbital animation, nav links, theme toggle (🌙→☀️), mobile hamburger with animated dropdown. Responds to scroll state for backdrop blur styling.

2. **Projects Section** (`src/components/Sections/Projects.jsx`): Filter buttons map to `categories` array, click updates `filter` state, projects array filters by `category` field. Horizontal scroll carousel with chevron buttons. Each card renders icon from `react-icons/fa`.

3. **NeuralBackground** (`src/components/Effects/NeuralBackground.jsx`): Canvas-based animated node network. Reads `theme` prop to adjust node color (gold opacity in dark, adjusted for light). **Critical:** resize handler updates canvas dimensions; if you change grid size, test on window resize.

4. **Theme System** (`src/index.css` + `App.jsx`): CSS variables (`:root` dark theme, `[data-theme="light"]` overrides). Stored in localStorage as `'theme'` key. Body attribute `data-theme="dark"|"light"` triggers cascade.

## File Organization

```
src/
├── App.jsx                    # Theme state, main layout scaffold
├── main.jsx                   # Vite entry, React.StrictMode
├── index.css                  # CSS variables (dark + light overrides)
├── App.css                    # Boilerplate (minimal—mostly unused)
├── components/
│   ├── Effects/
│   │   ├── NeuralBackground.jsx  # Canvas animation (theme-aware)
│   │   └── Typewriter.jsx        # Text animation (unused template)
│   ├── Layout/
│   │   ├── Navbar.jsx            # Navigation + theme toggle
│   │   └── Footer.jsx
│   └── Sections/
│       ├── Hero.jsx              # Intro section
│       ├── About.jsx             # Bio + skills
│       ├── Projects.jsx          # Filter + carousel
│       ├── Contact.jsx           # CTA section
│       └── Projects.css          # Project card styles
└── data/
    ├── projects.js        # Array of {id, title, category, icon, techStack, links}
    ├── skills.js
    └── certificates.js
```

## Common Tasks

**Add a new project:** Edit `src/data/projects.js`, add object with `id`, `title`, `category` (must match existing: `ml`/`rl`/`nlp`/`cv`/`api`), `icon` (from react-icons), `links.github`. Filtering auto-works.

**Update theme colors:** Edit `:root` CSS variables in `src/index.css` (dark) and `[data-theme="light"]` block (light). Accent colors are gold (`--accent-primary: #FFD369`). Test both theme modes.

**Modify neural background:** Edit `src/components/Effects/NeuralBackground.jsx`. `nodeCount`, `connectionDistance`, node colors are easily tweaked. **Always test on resize** (window.addEventListener calls `resizeCanvas()`).

**Add section animations:** Use Framer Motion's `motion` components with `initial`, `whileInView`, `viewport={{ once: true }}` pattern (see Projects.jsx). Pair with CSS transitions for smoothness.

## Build & Dev Workflow

```bash
npm install              # Install deps (Framer Motion, React Icons, React, Vite)
npm run dev              # Vite dev server @ http://localhost:5173
npm run build            # Build to dist/
npm run preview          # Preview build locally
npm run lint             # ESLint check
```

## Design System & Conventions

- **CSS Variables over hard-coded colors:** All colors are vars in `index.css`; theme switching works through `[data-theme]` selector.
- **Glassmorphism:** `--glass-bg`, `--glass-border`, `--glass-blur`, `--glass-shadow` are reusable; apply to containers for frosted-glass effect.
- **Responsive:** Mobile breakpoint ~768px. Use `mobile-only`/`desktop-only` classes in Navbar for responsive nav.
- **Icons:** React Icons (FaHeartbeat, FaMountain, etc.) for projects; FaSun/FaMoon for theme. Import only what you use.

## Critical Details

- **Avatar fallback:** Navbar uses remote GitHub avatar; if image fails, fallback shows emoji. Preserve `onerror` attribute.
- **Smooth scroll:** `html { scroll-behavior: smooth }` in `index.css`—anchor links auto-smooth (don't break with CSS resets).
- **LocalStorage:** Theme preference persists; `localStorage.getItem('theme')` checked on mount in `App.jsx`.
- **Mobile menu:** Hamburger toggle uses `AnimatePresence` + `motion.div` for exit animation. Click closes menu via `setIsOpen(false)`.
- **External links:** Use `target="_blank" rel="noopener noreferrer"` for security.

## Testing Checklist (Before Commit)

- ✅ Theme toggle works (icon changes, colors update instantly, localStorage persists on reload).
- ✅ Neural background animates smoothly; test on resize (shrink window).
- ✅ Project filter buttons toggle active state; carousel scrolls.
- ✅ Navbar responds to scroll (backdrop blur applied after 50px).
- ✅ Mobile menu opens/closes without animation glitches.
- ✅ No console errors (check DevTools).
- ✅ Links open in new tabs (`target="_blank"`).

## When in Doubt

- Check `src/App.jsx` for state flow and theme pattern.
- CSS patterns are in `src/index.css` (vars) and component `.css` files.
- Data sources are `src/data/projects.js`, etc.—edit there, not in components.
- Use Framer Motion `motion.*` components for animations, avoid CSS keyframes for page reveals.
- Preserve the folder structure; don't reorganize without discussion.
