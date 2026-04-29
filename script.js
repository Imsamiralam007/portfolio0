/* ═══════════════════════════════════════════
   ALEX RIVERA — PORTFOLIO  |  script.js
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     CUSTOM CURSOR
  ───────────────────────────────────────── */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Smooth cursor follow with lerp
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect
  const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .cert-card, .service-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

  // Hide cursor on leave
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });


  /* ─────────────────────────────────────────
     NAVBAR — SCROLL + HAMBURGER
  ───────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* ─────────────────────────────────────────
     ACTIVE NAV HIGHLIGHT
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));


  /* ─────────────────────────────────────────
     REVEAL ON SCROLL
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  // Assign stagger index to siblings at load time (not at observe time)
  document.querySelectorAll('.projects-grid, .skills-grid, .certs-grid, .services-grid, .about-stats, .hero-content, .about-text-col, .about-photo-col, .timeline, .contact-wrapper, .contact-form, .contact-text, .cv-inner').forEach(parent => {
    parent.querySelectorAll(':scope > .reveal').forEach((el, idx) => {
      el.style.transitionDelay = `${idx * 0.1}s`;
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────────
     SKILL BARS — ANIMATE ON ENTER
  ───────────────────────────────────────── */
  const barFills = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width  = target.dataset.width;
        setTimeout(() => {
          target.style.width = width + '%';
        }, 200);
        barObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  barFills.forEach(bar => barObserver.observe(bar));


  /* ─────────────────────────────────────────
     HERO ENTRANCE ANIMATION
  ───────────────────────────────────────── */
  const heroReveals = document.querySelectorAll('#hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 150);
  });


  /* ─────────────────────────────────────────
     SMOOTH SCROLL WITH OFFSET
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ─────────────────────────────────────────
     CONTACT FORM SUBMIT
  ───────────────────────────────────────── */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        formSuccess.classList.add('show');
        form.reset();
        btn.textContent = 'Send Message ↗';
        btn.disabled = false;

        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1200);
    });
  }


  /* ─────────────────────────────────────────
     PARALLAX — HERO BG TEXT
  ───────────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg-text');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.15}px))`;
    }, { passive: true });
  }


  /* ─────────────────────────────────────────
     PROJECT CARD TILT
  ───────────────────────────────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left - rect.width  / 2;
      const y       = e.clientY - rect.top  - rect.height / 2;
      const rotateX = -(y / rect.height) * 6;
      const rotateY =  (x / rect.width)  * 6;
      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.35s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });


  /* ─────────────────────────────────────────
     STAT COUNTER ANIMATION
  ───────────────────────────────────────── */
  function animateCounter(el, target, suffix) {
    let current  = 0;
    const duration = 1200;
    const step   = target / (duration / 16);
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  }

  const statNums = document.querySelectorAll('.stat-num');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el   = entry.target;
        const text = el.textContent.trim();
        if (text.endsWith('+')) {
          animateCounter(el, parseInt(text), '+');
        } else if (text !== '1st') {
          animateCounter(el, parseInt(text), '');
        }
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  statNums.forEach(el => statsObserver.observe(el));


  /* ─────────────────────────────────────────
     FOOTER — FADE IN
  ───────────────────────────────────────── */
  const footer = document.querySelector('#footer');
  if (footer) {
    footer.style.opacity = '0';
    footer.style.transition = 'opacity 0.8s ease';
    const footerObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        footer.style.opacity = '1';
        footerObserver.unobserve(footer);
      }
    }, { threshold: 0.1 });
    footerObserver.observe(footer);
  }


  /* ─────────────────────────────────────────
     KEYBOARD ACCESSIBILITY — ESC closes menu
  ───────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

  console.log('%c[ AR ] Portfolio loaded.', 'color: #c4a464; font-family: monospace; font-size: 14px;');

});