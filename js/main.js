/* ── TERMINAL TYPING ANIMATION ── */
const sequences = [
  { cmd: 'ssh rlcom@10.77.10.206',        out: 'Welcome to Ubuntu 22.04.5 LTS ✅' },
  { cmd: 'docker compose up -d',           out: 'elastic · kibana · fleet · logstash → Running' },
  { cmd: 'systemctl status wazuh-manager', out: '● wazuh-manager — active (running) ✅' },
  { cmd: 'whoami',                         out: 'benjamin-pause · BTS SIO SISR · RLCom 🌋' },
];

const typeTarget = document.getElementById('typeTarget');
const termOutput = document.getElementById('termOutput');

if (typeTarget && termOutput) {
  let seqIdx = 0;
  function typeSequence() {
    const { cmd, out } = sequences[seqIdx % sequences.length];
    typeTarget.textContent = '';
    termOutput.textContent = '';
    let i = 0;
    const typing = setInterval(() => {
      typeTarget.textContent += cmd[i];
      i++;
      if (i >= cmd.length) {
        clearInterval(typing);
        setTimeout(() => {
          termOutput.textContent = out;
          seqIdx++;
          setTimeout(typeSequence, 2400);
        }, 400);
      }
    }, 55);
  }
  setTimeout(typeSequence, 600);
}

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll(
  '.skill-card, .project-card, .stage-item, .tl-item, .about-grid, .contact-grid, .veille-card, .mission-block, .synthese'
);
reveals.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });
reveals.forEach(el => observer.observe(el));

/* ── BURGER MENU ── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

/* ── NAVBAR SHADOW ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10 ? '0 2px 16px rgba(0,0,0,.08)' : 'none';
});

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 100) current = sec.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

/* ── CONTACT FORM ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('📨 Merci ! Active Formspree sur ton site en ligne pour recevoir les messages.');
  });
}
