/* 40-hero-rotate.js — cross-fade rotating headline phrases. Disabled under
   reduced motion (only the first phrase shows). */
(function (STC) {
  'use strict';

  function init() {
    var root = STC.util.$('[data-hero-rotate]');
    if (!root) return;
    if (STC.util.reduceMotion.matches) return;

    var items = STC.util.$$('.hero__rotate-item', root);
    if (items.length < 2) return;

    var i = 0;
    setInterval(function () {
      items[i].classList.remove('is-active');
      i = (i + 1) % items.length;
      items[i].classList.add('is-active');
    }, 3200);
  }

  STC.heroRotate = { init: init };
})(window.STC = window.STC || {});
