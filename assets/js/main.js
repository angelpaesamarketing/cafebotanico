/* Café Botánico — interacciones */
(function () {
  'use strict';
  var qs = function (s, c) { return (c || document).querySelector(s); };
  var qsa = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────── INTRO ───────── */
  var INTRO_MS = 5900;   // duración total de la secuencia
  var PALE_MS = 2250;    // momento en que el fondo pasa a crema
  var KEY = 'botanico-intro-v1';
  var introNode = qs('#intro');
  var introHTML = introNode ? introNode.outerHTML : '';
  var timers = [];

  function clearTimers() {
    timers.forEach(function (t) { clearTimeout(t); });
    timers = [];
  }

  function played() {
    try { return !!sessionStorage.getItem(KEY); } catch (e) { return false; }
  }

  function endIntro(node) {
    clearTimers();
    document.body.classList.remove('lock');
    if (!node) return;
    node.classList.add('done');
    setTimeout(function () {
      if (node.parentNode) node.parentNode.removeChild(node);
    }, 1300);
  }

  function runIntro(node) {
    if (!node) return;
    document.body.classList.add('lock');
    window.scrollTo(0, 0);
    var skip = function () { endIntro(node); };
    var btn = qs('#skip', node);
    if (btn) btn.addEventListener('click', skip);
    node.addEventListener('click', function (e) {
      if (e.target.id !== 'skip') skip();
    });
    timers.push(setTimeout(function () { node.classList.add('pale'); }, PALE_MS));
    timers.push(setTimeout(skip, INTRO_MS));
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
  }

  if (introNode && (reduce || played())) {
    introNode.parentNode.removeChild(introNode);
  } else {
    runIntro(introNode);
  }

  var replay = qs('#replay');
  if (replay) {
    replay.addEventListener('click', function () {
      if (!introHTML) return;
      var old = qs('#intro');
      if (old) old.parentNode.removeChild(old);
      document.body.insertAdjacentHTML('afterbegin', introHTML);
      var fresh = qs('#intro');
      fresh.classList.remove('done', 'pale');
      runIntro(fresh);
    });
  }

  /* ───────── header + parallax ───────── */
  var hdr = qs('#hdr');
  function onScroll() {
    hdr.classList.toggle('stuck', window.scrollY > 40);
    var img = qs('#parallax');
    if (img) {
      var r = img.closest('.pasaje').getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) {
        var p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        img.style.setProperty('--py', (p * -70).toFixed(1) + 'px');
      }
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ───────── menú móvil ───────── */
  var drawer = qs('#drawer');
  var burger = qs('#burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var on = drawer.classList.toggle('on');
      hdr.classList.toggle('open', on);
      document.body.classList.toggle('lock', on);
    });
  }
  qsa('#drawer a').forEach(function (a) {
    a.addEventListener('click', function () {
      drawer.classList.remove('on');
      hdr.classList.remove('open');
      document.body.classList.remove('lock');
    });
  });

  /* ───────── reveal al hacer scroll ───────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

  qsa('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    io.observe(el);
  });

  /* red de seguridad: nada se queda invisible si el observer falla */
  addEventListener('load', function () {
    setTimeout(function () {
      qsa('.reveal').forEach(function (el) {
        if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in');
      });
    }, 400);
  });
})();
