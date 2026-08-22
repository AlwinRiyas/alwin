const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('mobile-open', !open);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    menu?.setAttribute('aria-expanded', 'false');
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

if (focusOutput) {
  setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    focusOutput.classList.add('swap');
    setTimeout(() => {
      focusOutput.textContent = phrases[phraseIndex];
      focusOutput.classList.remove('swap');
    }, 180);
  }, 2600);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.section, .project, .focus-strip, .terminal').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});