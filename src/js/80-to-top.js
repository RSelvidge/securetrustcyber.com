/* 80-to-top.js — reveal the back-to-top button after scrolling. */
(function (STC) {
  'use strict';

  function init() {
    var btn = STC.util.$('[data-to-top]');
    if (!btn) return;

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: STC.util.reduceMotion.matches ? 'auto' : 'smooth' });
    });

    if (!('IntersectionObserver' in window)) { btn.hidden = false; return; }
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:600px;height:1px;width:1px;';
    document.body.appendChild(sentinel);

    var io = new IntersectionObserver(function (entries) {
      btn.hidden = entries[0].isIntersecting;
    });
    io.observe(sentinel);
  }

  STC.toTop = { init: init };
})(window.STC = window.STC || {});
