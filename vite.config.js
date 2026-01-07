import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // When deploying under a subpath (e.g. GitHub Pages at /repo-name/),
  // set BASE_PATH to that path so asset URLs are generated correctly.
  base: process.env.BASE_PATH || '/',
})
