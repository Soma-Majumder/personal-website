/**
 * animations.js
 * Reveals elements tagged [data-reveal] as they enter the viewport,
 * using IntersectionObserver so nothing animates before it's needed.
 * Pairs with the base/visible states defined in css/animations.css.
 */

(function () {
  'use strict';

  function initRevealAnimations() {
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (revealEls.length === 0) return;

    // If IntersectionObserver isn't supported, just show everything.
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // Animate in once; no need to re-trigger.
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', initRevealAnimations);
})();
