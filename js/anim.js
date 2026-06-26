/* ============================================================
   Premium motion layer — decorative only.
   Adds cursor spotlight, hero aura + parallax, and 3D card tilt.
   No content, data, or images are changed.
   ============================================================ */
(function () {
  'use strict';
  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* 1) Cursor spotlight (desktop) */
  if (fine) {
    var sp = document.createElement('div');
    sp.className = 'fx-spotlight';
    sp.setAttribute('aria-hidden', 'true');
    document.body.appendChild(sp);
    var mx = 0, my = 0, spRaf = 0;
    window.addEventListener('pointermove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!spRaf) spRaf = requestAnimationFrame(function () {
        sp.style.setProperty('--mx', mx + 'px');
        sp.style.setProperty('--my', my + 'px');
        spRaf = 0;
      });
    }, { passive: true });
  }

  /* 2) Hero aura (subtle animated glow behind the real photo) */
  var hero = document.querySelector('.hero');
  if (hero && !hero.querySelector('.hero__aura')) {
    var aura = document.createElement('div');
    aura.className = 'hero__aura';
    aura.setAttribute('aria-hidden', 'true');
    var ov = hero.querySelector('.hero__overlay');
    if (ov) ov.insertAdjacentElement('afterend', aura); else hero.insertBefore(aura, hero.firstChild);
  }

  /* 3) Gentle hero parallax on scroll (desktop) */
  if (fine) {
    var hbg = document.querySelector('.hero__bg');
    var hp = document.querySelector('.hero__portrait');
    var sY = 0, pRaf = 0;
    window.addEventListener('scroll', function () {
      sY = window.scrollY || 0;
      if (!pRaf) pRaf = requestAnimationFrame(function () {
        if (sY < 1000) {
          if (hbg) hbg.style.transform = 'translateY(' + (sY * 0.12) + 'px) scale(1.06)';
          if (hp) hp.style.transform = 'translateY(' + (sY * -0.04) + 'px)';
        }
        pRaf = 0;
      });
    }, { passive: true });
  }

  /* 4) 3D tilt on static cards (desktop) */
  if (fine) {
    var tiltSel = '.service-card, .listing-card, .calc__card';
    document.querySelectorAll(tiltSel).forEach(function (c) {
      c.classList.add('tiltable');
      c.addEventListener('pointermove', function (e) {
        var b = c.getBoundingClientRect();
        var px = (e.clientX - b.left) / b.width - 0.5;
        var py = (e.clientY - b.top) / b.height - 0.5;
        c.style.transition = 'transform .08s linear';
        c.style.transform = 'perspective(1000px) rotateX(' + (py * -4) + 'deg) rotateY(' + (px * 5) + 'deg) translateY(-5px)';
      });
      c.addEventListener('pointerleave', function () {
        c.style.transition = '';
        c.style.transform = '';
      });
    });
  }
})();
