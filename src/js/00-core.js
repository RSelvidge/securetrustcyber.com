/* 00-core.js — namespace, media-query helpers, focus utils, bootstrap. */
(function (STC) {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var coarse = window.matchMedia('(pointer: coarse)');
  var desktop = window.matchMedia('(min-width: 64rem)');

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var FOCUSABLE =
    'a[href],button:not([disabled]),input:not([disabled]),' +
    'select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function focusables(root) {
    return $$(FOCUSABLE, root).filter(function (el) { return el.offsetParent !== null; });
  }

  STC.util = {
    reduceMotion: reduceMotion, coarse: coarse, desktop: desktop,
    $: $, $$: $$, focusables: focusables, FOCUSABLE: FOCUSABLE
  };

  document.addEventListener('DOMContentLoaded', function () {
    ['header', 'megaMenu', 'drawer', 'heroRotate', 'tabs', 'reveal', 'slider', 'toTop', 'forms']
      .forEach(function (name) {
        var mod = STC[name];
        if (mod && typeof mod.init === 'function') {
          try { mod.init(); }
          catch (err) { if (window.console) console.error('[STC] ' + name + ' failed', err); }
        }
      });
  });
})(window.STC = window.STC || {});
