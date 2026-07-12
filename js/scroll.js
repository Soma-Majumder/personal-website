/**
 * scroll.js
 * Handles everything tied to the user scrolling the page:
 *  - Sticky header background once the page has scrolled.
 *  - Highlighting the active nav link based on which section is in view.
 *  - Showing/hiding the "back to top" button and scrolling to top on click.
 */

(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var backToTop = document.getElementById('backToTop');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav-link]'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  var SCROLL_THRESHOLD = 24;

  /* ---------- Sticky header state ---------- */
  function updateHeaderState() {
    if (!header) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  /* ---------- Back-to-top button ---------- */
  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
  }

  function bindBackToTop() {
    if (!backToTop) return;
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Active nav link highlighting ---------- */
  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isMatch = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function initSectionObserver() {
    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-45% 0px -50% 0px', // Treat the vertical center of the viewport as "active".
        threshold: 0,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- Smooth-scroll fallback for browsers/edge cases ---------- */
  function initSmoothScrollLinks() {
    navLinks.concat(Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]'))).forEach(function (link) {
      link.addEventListener('click', function (event) {
        var targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        var headerOffset = document.getElementById('site-header') ? document.getElementById('site-header').offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset + 1;

        window.scrollTo({ top: top, behavior: 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  function onScroll() {
    updateHeaderState();
    updateBackToTop();
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateHeaderState();
    updateBackToTop();
    bindBackToTop();
    initSectionObserver();
    initSmoothScrollLinks();
    window.addEventListener('scroll', onScroll, { passive: true });
  });
})();
