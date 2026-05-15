# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (localhost:3000)
npm run build      # production build (SSR via Nitro)
npm run generate   # static site generation
npm run preview    # preview production build locally
```

No linter or test suite is configured — there are no lint or test commands.

## Architecture

**Nuxt 3** app deployed to **Netlify** (`netlify.toml`). The `dist/` folder is a symlink to `.output/public/`. Blog content is fetched from **Contentful** via `API_URL` (set in `netlify.toml`; no local env needed for calc pages).

### Page structure

Every calculator lives at `pages/{category}/{calc-name}/index.vue`. Categories: `fitness`, `math`, `finance`, `other`, `unit`. Each page:

1. Uses `layout: 'brutalist'` — declared with `definePageMeta({ layout: 'brutalist' })`
2. Wraps content in `<UiCalcPage>` with `title`, `category`, and optional `description-title` props
3. Calls `useCalcSEO(title, description, faqs)` in `<script setup>` — this sets `<head>` meta, canonical, and emits three JSON-LD schemas: `WebApplication`, `BreadcrumbList`, and `FAQPage`

### UiCalcPage slots

`components/ui/CalcPage.vue` is the main layout shell for every calculator page. Available named slots:

| Slot | Purpose |
|---|---|
| `#calc` | The interactive calculator component |
| `#facts` | Sidebar stat chips (`<CalcFact>`) |
| `#description` | Prose content in the "About this tool" card |
| `#example` | Worked example (rendered under an `<h2>Example</h2>` inside description card) |
| `#faq` | FAQ accordion — place `<CalcFaq :faqs="faqs" />` here |

### Calculator components

The actual calculation UI lives in `components/calculators/{category}/`. Nuxt auto-imports them as `<Calculators{Category}{Name}/>`. Example: `components/calculators/fitness/BmiCalc.vue` → `<CalculatorsFitnessBmiCalc />`.

### SEO pattern — every calc page follows this

```js
const faqs = [
    { q: "Question text", a: "Answer text — may contain <a href=\"/path\">HTML links</a>." },
    // 10–14 entries: mix of high-traffic questions and long-tail low-competition ones
]

useCalcSEO("Page Title — Subtitle", "Meta description.", faqs)
```

The `faqs` const is shared between `useCalcSEO` (JSON-LD schema) and `<CalcFaq :faqs="faqs" />` (visible accordion). FAQ answers support HTML via `v-html` in `CalcFaq.vue` — use plain `<a href>` tags (not `<NuxtLink>`) for internal links inside answers.

### Key composables

- `composables/useCalcSEO.js` — sets all head tags + three JSON-LD schemas for every calculator
- `composables/useCategoryConfig.js` — single source of truth for category metadata and tool lists; drives the sidebar navigation in every `UiCalcPage`
- `composables/useUnit.js` — global metric/imperial toggle state shared across all calculators

### Adding a new calculator

1. Create `pages/{category}/{calc-name}/index.vue` following the pattern above
2. Create the calc component in `components/calculators/{category}/`
3. Add the route to `composables/useCategoryConfig.js` under the correct category's `tools` array
4. Add the URL to `server/routes/sitemap.xml.ts` static URL list

### Design system

Brutalist theme. Key Tailwind tokens:
- `bg-brut` / `text-brut` = `#0a0a0a` (near-black)
- `lavender` = `#ddd6ff` (primary accent)
- `yellow` / `bg-brut-yellow` = `#f5e642`
- `font-mono` = Space Mono, `font-grotesk` = Space Grotesk
- `border-brut` = 3px solid `#0a0a0a`
- `shadow-brut` = `5px 5px 0 #0a0a0a`
- Breakpoints: `tablet` (max 1199px), `mobile` (max 767px)

### Sitemap

`server/routes/sitemap.xml.ts` is a hand-maintained server route — it is **not** auto-generated. When adding a new calculator, add its URL manually to the `staticUrls` array in that file.
