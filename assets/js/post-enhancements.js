(function() {
  var content = document.querySelector('.post-content');
  if (!content) return;

  var bar = document.querySelector('.reading-progress__bar');
  var headings = Array.prototype.slice.call(content.querySelectorAll('h2[id]'));
  var tocLinks = [];

  // Table of contents: only for longer posts with at least three sections.
  if (headings.length >= 3) {
    var nav = document.createElement('nav');
    nav.className = 'toc is-ready';
    nav.setAttribute('aria-label', 'On this page');
    var title = document.createElement('p');
    title.className = 'toc__title';
    title.textContent = 'On this page';
    var list = document.createElement('ul');
    list.className = 'toc__list';
    headings.forEach(function(h) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
      tocLinks.push(a);
    });
    nav.appendChild(title);
    nav.appendChild(list);
    document.querySelector('article.post').appendChild(nav);
  }

  var ticking = false;

  function update() {
    ticking = false;
    if (bar) {
      var rect = content.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var done = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      bar.style.transform = 'scaleX(' + done + ')';
    }
    if (tocLinks.length) {
      var current = -1;
      headings.forEach(function(h, i) {
        if (h.getBoundingClientRect().top <= 120) current = i;
      });
      tocLinks.forEach(function(a, i) {
        if (i === current) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
