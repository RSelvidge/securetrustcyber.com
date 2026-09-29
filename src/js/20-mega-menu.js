/* 20-mega-menu.js — full ARIA + keyboard contract for the mega-menu.
   No-JS fallback: panels are visible inline (see .js CSS gating). */
(function (STC) {
  'use strict';

  var OPEN_ATTR = 'data-mega-open';
  var openTimer = null;
  var closeTimer = null;

  function init() {
    var triggers = STC.util.$$('[data-mega-trigger]');
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      var id = trigger.getAttribute('data-mega-trigger');
      var panel = STC.util.$('[data-mega-panel="' + id + '"]');

      // Hover open/close with intent-delay.
      trigger.addEventListener('mouseenter', function () { scheduleOpen(id, 150); });
      trigger.addEventListener('mouseleave', function () { scheduleClose(250); });
      if (panel) {
        panel.addEventListener('mouseenter', cancelClose);
        panel.addEventListener('mouseleave', function () { scheduleClose(250); });
      }

      trigger.addEventListener('click', function (e) { e.preventDefault(); toggle(id); });

      trigger.addEventListener('keydown', function (e) { triggerKeys(e, trigger, id); });
      if (panel) panel.addEventListener('keydown', function (e) { panelKeys(e, id); });
    });

    // Click outside closes any open panel.
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) closeAll();
    });
    // Escape anywhere closes and returns focus to the trigger.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeAll(); }
    });
  }

  function scheduleOpen(id, ms) {
    cancelClose();
    openTimer = setTimeout(function () { open(id); }, ms);
  }
  function scheduleClose(ms) {
    clearTimeout(openTimer);
    closeTimer = setTimeout(closeAll, ms);
  }
  function cancelClose() { clearTimeout(closeTimer); }

  function toggle(id) {
    var trigger = STC.util.$('[data-mega-trigger="' + id + '"]');
    var panel = STC.util.$('[data-mega-panel="' + id + '"]');
    if (panel && !panel.hidden) { closeAll(); }
    else open(id, true);
  }

  function open(id, focusFirst) {
    closeAll();
    var trigger = STC.util.$('[data-mega-trigger="' + id + '"]');
    var panel = STC.util.$('[data-mega-panel="' + id + '"]');
    if (!trigger || !panel) return;
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    if (focusFirst) {
      var first = STC.util.$('a', panel);
      if (first) first.focus();
    }
  }

  function closeAll() {
    clearTimeout(openTimer); clearTimeout(closeTimer);
    var panels = STC.util.$$('[data-mega-panel]');
    panels.forEach(function (p) { p.hidden = true; });
    STC.util.$$('[data-mega-trigger]').forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
    });
  }

  function triggerKeys(e, trigger, id) {
    var triggers = STC.util.$$('[data-mega-trigger]');
    var idx = triggers.indexOf(trigger);
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault(); open(id, true); break;
      case 'ArrowRight':
        e.preventDefault();
        triggers[(idx + 1) % triggers.length].focus(); break;
      case 'ArrowLeft':
        e.preventDefault();
        triggers[(idx - 1 + triggers.length) % triggers.length].focus(); break;
      case 'Escape':
        e.preventDefault(); closeAll(); trigger.focus(); break;
    }
  }

  function panelKeys(e, id) {
    var panel = STC.util.$('[data-mega-panel="' + id + '"]');
    if (!panel) return;
    var links = STC.util.focusables(panel).filter(function (el) {
      return el.tagName === 'A';
    });
    var cols = STC.util.$$('.mega__col', panel);
    var idx = links.indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (idx < 0) links[0].focus();
        else links[(idx + 1) % links.length].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (idx <= 0) links[links.length - 1].focus();
        else links[idx - 1].focus();
        break;
      case 'Home':
        e.preventDefault(); links[0].focus(); break;
      case 'End':
        e.preventDefault(); links[links.length - 1].focus(); break;
      case 'ArrowRight':
      case 'ArrowLeft': {
        if (idx < 0) return;
        var col = cols.indexOf(document.activeElement.closest('.mega__col'));
        var dir = e.key === 'ArrowRight' ? 1 : -1;
        var next = cols[(col + dir + cols.length) % cols.length];
        var first = next && STC.util.$('a', next);
        if (first) { e.preventDefault(); first.focus(); }
        break;
      }
      case 'Tab':
        closeAll(); break;
      case 'Escape':
        e.preventDefault();
        closeAll();
        var trigger = STC.util.$('[data-mega-trigger="' + id + '"]');
        if (trigger) trigger.focus();
        break;
    }
  }

  STC.megaMenu = { init: init };
})(window.STC = window.STC || {});
