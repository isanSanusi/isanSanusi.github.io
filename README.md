# Shadyans Portfolio — modular vanilla refactor

This is a maintainable, framework-free refactor inspired by the supplied `Isansanusi-Portfolio-V2-Premium.html` file. It uses plain HTML, CSS, and JavaScript ES modules; it does not load React or a CSS framework.

## Run locally

Because the JavaScript uses ES modules, open this folder with VS Code and run `index.html` with the **Live Server** extension (or any local static HTTP server). Do not open it directly with `file://`.

## Main files

- `index.html` — document shell and shared dialogs.
- `css/variables.css` — theme tokens and colors.
- `css/base.css` — typography, defaults, shared utilities.
- `css/layout.css` — page layout, cards, dialogs, footer, forms.
- `css/components.css` — small reusable visual components.
- `css/responsive.css` — tablet/mobile behavior.
- `js/data/profile.js` — name, contact links, experience, education, skills.
- `js/data/projects.js` — all 9 project entries and their case-study text.
- `js/data/journal.js` — the 4 journal entries.
- `js/components/` — project card, case-study detail, navigation.
- `js/modules/theme.js` — persistent light/dark mode.
- `js/main.js` — hash navigation, page rendering, filters/search/sort, dialogs, contact form.

## Add a screenshot to a project

1. Put a screenshot into `assets/images/`, preferably optimized WebP or PNG.
2. Open `js/data/projects.js` and find the project object.
3. Set `image` to the relative path and update `imageAlt`.
4. Set `imageFit: 'cover'` to fill the thumbnail (may crop edges), or `imageFit: 'contain'` to show the full screenshot (may leave space around it).

Example:

```js
{
  id: 'p8',
  title: 'Inventory MS — React + Express',
  image: 'assets/images/inventory-dashboard.webp',
  imageAlt: 'Inventory dashboard with stock summary cards',
  imageFit: 'contain'
}
```

The `image` field is currently empty for each project because no screenshot assets were supplied. Until you add one, the category-based thumbnail appears automatically. The source project data did not include image screenshots, so none have been invented or embedded.

## Edit your portfolio

- Change profile/contact info in `js/data/profile.js`.
- Add or edit project objects in `js/data/projects.js`. Required useful fields: `id`, `slug`, `title`, `category`, `description`, `year`, `tags`, `tools`. For a full case study, also set `longDescription`, `goal`, `problem`, `process`, and `result`.
- Add or edit journal entries in `js/data/journal.js`.
- Change the visual system in `css/variables.css` first; most component colors use those tokens.
- Update real project demo/repository URLs in the project data. Blank links and `#` placeholders are intentionally not shown as working buttons.

## Features in this refactor

- Responsive home, portfolio, journal, about, and contact pages.
- Hash-based navigation, project/article detail dialogs.
- Portfolio category filters, search, and sorting.
- Light/dark theme toggle (saved in local storage).
- Contact form that prepares a `mailto:` message; it has no backend and does not send anything by itself.
- Screenshot thumbnails with automatic visual fallback.

## Note about fidelity

The supplied HTML was a compiled React bundle, rather than the original readable component source. This deliverable preserves the portfolio's identifiable project/journal/profile content and core interactions in a fresh, modular vanilla implementation. It is a maintainable refactor/rebuild, not a byte-for-byte or pixel-perfect conversion of every original React detail. Review the copy and replace any old placeholder social links, project metrics, or claims that no longer reflect your current work before publishing.
