/* ============================================================
   Owner Portal — developer marquee + List Property form
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Build the developer marquee (mirrors the main site) ---------- */
  const track = document.getElementById('opTrack');
  if (track) {
    const A = '../assets/logos/';
    const fav = d => `https://www.google.com/s2/favicons?domain=${d}&sz=256`;
    // [name, logoSrc|null, isWordmark]
    const DEVS = [
      ['Emaar', A + 'emaar.png', false],
      ['Omniyat', A + 'omniyat.jpg', false],
      ['Beyond', null, false],
      ['Binghatti', fav('binghatti.com'), false],
      ['DAMAC', fav('damacproperties.com'), false],
      ['Aldar', fav('aldar.com'), false],
      ['Modon', A + 'modon.jpg', false],
      ['Nakheel', A + 'nakheel.jpg', false],
      ['Imtiaz', A + 'imtiaz.png', false],
      ['Ellington', fav('ellingtonproperties.ae'), false],
      ['Sobha Realty', A + 'sobha.png', true],
      ['Meraas', A + 'meraas.png', true],
      ['Select Group', A + 'selectgroup.png', false],
      ['Zaya', A + 'zaya.jpg', true],
      ['H&H', A + 'handh.jpg', false],
      ['Object 1', null, false]
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
  }

  /* ---------- List Property form → email + WhatsApp ---------- */
  const form = document.getElementById('listForm');
  if (!form) return;
  const ENDPOINT = 'https://formsubmit.co/Mohamed@Deluxehomes.ae';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if ((data.get('company_website') || '').toString().trim() !== '') return; // honeypot
    const required = ['name', 'whatsapp', 'email', 'listing', 'community', 'ptype', 'beds'];
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
      fd.append('Listing Type', data.get('listing'));
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
      `Listing: ${data.get('listing')}%0A` +
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
        <p style="color:var(--soft);max-width:44ch;margin:0 auto 1.6rem;">Your property has been sent to Mohamed by email. To confirm on WhatsApp too, tap below — he will value it and respond personally.</p>
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn--gold magnetic">Confirm via WhatsApp</a>
      </div>`;
    form.classList.add('is-sent');
  });
})();
