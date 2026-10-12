(function() {
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  var root = document.documentElement;
  var query = window.matchMedia('(prefers-color-scheme: dark)');

  function effective() {
    return root.getAttribute('data-theme') || (query.matches ? 'dark' : 'light');
  }

  function sync() {
    btn.setAttribute('aria-label', effective() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  btn.addEventListener('click', function() {
    var next = effective() === 'dark' ? 'light' : 'dark';
    // Fade colours only for the click itself, so page loads and hovers are unaffected.
    root.classList.add('theme-transition');
    window.setTimeout(function() { root.classList.remove('theme-transition'); }, 300);
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    document.querySelectorAll('meta[name="theme-color"]').forEach(function(m) {
      m.removeAttribute('media');
      m.content = next === 'dark' ? '#14171a' : '#ffffff';
    });
    sync();
    document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
  });

  if (query.addEventListener) query.addEventListener('change', sync);
  sync();
})();
