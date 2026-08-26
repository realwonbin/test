(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const filters = [...document.querySelectorAll('.filter')];
  const cards = [...document.querySelectorAll('.work-card')];
  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 8);
  updateHeader(); addEventListener('scroll', updateHeader, { passive: true });
  menuButton?.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.textContent = open ? '닫기' : '메뉴'; nav?.classList.toggle('is-open', open); });
  nav?.addEventListener('click', (event) => { if (!event.target.closest('a')) return; menuButton?.setAttribute('aria-expanded', 'false'); if (menuButton) menuButton.textContent = '메뉴'; nav.classList.remove('is-open'); });
  filters.forEach((button) => button.addEventListener('click', () => { const selected = button.dataset.filter; filters.forEach((item) => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); }); cards.forEach((card) => { card.hidden = selected !== 'all' && card.dataset.category !== selected; }); }));
  const year = document.querySelector('#year'); if (year) year.textContent = new Date().getFullYear();
})();
