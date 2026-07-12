/**
 * script.js
 * General site interactivity: mobile navigation toggle and small
 * one-off UI wiring that doesn't belong in scroll.js or animations.js.
 */

(function () {
  'use strict';

  /* ---------- Mobile navigation toggle ---------- */
  function initNavToggle() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');

    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      var isOpen = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    }

    toggle.addEventListener('click', toggleMenu);

    // Close the menu whenever a nav link is chosen (mobile UX).
    menu.querySelectorAll('[data-nav-link]').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close the menu on Escape for keyboard users.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    // Close the menu if a click lands outside of it.
    document.addEventListener('click', function (event) {
      var isClickInside = menu.contains(event.target) || toggle.contains(event.target);
      if (!isClickInside) closeMenu();
    });
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNavToggle();
    initFooterYear();
  });
})();
