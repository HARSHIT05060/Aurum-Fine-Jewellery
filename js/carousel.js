/**
 * Aurum — Hero Carousel
 * Using existing local videos in /videos/ folder
 */

let currentSlide = 0;
const TOTAL_SLIDES = 3;
const AUTOPLAY_DELAY = 6500;
let autoplayTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  startAutoplay();
  initNavScroll();
  initMobileMenu();
});

function initCarousel() {
  const videos = document.querySelectorAll('.hero__video');
  if (videos[0]) videos[0].play().catch(() => {});
  videos.forEach((v, i) => { if (i > 0) v.load(); });
  updateCounter();
}

function goToSlide(index) {
  stopAutoplay();
  const slides = document.querySelectorAll('.hero__slide');
  const dots   = document.querySelectorAll('.hero__dot');
  const videos = document.querySelectorAll('.hero__video');
  if (!slides.length) return;

  slides[currentSlide].classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  videos[currentSlide]?.pause();

  currentSlide = ((index % TOTAL_SLIDES) + TOTAL_SLIDES) % TOTAL_SLIDES;

  slides[currentSlide].classList.add('active');
  dots[currentSlide]?.classList.add('active');
  const v = videos[currentSlide];
  if (v) { v.currentTime = 0; v.play().catch(() => {}); }
  updateCounter();

  setTimeout(startAutoplay, 4000);
}

function updateCounter() {
  const el = document.querySelector('.hero__counter-current');
  if (el) el.textContent = String(currentSlide + 1).padStart(2, '0');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), AUTOPLAY_DELAY);
}
function stopAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = null;
}

// Nav scroll: transparent → dark glass
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile menu toggle
function initMobileMenu() {
  const btn   = document.querySelector('.nav__hamburger');
  const links = document.querySelector('.nav__links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const isOpen = links.classList.contains('mob-open');
    if (isOpen) {
      links.classList.remove('mob-open');
      Object.assign(links.style, {
        display: '', flexDirection: '', position: '',
        top: '', left: '', right: '', background: '', padding: '', gap: '', borderBottom: ''
      });
    } else {
      links.classList.add('mob-open');
      Object.assign(links.style, {
        display: 'flex', flexDirection: 'column', position: 'absolute',
        top: '70px', left: '0', right: '0',
        background: 'rgba(13,11,9,0.97)',
        padding: '32px 24px', gap: '28px',
        borderBottom: '1px solid rgba(201,151,58,0.12)'
      });
    }
  });
}

// Globals
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
