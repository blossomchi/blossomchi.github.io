(function () {
  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mark the section in view (home page only)
  var sections = document.querySelectorAll('main section[id]');
  if (!sections.length || !('IntersectionObserver' in window)) return;
  var links = {};
  document.querySelectorAll('.nav a').forEach(function (a) {
    var h = a.getAttribute('href') || '';
    var i = h.indexOf('#');
    if (i > -1) links[h.slice(i + 1)] = a;
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
      if (links[en.target.id]) links[en.target.id].setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  sections.forEach(function (s) { io.observe(s); });
})();
