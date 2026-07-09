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
      launches: [ {n:'Grand Polo Club & Resort', a:'Dubai Investment Park 2', t:'3–4 BR townhouses & 3–5 BR villas', price:'From AED 3.7M', plan:'10/70/20', ho:'Q3 2029', details:['3-bed townhouse (~2,176 sq ft) — from AED 3.7M','4-bed villa — from ~AED 7.27M','5-bed villa — from ~AED 9.93M','Plan: 10% down · 70% during construction · 20% on handover','Master community around polo fields, stables & clubhouse','Minutes from The Oasis, Expo City & Al Maktoum Airport']}, {n:'Address Residences at Dubai Creek Harbour', a:'Dubai Creek Harbour', t:'1–3 BR branded apartments & townhouses', price:'From AED 2.0M', plan:'80/20', ho:'Q1 2029', details:['1-bed from ~AED 2.0M · launch average ~AED 2.69M','Plan: 10% down · 70% during construction · 20% on handover','324 Address-branded, hotel-serviced residences','Creek & skyline views — walkable to Creek Marina & Beach']}, {n:'The Heights Country Club & Wellness', a:'Dubai South / Expo corridor', t:'3–5 BR villas', price:'From AED 6.5M', plan:'10/75/15', ho:'Q3 2030', details:['3, 4 & 5-bed villas — from AED 6.5M','Plan: ~10% down · construction instalments · handover balance','Wellness-led ~81M sq ft masterplan with golf & country club','One of Emaar’s newest 2026 launches — long payment runway']} ] },
    { name: 'Nakheel', pos: 'Iconic Waterfront', positioning: 'Creator of Dubai’s most iconic man-made destinations.', community: 'Palm Jumeirah, Palm Jebel Ali, Dubai Islands.', thesis: 'Landmark waterfront communities with enduring global prestige.',
      launches: [ {n:'Palm Central Private Residences', a:'Palm Jebel Ali', t:'Beachfront apartments & townhouses (1–4 BR)', price:'From AED 2.7M', plan:'20% on booking', ho:'Sep 2030', details:['1 Bedroom — from AED 2.7M','2 Bedroom — from AED 4.3M','3 Bedroom — from AED 7.5M','4 Bedroom — from AED 12.4M','Townhouse — from AED 14.9M','Plan: 20% on booking · staged instalments 2026–2029 · 30–40% on completion','Handover: September 2030','~220 residences — first apartment community on Palm Jebel Ali']}, {n:'Bay Grove Residences', a:'Dubai Islands', t:'1–4 BR apartments & penthouse (final phase)', price:'From AED 1.85M', plan:'70/30', ho:'Q2 2029', details:['1–4 BR residences — from AED 1.85M','Plan: 20% down · 50% during construction · 30% on handover','257 residences across four towers on a shared podium','Direct beach access — lowest entry point on Dubai Islands']}, {n:'Bay Estates', a:'Dubai Islands (Island E)', t:'3–7 BR beachfront townhouses & villas', price:'From AED 4.7M', plan:'15/65/20', ho:'Q4 2028', details:['3–7 BR beachfront townhouses & villas — from AED 4.7M','Plan: ~15% down · 65% during construction · 20% on handover','Private beach frontage & marina promenades','First-phase beachfront collection on Island E']} ] },
    { name: 'Meraas', pos: 'Lifestyle Master Developer', positioning: 'Creator of Dubai’s most vibrant lifestyle destinations.', community: 'City Walk, Bluewaters, Design District (d3), Port de La Mer, La Mer.', thesis: 'Destination-led communities with strong rental demand and a lasting lifestyle premium.',
      launches: [ {n:'Solaya', a:'La Mer, Jumeirah', t:'4–5 BR waterfront villas & grand penthouses', price:'From AED 13.8M', plan:'60/40', ho:'Q3 2029', details:['Ultra-premium 4–5 BR waterfront villas & grand penthouses — from AED 13.8M','Plan: 20% on booking · 40% during construction · 40% on handover','Handover: Q3 2029','Ultra-exclusive private seafront enclave on La Mer, Jumeirah']}, {n:'Atelis at d3', a:'Dubai Design District (d3)', t:'1–4 BR apartments, sky villas & penthouses', price:'From AED 2.1M', plan:'75/25', ho:'Q3 2029', details:['1-bed from ~AED 2.1M · 2-bed from ~AED 3.8M','Sky villas from ~AED 13M · penthouses from ~AED 21.6M','Plan: 20% down · 55% during construction · 25% on handover','Architecture by SOM (Burj Khalifa architects) — canal-front d3']}, {n:'City Walk Northline', a:'Al Wasl, City Walk', t:'1–3 BR apartments', price:'From AED 1.83M', plan:'75/25', ho:'Q3 2027', details:['1–3 BR apartments — from AED 1.83M','Plan: 20% down · 55% during construction · 25% on handover','Overlooks the new Northline boulevard within City Walk','Walkable urban-luxury near Downtown & DIFC']} ] },
    { name: 'DAMAC', pos: 'Luxury Lifestyle', positioning: 'Branded, design-led communities and master-planned waterfront living.', community: 'DAMAC Islands, DAMAC Lagoons, DAMAC Riverside, DAMAC Hills.', thesis: 'High-recognition brand with strong volume, lifestyle amenities and investor liquidity.',
      launches: [ {n:'DAMAC Islands 2', a:'Dubailand', t:'4–7 BR townhouses & villas (waterfront)', price:'From AED 2.75M', plan:'75/25', ho:'Q4 2029', details:['4-bed townhouse — from AED 2.75M','5-bed villa — from ~AED 6.25M · 7-bed flagship AED 18M+','Plan: 10% booking · ~65% during construction · 25% on handover','Launched Nov 2025 — resort-themed island community','Set a Guinness record: ~AED 11B sales within 5 hours']}, {n:'DAMAC Safa Gate', a:'Al Safa, Sheikh Zayed Road', t:'Studio–3 BR apartments', price:'From AED 1.99M', plan:'70/30', ho:'Q4 2029', details:['Studio–3 BR apartments — from AED 1.99M','Plan: 20% down · 50% during construction · 30% on handover','~50-storey tower on SZR overlooking Safa Park & Downtown','Design-led luxury with branded interiors']}, {n:'DAMAC Riverside Views', a:'Dubai Investment Park', t:'1–2 BR waterfront apartments', price:'From AED 888K', plan:'70/30', ho:'2028', details:['1-bed from ~AED 888K · 2-bed from ~AED 1.5M','Plan: 20% down · 50% during construction · 30% on handover','Apartments along a man-made river with green & blue zones','Lowest DAMAC entry point of the current lineup']} ] },
    { name: 'Binghatti', pos: 'Branded Residences', positioning: 'Bold design and globally recognised brand partnerships.', community: 'Business Bay, JVC, Dubai Silicon Oasis.', thesis: 'High-velocity launches with attractive entry points and yields.',
      launches: [ {n:'Binghatti City (Mercedes-Benz Places)', a:'Nad Al Sheba / Meydan', t:'Studios–3 BR apartments', price:'From AED 1.6M', plan:'70/30', ho:'Q2 2028', details:['Studios–3 BR — from ~AED 1.6M','Plan: 20% booking · 50% during construction · 30% on handover','Announced Jan 2026 — ~AED 30B masterplan, largest in Binghatti history','Mercedes-Benz branded district anchored by the 341m Vision Iconic tower']}, {n:'Binghatti Wraith', a:'Al Jaddaf', t:'Studios, 1–3 BR & Royal Suites', price:'From AED 799,999', plan:'60/40', ho:'Jan 2028', details:['Studio from AED 799,999 · 1-bed from ~AED 1.3M','2-bed from ~AED 2.1M · Royal Suites from ~AED 2.5M','Plan: 10% booking · staged instalments · 40% on handover','Launched June 2026 — 6 min to Downtown & Burj Khalifa']}, {n:'Binghatti Aquarise', a:'Business Bay', t:'Studios–4 BR apartments & Royal Suites', price:'From AED 999,999', plan:'70/30', ho:'Q2 2027', details:['Studio from AED 999,999 · 1-bed from ~AED 1.85M','2-bed ~AED 2.75M · 3-bed ~AED 4.5M · 4-bed ~AED 6M','Plan: 20% down · 50% during construction · 30% on handover','Waterfront tower on the Dubai Water Canal, Business Bay']} ] },
    { name: 'Modon', pos: 'Destination Developer', positioning: 'Visionary lifestyle and waterfront destinations.', community: 'Hudayriyat Island and emerging Abu Dhabi fronts.', thesis: 'Early-cycle entry into landmark Abu Dhabi developments.',
      launches: [ {n:'Hudayriyat Golf Estates', a:'Hudayriyat Island, Abu Dhabi', t:'Townhouses, golf homes, villas & mansions (3–6 BR)', price:'From AED 4.25M', plan:'40/60', ho:'2030', details:['3-bed townhouse — from AED 4.25M · 4-bed golf home — from ~AED 7.35M','5-bed villa — from ~AED 10.15M · 6-bed golf mansion — from ~AED 35.55M','Plan: 5% reservation · 35% during construction · 60% on handover','Launched July 2026 — UAE record ~AED 13B+ sales within days','UAE’s first island golf community — 18-hole championship course']}, {n:'Nawayef West', a:'Hudayriyat Island', t:'3–8 BR hillside villas & mansions', price:'From AED 6M', plan:'40/60', ho:'2026–2027', details:['Homes from ~AED 6M · Heights from ~AED 19M · Mansions from ~AED 41M','Plan: 10% booking · 30% during construction · 60% on handover','WATG-designed hillside villas & mansions','Panoramic sea & island views with beach access']}, {n:'Nawayef West Heights', a:'Hudayriyat Island', t:'5–7 BR villas', price:'From AED 19M', plan:'40/60', ho:'Q4 2026', details:['5, 6 & 7-bed villas (818–1,581 sqm) — from AED 19M','Plan: 10% down · 30% during construction · 60% on handover','Private pools, in-villa car galleries, clubhouse & cinema','Premium villa tier of Nawayef West — nearing handover']} ] },
    { name: 'Sobha Realty', pos: 'Luxury Craftsmanship', positioning: 'Premium, meticulously crafted communities with in-house construction.', community: 'Sobha Hartland, Hartland II, Sobha One, Siniya Island.', thesis: 'Quality-led developer with a strong handover record and lasting value retention.',
      launches: [ {n:'Sobha Central', a:'Sheikh Zayed Road', t:'1–3 BR apartments', price:'From AED 1.7M', plan:'60/40', ho:'Q4 2029', details:['1-bed from ~AED 1.7M','Plan: 10% booking · 10% on SPA · 40% construction · 40% handover','Launched 2025 — ~5–6 towers, ~4,275 residences on SZR','Metro-adjacent, sea/skyline views, Golden Visa eligible']}, {n:'Sobha Solis', a:'Dubai Motor City', t:'1–3 BR furnished apartments', price:'From AED 1.15M', plan:'60/40', ho:'Q4 2027', details:['1-bed from ~AED 1.15M · 2-bed from ~AED 2.08M','Plan: 10% down · 50% during construction · 40% on handover','~2,316 fully-furnished residences across four towers','Furnished handover — book with 10% down']}, {n:'Sobha Aquamont', a:'Downtown Umm Al Quwain', t:'1–2 BR apartments & 3 BR duplexes', price:'From AED 1.15M', plan:'10/50/40', ho:'Q4 2028', details:['1-bed from ~AED 1.15M · 3-bed duplex from ~AED 4.3M','Plan: 10% booking · 50% construction · 40% handover (interest-free)','First Sobha launch in Downtown Umm Al Quwain — direct beach access','Freehold beachfront at an accessible entry point']} ] },
    { name: 'Aldar', pos: 'Abu Dhabi Leader', positioning: 'Abu Dhabi’s premier master developer.', community: 'Yas Island, Saadiyat, Al Reem Island.', thesis: 'Capital-city exposure with strong fundamentals and end-user depth.',
      launches: [ {n:'Fahid Beach Residences', a:'Fahid Island, Abu Dhabi', t:'Studio–4 BR apartments, duplexes & penthouses', price:'From AED 3.5M', plan:'65/35', ho:'Q1 2029', details:['1-bed from ~AED 3.5M · 2-bed ~AED 6.3M · 3-bed ~AED 8.9M','Plan: 10% booking · 55% during construction · 35% on handover','~464 residences by Koichi Takada on AED 40B Fahid Island','Abu Dhabi’s biggest 2025 launch — between Saadiyat & Yas']}, {n:'Mamsha Gardens', a:'Saadiyat Island, Abu Dhabi', t:'1–3 BR apartments & townhouses', price:'From AED 3.1M', plan:'10/55/35', ho:'Q2 2028', details:['1-bed from ~AED 3.1M · 2-bed ~AED 5.6M · 3-bed ~AED 8.5M','Plan: 10% at launch · 55% during construction · 35% on handover','Resort-style Saadiyat waterfront — ~493 residences','Walkable to Louvre, Guggenheim & Saadiyat beaches']}, {n:'Nobu Residences', a:'Saadiyat Island, Abu Dhabi', t:'1–3 BR branded apartments, lofts & penthouses', price:'From AED 7.8M', plan:'70/30', ho:'Q2 2027', details:['From ~AED 7.8M · 1-bed from ~AED 8.3M','Plan: 10% deposit · 60% during construction · 30% on handover','Only 88 Nobu-branded residences — Abu Dhabi’s first','Guggenheim views, private beach & four dining venues']} ] },
    { name: 'Imtiaz', pos: 'Boutique Luxury', positioning: 'Fully-furnished, design-led boutique developments.', community: 'Sheikh Zayed Road, Dubai Islands, Meydan, JVC.', thesis: 'Turnkey product engineered for short-stay yield.',
      launches: [ {n:'RAW District', a:'Sheikh Zayed Road', t:'Furnished studios, 1–3 BR, offices & retail (direct metro)', price:'From AED 649K', plan:'50/50 or 60/40 post-handover', ho:'Q1 2029', details:['Studio — from AED 649K · 1BR — from ~AED 889K','2BR — from ~AED 1.48M · 3BR — from ~AED 1.95M','Plan A: 50/50 — 20% booking · 30% construction · 50% completion','Plan B: 60/40 post-handover — balance over ~3 years','Handover: Q1 2029 · fully furnished with smart-home features','Direct metro — minutes to Dubai Marina, Expo City & Al Maktoum Airport']}, {n:'Sea Cliff', a:'Dubai Islands', t:'Furnished 1–4 BR apartments & duplexes', price:'From AED 1.99M', plan:'50/50', ho:'Q1 2028', details:['1-bed from ~AED 1.99M','Plan: 20% booking · 30% during construction · 50% on completion','Boutique ~170 furnished waterfront units with Hermès detailing','Groundbreaking June 2026 — Dubai Islands beachfront']}, {n:'The Symphony', a:'Meydan Horizon (MBR City)', t:'Studio–3 BR apartments, offices & retail', price:'On request', plan:'60/40', ho:'Q2 2029', details:['~40-storey tower designed with Zaha Hadid Architects','Plan: 20% booking · instalments to 2028 · 40% on completion','Part of Imtiaz’s AED 3B Meydan portfolio — launched Nov 2025','Studio–3 BR residences plus Grade-A offices & retail']} ] },
    { name: 'Omniyat', pos: 'Ultra-Luxury', positioning: 'Architecturally daring, collectible waterfront residences.', community: 'Business Bay, Palm Jumeirah, Marasi Bay.', thesis: 'Scarcity-driven trophy assets with strong international demand.',
      launches: [ {n:'AVA at Palm Jumeirah', a:'Palm Jumeirah', t:'Ultra-luxury apartments & sky palace', price:'From AED 78M', plan:'Flexible', ho:'2028', details:['Only 17 residences + a multi-floor sky palace','3–5 BR apartments, duplexes & penthouse with private pools','Service by the Dorchester Collection · 270° sea views','Groundbreaking 2026 — one of Omniyat’s most exclusive addresses']}, {n:'The Alba Residences', a:'Palm Jumeirah', t:'Ultra-luxury 3–4 BR apartments', price:'From AED 44M', plan:'5/55/40', ho:'Q4 2026', details:['3–4 BR residences — from AED 44M','Plan: 5% booking · 55% during construction · 40% on handover','Dorchester Collection branding & service','Beachfront Palm Jumeirah frontage']}, {n:'Vela Viento', a:'Marasi Bay, Business Bay', t:'Apartments, duplexes & penthouses', price:'From AED 28M', plan:'5/55/40', ho:'Q3 2027', details:['Limited edition of 92 residences — from AED 28M','2/3/4-bed apartments, duplexes & penthouses','Plan: 5% booking · 55% during construction · 40% on handover','Waterfront living at Marasi Bay, Business Bay']} ] },
    { name: 'Beyond by Omniyat', pos: 'Premium Lifestyle', positioning: 'Design-forward living from a celebrated luxury house.', community: 'Dubai Maritime City & City of Arabia waterfronts.', thesis: 'Branded waterfront product positioned for premium resale.',
      launches: [ {n:'Arancia Yards (The Yards)', a:'City of Arabia, Dubailand', t:'1–3 BR apartments & townhouses', price:'From AED 1.0M', plan:'40/60', ho:'Q1 2029', details:['1-bed from ~AED 1.0M · 2-bed ~AED 2.1M · 3-bed ~AED 3.3M','Plan: 10% booking · 30% during construction · 60% on handover','Launched June 2026 — Phase 1 of the AED 4B Yards masterplan','Car-free Mediterranean community, lagoons & 2km+ trails']}, {n:'The Mural by Beyond', a:'Dubai Maritime City', t:'Waterfront apartments', price:'From AED 2.47M', plan:'50/50', ho:'Q4 2028', details:['Waterfront high-rise from ~AED 2.47M','Plan: 50% during construction · 50% on handover','Part of Beyond’s 8M sq ft Dubai Maritime City masterplan','Resort-style amenities']}, {n:'Talea by Beyond', a:'Dubai Maritime City (Forest District)', t:'Apartments', price:'From AED 2.2M', plan:'50/50', ho:'Q1 2029', details:['Nature-themed “Forest District” tower — from ~AED 2.2M','Plan: 50% during construction · 50% on handover','Part of the DMC waterfront masterplan','Recent 2026 launch, open for sale']} ] },
    { name: 'Object 1', pos: 'Modern Living', positioning: 'Contemporary residences with strong value engineering.', community: 'JVC, JVT, Al Furjan, Dubailand.', thesis: 'Accessible price points with compelling rental returns.',
      launches: [ {n:'VERDAN1A', a:'Dubailand (DLRC)', t:'Studios, 1 & 2.5 BR apartments', price:'From AED 667K', plan:'60/40 post-handover', ho:'Q1 2027', details:['Studios, 1 & 2.5-bed — from ~AED 667K','Plan: 10% down · 50% construction · 10% handover · 30% post-handover','~208 units, lagoon-style pool & landscaped gardens','Near Dubai Silicon Oasis — Phases 1 & 2 selling']}, {n:'1WOOD Residence (Phase 2)', a:'Jumeirah Village Circle (JVC)', t:'Studios–2.5 BR apartments', price:'From AED 788K', plan:'10/60/30', ho:'Q3 2027', details:['Studios–2.5 BR — from ~AED 788K','Plan: 10% booking · 60% during construction · 30% on handover','191 units — biophilic timber-inspired design','Phase 2 currently selling in JVC']}, {n:'Lum1nar Tower 2', a:'Jumeirah Village Triangle (JVT)', t:'1–2 BR apartments', price:'From AED 957K', plan:'60/40', ho:'Q4 2026', details:['1–2 BR apartments — from ~AED 957K','Plan: flexible 60/40 options','Part of the multi-tower Lum1nar cluster in JVT','Wellness-focused amenities']} ] },
    { name: 'Ellington', pos: 'Design-Led Boutique', positioning: 'Dubai’s leading design-led boutique developer, known for craftsmanship and detail.', community: 'Dubai Islands, Jumeirah Islands, Meydan, Business Bay, JVC.', thesis: 'Design-driven product with strong end-user appeal, premium resale and investor-friendly plans.',
      launches: [ {n:'The Meriva Collection', a:'Dubai Islands', t:'1–4 BR apartments & penthouses (beachfront)', price:'From AED 2.9M', plan:'70/30', ho:'Q2 2030', details:['Launched February 2026 — 1-bed from ~AED 2.9M','Plan: 10% booking · 20% booking phase · 50% construction · 30% handover','903 residences across six G+2 to G+20 buildings','Ellington’s first hospitality-led beachfront destination with on-site hotel']}, {n:'Everly Place', a:'Meydan Horizon (MBR City)', t:'1–3 BR apartments', price:'From AED 2.0M', plan:'20/50/30', ho:'Q4 2029', details:['1–3 BR apartments — from ~AED 2.0M','Plan: 20% booking · 50% during construction · 30% on handover','209 residences overlooking a crystal lagoon','Design-led interiors, lagoon-facing amenities']}, {n:'Eltiera Views', a:'Jumeirah Islands', t:'1–3 BR apartments & penthouses', price:'From AED 2.2M', plan:'70/30', ho:'Dec 2029', details:['1–3 BR from ~AED 2.2M','Plan: 20% booking · 50% during construction · 30% on handover (+4% DLD)','Waterfront island-view residences','Companion tower Eltiera Heights also selling']} ] },
    { name: 'H&H', pos: 'Ultra-Luxury & Hospitality', positioning: 'Dubai luxury real-estate and hospitality developer (est. 2007), partnering with world-class hotel brands on branded residences.', community: 'DIFC, Jumeirah, Sheikh Zayed Road, Mohammed Bin Rashid City.', thesis: 'Internationally branded, architect-led trophy residences with strong prestige and resale demand.',
      launches: [ {n:'Four Seasons Private Residences', a:'DIFC', t:'Branded luxury residences', price:'From AED 33.7M', plan:'', ho:'Q4 2027', details:['Four Seasons-branded private residences in DIFC','From ~AED 33.7M','Handover: Q4 2027','Hotel-serviced branded living in Dubai’s financial district']}, {n:'Rosewood Residences Dubai', a:'Jumeirah', t:'1–5 BR branded apartments', price:'From AED 32.8M', plan:'', ho:'Q4 2029', details:['Rosewood-branded 1–5 bedroom residences','From ~AED 32.8M','Handover: Q4 2029','Ultra-luxury living on the Jumeirah coast']}, {n:'Eden Hills', a:'Mohammed Bin Rashid City', t:'Ultra-luxury villas', price:'From AED 79.9M', plan:'', ho:'Q4 2029', details:['Limited collection of ultra-luxury villas','From ~AED 79.9M','Sales from August 2026 · handover Q4 2029','Green, hillside-inspired masterplan in MBR City']} ] }
  ];
  const grid = document.getElementById('devsGrid');
  if (grid) {
    const LOGO = {
      'Emaar':'emaar.com','Omniyat':'omniyat.com',
      'Binghatti':'binghatti.com','DAMAC':'damacproperties.com','Aldar':'aldar.com','Modon':'modon.ae',
      'Nakheel':'nakheel.com',
      'Ellington':'ellingtonproperties.ae',
      'Sobha Realty':'sobharealty.com','Meraas':'meraas.com',
      'Imtiaz':'imtiazdevelopments.com'
    };
    const FILE = {
      'Emaar':'assets/logos/emaar.png',
      'H&H':'assets/logos/handh.jpg',
      'Omniyat':'assets/logos/omniyat.jpg',
      'Modon':'assets/logos/modon.jpg','Nakheel':'assets/logos/nakheel.jpg',
      'Sobha Realty':'assets/logos/sobha.png',
      'Meraas':'assets/logos/meraas.png',
      'Imtiaz':'assets/logos/imtiaz.png'
    };
    const dt = (s) => {
      const l = (window.MKi18n && window.MKi18n.current) ? window.MKi18n.current() : 'en';
      if (l === 'en' || !window.DEV_T || !window.DEV_T[l]) return s;
      return window.DEV_T[l][s] || s;
    };
    const locPrice = (p, l) => {
      if (!p) return '';
      if (l === 'en') return p;
      if (p === 'On request') return dt('On request');
      return p.replace(/^From\s+/, dt('From') + ' ');
    };

    function renderDevs() {
      const l = (window.MKi18n && window.MKi18n.current) ? window.MKi18n.current() : 'en';
      grid.innerHTML = '';
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
        const planWord = dt('plan'), hoWord = dt('Handover');
        const launches = (d.launches || []).slice(0, 3).map(ln => {
          const detail = [
            locPrice(ln.price, l),
            (ln.plan ? (ln.plan === 'Flexible' ? dt('Flexible') : ln.plan) + ' ' + planWord : ''),
            (ln.ho ? hoWord + ' ' + ln.ho : '')
          ].filter(Boolean).join('  ·  ');
          const breakdown = (ln.details && ln.details.length)
            ? '<ul class="lx">' + ln.details.map(x => `<li>${dt(x)}</li>`).join('') + '</ul>' : '';
          return `<li><span class="ln">${ln.n}</span><span class="la">${dt(ln.a)} &middot; ${dt(ln.t)}</span><span class="lp">${detail}</span>${breakdown}</li>`;
        }).join('');
        const wa = 'https://wa.me/971588801766?text=' +
          encodeURIComponent('Hi Mohamed, please share the latest ' + d.name + ' launches with current prices and payment plans.');
        card.innerHTML = `
          ${logo}
          <div class="dev-card__top">
            <span class="dev-card__name">${d.name.replace(/ (\d+)$/, ' $1')}</span>
            <span class="dev-card__pos">${dt(d.pos)}</span>
          </div>
          <div class="dev-card__body">
            <div class="dev-card__row"><b data-i18n="dev.lbl.positioning">Brand Positioning</b><span>${dt(d.positioning)}</span></div>
            <div class="dev-card__row"><b data-i18n="dev.lbl.community">Community Expertise</b><span>${dt(d.community)}</span></div>
            <div class="dev-card__row"><b data-i18n="dev.lbl.thesis">Investment Thesis</b><span>${dt(d.thesis)}</span></div>
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
      // apply the active language to the freshly-built developer-card labels
      if (window.MKi18n) window.MKi18n.refresh(grid);
    }

    renderDevs();
    document.addEventListener('mk:langchange', renderDevs);
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
  // FormSubmit.co delivers each lead to this inbox (no backend needed).
  const LEAD_EMAIL_ENDPOINT = 'https://formsubmit.co/Mohamed@Deluxehomes.ae';
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    // honeypot: a human never fills this hidden field — silently drop bot submissions
    if ((data.get('company_website') || '').toString().trim() !== '') return;
    const name = (data.get('name') || '').toString().trim();
    const required = ['name', 'whatsapp', 'email', 'budget', 'location', 'objective'];
    for (const f of required) {
      if (!data.get(f)) { form.querySelector(`[name="${f}"]`)?.focus(); return; }
    }

    // 1) Email the lead automatically — fires even as we navigate to WhatsApp.
    try {
      const fd = new FormData();
      fd.append('Name', data.get('name'));
      fd.append('WhatsApp', data.get('whatsapp'));
      fd.append('Email', data.get('email'));
      fd.append('Budget', data.get('budget'));
      fd.append('Location', data.get('location'));
      fd.append('Objective', data.get('objective'));
      fd.append('Message', data.get('message') || '-');
      fd.append('_replyto', data.get('email'));   // tapping "Reply" goes straight to the client
      fd.append('_subject', 'New Private Consultation Request — ' + (data.get('name') || ''));
      fd.append('_template', 'table');
      fd.append('_captcha', 'false');
      fetch(LEAD_EMAIL_ENDPOINT, { method: 'POST', body: fd, mode: 'no-cors', keepalive: true }).catch(() => {});
    } catch (err) {}

    // 2) WhatsApp message — client taps send and Mohamed receives it instantly.
    const msg = `Private Consultation Request%0A%0A` +
      `Name: ${data.get('name')}%0A` +
      `WhatsApp: ${data.get('whatsapp')}%0A` +
      `Email: ${data.get('email')}%0A` +
      `Budget: ${data.get('budget')}%0A` +
      `Location: ${data.get('location')}%0A` +
      `Objective: ${data.get('objective')}%0A` +
      `Message: ${data.get('message') || '-'}`;
    const waUrl = `https://wa.me/971588801766?text=${msg}`;
    try { window.open(waUrl, '_blank', 'noopener'); } catch (err) {}

    form.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:2rem 0;">
        <div style="font-family:var(--serif);font-size:2rem;color:var(--gold);margin-bottom:0.6rem;">Thank you, ${name.split(' ')[0] || 'investor'}.</div>
        <p style="color:var(--soft);max-width:42ch;margin:0 auto 1.6rem;">Your request has been sent to Mohamed by email. To confirm on WhatsApp too, tap below — he will respond personally.</p>
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn--gold magnetic">Confirm via WhatsApp</a>
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
  const portrait = document.querySelector('.hero__portrait-frame');  /* tilt the photo only — keep stat cards steady */
  const cards = [];
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

  /* ---------- Rock-solid auto + finger-drag developer marquee ----------
     Single JS-driven loop (no CSS keyframes to fight with). Works with
     finger on iPad/iPhone: horizontal swipe drags the strip, vertical
     swipe still scrolls the page (direction-locked + touch-action:pan-y). */
  (function(){
    const marquee = document.querySelector('.trust__marquee');
    const track = marquee && marquee.querySelector('.trust__track');
    if (!marquee || !track) return;

    // Kill any CSS animation — we drive the motion entirely from JS.
    track.style.animation = 'none';
    marquee.classList.add('trust__marquee--drag');

    let half = 0;
    const measure = () => { half = track.scrollWidth / 2; };  // content duplicated → one set = half
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    setTimeout(measure, 1200);
    track.querySelectorAll('img').forEach(img => { if (!img.complete) img.addEventListener('load', measure, { once: true }); });

    const SPEED = 34;                 // px / second auto-scroll
    let offset = 0, prev = 0;
    let dragging = false, axis = null, startX = 0, startY = 0, startOffset = 0, moved = 0;
    let paused = false, suppress = false, resumeT;

    const wrap = () => { if (half > 0) { while (offset <= -half) offset += half; while (offset > 0) offset -= half; } };
    const apply = () => { track.style.transform = 'translate3d(' + offset + 'px,0,0)'; };

    function frame(t){
      if (!prev) prev = t;
      const dt = Math.min(0.05, (t - prev) / 1000); prev = t;
      if (!dragging && !paused) { offset -= SPEED * dt; wrap(); apply(); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // Begin a potential drag on any pointer (touch / pen / mouse)
    marquee.addEventListener('pointerdown', (e) => {
      dragging = true; axis = null; moved = 0;
      startX = e.clientX; startY = e.clientY; startOffset = offset;
      clearTimeout(resumeT); paused = true;               // stop auto while touching
    });

    // Move on window so the drag survives the finger leaving the bar
    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (!axis) {                                        // lock direction on first real movement
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
          if (axis === 'y') { dragging = false; paused = false; return; }  // let the page scroll
        } else return;
      }
      moved = Math.max(moved, Math.abs(dx));
      offset = startOffset + dx; wrap(); apply();
      if (e.cancelable) e.preventDefault();               // block rubber-band while dragging horizontally
    }, { passive: false });

    const end = () => {
      if (!dragging && axis !== 'y') { paused = false; return; }
      dragging = false; axis = null;
      if (moved > 6) { suppress = true; setTimeout(() => { suppress = false; }, 70); }
      clearTimeout(resumeT); resumeT = setTimeout(() => { paused = false; }, 600);  // resume glide
    };
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);

    // A genuine swipe shouldn't also open a developer card
    marquee.addEventListener('click', (e) => { if (suppress) { e.stopPropagation(); e.preventDefault(); } }, true);

    // Desktop: pause on hover, resume on leave
    marquee.addEventListener('mouseenter', () => { if (!dragging) paused = true; });
    marquee.addEventListener('mouseleave', () => { if (!dragging) paused = false; });
  })();
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
  const COST = 0.30; // ~30% operating costs (15-25% management, DTCM permit, cleaning, utilities, vacancy)
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

