# Soma — Personal Portfolio

A fully responsive, single-page personal portfolio built with plain HTML, CSS, and
JavaScript (no frameworks, no build step). It's designed to feel like a warm,
editorial magazine feature rather than a corporate résumé — communicating who
Soma is, her journey, and why she'd be a great addition to a team, all within
the first 30 seconds on the page.

## Folder structure

```
portfolio/
│
├── index.html
│
├── css/
│     ├── style.css         # Design tokens, layout, and every component's base styles
│     ├── animations.css    # Keyframes + scroll-reveal transition states
│     └── responsive.css    # Tablet / mobile / small-mobile media queries
│
├── js/
│     ├── script.js         # Mobile nav toggle, footer year
│     ├── scroll.js         # Sticky header, active-section nav highlight, smooth scroll, back-to-top
│     └── animations.js     # IntersectionObserver scroll-reveal for [data-reveal] elements
│
├── images/                 # Hand-crafted SVG illustrations (see below)
├── assets/                 # Downloadable files (resume.pdf)
└── README.md
```

## Running it

No build tools or dependencies are required. Either:

1. Open `index.html` directly in a browser, **or**
2. Serve it locally (recommended, so relative paths and `fetch`-based features behave
   identically to production):

   ```bash
   cd portfolio
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

## What you'll want to personalize

A few things were intentionally left as clearly-labeled placeholders because only
Soma has the real content:

| What | Where | How to update |
| --- | --- | --- |
| Professional portrait | `images/hero-portrait-placeholder.svg` | Add a real photo (e.g. `images/portrait.jpg`) and update the `src` on the `<img>` inside `.hero__portrait-frame` in `index.html`. Remove the `.hero__portrait-note` element once you do. |
| LinkedIn URL | `index.html` → Contact section | Replace the `href="#"` on the LinkedIn `<a>` with your profile URL. |
| Résumé file | `assets/resume.pdf` | Replace this placeholder PDF with your real résumé (keep the filename `resume.pdf`, or update the `href` in the Contact section). |
| Email address | Already wired to `mmajumder94@gmail.com` via `mailto:` links | Update both `mailto:` links in `index.html` if this changes. |
| Project links | `index.html` → Featured Work section | Each "View Project" button currently points to `#`; point them at live case studies or PDFs when ready. |
| Canonical URL / social preview | `<head>` of `index.html` | Update `og:` tags and `<link rel="canonical">` once the site has a real domain. |

## Design notes

- **Color palette**: warm cream background, terracotta/rust primary, sage green
  secondary, and a soft gold accent — defined as CSS custom properties at the
  top of `css/style.css` (`:root`) so the whole theme can be re-tuned from one place.
- **Typography**: [Fraunces](https://fonts.google.com/specimen/Fraunces) for
  display headings (editorial, warm serif) paired with
  [Inter](https://fonts.google.com/specimen/Inter) for body copy.
- **Layout**: CSS Grid for page sections (hero, timeline, feature cards, project
  cards) and Flexbox for in-line groups (nav, chips, buttons).
- **Illustrations**: every graphic in `images/` is an original hand-built SVG
  (organic hero blobs, a meditating-figure/lotus motif, an IT support monitor +
  gear, a report + award ribbon, and three feature/skill icons) so nothing is a
  broken stock-image link.
- **Motion**: sections and cards fade/slide into view via `IntersectionObserver`
  (`js/animations.js`) the first time they enter the viewport; hover states use
  CSS transitions only. Everything respects `prefers-reduced-motion`.
- **Navigation**: the header highlights the current section as you scroll
  (`js/scroll.js` observes each `<section>`), smooth-scrolls to anchors, and
  collapses into a hamburger menu below 780px.

## Accessibility & SEO

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) with a
  visually-hidden-until-focused skip link to `#main-content`.
- All meaningful images have descriptive `alt` text; purely decorative SVGs are
  marked `aria-hidden="true"`.
- Color contrast, focus-visible outlines, and reduced-motion support are built
  into `css/style.css`.
- Descriptive `<title>`, meta description, canonical link, and Open Graph tags
  live in `index.html`'s `<head>` for search and social sharing.
- All below-the-fold images use `loading="lazy"`.

## Browser support

Built with standard, widely-supported web platform features (CSS custom
properties, CSS Grid, `IntersectionObserver`). Tested against current versions
of Chrome, Firefox, and Safari, at desktop, tablet, and mobile widths.
