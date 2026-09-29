/* 50-tabs.js — ARIA tablist with roving tabindex. Panels are visible without
   JS; this hides inactive ones and wires keyboard behavior. */
(function (STC) {
  'use strict';

  function init() {
    STC.util.$$('[data-tabs]').forEach(setup);
  }

  function setup(list) {
    var tabs = STC.util.$$('[role="tab"]', list);
    if (!tabs.length) return;
    var panels = STC.util.$$('[role="tabpanel"]', list.parentNode || list);

    function select(index, moveFocus) {
      tabs.forEach(function (t, i) {
        var selected = i === index;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(function (p, i) { p.hidden = i !== index; });
      if (moveFocus) tabs[index].focus();
    }

    // Hide all but the first panel (JS-only; no-JS sees them all).
    panels.forEach(function (p, i) { if (i !== 0) p.hidden = true; });
    tabs[0].setAttribute('aria-selected', 'true');

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i); });
      tab.addEventListener('keydown', function (e) {
        var next;
        switch (e.key) {
          case 'ArrowRight': next = (i + 1) % tabs.length; break;
          case 'ArrowLeft': next = (i - 1 + tabs.length) % tabs.length; break;
          case 'Home': next = 0; break;
          case 'End': next = tabs.length - 1; break;
          default: return;
        }
        e.preventDefault();
        select(next, true); // automatic activation
      });
    });
  }

  STC.tabs = { init: init };
})(window.STC = window.STC || {});
