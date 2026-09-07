function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileLinks = document.getElementById('mobileLinks');

  if (!menuToggle || !mobileLinks) return;

  function setMenu(open) {
    mobileLinks.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', open);
    menuToggle.textContent = open ? '✕' : '☰';
    document.body.style.overflow = open ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', () => {
    setMenu(!mobileLinks.classList.contains('open'));
  });

  mobileLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  const mediaQuery = window.matchMedia('(min-width: 1101px)');
  function handleMediaChange(e) {
    if (e.matches) setMenu(false);
  }
  mediaQuery.addEventListener('change', handleMediaChange);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileLinks.classList.contains('open')) {
      setMenu(false);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  initMobileMenu();
}

export { initMobileMenu };