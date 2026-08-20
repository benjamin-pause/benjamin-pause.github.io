/* ============================================================
   Benjamin Pausé — Portfolio v4
   main.js — interactions : langue, menu mobile, onglets projets,
             terminal animé, navbar active au scroll, reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SWITCH LANGUE FR / EN ── */
  const langBtns = document.querySelectorAll('.lang-btn');
  function setLang(lang) {
    document.body.classList.toggle('lang-en', lang === 'en');
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    localStorageSafeSet('portfolio-lang', lang);
  }
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  // Restore preference if available (fails silently if storage blocked)
  const savedLang = localStorageSafeGet('portfolio-lang');
  if (savedLang === 'en') setLang('en');

  function localStorageSafeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function localStorageSafeSet(key, val) {
    try { window.localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  }

  /* ── 2. MENU MOBILE (BURGER) ── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      burger.classList.toggle('open');
    });
    // Ferme le menu quand on clique un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  /* ── 3. ONGLETS PROJETS (Aperçu / Technique / Captures / Appris) ── */
  document.querySelectorAll('.project-card').forEach(card => {
    const tabBtns = card.querySelectorAll('.tab-btn');
    const panels = card.querySelectorAll('.tab-panel');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.panel;
        tabBtns.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
      });
    });
  });

  /* ── 4. TERMINAL ANIMÉ (hero) ── */
  const typeTarget = document.getElementById('typeTarget');
  const termOutput = document.getElementById('termOutput');
  const termBoot = document.getElementById('termBoot');

  function runBootSequence(cb) {
    if (!termBoot) { cb(); return; }
    const bootLines = [
      'Establishing SSH connection to rlcom-vpn...',
      'Verifying host key fingerprint... <span class="ok">OK</span>',
      'Authenticating benjamin@10.77.112.10... <span class="ok">OK</span>',
      'Session started — welcome back.'
    ];
    let i = 0;
    function nextLine() {
      if (i >= bootLines.length) {
        setTimeout(() => {
          termBoot.style.display = 'none';
          cb();
        }, 500);
        return;
      }
      termBoot.innerHTML += (i > 0 ? '\n' : '') + bootLines[i];
      i++;
      setTimeout(nextLine, 380);
    }
    nextLine();
  }

  if (typeTarget && termOutput) {
    const sequence = [
      { cmd: 'zabbix_server -R config_cache_reload', out: 'zabbix_server [12345]: command sent successfully' },
      { cmd: 'systemctl status wazuh-manager', out: '● wazuh-manager.service — active (running)' },
      { cmd: 'docker compose ps', out: 'elasticsearch   Up 3 days (healthy)\nkibana          Up 3 days (healthy)\nfleet-server    Up 3 days (healthy)' },
      { cmd: 'whoami', out: 'benjamin — BTS SIO SISR' }
    ];
    let seqIndex = 0;

    function typeLine(text, cb) {
      let i = 0;
      typeTarget.textContent = '';
      const interval = setInterval(() => {
        typeTarget.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(cb, 400);
        }
      }, 45);
    }

    function showOutput(text, cb) {
      termOutput.textContent = text;
      setTimeout(cb, 1800);
    }

    function eraseLine(cb) {
      let text = typeTarget.textContent;
      const interval = setInterval(() => {
        text = text.slice(0, -1);
        typeTarget.textContent = text;
        if (text.length === 0) {
          clearInterval(interval);
          termOutput.textContent = '';
          setTimeout(cb, 300);
        }
      }, 20);
    }

    function runSequence() {
      const step = sequence[seqIndex];
      typeLine(step.cmd, () => {
        showOutput(step.out, () => {
          eraseLine(() => {
            seqIndex = (seqIndex + 1) % sequence.length;
            runSequence();
          });
        });
      });
    }
    runBootSequence(runSequence);
  }

  /* ── 5. NAVBAR — lien actif selon la section visible ── */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function updateActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ── 6. NAVBAR — ombre au scroll ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 12px rgba(0,0,0,.06)'
        : 'none';
    }, { passive: true });
  }

  /* ── 7. SCROLL REVEAL (si des éléments .reveal existent) ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  }

});
