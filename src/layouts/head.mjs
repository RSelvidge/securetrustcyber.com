// src/layouts/head.mjs — document <head>: meta, OG, canonical, JSON-LD, css, no-js switch.

import { html, raw } from '../lib/html.mjs';
import { organization, webPage } from '../lib/schema.mjs';

export const head = (ctx, page) => html`
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.metaTitle ?? page.title}</title>
<meta name="description" content="${page.metaDescription ?? ctx.site.description}">
${page.noindex ? raw('<meta name="robots" content="noindex">') : ''}
<link rel="canonical" href="${ctx.site.origin}/${ctx.slug === '' ? '' : ctx.slug + '.html'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${ctx.site.name}">
<meta property="og:title" content="${page.metaTitle ?? page.title}">
<meta property="og:description" content="${page.metaDescription ?? ctx.site.description}">
<meta property="og:url" content="${ctx.site.origin}/${ctx.slug === '' ? '' : ctx.slug + '.html'}">
<meta property="og:image" content="${ctx.site.origin}/assets/img/og-default.svg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0A1A65">
<link rel="icon" href="${ctx.url.asset('favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${ctx.url.asset('css/style.css')}">
<script>document.documentElement.className=document.documentElement.className.replace('no-js','js');</script>
${organization(ctx)}
${webPage(ctx, page)}
${page.jsonLd ?? ''}
`;
