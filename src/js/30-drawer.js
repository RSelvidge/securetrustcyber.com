/* 30-drawer.js — mobile navigation via <dialog> (focus trap + Escape free). */
(function (STC) {
  'use strict';

  function init() {
    var toggle = STC.util.$('[data-nav-toggle]');
    var drawer = STC.util.$('[data-drawer]');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', function () {
      if (drawer.open) drawer.close();
      else drawer.showModal();
    });

    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) drawer.close();
    });

    // Close when a real link is followed (keeps focus sensible).
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) drawer.close();
    });
  }

  STC.drawer = { init: init };
})(window.STC = window.STC || {});
