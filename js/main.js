/**
 * Aurum — Main JS
 * Lenis smooth scroll + scroll-triggered fade animations + parallax
 */

// 1. Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.5,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.85,
});

function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// 2. Scroll-triggered fade-up animations
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
      el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      fadeObserver.unobserve(el);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('[data-fade]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  fadeObserver.observe(el);
});

// 3. Parallax on dark story panels
const parallaxEls = document.querySelectorAll('[data-parallax]');
if (parallaxEls.length) {
  window.addEventListener('scroll', () => {
    parallaxEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const factor = parseFloat(el.dataset.parallax) || 0.3;
      const offset = rect.top * factor;
      const bg = el.querySelector('.story__bg');
      if (bg) bg.style.transform = `translateY(${offset}px) scale(1.1)`;
    });
  }, { passive: true });
}

// 4. Newsletter form handler
const newsletterForm = document.querySelector('.newsletter__form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('.newsletter__btn');
    if (btn) {
      btn.textContent = 'Thank you ✦';
      btn.style.background = 'var(--gold-deep)';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        newsletterForm.reset();
      }, 3000);
    }
  });
}