/* ============================================================
   v69 — Investment Tools: tabs + ROI + Mortgage calculators
   ============================================================ */
(function () {
  'use strict';
  const num = (v) => parseFloat(String(v || '').replace(/[^0-9.]/g, '')) || 0;
  const aed = (v) => 'AED ' + Math.round(v).toLocaleString('en-US');

  /* tabs */
  const tabs = document.querySelectorAll('.calc-tab');
  const panels = document.querySelectorAll('.calc-panel');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.toggle('is-active', x === t));
    panels.forEach(p => p.classList.toggle('is-active', p.id === 'panel-' + t.dataset.tab));
  }));

  /* ROI */
  const roiBtn = document.getElementById('roiBtn');
  roiBtn?.addEventListener('click', () => {
    const price = num(document.getElementById('roiPrice').value);
    const rent = num(document.getElementById('roiRent').value);
    if (!price || !rent) return;
    const gross = rent / price * 100;
    const netRent = rent * 0.8;                 // ~20% service charges & costs
    const net = netRent / price * 100;
    const payback = price / netRent;
    document.getElementById('roiGross').textContent = gross.toFixed(1) + '%';
    document.getElementById('roiNet').textContent = net.toFixed(1) + '%';
    document.getElementById('roiPayback').textContent = payback.toFixed(0) + ' yrs';
    document.getElementById('roiResult').hidden = false;
  });

  /* Mortgage */
  const mortBtn = document.getElementById('mortBtn');
  mortBtn?.addEventListener('click', () => {
    const price = num(document.getElementById('mortPrice').value);
    const down = num(document.getElementById('mortDown').value);
    const rate = num(document.getElementById('mortRate').value);
    const years = num(document.getElementById('mortYears').value);
    if (!price || !rate || !years) return;
    const loan = price * (1 - down / 100);
    const r = rate / 100 / 12, n = years * 12;
    const m = loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    document.getElementById('mortLoan').textContent = aed(loan);
    document.getElementById('mortMonthly').textContent = aed(m) + '/mo';
    document.getElementById('mortInterest').textContent = aed(m * n - loan);
    document.getElementById('mortResult').hidden = false;
  });
})();
