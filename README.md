# Kayla's Personal Website

A personal website for Kayla that also promotes her pet care / house sitting
business, built with Svelte + Vite. Same stack and conventions as
[`personal_website`](https://github.com/JamesFHoward/personal_website), with
Cypress for end-to-end tests.

## ⚠️ This is scaffolded with placeholder content

Everything works and deploys, but the copy, contact info, and photo are
**not real yet**. Search the project for bracketed text like
`[Placeholder — ...]` or replace these directly:

- `index.html` — page title, meta description, `og:`/`twitter:` tags, and the
  JSON-LD block (name, email)
- `src/App.svelte` — hero/about copy, service descriptions and rates, and the
  `mailto:` / `tel:` links in the Contact section
- `public/avatar.svg` — used only for the `og:image`/`twitter:image`/JSON-LD
  social-share preview; swap for a real photo
- `public/gallery/photo-1.svg` … `photo-10.svg` — the 10-tile hero collage
  (see below)
- `public/robots.txt`, `public/sitemap.xml`, `vite.config.js` (`base`) — only
  need changes if this ends up hosted somewhere other than
  `https://jamesfhoward.github.io/personal_website_kayla/`

### Real content already wired in

- **Business branding**: "Compassion in Action", pulled from Kayla's Rover
  profile.
- **Service area**: Bon Air, VA (from the Rover profile's location).
- **Rover profile link**: `https://www.rover.com/members/kayla-m-compassion-in-action/`
  — linked from the left panel and the Services section.

### Booking (Cal.com) — still needs a real link

The Booking section (`#booking` in `src/App.svelte`) has two CTAs pointing at
placeholder Cal.com URLs (`cal.com/PLACEHOLDER-replace-with-kaylas-username/...`).
Once Kayla has a Cal.com account:

1. Create two event types: a short **Meet & Greet** (e.g. 15 min, free) and a
   **Pet Care Visit** booking type for returning clients.
2. Replace both `href`s in the `#booking` section with her real Cal.com links.
3. Update the matching assertions in `cypress/e2e/smoke.cy.js` (the
   `'requires a Meet & Greet booking...'` test) if the link structure changes.

Cal.com can't technically enforce "Meet & Greet first" on its own — the site
handles that by making the Meet & Greet CTA primary/first and labeling the
second CTA "Returning Client? Book a Visit."

### Swapping in real photos

The left-panel hero is a 10-tile collage (`.photo-grid` in `src/App.svelte`),
rendered from a `{#each Array(10) as _, i}` loop over
`gallery/photo-1.svg` … `photo-10.svg`. To swap in real photos:

1. Drop real images into `public/gallery/`, named to match (e.g.
   `photo-1.jpg`), and update the `src` in the `{#each}` loop — or replace
   the loop with 10 explicit `<img>` tags if the photos need different alt
   text (e.g. individual pets' names) rather than the shared collage label.
2. The grid is a plain 5×2 CSS grid (`.photo-grid`/`.photo-tile` in the
   `<style>` block) — adjust `grid-template-columns`/`grid-template-rows`
   if you want a different tile count or mosaic shape.
3. Also update `public/avatar.svg`, which is used separately for the
   `og:image`/social-share preview (a single image, not the collage).

## Project Structure

```
personal_website_kayla/
├── .github/workflows/     # GitHub Actions: lint, build, e2e, deploy
├── cypress/e2e/           # Cypress end-to-end tests
├── public/                # Static assets (avatar, robots.txt, sitemap.xml)
├── src/
│   ├── App.svelte         # Main application component
│   ├── global.css         # Global styles
│   └── main.js             # Application entry point
├── index.html              # HTML template + SEO/meta tags
├── cypress.config.js
├── vite.config.js
└── package.json
```

## Local Development

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open http://localhost:4173/personal_website_kayla/.

## Testing

```bash
npm run lint     # ESLint + Prettier check
npm run e2e       # builds, serves, and runs the Cypress suite headlessly
npm run cy:open   # interactive Cypress runner (requires `npm run preview` running separately)
```

## Building & Deploying

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

Pushes to `main` run lint + build + e2e in CI and, if they pass, deploy
`dist/` to GitHub Pages via `.github/workflows/deploy.yml`. To enable this on
a fresh repo: **Settings → Pages → Source: "GitHub Actions"**.

## Content Updates

- **Text**: edit `src/App.svelte` directly — sections are `home`, `about`,
  `services`, `booking`, `contact`.
- **Styling**: component styles live in `src/App.svelte`'s `<style>` block;
  shared resets are in `src/global.css`.
- **New sections**: add an `id` to `sections` in the script block of
  `App.svelte`, then add matching nav buttons (desktop + mobile) and a
  `<section>`.
