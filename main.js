/* ============================================================
   ETCONSULTORES — main.js
============================================================ */

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Hamburger / mobile menu ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Active nav link on scroll ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => activeObserver.observe(s));

/* ── Stats counter animation ── */
function animateCount(el, target, suffix = '') {
  const duration = 1800;
  const start    = performance.now();
  const initial  = 0;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.round(initial + (target - initial) * ease);
    el.textContent = (suffix === '+' || suffix === '') ? current + suffix : suffix + current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const numEl = e.target.querySelector('.hero-stat-number');
      const raw   = numEl.dataset.value;
      const num   = parseInt(raw, 10);
      const suffix = raw.replace(String(num), '');
      animateCount(numEl, num, suffix);
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stat').forEach(el => statsObserver.observe(el));

/* ── Contact form ── */
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.style.display = 'block';
  e.target.reset();
  setTimeout(() => { msg.style.display = 'none'; }, 5000);
}
