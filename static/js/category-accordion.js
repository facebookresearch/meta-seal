// Copyright (c) Meta Platforms, Inc. and affiliates. All rights reserved.
// Toggle category sections and additional papers accordion
(function(){
  window.toggleCategory = function(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.category-toggle');
    const isExpanded = content.classList.contains('expanded');

    if (isExpanded) {
      content.classList.remove('expanded');
      header.classList.add('collapsed');
      if (toggle) toggle.textContent = '+';
    } else {
      content.classList.add('expanded');
      header.classList.remove('collapsed');
      if (toggle) toggle.textContent = '−';
    }
  };

  window.toggleAdditionalPapers = function(button) {
    const additionalPapers = button.previousElementSibling;
    const isExpanded = additionalPapers.classList.contains('expanded');

    if (isExpanded) {
      additionalPapers.classList.remove('expanded');
      button.textContent = 'Show 2 more papers ↓';
    } else {
      additionalPapers.classList.add('expanded');
      button.textContent = 'Show fewer papers ↑';
    }
  };

  // Initialize accordion icons for expanded categories on load
  window.addEventListener('load', function() {
    document.querySelectorAll('.category-content.expanded').forEach(function(content) {
      const header = content.previousElementSibling;
      const toggle = header ? header.querySelector('.category-toggle') : null;
      if (toggle) toggle.textContent = '−';
    });
  });
})();