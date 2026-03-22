document.querySelectorAll('pre > code').forEach(function(codeEl) {
  var btn = document.createElement('button');
  btn.textContent = 'Copy';
  btn.className = 'code-copy-btn';
  btn.setAttribute('aria-label', 'Copy code to clipboard');
  btn.addEventListener('click', function() {
    navigator.clipboard.writeText(codeEl.innerText).then(function() {
      btn.textContent = 'Copied!';
      setTimeout(function() { btn.textContent = 'Copy'; }, 1500);
    }).catch(function() {
      btn.textContent = 'Failed';
      setTimeout(function() { btn.textContent = 'Copy'; }, 1500);
    });
  });
  codeEl.parentElement.insertAdjacentElement('afterend', btn);
});
