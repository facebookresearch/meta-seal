// Copyright (c) Meta Platforms, Inc. and affiliates. All rights reserved.
// ANIMATED TYPEWRITER WITH FALLING BITS

// --- SETTINGS ---
const TYPE_SPEED_MIN = 60; 
const TYPE_SPEED_MAX = 100;
const RESTART_DELAY = 5000;

// --- THE SCRIPT TO TYPE ---
const pythonScript = [
  // Line 1: Import
  { text: "import ", class: "py-def" },
  { text: "videoseal\n\n", class: "py-cls" },

  // Line 2: Comment
  { text: "# 1. Load Model (handles both embed & detect)\n", class: "py-comment" },
  
  // Line 3: Model Load - with special animation marker
  { text: "model", class: "py-var" },
  { text: " = ", class: "py-op" },
  { text: "videoseal", class: "py-cls" },
  { text: ".", class: "py-op" },
  { text: "load", class: "py-func" },
  { text: "(", class: "py-op" },
  { text: "\"", class: "py-str" },
  { text: "pixelseal", class: "py-str", animate: "backspace-rewrite" }, // Special animation
  { text: "\"", class: "py-str" },
  { text: ")\n\n", class: "py-op" },

  // Line 4: Comment
  { text: "# 2. Embed\n", class: "py-comment" },

  // Line 5: Embed
  { text: "watermarked_video", class: "py-var" },
  { text: " = ", class: "py-op" },
  { text: "model", class: "py-var" },
  { text: ".", class: "py-op" },
  { text: "embed", class: "py-func" },
  { text: "(", class: "py-op" },
  { text: "input_video", class: "py-var" },
  { text: ")\n\n", class: "py-op" },

  // Line 6: Comment
  { text: "# 3. Detect Watermark\n", class: "py-comment" },

  // Line 7: Detection
  { text: "detected", class: "py-var" },
  { text: " = ", class: "py-op" },
  { text: "model", class: "py-var" },
  { text: ".", class: "py-op" },
  { text: "detect", class: "py-func" },
  { text: "(", class: "py-op" },
  { text: "watermarked_video", class: "py-var" },
  { text: ")\n", class: "py-op" },

  // Line 8: Get bits
  { text: "bits", class: "py-var" },
  { text: " = ", class: "py-op" },
  { text: "detected", class: "py-var" },
  { text: "[", class: "py-op" },
  { text: "\"preds\"", class: "py-str" },
  { text: "]", class: "py-op" },
  { text: "  ", class: "py-op" },
  { text: "# detection bits", class: "py-comment" }
];

// --- TYPING ENGINE ---
async function typeWriter() {
  const codeContainer = document.getElementById('code-display');
  const terminalWindow = document.getElementById('terminal-window');
  
  if (!codeContainer || !terminalWindow) {
    setTimeout(typeWriter, 1000);
    return;
  }
  
  // Clear everything except the cursor
  codeContainer.innerHTML = '';
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'cursor';
  cursorSpan.id = 'cursor';
  codeContainer.appendChild(cursorSpan);

  for (const segment of pythonScript) {
    const span = document.createElement('span');
    span.className = segment.class;
    codeContainer.insertBefore(span, cursorSpan);

    if (segment.animate === 'backspace-rewrite') {
      for (const char of segment.text) {
        span.textContent += char;
        const delay = Math.random() * (TYPE_SPEED_MAX - TYPE_SPEED_MIN) + TYPE_SPEED_MIN;
        await new Promise(r => setTimeout(r, delay));
      }
      await new Promise(r => setTimeout(r, 500));
      for (let i = 0; i < 10; i++) { // pixelseal
        span.textContent = span.textContent.slice(0, -1);
        await new Promise(r => setTimeout(r, 50));
      }
      for (const char of 'chunkyseal') {
        span.textContent += char;
        const delay = Math.random() * (TYPE_SPEED_MAX - TYPE_SPEED_MIN) + TYPE_SPEED_MIN;
        await new Promise(r => setTimeout(r, delay));
      }
      await new Promise(r => setTimeout(r, 500));
      for (let i = 0; i < 11; i++) { // chunkyseal
        span.textContent = span.textContent.slice(0, -1);
        await new Promise(r => setTimeout(r, 50));
      }
      for (const char of 'videoseal') {
        span.textContent += char;
        const delay = Math.random() * (TYPE_SPEED_MAX - TYPE_SPEED_MIN) + TYPE_SPEED_MIN;
        await new Promise(r => setTimeout(r, delay));
      }
    } else {
      for (const char of segment.text) {
        span.textContent += char;
        const delay = Math.random() * (TYPE_SPEED_MAX - TYPE_SPEED_MIN) + TYPE_SPEED_MIN;
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }

  spawnBits();
  setTimeout(typeWriter, RESTART_DELAY);
}

// --- BITS ANIMATION ---
function spawnBits() {
  const bitsLayer = document.getElementById('bits-layer');
  const terminalWindow = document.getElementById('terminal-window');
  if (!bitsLayer || !terminalWindow) return;

  const width = terminalWindow.offsetWidth;
  const height = terminalWindow.offsetHeight;

  for (let i = 0; i < 50; i++) {
    const bit = document.createElement('div');
    bit.classList.add('bit');
    bit.innerText = Math.random() > 0.5 ? '1' : '0';

    const randomLeft = Math.random() * (width - 20) + 10; 
    bit.style.left = `${randomLeft}px`;
    bit.style.top = `160px`;

    bitsLayer.appendChild(bit);

    const duration = Math.random() * 2000 + 2000;
    const delay = Math.random() * 500;

    const anim = bit.animate([
      { transform: 'translateY(0)', opacity: 0 },
      { transform: 'translateY(20px)', opacity: 1, offset: 0.1 }, 
      { transform: `translateY(${height - 100}px)`, opacity: 0 }
    ], {
      duration,
      delay,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    anim.onfinish = () => bit.remove();
  }
}

// Expose for init file
window.typeWriter = typeWriter;
window.spawnBits = spawnBits;