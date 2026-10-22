export function initNavbar() {
  const nav = document.querySelector('#main-nav');
  const toggle = document.querySelector('#menu-toggle');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.addEventListener('click', event => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

export function updateActiveNavigation(route) {
  document.querySelectorAll('[data-route-link]').forEach(link => {
    const target = link.dataset.routeLink;
    const active = target === route || (target === '/portfolio' && route.startsWith('/project/')) || (target === '/journal' && route.startsWith('/article/'));
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
}
