# Partner program saved for later

The partner program is paused. Its three complete page drafts remain in
`src/content/pages/partners.mjs`. Their registry entries, menu configuration,
and promotion remain in `src/site.registry.mjs`; homepage copy remains in
`src/content/pages/index.mjs` under `twoPath.partner`.

All three pages are marked `draft: true` in both content and registry. The build
excludes draft content entirely, so the pages are absent from `dist/` and the
XML sitemap. Navigation and the HTML sitemap omit empty groups. The header
utility link and homepage partner card have been removed.

To restore the program after reviewing its content and claims:

1. Remove the draft mapping from the export in `src/content/pages/partners.mjs`.
2. Remove `draft: true` from the three partner entries in `src/site.registry.mjs`.
3. Restore the header utility link and homepage partner card if desired.
4. Run `npm test` and `npm run build`, then review the pages before publishing.

The saved copy is a draft, including the previous example statistics and
program promises; review those when the program is ready.
