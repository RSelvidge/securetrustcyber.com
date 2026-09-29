// src/lib/blocks.mjs — block-stack renderer. A page's `blocks` array is rendered
// in order. Each block may be a function (called with ctx), a custom {kind,render},
// a string, or a pre-rendered html fragment.

import { html, raw, join } from './html.mjs';

export const blocks = (ctx, list) =>
  join(
    (list ?? []).map((b) => {
      if (!b) return '';
      if (typeof b === 'function') return b(ctx);
      if (b.kind === 'custom' && typeof b.render === 'function') return b.render(ctx);
      if (typeof b === 'string') return b;
      if (b && b.markup) return b.markup;
      return raw(String(b));
    })
  );

export { html };
