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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.section, .project, .focus-strip, .terminal').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});