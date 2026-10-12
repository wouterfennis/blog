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
  // Scrollable code blocks must be reachable by keyboard.
  codeEl.parentElement.setAttribute('tabindex', '0');
  codeEl.parentElement.setAttribute('role', 'region');
  codeEl.parentElement.setAttribute('aria-label', 'Code sample');
  codeEl.parentElement.insertAdjacentElement('afterend', btn);

  // Language label from the fenced block's identifier (language-csharp, language-yaml, ...).
  var match = /language-([\w+#-]+)/.exec(codeEl.className);
  if (match && ['mermaid', 'plaintext', 'text'].indexOf(match[1]) === -1) {
    var label = document.createElement('span');
    label.className = 'code-lang';
    label.setAttribute('aria-hidden', 'true');
    label.textContent = match[1];
    btn.insertAdjacentElement('afterend', label);
  }
});
