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
    { name: 'Nakheel', pos: 'Iconic Waterfront', positioning: 'Creator of Dubai’s most iconic man-made destinations.', community: 'Palm Jumeirah, Palm Jebel Ali, Dubai Islands.', thesis: 'Landmark waterfront communities with enduring global prestige.' },
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

/* ============================================================
   v2 — back-to-top + FAQ accordion
   ============================================================ */
(function () {
  'use strict';

  // Back to top
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9);
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // FAQ — open one at a time for a clean, modern feel
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) faqItems.forEach(o => { if (o !== item) o.open = false; });
    });
  });
})();

/* ============================================================
   v3 — living layer: rotator, Dubai time, tilt, gold dust
   ============================================================ */
(function () {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Rotating advisory word */
  const word = document.getElementById('rotatorWord');
  if (word && !prefersReduced) {
    const words = ['Off-Plan Launches', 'Luxury Residences', 'Golden Visa Portfolios', 'Waterfront Investments', 'Branded Residences', 'Yield Strategies'];
    let i = 0;
    setInterval(() => {
      word.classList.add('is-out');
      setTimeout(() => {
        i = (i + 1) % words.length;
        word.textContent = words[i];
        word.classList.remove('is-out');
      }, 450);
    }, 3200);
  }

  /* Live Dubai time */
  const timeEl = document.getElementById('dubaiTime');
  if (timeEl) {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' });
    const tick = () => { timeEl.textContent = 'Dubai ' + fmt.format(new Date()); };
    tick();
    setInterval(tick, 30000);
  }

  /* Subtle 3D tilt on cards (desktop only) */
  if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
    const MAX = 5; // degrees
    document.querySelectorAll('.service-card, .dev-card, .intel-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -MAX;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * MAX;
        card.classList.add('tilting');
        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('tilting');
        card.style.transform = '';
      });
    });
  }

  /* Gold dust drifting in the dark portfolio section */
  const canvas = document.getElementById('goldDust');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let w, h, parts = [], running = false, raf;

    function resize() {
      const r = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = r.width;
      h = canvas.height = r.height;
    }
    function spawn(n) {
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.15 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.15,
        a: 0.15 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const t = performance.now() / 1000;
      for (const p of parts) {
        p.y -= p.vy; p.x += p.vx;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4; else if (p.x > w + 4) p.x = -4;
        const tw = (Math.sin(t * 1.6 + p.tw) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${(p.a * (0.45 + 0.55 * tw)).toFixed(3)})`;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    }
    resize();
    spawn(Math.min(70, Math.floor(w / 18)));
    window.addEventListener('resize', () => { resize(); spawn(Math.min(70, Math.floor(w / 18))); }, { passive: true });

    const vis = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !running) { running = true; draw(); }
        else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
      });
    }, { threshold: 0.05 });
    vis.observe(canvas);
  }
})();

/* ============================================================
   v6 — hero pointer parallax (multi-plane depth)
   ============================================================ */
(function () {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !window.matchMedia('(pointer:fine)').matches) return;

  const heroInner = document.querySelector('.hero__inner');
  const portrait = document.querySelector('.hero__portrait');
  const cards = [];  /* cards keep their gentle CSS float; not pointer-driven */
  if (!heroInner) return;

  let raf = null, tx = 0, ty = 0, cx = 0, cy = 0;

  function onMove(e) {
    const r = heroInner.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width - 0.5;   // -0.5 .. 0.5
    ty = (e.clientY - r.top) / r.height - 0.5;
    if (!raf) raf = requestAnimationFrame(apply);
  }
  function apply() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    if (portrait) portrait.style.transform =
      `perspective(1100px) rotateY(${(cx * 10).toFixed(2)}deg) rotateX(${(-cy * 8).toFixed(2)}deg)`;
    cards.forEach((card, i) => {
      const depth = 14 + i * 10;
      card.style.transform =
        `translate3d(${(cx * depth).toFixed(1)}px, ${(cy * depth).toFixed(1)}px, 0)`;
    });
    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
      raf = requestAnimationFrame(apply);
    } else { raf = null; }
  }
  function reset() {
    tx = ty = 0;
    if (!raf) raf = requestAnimationFrame(apply);
  }
  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', onMove);
  hero.addEventListener('mouseleave', reset);
})();

/* ============================================================
   v7 — pointer tilt on the About photo
   ============================================================ */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer:fine)').matches) return;
  const frame = document.querySelector('.about__img-frame');
  if (!frame) return;
  frame.style.transformStyle = 'preserve-3d';
  frame.style.transition = 'transform .3s cubic-bezier(0.22,1,0.36,1)';
  const wrap = frame.closest('.about__visual') || frame;
  wrap.addEventListener('mousemove', (e) => {
    const r = frame.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    frame.style.transform = `perspective(1000px) rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg) scale(1.02)`;
  });
  wrap.addEventListener('mouseleave', () => { frame.style.transform = ''; });
})();
