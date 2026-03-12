# ⚡ Mini-Vite: Building a Build Tool from Scratch!

A fun, experimental project where I recreated the core mechanics of **Vite** to understand how it handles lightning-fast development under the hood. 

## What is this?
Vite revolutionized the frontend world by using **Native ES Modules (ESM)**. Instead of bundling everything upfront, it lets the browser do the heavy lifting. I built this "Mini-Vite" to peek behind the curtain and see how it works!

## Key Learnings & Features
*   **Native ESM Power:** Understood how browsers request modules via `import/export` without a heavy bundle.
*   **Custom Koa Server:** Built a dev server from scratch to intercept browser requests.
*   **Bare Module Resolution:** Learned why browsers can't find `import React from 'react'` and how to "rewrite" those paths to `/@modules/react`.
*   **On-the-fly JSX Transformation:** Integrated **Babel** to compile JSX into plain JavaScript in real-time before sending it to the browser.
*   **Dependency Optimization:** Faced the "CommonJS vs ESM" challenge and learned how tools like **esbuild** pre-bundle libraries for browser compatibility.
*   **CLI Development:** Used `yarn link` to create a globally executable command-line tool.

## Tech Stack
- **Node.js & Koa** (Server)
- **Babel** (JSX Transform)
- **Esbuild** (Dependency Pre-bundling)
- **Native ESM** (The Secret Sauce)

## How it Works
1. **Server:** A Koa server serves the `index.html`.
2. **Rewriting:** When the browser requests a `.js` or `.jsx` file, the server scans for "bare imports" (like `react`) and rewrites them to a path the server can handle (`/@modules/react`).
3. **Compiling:** Babel transforms JSX into `React.createElement` calls on-the-fly.
4. **Optimization:** Since many npm packages use CommonJS, **esbuild** pre-bundles them into ESM format and caches them in `node_modules/.mini-vite-cache`.

---
*Built with 💻 and ☕ by Meheraj from Earth! 🌍*
