(() => {
  'use strict';

  document.documentElement.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile navigation */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });
  }

  /* Header border on scroll */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* Portfolio filters */
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('[data-category]');
  const live = document.getElementById('filter-status');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let count = 0;
      items.forEach((item) => {
        const categories = (item.dataset.category || '').trim().split(/\s+/);
        const show = value === 'all' || categories.includes(value);
        item.hidden = !show;
        if (show) {
          count += 1;
          item.classList.add('is-visible');
        }
      });
      if (live) live.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}.`;
    });
  });

  /* Case study table of contents: highlight current section */
  const tocLinks = document.querySelectorAll('.cs-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    tocLinks.forEach((a) => {
      const target = document.getElementById(a.hash.slice(1));
      if (target) map.set(target, a);
    });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((a) => { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
          const link = map.get(entry.target);
          if (link) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'location');
          }
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    map.forEach((_, section) => spy.observe(section));
  }

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
