/* ============================================================
   MOHAMED KAMEL — luxury motion & interaction layer
   ============================================================ */
(function () {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader')?.classList.add('is-done'), 600);
  });

  /* ---------- Year ---------- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Nav: scroll state + progress ---------- */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');
  const hero = document.getElementById('hero');

  function onScroll() {
    const y = window.scrollY;
    const heroH = hero ? hero.offsetHeight - 90 : 600;
    nav.classList.toggle('is-scrolled', y > heroH);
    const max = document.body.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  function closeMenu() {
    links.classList.remove('is-open');
    nav.classList.remove('is-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    nav.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // gentle stagger for grouped items
          const delay = e.target.dataset.delay || (i % 6) * 70;
          setTimeout(() => e.target.classList.add('is-in'), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dur = 1800;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          if (prefersReduced) {
            const el = e.target;
            el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '');
          } else animateCount(e.target);
          co.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(el => co.observe(el));
  }

  /* ---------- Parallax ---------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!prefersReduced && parallaxEls.length) {
    let ticking = false;
    function parallax() {
      const vh = window.innerHeight;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax);
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - vh / 2);
        el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
      });
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
    }, { passive: true });
    parallax();
  }

  /* ---------- Magnetic buttons ---------- */
  if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      const strength = 0.35;
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Developer cards ---------- */
  const developers = [
    { name: 'Emaar', pos: 'Master Developer', positioning: 'The benchmark for iconic, large-scale destinations.', community: 'Downtown Dubai, Dubai Hills, Dubai Creek Harbour.', thesis: 'Blue-chip stability with consistent capital appreciation and liquidity.' },
    { name: 'Omniyat', pos: 'Ultra-Luxury', positioning: 'Architecturally daring, collectible waterfront residences.', community: 'Business Bay, Palm Jumeirah, Marasi Bay.', thesis: 'Scarcity-driven trophy assets with strong international demand.' },
    { name: 'Beyond by Omniyat', pos: 'Premium Lifestyle', positioning: 'Design-forward living from a celebrated luxury house.', community: 'Dubai Maritime City waterfront.', thesis: 'Branded waterfront product positioned for premium resale.' },
    { name: 'Binghatti', pos: 'Branded Residences', positioning: 'Bold design and globally recognised brand partnerships.', community: 'Business Bay, JVC, Dubai Silicon Oasis.', thesis: 'High-velocity launches with attractive entry points and yields.' },
    { name: 'Aldar', pos: 'Abu Dhabi Leader', positioning: 'Abu Dhabi’s premier master developer.', community: 'Yas Island, Saadiyat, Al Reem Island.', thesis: 'Capital-city exposure with strong fundamentals and end-user depth.' },
    { name: 'Modon', pos: 'Destination Developer', positioning: 'Visionary lifestyle and waterfront destinations.', community: 'Hudayriyat Island and emerging Abu Dhabi fronts.', thesis: 'Early-cycle entry into landmark Abu Dhabi developments.' },
    { name: 'Dubai Holding', pos: 'Government-Backed', positioning: 'Master communities shaping Dubai’s urban fabric.', community: 'Jumeirah Village, Madinat Jumeirah, City Walk.', thesis: 'Institutional-grade communities with reliable demand.' },
    { name: 'Imtiaz', pos: 'Boutique Luxury', positioning: 'Fully-furnished, design-led boutique developments.', community: 'JVC, Meydan, Dubai Islands.', thesis: 'Turnkey product engineered for short-stay yield.' },
    { name: 'Object 1', pos: 'Modern Living', positioning: 'Contemporary residences with strong value engineering.', community: 'JVC, Al Furjan, Dubailand.', thesis: 'Accessible price points with compelling rental returns.' }
  ];
  const grid = document.getElementById('devsGrid');
  if (grid) {
    developers.forEach((d, i) => {
      const card = document.createElement('article');
      card.className = 'dev-card reveal';
      card.dataset.delay = (i % 3) * 80;
      card.innerHTML = `
        <div class="dev-card__top">
          <span class="dev-card__name">${d.name}</span>
          <span class="dev-card__pos">${d.pos}</span>
        </div>
        <div class="dev-card__body">
          <div class="dev-card__row"><b>Brand Positioning</b><span>${d.positioning}</span></div>
          <div class="dev-card__row"><b>Community Expertise</b><span>${d.community}</span></div>
          <div class="dev-card__row"><b>Investment Thesis</b><span>${d.thesis}</span></div>
        </div>
        <span class="dev-card__toggle">Explore</span>`;
      card.addEventListener('click', () => card.classList.toggle('is-open'));
      grid.appendChild(card);
    });
    // re-observe newly added reveals
    if ('IntersectionObserver' in window && !prefersReduced) {
      const io2 = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('is-in'), e.target.dataset.delay || 0); io2.unobserve(e.target); } });
      }, { threshold: 0.12 });
      grid.querySelectorAll('.reveal').forEach(el => io2.observe(el));
    } else {
      grid.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
    }
  }

  /* ---------- Process timeline interactivity ---------- */
  const steps = document.querySelectorAll('.process-step');
  const pProg = document.getElementById('processProgress');
  function setStep(idx) {
    steps.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    if (pProg) pProg.style.width = ((idx + 1) / steps.length * 100) + '%';
  }
  steps.forEach((s, i) => {
    s.addEventListener('click', () => setStep(i));
    s.addEventListener('mouseenter', () => setStep(i));
  });
  // auto-advance on first view
  if (steps.length && !prefersReduced) {
    let auto = 0, timer = null;
    const po = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !timer) {
          timer = setInterval(() => { auto = (auto + 1) % steps.length; setStep(auto); }, 2600);
        }
      });
    }, { threshold: 0.4 });
    po.observe(document.querySelector('.process__timeline'));
    document.querySelector('.process__timeline')?.addEventListener('mouseenter', () => { clearInterval(timer); timer = 'stopped'; });
  }

  /* ---------- Consultation form ---------- */
  const form = document.getElementById('consultForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const required = ['name', 'whatsapp', 'email', 'budget', 'location', 'objective'];
    for (const f of required) {
      if (!data.get(f)) { form.querySelector(`[name="${f}"]`)?.focus(); return; }
    }
    // Compose a WhatsApp message — frictionless, no backend required.
    const msg = `Private Consultation Request%0A%0A` +
      `Name: ${data.get('name')}%0A` +
      `WhatsApp: ${data.get('whatsapp')}%0A` +
      `Email: ${data.get('email')}%0A` +
      `Budget: ${data.get('budget')}%0A` +
      `Location: ${data.get('location')}%0A` +
      `Objective: ${data.get('objective')}%0A` +
      `Message: ${data.get('message') || '-'}`;

    form.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:2rem 0;">
        <div style="font-family:var(--serif);font-size:2rem;color:var(--gold);margin-bottom:0.6rem;">Thank you, ${name.split(' ')[0] || 'investor'}.</div>
        <p style="color:var(--soft);max-width:42ch;margin:0 auto 1.6rem;">Your request is ready. Confirm via WhatsApp and Mohamed will respond to you personally.</p>
        <a href="https://wa.me/971588801766?text=${msg}" target="_blank" rel="noopener" class="btn btn--gold magnetic">Send via WhatsApp</a>
      </div>`;
    form.classList.add('is-sent');
  });
})();
