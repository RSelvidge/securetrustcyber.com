/* 60-reveal.js — scroll-triggered reveals via IntersectionObserver. */
(function (STC) {
  'use strict';

  function init() {
    var els = STC.util.$$('.reveal');
    if (!els.length) return;

    if (STC.util.reduceMotion.matches || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target); // fire once, then disconnect
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  STC.reveal = { init: init };
})(window.STC = window.STC || {});
