// src/layouts/base.mjs — the document skeleton: doctype, head, chrome, main, scripts.

import { html } from '../lib/html.mjs';
import { head } from './head.mjs';
import { header } from './partials/header.mjs';
import { mobileDrawer } from './partials/mobile-drawer.mjs';
import { footer } from './partials/footer.mjs';

export const base = (ctx, page, body) => html`<!doctype html>
<html lang="en" class="no-js" data-page="${ctx.slug || 'home'}" data-type="${page.type}">
<head>${head(ctx, page)}</head>
<body class="page page--${page.type}">
  <a class="skip-link" href="#main">Skip to main content</a>
  ${header(ctx)}
  ${mobileDrawer(ctx)}
  <main id="main" tabindex="-1" class="site-main">${body}</main>
  ${footer(ctx)}
  <button class="to-top" type="button" data-to-top aria-label="Back to top" hidden>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 19V5M5 12l7-7 7 7"/></svg>
  </button>
  <script src="${ctx.url.asset('js/main.js')}" defer></script>
</body>
</html>`;
