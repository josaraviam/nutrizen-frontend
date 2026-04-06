// Nutrizen - Component Loader

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

  function initAgendarButtons() {
    document.querySelectorAll('.nz-agendar').forEach(function (btn) {
      if (btn.dataset.nzBound) return;
      btn.dataset.nzBound = '1';
      btn.addEventListener('click', function (e) {
        var bubble = document.getElementById('nz-chat-bubble');
        if (!bubble) return;
        e.preventDefault();
        var chatWin = document.getElementById('nz-chat-window');
        if (chatWin && !chatWin.classList.contains('nz-open')) {
          if (typeof window.nzOpen === 'function') window.nzOpen();
        }
        setTimeout(function () {
          if (typeof window.nzSend === 'function') {
            window.nzSend('quiero agendar una consulta');
          }
        }, 450);
      });
    });
  }

  window.toggleMenu = toggleMenu;

  document.addEventListener('DOMContentLoaded', function () {
    load('#header-placeholder', 'header.html', function () {
      setActiveNav();
      setTimeout(initAgendarButtons, 150);
    });
    load('#footer-placeholder', 'footer.html');
  });
})();