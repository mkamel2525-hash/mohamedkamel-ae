/* ============================================================
   Owner Portal — developer marquee + List Property form
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Build the developer marquee (mirrors the main site) ---------- */
  const track = document.getElementById('opTrack');
  if (track) {
    const A = 'assets/logos/';
    const fav = d => `https://www.google.com/s2/favicons?domain=${d}&sz=256`;
    // [name, logoSrc|null, isWordmark]
    const DEVS = [
      ['Emaar', A + 'emaar.png', false],
      ['Omniyat', A + 'omniyat.jpg', false],
      ['Beyond', A + 'beyond.jpg', false],
      ['Binghatti', A + 'binghatti.png', false],
      ['DAMAC', A + 'damac.png', false],
      ['Aldar', A + 'aldar.png', false],
      ['Modon', A + 'modon.jpg', false],
      ['Nakheel', A + 'nakheel.jpg', false],
      ['Imtiaz', A + 'imtiaz.png', false],
      ['Ellington', A + 'ellington.png', false],
      ['Sobha Realty', A + 'sobha.png', true],
      ['Meraas', A + 'meraas.png', true],
      ['Select Group', A + 'selectgroup.png', false],
      ['Zaya', A + 'zaya.jpg', true],
      ['H&H', A + 'handh.jpg', false],
      ['Object 1', A + 'object1.png', false]
    ];
    const chip = ([name, src, wm]) => {
      const cls = 'trust__logo' + (wm ? ' trust__logo--wm' : '');
      const img = src ? `<img alt="${name}" loading="lazy" src="${src}" onerror="this.remove()">` : '';
      return `<span class="${cls}">${img}<b>${name.replace('&', '&amp;')}</b></span>`;
    };
    const set = DEVS.map(chip).join('');
    track.innerHTML = set + set; // duplicate for a seamless loop
    // let the main.js marquee engine re-measure now that the track has content
    setTimeout(() => window.dispatchEvent(new Event('resize')), 60);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 800);

    /* Tap a developer on the blue line → open that developer's latest launches */
    const CHIP_TO_DEV = { 'Beyond': 'Beyond by Omniyat' }; // chip label → dev-card name
    track.addEventListener('click', (e) => {
      const chipEl = e.target.closest('.trust__logo');
      if (!chipEl) return;
      const label = (chipEl.querySelector('b')?.textContent || '').trim();
      const devName = CHIP_TO_DEV[label] || label;
      const card = [...document.querySelectorAll('.dev-card')].find(c => (c.dataset.dev || '') === devName);
      if (!card) return;
      card.classList.add('is-open');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('is-flash');
      setTimeout(() => card.classList.remove('is-flash'), 1400);
    });
    track.style.cursor = 'pointer';
  }

  /* ---------- List Property form → email + WhatsApp ---------- */
  const form = document.getElementById('listForm');
  if (!form) return;
  const ENDPOINT = 'https://formsubmit.co/Mohamed@Deluxehomes.ae';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if ((data.get('company_website') || '').toString().trim() !== '') return; // honeypot
    const required = ['name', 'whatsapp', 'email', 'community', 'ptype', 'beds'];
    for (const f of required) {
      if (!data.get(f)) { form.querySelector(`[name="${f}"]`)?.focus(); return; }
    }
    const name = (data.get('name') || '').toString().trim();
    const price = (data.get('price') || '').toString().trim() || '-';

    // 1) Email the listing lead
    try {
      const fd = new FormData();
      fd.append('Name', data.get('name'));
      fd.append('WhatsApp', data.get('whatsapp'));
      fd.append('Email', data.get('email'));
      fd.append('Listing Type', 'For Sale');
      fd.append('Community / Tower', data.get('community'));
      fd.append('Property Type', data.get('ptype'));
      fd.append('Bedrooms', data.get('beds'));
      fd.append('Asking Price (AED)', price);
      fd.append('Notes', data.get('message') || '-');
      fd.append('_replyto', data.get('email'));
      fd.append('_subject', 'New Property Listing (Owner Portal) — ' + name);
      fd.append('_template', 'table');
      fd.append('_captcha', 'false');
      fetch(ENDPOINT, { method: 'POST', body: fd, mode: 'no-cors', keepalive: true }).catch(() => {});
    } catch (err) {}

    // 2) WhatsApp
    const msg = `Property Listing Request (Owner Portal)%0A%0A` +
      `Name: ${data.get('name')}%0A` +
      `WhatsApp: ${data.get('whatsapp')}%0A` +
      `Email: ${data.get('email')}%0A` +
      `Listing: For Sale%0A` +
      `Community/Tower: ${data.get('community')}%0A` +
      `Type: ${data.get('ptype')}%0A` +
      `Bedrooms: ${data.get('beds')}%0A` +
      `Asking Price: ${price}%0A` +
      `Notes: ${data.get('message') || '-'}`;
    const waUrl = `https://wa.me/971588801766?text=${msg}`;
    try { window.open(waUrl, '_blank', 'noopener'); } catch (err) {}

    form.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:2rem 0;">
        <div style="font-family:var(--serif);font-size:2rem;color:var(--gold);margin-bottom:0.6rem;">Thank you, ${name.split(' ')[0] || 'owner'}.</div>
        <p style="color:var(--soft);max-width:44ch;margin:0 auto 1.6rem;">Your property has been sent to Deluxe Homes by email. To confirm on WhatsApp too, tap below — our team will value it and respond personally.</p>
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn--gold magnetic">Confirm via WhatsApp</a>
      </div>`;
    form.classList.add('is-sent');
  });
})();
