/* =============================================
   Scroll Reveal Animation
   ============================================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px',
  }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

/* =============================================
   Header Scroll State
   ============================================= */
const header = document.getElementById('site-header');

window.addEventListener(
  'scroll',
  () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  },
  { passive: true }
);

/* =============================================
   Smooth Scroll for anchor links
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const headerOffset = 80;
    const targetY =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});
