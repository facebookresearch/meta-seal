// Copyright (c) Meta Platforms, Inc. and affiliates. All rights reserved.
// Handle research pill navigation and panels
(function(){
  function showPanelForPill(pillEl) {
    // Deactivate all pills
    document.querySelectorAll('.research-pill').forEach(p => p.classList.remove('active'));
    // Activate clicked pill
    pillEl.classList.add('active');
    // Hide all panels
    document.querySelectorAll('.research-panel').forEach(panel => panel.classList.remove('active'));
    // Show selected panel
    const id = pillEl.getAttribute('data-panel');
    const targetPanel = document.getElementById('panel-' + id);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  }

  window.initResearchTabs = function() {
    document.querySelectorAll('.research-pill').forEach(pill => {
      pill.addEventListener('click', () => showPanelForPill(pill));
    });
    // Ensure one panel is active on load
    const activePill = document.querySelector('.research-pill.active') || document.querySelector('.research-pill');
    if (activePill) showPanelForPill(activePill);
  };

  window.addEventListener('load', () => window.initResearchTabs());
})();