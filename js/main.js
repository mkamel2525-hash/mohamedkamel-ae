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
    { name: 'Emaar', pos: 'Master Developer', positioning: 'The benchmark for iconic, large-scale destinations.', community: 'Downtown Dubai, Dubai Hills, Dubai Creek Harbour.', thesis: 'Blue-chip stability with consistent capital appreciation and liquidity.',
      launches: [ {n:'The Oasis by Emaar', a:'Dubailand', t:'Luxury villas & mansions', price:'From AED 13.2M', plan:'Flexible', ho:'2028–2030', details:['Tierra Address Villas — from AED 13.2M','Lavita mansions — from AED 40M','Waterfront villa & mansion community']}, {n:'Dubai Creek Harbour', a:'Creek', t:'Premium waterfront apartments', price:'From AED 1.79M', plan:'Flexible', ho:'2028–2030', details:['New towers: Creek Bay, Silva & Altan','Premium 1–3 BR residences','Creek-front living near Downtown']}, {n:'Emaar South — Golf Districts', a:'Dubai South', t:'Golf-facing apartments', price:'From AED 850K', plan:'Flexible', ho:'2028–2030', details:['Golf Point, Golf Edge & Golf Verge','Entry-level luxury from AED 850,000','Golf-course frontage']}, {n:'Mina Rashid — Rashid Yachts & Marina', a:'Mina Rashid', t:'Waterfront residences', price:'On request', plan:'Flexible', ho:'Q1–Q2 2030', details:['New launches: Aurea by Emaar & Sera 2','Marina & yacht-club waterfront living']} ] },
    { name: 'Omniyat', pos: 'Ultra-Luxury', positioning: 'Architecturally daring, collectible waterfront residences.', community: 'Business Bay, Palm Jumeirah, Marasi Bay.', thesis: 'Scarcity-driven trophy assets with strong international demand.',
      launches: [ {n:'ORLA', a:'Palm Jumeirah', t:'Ultra-luxury residences', price:'From AED 24.1M', plan:'5/45/50', ho:'Q3 2027'}, {n:'Vela Viento', a:'Marasi Bay', t:'Branded waterfront', price:'From AED 27.7M', plan:'5/55/40', ho:'Q4 2026'} ] },
    { name: 'Beyond by Omniyat', pos: 'Premium Lifestyle', positioning: 'Design-forward living from a celebrated luxury house.', community: 'Dubai Maritime City waterfront.', thesis: 'Branded waterfront product positioned for premium resale.',
      launches: [ {n:'The Yards — Arancia Yards', a:'City of Arabia, Dubailand', t:'Furnished 1–3 BR apartments & townhouses', price:'From AED 1.0M', plan:'40/60', ho:'Q1–Q2 2029', details:['From AED 1.0M (~AED 1,350/sq ft, 1-bed)','Plan: 10% down · 40% during construction · 60% on handover','272 residences across three 7-storey boutique buildings','Beyond’s first inland destination — AED 4B masterplan','Car-free community, 70%+ open space, lagoon pool & wellness','Next to Al Barari, IMG Worlds & Global Village']}, {n:'Orise', a:'Dubai Maritime City', t:'Beachfront apartments', price:'On request', plan:'Flexible', ho:''}, {n:'Saria', a:'Dubai Maritime City', t:'Waterfront residences', price:'On request', plan:'Flexible', ho:''} ] },
    { name: 'Binghatti', pos: 'Branded Residences', positioning: 'Bold design and globally recognised brand partnerships.', community: 'Business Bay, JVC, Dubai Silicon Oasis.', thesis: 'High-velocity launches with attractive entry points and yields.',
      launches: [ {n:'Binghatti Wraith', a:'Al Jaddaf', t:'Studios, 1–3 BR apartments & Royal Suites', price:'From AED 799,999', plan:'Flexible', ho:'', details:['Studio — from AED 799,999','1-bed — from AED 1.30M','2-bed — from AED 2.10M','2-bed Royal Suite — from AED 2.50M','3-bed Royal Suite — from AED 3.50M','Resort-inspired tower, 6 min to Downtown & Burj Khalifa','26 resort-style amenities incl. open-air infinity pool']}, {n:'Tilal Binghatti', a:'Dubai (E611 / Academic City)', t:'4–7 BR townhouses & villas (first villa community)', price:'From AED 4.2M', plan:'20/40/40', ho:'Q4 2029', details:['Low-density gated community — 4, 5, 6 & 7-bed homes','Plan: 20% / 40% / 40%','Private yards, parks & community retail','Adjacent to Academic City & Dubai Silicon Oasis']} ] },
    { name: 'DAMAC', pos: 'Luxury Lifestyle', positioning: 'Branded, design-led communities and master-planned waterfront living.', community: 'DAMAC Islands, DAMAC Lagoons, DAMAC Riverside, DAMAC Hills.', thesis: 'High-recognition brand with strong volume, lifestyle amenities and investor liquidity.',
      launches: [ {n:'DAMAC District', a:'Adjacent to DAMAC Mall (Hessa St / E311)', t:'Residences + offices — wellness & work community (~1,008 units)', price:'From AED 1.1M', plan:'60/40', ho:'Q1 2029', details:['Residences (studio, 1 & 2-bed) — from AED 1.1M · 740–1,220 sq ft','Commercial office spaces — from AED 6.1M · 3,164–6,588 sq ft','Two residential towers (Tower A G+2P+29 · Tower B G+2P+26) + one commercial tower (G+2P+10)','Plan: 20% on booking · 40% during construction · 40% on completion','Handover: Q1 2029','Wellness amenities: organic & wave pools, Whispering Waters stream, Cloud Zen Lounge, yoga garden','Work & leisure: AI-powered fitness lab, smart co-working, Sunset Bar, BBQ, padel courts','Direct doorstep access to DAMAC Mall — 40+ retail, supermarkets & restaurants']}, {n:'DAMAC Islands', a:'Dubailand', t:'4–7 BR townhouses & villas (waterfront)', price:'From AED 2.75M', plan:'75/25', ho:'2027–2028', details:['4-bed townhouse — from AED 2.99M','4-bed villa — from AED 4.85M','5-bed villa — from AED 6.25M','Plan: 10% on booking · 65% during construction · 25% on handover','Tropical island-themed community — lagoons, waterfalls & beaches']}, {n:'DAMAC Lagoons — Valencia / Lagoon Views', a:'Dubailand', t:'Apartments, townhouses & villas', price:'From AED 725K', plan:'60/40 or 50/50', ho:'2026–2027', details:['Studio — from AED 725K','1-bed apartment — from AED 1.3M','2-bed apartment — from AED 1.84M','Townhouses & villas — from AED 1.7M','Mediterranean-themed lagoon community']}, {n:'DAMAC Riverside — Riverside Views', a:'Dubai Investment Park', t:'Townhouses & apartments', price:'From AED 1.19M', plan:'20/60/20', ho:'2027', details:['Riverside townhouses — from AED 1.19M','Waterfront living with green & blue zones','Plan: 20% down · 60% during construction · 20% on handover']} ] },
    { name: 'Aldar', pos: 'Abu Dhabi Leader', positioning: 'Abu Dhabi’s premier master developer.', community: 'Yas Island, Saadiyat, Al Reem Island.', thesis: 'Capital-city exposure with strong fundamentals and end-user depth.',
      launches: [ {n:'The Source', a:'Saadiyat Island', t:'Apartments', price:'From AED 2.51M', plan:'60/40', ho:'Q3 2026'}, {n:'Yas — The Sustainable City', a:'Yas Island', t:'Apartments & townhouses', price:'From AED 0.89M', plan:'35/65', ho:'Q1 2026'}, {n:'Mandarin Oriental Residences', a:'Saadiyat Island', t:'Branded luxury', price:'On request', plan:'Flexible', ho:''} ] },
    { name: 'Modon', pos: 'Destination Developer', positioning: 'Visionary lifestyle and waterfront destinations.', community: 'Hudayriyat Island and emerging Abu Dhabi fronts.', thesis: 'Early-cycle entry into landmark Abu Dhabi developments.',
      launches: [ {n:'Hudayriyat Golf Estates', a:'Hudayriyat Island, Abu Dhabi', t:'Townhouses, golf homes, villas & mansions (3–6 BR)', price:'From AED 4.25M', plan:'40/60', ho:'Sep 2030', details:['3-bed townhouse — from AED 4.25M','4-bed townhouse — from AED 4.95M','4-bed golf home — from AED 7.35M','5-bed villa — from AED 10.15M','6-bed fairway villa — from AED 26.55M','6-bed golf mansion — from AED 35.55M','Plan: 5% reservation · 35% to 2030 · 60% on handover','UAE’s first island golf community — 18-hole championship course']}, {n:'Nawayef West', a:'Hudayriyat Island', t:'Villas (4–5 BR)', price:'From AED 7.8M', plan:'40/60', ho:'2026'}, {n:'Nawayef West Heights', a:'Hudayriyat Island', t:'Villas (5–7 BR)', price:'From AED 19M', plan:'40/60', ho:'Q4 2026'} ] },
    { name: 'Dubai Holding', pos: 'Government-Backed', positioning: 'Master communities shaping Dubai’s urban fabric.', community: 'Jumeirah Village, Madinat Jumeirah, City Walk.', thesis: 'Institutional-grade communities with reliable demand.',
      launches: [ {n:'Bluewaters Bay', a:'Bluewaters Island', t:'Sea-view apartments & penthouses', price:'From AED 2.56M', plan:'80/20', ho:'Q1 2027'}, {n:'Madinat Jumeirah Living', a:'Madinat Jumeirah', t:'1–4 BR apartments', price:'From AED 1.46M', plan:'50/50', ho:'Q1 2026', details:['Lamaa — 1–4 BR from AED 1.46M · 50/50 · Q1 2026','Jomana — 1–4 BR from AED 1.91M · 70/30 · Q2 2026','Walkable to Souk Madinat & private beach']}, {n:'Nad Al Sheba Gardens', a:'Nad Al Sheba', t:'Villas & townhouses', price:'From AED 4.18M', plan:'80/20', ho:'Q3 2027'} ] },
    { name: 'Nakheel', pos: 'Iconic Waterfront', positioning: 'Creator of Dubai’s most iconic man-made destinations.', community: 'Palm Jumeirah, Palm Jebel Ali, Dubai Islands.', thesis: 'Landmark waterfront communities with enduring global prestige.',
      launches: [ {n:'Palm Central Private Residences', a:'Palm Jebel Ali', t:'Beachfront apartments & townhouses (1–4 BR)', price:'From AED 2.7M', plan:'20% on booking', ho:'Sep 2030', details:['1 Bedroom — from AED 2.7M','2 Bedroom — from AED 4.3M','2 Bedroom + Maid — from AED 4.9M','3 Bedroom — from AED 7.5M','4 Bedroom — from AED 12.4M','Townhouse — from AED 14.9M','Plan: 20% on booking · staged instalments 2026–2029 · 30% (1–2 BR) / 40% (3 BR+ & TH) on completion','Handover: September 2030','Limited collection of ~220 residences — first apartment community on Palm Jebel Ali']}, {n:'Palm Jebel Ali Villas', a:'Palm Jebel Ali', t:'Beachfront villas (5–7 BR)', price:'From AED 18M', plan:'80/20', ho:'2029'}, {n:'Bay Villas', a:'Dubai Islands', t:'Villas & townhouses', price:'From AED 4M', plan:'80/20', ho:'Q2 2027'}, {n:'Como Residences', a:'Palm Jumeirah', t:'Ultra-luxury apartments', price:'On request', plan:'Flexible', ho:''} ] },
    { name: 'Dubai Properties', pos: 'Master Communities', positioning: 'Creator of Dubai’s most established residential communities.', community: '1/JBR, Marasi Business Bay, Mudon, Villanova, Serena.', thesis: 'Family-focused master communities with deep end-user demand and reliable rental yield.',
      launches: [ {n:'1/JBR', a:'Jumeirah Beach Residence', t:'Ultra-luxury beachfront apartments & penthouses', price:'From AED 7.5M', plan:'Flexible', ho:'Ready', details:['Beachfront 2–4 BR apartments & full-floor penthouses','Direct access to The Beach & JBR Walk','Branded amenities, private beach & infinity pools','Trophy address with strong short-stay & resale demand']}, {n:'La Violeta 2 at Villanova', a:'Dubailand', t:'3–4 BR townhouses', price:'From AED 2.5M', plan:'10/50/40', ho:'Q1 2026', details:['3 & 4-bedroom Mediterranean-style townhouses','Plan: 10% down · 50% during construction · 40% on handover','Handover: Q1 2026','Gated family community with parks, pools & retail']}, {n:'Serena — Bella Casa', a:'Mudon / Serena', t:'Townhouses & villas', price:'From AED 2.4M', plan:'60/40', ho:'Q2 2026', details:['Spanish-Mediterranean townhouses & semi-detached villas','Plan: 60% during construction · 40% on handover','Community pools, parks, retail & schools nearby','Established, high-occupancy family community']}, {n:'Mudon Al Ranim', a:'Mudon, Dubailand', t:'3–4 BR townhouses', price:'From AED 2.3M', plan:'Flexible', ho:'2026', details:['Green, walkable community surrounded by parkland','3 & 4-bedroom townhouses with private gardens','Mudon Central Park, cycling tracks & community centre']}, {n:'Marasi Business Bay', a:'Business Bay', t:'Waterfront apartments', price:'On request', plan:'Flexible', ho:''} ] },
    { name: 'Imtiaz', pos: 'Boutique Luxury', positioning: 'Fully-furnished, design-led boutique developments.', community: 'Sheikh Zayed Road, JVC, Meydan, Dubai Islands.', thesis: 'Turnkey product engineered for short-stay yield.',
      launches: [ {n:'RAW District', a:'Sheikh Zayed Road', t:'Furnished studios, 1–3 BR, offices & retail (direct metro)', price:'From AED 649K', plan:'50/50 or 60/40 post-handover', ho:'Q1 2029', details:['Studio — from AED 649K','1BR Executive — from AED 889K','1BR Standard — from AED 1.06M','2BR — from AED 1.48M','3BR — from AED 1.95M','Office spaces — from AED 1.2M','Retail — from AED 2.5M','Plan A: 50/50 — 50% during construction · 50% on completion','Plan B: 60/40 post-handover — 60% during construction · 40% over 3 years','Handover: Q1 2029','Fully furnished with integrated appliances & smart-home features','Direct metro access — minutes to Dubai Marina, Expo City & Al Maktoum Airport','Integrated community: residences, offices, retail, cafés & co-working']}, {n:'Beach Walk Grand', a:'Dubai Islands', t:'Apartments', price:'From AED 2.1M', plan:'60/40', ho:'Q4 2026'}, {n:'Sunset Bay', a:'Dubai Islands', t:'Apartments', price:'From AED 1.7M', plan:'60/40', ho:'Q4 2026'}, {n:'Westwood Grande', a:'JVC', t:'Furnished apartments', price:'On request', plan:'Flexible', ho:''} ] },
    { name: 'Object 1', pos: 'Modern Living', positioning: 'Contemporary residences with strong value engineering.', community: 'JVC, Al Furjan, Dubailand.', thesis: 'Accessible price points with compelling rental returns.',
      launches: [ {n:'VERDAN1A', a:'Dubailand (DLRC)', t:'Apartments & townhouses', price:'From AED 0.55M', plan:'20/40/40', ho:'Q3 2027'} ] },
    { name: 'Ellington', pos: 'Design-Led Boutique', positioning: 'Dubai’s leading design-led boutique developer, known for craftsmanship and detail.', community: 'Dubai Islands, Jumeirah Islands, Meydan, Business Bay, Jaddaf Waterfront, JVC.', thesis: 'Design-driven product with strong end-user appeal, premium resale and investor-friendly plans.',
      launches: [ {n:'The Meriva Collection', a:'Dubai Islands', t:'1–4 BR apartments & signature penthouses (beachfront)', price:'From AED 2.7M', plan:'70/30', ho:'Q2 2030', details:['Status: launched February 2026','1-bed (850–1,100 sq ft) — from AED 2.7M','2-bed (1,300–1,700 sq ft) — from AED 3.8M','3-bed (1,900–2,500 sq ft) — from AED 5.5M','4-bed (2,800–3,500 sq ft) — from AED 7.5M','Signature penthouses (4,000+ sq ft) — price on request','Plan: 70% during construction · 30% on handover · handover Q2 2030','Ellington’s pioneering hospitality-led beachfront destination','Master plan: Meriva Shores, Meriva Sunset & Meriva Gardens + a dedicated luxury hotel']}, {n:'Eltiera Views', a:'Jumeirah Islands', t:'1–4 BR lakeside apartments & penthouses', price:'From AED 2.2M', plan:'70/30', ho:'', details:['Status: launched early 2026','1-bed (from ~800 sq ft) — from AED 2.2M','2 & 3-bed units — scaling up to ~AED 5.1M depending on layout & lake views','Highly sought-after lakeside community','Expanded into sequential phases (Eltiera Views 2, 3 & 4) due to rapid absorption']}, {n:'Everly Place', a:'Meydan Horizon', t:'1–2 BR apartments', price:'From AED 1.9M', plan:'70/30', ho:'', details:['Starting price — AED 1.9M','1-bedroom — from ~AED 1.9M','2-bedroom — from ~AED 3.3M','Within the Meydan Horizon master plan']}, {n:'The Crestmark', a:'Business Bay', t:'1–4 BR apartments (canal-side)', price:'From AED 1.5M', plan:'70/30', ho:'Q1 2026', details:['Canal-facing 1–4 BR residences','Plan: 70% during construction · 30% on handover','Handover: Q1 2026','Signature Ellington design & amenities']}, {n:'Art Bay (East & West)', a:'Jaddaf Waterfront', t:'Studios & 1–3 BR apartments', price:'From AED 1.05M', plan:'70/30', ho:'Q3 2026', details:['Art Bay East — from AED 1.05M','Art Bay West — from AED 1.98M','Plan: 70% during construction · 30% on handover','Waterfront living minutes from Downtown & DIFC']}, {n:'Upper House', a:'Jumeirah Lake Towers (JLT)', t:'Studios, 1–3 BR apartments', price:'From AED 750K', plan:'70/30', ho:'Q1 2026', details:['Entry from AED 750K','Plan: 70/30','Twin-tower lifestyle community in JLT']} ] }
  ];
  const grid = document.getElementById('devsGrid');
  if (grid) {
    const LOGO = {
      'Emaar':'emaar.com','Omniyat':'omniyat.com',
      'Binghatti':'binghatti.com','DAMAC':'damacproperties.com','Aldar':'aldar.com','Modon':'modon.ae',
      'Dubai Holding':'dubaiholding.com','Nakheel':'nakheel.com',
      'Dubai Properties':'dp.ae',
      'Ellington':'ellingtonproperties.ae',
      'Imtiaz':'imtiazdevelopments.com'
    };
    const FILE = {
      'Emaar':'assets/logos/emaar.png',
      'Omniyat':'assets/logos/omniyat.jpg',
      'Modon':'assets/logos/modon.jpg','Nakheel':'assets/logos/nakheel.jpg',
      'Imtiaz':'assets/logos/imtiaz.png'
    };
    developers.forEach((d, i) => {
      const card = document.createElement('article');
      card.className = 'dev-card reveal';
      card.dataset.delay = (i % 3) * 80;
      card.dataset.dev = d.name;
      const dom = LOGO[d.name];
      const file = FILE[d.name];
      const src = file || (dom ? `https://www.google.com/s2/favicons?domain=${dom}&sz=256` : '');
      const fb = (!file && dom) ? `https://logo.clearbit.com/${dom}?size=160` : '';
      const logo = src
        ? `<div class="dev-card__brand"><img class="dev-card__logo" alt="${d.name}" loading="lazy" src="${src}"`
          + (fb ? ` data-fb="${fb}" onerror="if(this.dataset.fb){this.src=this.dataset.fb;this.dataset.fb='';}else{this.closest('.dev-card__brand').style.display='none';}"`
                : ` onerror="this.closest('.dev-card__brand').style.display='none'"`)
          + `></div>`
        : '';
      const launches = (d.launches || []).map(l => {
        const detail = [l.price, (l.plan && l.plan !== 'Flexible' ? l.plan + ' plan' : (l.plan ? 'Flexible plan' : '')), (l.ho ? 'Handover ' + l.ho : '')].filter(Boolean).join('  ·  ');
        const breakdown = (l.details && l.details.length)
          ? '<ul class="lx">' + l.details.map(x => `<li>${x}</li>`).join('') + '</ul>' : '';
        return `<li><span class="ln">${l.n}</span><span class="la">${l.a} &middot; ${l.t}</span><span class="lp">${detail}</span>${breakdown}</li>`;
      }).join('');
      const wa = 'https://wa.me/971588801766?text=' +
        encodeURIComponent('Hi Mohamed, please share the latest ' + d.name + ' launches with current prices and payment plans.');
      card.innerHTML = `
        ${logo}
        <div class="dev-card__top">
          <span class="dev-card__name">${d.name}</span>
          <span class="dev-card__pos">${d.pos}</span>
        </div>
        <div class="dev-card__body">
          <div class="dev-card__row"><b data-i18n="dev.lbl.positioning">Brand Positioning</b><span>${d.positioning}</span></div>
          <div class="dev-card__row"><b data-i18n="dev.lbl.community">Community Expertise</b><span>${d.community}</span></div>
          <div class="dev-card__row"><b data-i18n="dev.lbl.thesis">Investment Thesis</b><span>${d.thesis}</span></div>
          <div class="dev-card__launches">
            <b data-i18n="dev.lbl.launches">Latest Launches</b>
            <ul>${launches}</ul>
            <p class="dev-card__pricing" data-i18n="dev.pricing">Indicative starting prices &amp; payment plans — confirm the latest with Mohamed.</p>
            <a class="dev-card__wa" href="${wa}" target="_blank" rel="noopener" onclick="event.stopPropagation()" data-i18n="dev.wa">Get latest prices &amp; payment plans &rarr;</a>
          </div>
        </div>
        <span class="dev-card__toggle" data-i18n="dev.toggle">View Launches</span>`;
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
    // apply the active language to the freshly-built developer cards
    if (window.MKi18n) window.MKi18n.refresh(grid);
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

/* ============================================================
   v10 — make service & market-intelligence cards lead somewhere
   ============================================================ */
(function () {
  'use strict';
  const target = document.getElementById('consultation');
  document.querySelectorAll('.service-card, .intel-card').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    const go = () => { if (target) target.scrollIntoView({ behavior: 'smooth' }); };
    card.addEventListener('click', go);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
})();

/* ============================================================
   v11 — no dead presses: hero chips -> services, trust -> developers
   ============================================================ */
(function () {
  'use strict';
  function scrollTo(id){ const el=document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth'}); }
  document.querySelectorAll('.hero__services li').forEach(li=>{
    li.setAttribute('role','button'); li.setAttribute('tabindex','0');
    li.addEventListener('click',()=>scrollTo('services'));
    li.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();scrollTo('services');} });
  });
  function openDeveloper(label){
    const cards = document.querySelectorAll('.dev-card[data-dev]');
    let match = null;
    const t = label.trim().toLowerCase();
    cards.forEach(c=>{ const n=(c.dataset.dev||'').toLowerCase(); if(!match && (n.includes(t)||t.includes(n))) match=c; });
    scrollTo('developers');
    if(match){
      document.querySelectorAll('.dev-card.is-open').forEach(c=>{ if(c!==match) c.classList.remove('is-open'); });
      match.classList.add('is-open');
      setTimeout(()=>match.scrollIntoView({behavior:'smooth', block:'center'}), 400);
    }
  }
  document.querySelectorAll('.trust__track span').forEach(s=>{
    s.addEventListener('click',()=>openDeveloper(s.textContent||''));
  });
})();

/* ============================================================
   v19 — Holiday Home (Airbnb) income calculator
   ============================================================ */
(function () {
  'use strict';
  const valEl = document.getElementById('calcValue');
  const zoneEl = document.getElementById('calcZone');
  const btn = document.getElementById('calcBtn');
  if (!valEl || !zoneEl || !btn) return;
  const COST = 0.25; // ~25% operating costs (management, cleaning, permits, fees)
  const fmt = n => 'AED ' + Math.round(n).toLocaleString('en-US');

  // Live-format the value field with thousands separators
  valEl.addEventListener('input', () => {
    const digits = valEl.value.replace(/[^0-9]/g, '');
    valEl.value = digits ? Number(digits).toLocaleString('en-US') : '';
  });

  function calc() {
    const value = Number(valEl.value.replace(/[^0-9]/g, ''));
    const zone = zoneEl.value;
    if (!value || !zone) { valEl.value ? zoneEl.focus() : valEl.focus(); return; }
    const [lo, hi] = zone.split(':').map(Number);            // gross yield % range
    const grossLo = value * lo / 100, grossHi = value * hi / 100;
    const netLo = grossLo * (1 - COST), netHi = grossHi * (1 - COST);
    document.getElementById('calcGross').textContent = fmt(grossLo) + ' – ' + fmt(grossHi);
    document.getElementById('calcNet').textContent = fmt(netLo) + ' – ' + fmt(netHi);
    document.getElementById('calcMonth').textContent = fmt(netLo/12) + ' – ' + fmt(netHi/12);
    const msg = encodeURIComponent('Hi Mohamed, I used the holiday-home calculator (property value AED ' +
      value.toLocaleString('en-US') + '). Please send me a tailored short-stay income projection.');
    document.getElementById('calcCta').href = 'https://wa.me/971588801766?text=' + msg;
    const res = document.getElementById('calcResult');
    res.hidden = false; res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  btn.addEventListener('click', calc);
  valEl.addEventListener('keydown', e => { if (e.key === 'Enter') calc(); });
})();
