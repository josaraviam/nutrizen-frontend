// Nutrizen - Component Loader
// Inyecta header y footer globales en cada pagina
// y marca el link activo segun la URL actual

(function () {
  const COMPONENTS_PATH = 'components/';

  function load(selector, file, callback) {
    var el = document.querySelector(selector);
    if (!el) return;
    fetch(COMPONENTS_PATH + file)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.outerHTML = html;
        if (callback) callback();
      })
      .catch(function (e) { console.error('Error cargando ' + file, e); });
  }

  function setActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-links a');
    links.forEach(function (link) {
      link.classList.remove('active');
      var href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  function toggleMenu() {
    var nav = document.getElementById('navLinks');
    if (nav) nav.classList.toggle('open');
  }

  // Exponer toggleMenu globalmente (lo usan los botones hamburguesa)
  window.toggleMenu = toggleMenu;

  document.addEventListener('DOMContentLoaded', function () {
    load('#header-placeholder', 'header.html', setActiveNav);
    load('#footer-placeholder', 'footer.html');
  });
})();
