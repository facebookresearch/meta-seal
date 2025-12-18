// Copyright (c) Meta Platforms, Inc. and affiliates. All rights reserved.
/* lazy-videos.js
   Lazy-loads videos using IntersectionObserver.
   - Looks for <video> elements with a `data-src` attribute or <source data-src>
   - Sets the real `src` from `data-src`, calls load(), plays when visible, pauses when not
   - Keeps memory/decoding low by using preload="none" and posters
*/
(function() {
  'use strict';

  function onIntersect(entries) {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        if (!v.dataset.loaded) {
          const srcEl = v.querySelector('source[data-src]');
          if (srcEl) {
            srcEl.src = srcEl.dataset.src;
          } else if (v.dataset.src) {
            v.src = v.dataset.src;
          }
          try { v.load(); } catch (e) {}
          v.dataset.loaded = 'true';
        }
        // ensure muted for autoplay policies
        try { v.muted = true; } catch (e) {}
        const p = v.play && v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        try { v.pause(); } catch (e) {}
      }
    });
  }

  function initLazyVideos() {
    const vids = Array.from(document.querySelectorAll('video'));
    if (!('IntersectionObserver' in window) || vids.length === 0) return;

    const io = new IntersectionObserver(onIntersect, { root: null, rootMargin: '200px', threshold: 0.25 });
    vids.forEach(v => {
      if (v.dataset.src || v.querySelector('source[data-src]')) io.observe(v);
    });
  }

  // Auto-init on DOMContentLoaded if possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyVideos);
  } else {
    // document already ready
    setTimeout(initLazyVideos, 0);
  }

  // expose for manual usage/tests
  window.initLazyVideos = initLazyVideos;
})();
