const ANALYTICS_EVENTS = {
  GENERATE_REPORT: 'generate_report',
  THEME_TOGGLE: 'theme_toggle',
  MENU_OPEN: 'menu_open',
  FAQ_OPEN: 'faq_open',
  SCROLL_DEPTH: 'scroll_depth'
};

function trackEvent(eventName, properties = {}) {
  if (typeof window.plausible !== 'undefined') {
    window.plausible(eventName, { props: properties });
  } else if (typeof window.umami !== 'undefined') {
    window.umami.track(eventName, properties);
  } else if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, properties);
  } else {
    console.log('[Analytics]', eventName, properties);
  }
}

function initAnalytics() {
  const ctaButton = document.querySelector('[data-action="generate-report"]');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      trackEvent(ANALYTICS_EVENTS.GENERATE_REPORT, {
        location: 'hero_cta'
      });
    });
  }

  const themeButton = document.getElementById('theme');
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      trackEvent(ANALYTICS_EVENTS.THEME_TOGGLE, {
        theme: document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
      });
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      trackEvent(ANALYTICS_EVENTS.MENU_OPEN, {
        open: !document.getElementById('mobileLinks').classList.contains('open')
      });
    });
  }

  document.querySelectorAll('.faq details summary').forEach((summary) => {
    summary.addEventListener('click', () => {
      const details = summary.parentElement;
      trackEvent(ANALYTICS_EVENTS.FAQ_OPEN, {
        question: summary.textContent.trim(),
        open: !details.open
      });
    });
  });

  let maxScrollDepth = 0;
  const scrollDepthThresholds = [25, 50, 75, 100];
  let triggeredDepths = new Set();

  function checkScrollDepth() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    scrollDepthThresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !triggeredDepths.has(threshold)) {
        triggeredDepths.add(threshold);
        trackEvent(ANALYTICS_EVENTS.SCROLL_DEPTH, { depth: threshold });
      }
    });
  }

  window.addEventListener('scroll', checkScrollDepth, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
  initAnalytics();
}

export { trackEvent, ANALYTICS_EVENTS };