# RCB Fan Hub Overhaul Implementation Plan

This plan details the resolution for all 19 priority tasks requested to improve the RCB Fan Hub website.

## Proposed Changes

### Priority 1: Bugs to Fix
- **Hero Image:** Add a strong linear-gradient fallback `linear-gradient(135deg, #000000 0%, #C8102E 100%)` in `style.css` for the `.hero` section to ensure RCB colors display perfectly even if the background image fails.
- **News Image:** Verify `newsArticles` array in `script.js` and add a placeholder image fallback (`onerror="this.src='fallback.jpg'"`) for all injected images.
- **Schedule Table:** The table `<tbody>` currently relies entirely on JS rendering. To guarantee data is visible, I will hardcode the 5 initial sample match entries directly into the `index.html` `<tbody>` so it renders immediately before JS executes.
- **Top 5 Stats:** Create new HTML sections for "Top 5 Run-Scorers" and "Top 5 Wicket-Takers" with hardcoded player statistics, replacing or supplementing the empty state.

### Priority 2: UI/Design Improvements
- **Google Fonts:** Import `Bebas Neue` and `Inter` via Google Fonts in `index.html`. Update CSS variables `--font-heading` to `Bebas Neue` and `--font-body` to `Inter`.
- **Brand Colors:** Standardize CSS variables:
  - `--rcb-red: #C8102E;`
  - `--gold: #F5A623;`
  - `--bg-dark: #000000;`
- **Hero Animation:** Add a `@keyframes typewriter` and `fade-in` animation to the main `<h1>` "PLAY BOLD. WE ARE THE CHAMPIONS." in `style.css`.
- **Player Card Flip:** Modify the squad rendering in `script.js` to output a 3D flip-card structure (`.card-inner`, `.card-front`, `.card-back`). Add `transform-style: preserve-3d` and `rotateY(180deg)` CSS rules for the hover state.
- **CSS Bar Charts:** Implement the Top 5 Run/Wicket stats using pure CSS widths (`<div class="bar" style="width: 80%">`) instead of relying solely on Chart.js, ensuring smooth `transition: width` animations.
- **Ticker Pause:** Add `.ticker-content:hover { animation-play-state: paused; }` to `style.css`.

### Priority 3: Responsiveness
- **Hamburger Menu:** Add a `<button class="mobile-toggle">☰</button>` to the navbar. Add CSS media queries (`max-width: 768px`) to hide the nav links by default and show them when toggled.
- **Table Wrapper:** Wrap all `<table>` elements in `index.html` with `<div style="overflow-x: auto;" class="table-responsive">`.

### Priority 4: Performance & UX
- **Smooth Scroll:** Add `html { scroll-behavior: smooth; }` to `style.css`.
- **Lazy Loading:** Add `loading="lazy"` to all `<img>` tags in `index.html` and the JS template strings.
- **Back to Top Button:** 
  - Add `<button id="backToTop">↑</button>` to HTML.
  - Style it to be fixed at the bottom right, initially `opacity: 0`.
  - Add JS `window.addEventListener('scroll')` to toggle opacity when `window.scrollY > 300`.
- **Filter Button Transitions:** Add `transition: all 0.3s ease;` and hover effects to `.filter-btn`.

### Priority 5: New Features
- **Countdown Timer:** Ensure the target date in `script.js` is exactly `May 31, 2026 19:30:00` for RCB vs CSK at Narendra Modi Stadium.
- **Dark/Light Mode:** 
  - Add a toggle button `🌙/☀️` to the navbar.
  - Define `.light-mode` CSS variables (swapping black backgrounds for white/light gray, and text to dark).
  - Add JS logic to toggle the `light-mode` class on the `<body>`.
- **Twitter Share:** Add an `<a>` tag formatted as a button in the Fan Zone linking to `https://twitter.com/intent/tweet?text=...`.

## User Review Required
Does this technical approach cover all your requirements? Once approved, I will immediately execute these changes across `index.html`, `style.css`, and `script.js`.
