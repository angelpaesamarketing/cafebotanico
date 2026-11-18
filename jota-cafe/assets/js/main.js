/* ══════════════════════════════════════════════════════════════
   JOTA CAFÉ · interacciones
   Vanilla, sin dependencias. Todo degrada bien si falla algo.
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Cabecera: se compacta al bajar ───────────────────── */
  var hdr = $('#hdr');
  var onScroll = function () {
    if (hdr) hdr.classList.toggle('is-stuck', window.scrollY > 14);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 2. Menú de móvil ────────────────────────────────────── */
  var burger = $('#burger');
  var drawer = $('#drawer');
  var setDrawer = function (open) {
    if (!burger || !drawer) return;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    drawer.hidden = !open;
    document.body.classList.toggle('lock', open);
  };
  if (burger) {
    burger.addEventListener('click', function () {
      setDrawer(burger.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (drawer) {
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () { setDrawer(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setDrawer(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1040) setDrawer(false);
  });

  /* ── 3. Aparición al entrar en pantalla ──────────────────── */
  var reveals = $$('.rv');
  if (calm || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var sibs = $$('.rv', en.target.parentNode);
        var i = Math.max(0, sibs.indexOf(en.target));
        en.target.style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ── 4. El soufflé tiembla ───────────────────────────────── */
  var jig = $('#jig');
  var stack = $('#stack');
  var wobble = function () {
    if (!jig || calm) return;
    jig.classList.toggle('wobble', false);
    void jig.getBoundingClientRect();        // reinicia la animación
    jig.classList.add('wobble');
  };
  if (jig) {
    jig.addEventListener('animationend', function () {
      jig.classList.toggle('wobble', false);
    });
  }
  if (stack) {
    stack.style.cursor = 'pointer';
    stack.setAttribute('tabindex', '0');
    stack.setAttribute('role', 'img');
    stack.setAttribute('aria-label', 'Torre de tres pancakes soufflé con mantequilla y sirope');
    stack.addEventListener('click', wobble);
    stack.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); wobble(); }
    });
  }
  setTimeout(wobble, 700);
  if (!calm) setInterval(wobble, 9000);

  /* ── 5. Ticker: se duplica para que el bucle no corte ───── */
  var ticker = $('#ticker');
  if (ticker && !calm) ticker.innerHTML += ticker.innerHTML;

  /* ── 6. Navegación: marca la sección en la que estás ────── */
  var links = $$('.hdr__nav a');
  var targets = links.map(function (a) { return a.hash ? $(a.hash) : null; }).filter(Boolean);
  if (targets.length && 'IntersectionObserver' in window) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-on', a.hash === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function (t) { navIo.observe(t); });
  }

  /* ── 7. ¿Abierto ahora? Horario real, hora de Madrid ────── */
  /* Lunes a viernes 8:00–21:00 · sábado y domingo 9:00–21:00 */
  var HOURS = { 1: [8, 21], 2: [8, 21], 3: [8, 21], 4: [8, 21], 5: [8, 21], 6: [9, 21], 0: [9, 21] };
  var DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var madridNow = function () {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Madrid',
        weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      var get = function (type) {
        var hit = parts.filter(function (p) { return p.type === type; })[0];
        return hit ? hit.value : '';
      };
      var idx = SHORT.indexOf(get('weekday'));
      var h = parseInt(get('hour'), 10);
      if (h === 24) h = 0;
      return {
        day: idx < 0 ? new Date().getDay() : idx,
        mins: h * 60 + parseInt(get('minute'), 10)
      };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  };

  var hhmm = function (h) { return (h < 10 ? '0' : '') + h + ':00'; };

  var paintStatus = function () {
    var now = madridNow();
    var today = HOURS[now.day];
    var open = now.mins >= today[0] * 60 && now.mins < today[1] * 60;

    var chip = $('#status');
    var chipTxt = $('#statusTxt');
    if (chip && chipTxt) {
      chip.hidden = false;
      chip.classList.toggle('is-open', open);
      chip.classList.toggle('is-closed', !open);
      chipTxt.textContent = open ? 'Abierto ahora' : 'Cerrado ahora';
    }

    var note = $('#hoursNow');
    if (note) {
      if (open) {
        note.textContent = 'Abierto ahora — hoy ' + DAYS[now.day] + ', hasta las ' + hhmm(today[1]) + '.';
      } else if (now.mins < today[0] * 60) {
        note.textContent = 'Cerrado ahora — hoy abrimos a las ' + hhmm(today[0]) + '.';
      } else {
        var next = HOURS[(now.day + 1) % 7];
        note.textContent = 'Cerrado ahora — mañana abrimos a las ' + hhmm(next[0]) + '.';
      }
    }

    $$('.hours tr').forEach(function (tr) {
      var days = (tr.getAttribute('data-day') || '').split(' ');
      tr.classList.toggle('is-today', days.indexOf(String(now.day)) !== -1);
    });
  };
  paintStatus();
  setInterval(paintStatus, 60000);
})();
