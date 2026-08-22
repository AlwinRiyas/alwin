const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  menu.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  navLinks?.classList.toggle('mobile-open', !open);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open navigation');
    navLinks?.classList.remove('mobile-open');
  });
});

const phrases = [
  'security engineering',
  'security tooling',
  'security automation',
  'AI × security'
];
const focusOutput = document.querySelector('[data-focus-output]');
let phraseIndex = 0;

if (focusOutput && !reduceMotion) {
  window.setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    focusOutput.classList.add('swap');
    window.setTimeout(() => {
      focusOutput.textContent = phrases[phraseIndex];
      focusOutput.classList.remove('swap');
    }, 180);
  }, 2600);
}

const revealElements = document.querySelectorAll('.section, .project, .focus-strip, .terminal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((el) => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}