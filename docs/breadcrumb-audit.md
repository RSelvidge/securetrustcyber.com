# Breadcrumb audit — September 30, 2026

Passed across all 81 generated pages: 80 inner pages have breadcrumbs; the homepage has no redundant trail.

- Ancestors link to existing overview pages. Resources and Partners resolve to their directory index pages; industry, compliance, and comparison pages return to Solutions. Structural folders without a page are skipped.
- Current labels use content titles, preserving acronyms and avoiding “Index” labels. Only the final item has `aria-current="page"`.
- Breadcrumb JSON-LD includes Home, has sequential positions, matches visible labels, and points to each actual page URL.
- Demo booking, 404, and style-guide pages now include breadcrumbs.
- The full build validates breadcrumb presence, ancestor links, current labels, and metadata. Six regression tests pass via `npm test`.
- Chrome visited every generated page. Breadcrumb alignment and horizontal-overflow checks passed on all 81 pages. Actual clicks verified IPS → All Products, Product Demos → Resources, and Resources → Home.

Per-page browser evidence is in [breadcrumb-browser-audit.json](breadcrumb-browser-audit.json). Validation applies to the local build; publishing was not part of this change.
