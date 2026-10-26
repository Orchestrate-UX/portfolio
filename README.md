# Portfolio

A static UX / Product Designer portfolio built with semantic HTML5, CSS3, and vanilla JavaScript. It has no dependencies or build step and can be deployed directly to GitHub Pages.

## Pages

- `index.html` — positioning, selected work, approach, capabilities, experience, and contact.
- `portfolio.html` — project index with accessible category filters.
- `case-study.html` — reusable case-study structure; duplicate it for each project.
- `case-study-ai-orchestration.html` — AI product experience case-study slot.
- `case-study-research.html` — research-led interaction case-study slot.
- `case-study-design-systems.html` — design systems case-study slot.

The project names, biography, contact details, outcome evidence, and artwork are editable placeholders. Replace them with verified information and approved imagery before publishing; do not use sample metrics or claims as real work.

## Updating a project

1. Copy `case-study.html` to a descriptive `case-study-<project-slug>.html` file.
2. Update the page title, description, social-preview metadata, breadcrumb, project facts, section copy, image paths, captions, and previous/next links.
3. Add the project to `portfolio.html` and, when appropriate, the featured-work list in `index.html`. Keep its category value in sync with the available filter buttons.
4. Use relative links and paths so the project works from a GitHub Pages project site. Add meaningful alt text to informative images; use empty alt text for purely decorative artwork.
5. Remove unsupported or confidential details. Include outcome metrics only when verified and shareable.

## Shared files and assets

- `assets/css/styles.css` — design tokens, responsive layout, reusable components, color schemes, focus styles, and motion rules.
- `assets/js/main.js` — mobile navigation, reveal enhancement, project filtering, case-study section indication, and footer year.
- `assets/img/` — favicon, social preview, portrait, and project-image placeholders. Replace placeholder artwork with optimized, approved media; preserve intrinsic dimensions and lazy-load below-the-fold images.

Set `og:image` to the absolute public URL for the social-preview asset after the deployed GitHub Pages URL is known. Internal page and asset links should remain relative.

## Preview and deployment

Preview locally with Python's built-in static server:

```sh
python3 -m http.server
```

Open the local address reported by the server. For GitHub Pages, publish the repository using the desired branch/folder or GitHub Actions static deployment setting. No server-side runtime or build process is required; `.nojekyll` is included.
