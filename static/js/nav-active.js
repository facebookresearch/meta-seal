// Copyright (c) Meta Platforms, Inc. and affiliates. All rights reserved.
// Highlight active nav item on scroll
(function(){
  function onScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100; // offset to trigger earlier
    let activeId = null;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeId = section.id;
      }
    });
    
    // Only update sticky sub-nav links
    const navLinks = document.querySelectorAll('.sticky-sub-nav a[href^="#"]');
    navLinks.forEach(link => {
      const hrefId = link.getAttribute('href').replace('#','');
      link.classList.toggle('active', hrefId === activeId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
})();