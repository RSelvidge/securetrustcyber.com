/* 70-slider.js — prev/next arrows for CSS scroll-snap sliders. The track is
   natively scrollable without JS; this only adds buttons. */
(function (STC) {
  'use strict';

  function init() {
    STC.util.$$('[data-slider]').forEach(function (wrap) {
      var track = STC.util.$('[data-slider-track]', wrap);
      var prev = STC.util.$('[data-slider-prev]', wrap);
      var next = STC.util.$('[data-slider-next]', wrap);
      if (!track) return;

      function step(dir) {
        var card = STC.util.$('> *', track);
        var amount = card ? card.getBoundingClientRect().width + 24 : track.clientWidth;
        track.scrollBy({ left: dir * amount, behavior: STC.util.reduceMotion.matches ? 'auto' : 'smooth' });
      }
      if (prev) prev.addEventListener('click', function () { step(-1); });
      if (next) next.addEventListener('click', function () { step(1); });
    });
  }

  STC.slider = { init: init };
})(window.STC = window.STC || {});
