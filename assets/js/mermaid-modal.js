const modal = document.getElementById('mermaid-modal');
const modalBody = document.getElementById('mermaid-modal-body');
const closeBtn = document.getElementById('mermaid-modal-close');

document.querySelectorAll('.mermaid').forEach(diagram => {
  diagram.addEventListener('click', () => {
    modalBody.innerHTML = diagram.innerHTML;
    modal.classList.add('open');
  });
});

closeBtn.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
