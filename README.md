# Solar Sensei - Home Preview

Unbiased solar & battery analysis for homeowners. Back-test electricity data against hundreds of system combinations.

## Project Structure

```
solar-sensei/
├── index.html           # Main HTML file
├── public/              # Static assets (images, fonts, etc.)
└── src/
    ├── css/
    │   └── main.css     # All styles
    └── js/
        ├── main.js      # Entry point
        ├── theme.js     # Dark/light theme toggle
        ├── menu.js      # Mobile navigation
        ├── chart.js     # Chart.js energy flow visualization
        └── analytics.js # Privacy-friendly analytics placeholder
```

## Features Implemented

### SEO & Structured Data
- Meta description, Open Graph, Twitter Card tags
- JSON-LD: WebSite, Service, FAQPage schemas
- Semantic HTML5 landmarks (header, main, section, footer, nav, aside)

### Accessibility
- Focus-visible styles for keyboard navigation
- ARIA labels, roles, and live regions
- Sufficient color contrast (WCAG AA)
- Reduced motion support via `prefers-reduced-motion`
- Print stylesheet

### Interactive Chart
- Chart.js 4 line chart with 4 datasets (solar, grid, battery, export)
- Gradient fills, smooth tension curves
- Custom HTML legend with color swatches
- Theme-aware (updates on dark/light toggle)
- Lazy-loads Chart.js from CDN

### New Sections
- **How it Works** - 3-step process visual
- **Trust Signals** - Testimonial cards with real-world outcomes
- **Expanded FAQ** - 6 detailed answers with structured data

### Analytics Ready
- `data-action="generate-report"` on CTAs
- Event tracking for theme toggle, menu, FAQ, scroll depth
- Supports Plausible, Umami, GA4, or console fallback

### Code Quality
- CSS custom properties organized by category
- Modular ES6 JavaScript with named exports
- No build step required (runs directly in browser)
- Mobile-first responsive breakpoints (1100px, 680px)

## Running Locally

Since this uses ES modules and Chart.js from CDN, you need a local server (browsers block ES modules via `file://`):

```bash
# Python 3
python -m http.server 8000

# Node.js (if available)
npx serve .

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000`

## Customization

### Colors
Edit CSS custom properties in `src/css/main.css`:
```css
:root {
  --teal: #087b6b;
  --orange: #d64a21;
  --amber: #f6ad19;
  /* ... */
}
```

### Chart Data
Modify `CHART_DATA` in `src/js/chart.js` with real household data.

### Analytics
Replace `trackEvent` in `src/js/analytics.js` with your provider:
```js
// Plausible
window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };

// Umami
window.umami = window.umami || function() { (window.umami.q = window.umami.q || []).push(arguments) };
```

## Browser Support
- Modern browsers (last 2 versions)
- ES Modules, CSS Custom Properties, IntersectionObserver
- Chart.js 4 requires Canvas support

## License
Proprietary - Solar Sensei Preview