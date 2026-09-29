// src/lib/nav-model.mjs — projects the registry into the mega-menu and footer.
// Both views derive from the same PAGES list, so a link can never exist in one
// and not the other.

import { PAGES, MENUS, FOOTER_GROUPS, COLUMN_TITLES, PROMOS, LEGAL_LINKS } from '../site.registry.mjs';

const live = () => PAGES.filter((p) => !p.draft);

const toLink = (p) => ({ slug: p.slug, title: p.title, blurb: p.blurb ?? '', icon: p.icon ?? null });

/** Mega-menu model: 5 menus, each with ordered columns and an optional promo. */
export function navModel() {
  return MENUS.map((menu) => {
    const items = live().filter((p) => p.mega?.menu === menu.id);
    const colCount = Math.max(0, ...items.map((i) => i.mega.col)) + 1;

    const columns = Array.from({ length: colCount }, (_, i) => ({
      index: i,
      title: (COLUMN_TITLES[menu.id] ?? [])[i] ?? '',
      items: items
        .filter((x) => x.mega.col === i)
        .sort((a, b) => a.order - b.order)
        .map(toLink),
    })).filter((c) => c.items.length > 0);

    return { ...menu, columns, promo: PROMOS[menu.id] ?? null };
  });
}

/** Footer model: 4 columns derived from the same registry, different selector. */
export function footerModel() {
  return FOOTER_GROUPS.map((g) => ({
    id: g.id,
    title: g.title,
    items: live()
      .filter((p) => p.footer === g.id)
      .sort((a, b) => a.order - b.order)
      .slice(0, 8)
      .map(toLink),
  }));
}

export function legalLinks() {
  return LEGAL_LINKS.map((slug) => {
    const p = PAGES.find((x) => x.slug === slug);
    return { slug, title: p ? p.title : slug };
  });
}

/** Resolve a slug to its registry title (for breadcrumbs / related rails). */
export function titleFor(slug) {
  return PAGES.find((p) => p.slug === slug)?.title ?? slug;
}
