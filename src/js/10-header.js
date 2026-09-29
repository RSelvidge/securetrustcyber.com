/* 10-header.js — sticky header solid-on-scroll via IntersectionObserver sentinel. */
(function (STC) {
  'use strict';

  function init() {
    var header = STC.util.$('.site-header');
    if (!header) return;

    // Sentinel sits just above the header; when it scrolls out of view, the
    // header gains .is-stuck. Works whether or not the header starts transparent.
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
    if (header.parentNode) header.parentNode.insertBefore(sentinel, header);

    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { threshold: 0 });
    io.observe(sentinel);
  }

  STC.header = { init: init };
})(window.STC = window.STC || {});
