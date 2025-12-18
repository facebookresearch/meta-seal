// Copyright (c) Meta Platforms, Inc. and affiliates. All rights reserved.
// Simple carousel navigation logic (horizontal scroll)
(function(){
  function updateButtons(container, prevBtn, nextBtn) {
    const scroller = container;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const atStart = scroller.scrollLeft <= 0;
    const atEnd = scroller.scrollLeft >= maxScroll - 1;
    prevBtn.style.opacity = atStart ? '0.3' : '1';
    prevBtn.style.cursor = atStart ? 'not-allowed' : 'pointer';
    prevBtn.disabled = atStart;
    nextBtn.style.opacity = atEnd ? '0.3' : '1';
    nextBtn.style.cursor = atEnd ? 'not-allowed' : 'pointer';
    nextBtn.disabled = atEnd;
  }

  function initCarousel() {
    const container = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    if (!container || !prevBtn || !nextBtn) return;

    const list = container.querySelector('.carousel-list');
    const firstCard = container.querySelector('.carousel-card');

    function getScrollAmount() {
      if (!firstCard) return container.clientWidth;
      const cardWidth = firstCard.getBoundingClientRect().width;
      let gap = 20;
      if (list) {
        const styles = getComputedStyle(list);
        const gapStr = styles.columnGap || styles.gap || '20px';
        const parsed = parseFloat(gapStr);
        if (!isNaN(parsed)) gap = parsed;
      }
      return cardWidth + gap;
    }

    function scrollByAmount(dir) {
      const amount = getScrollAmount();
      container.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', () => {
      if (!prevBtn.disabled) scrollByAmount(-1);
    });
    nextBtn.addEventListener('click', () => {
      if (!nextBtn.disabled) scrollByAmount(1);
    });
    container.addEventListener('scroll', () => updateButtons(container, prevBtn, nextBtn), { passive: true });
    window.addEventListener('resize', () => updateButtons(container, prevBtn, nextBtn));
    updateButtons(container, prevBtn, nextBtn);
  }

  window.addEventListener('load', initCarousel);
})();