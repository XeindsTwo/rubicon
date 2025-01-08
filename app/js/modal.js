document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-consultation');
  const closeButton = modal.querySelector('.modal__close');
  const body = document.body;
  const html = document.documentElement;
  const focusableElementsSelector = 'a, button, input, textarea, select, details, [tabindex]';
  const focusableElements = Array.from(document.querySelectorAll(focusableElementsSelector));

  function toggleModal(state) {
    const isActive = state === 'open';

    modal.classList.toggle('active', isActive);
    body.classList.toggle('active', isActive);
    html.classList.toggle('active', isActive);

    focusableElements.forEach(el => {
      if (modal.contains(el)) {
        el.tabIndex = isActive ? 1 : -1;
      } else {
        el.tabIndex = isActive ? -1 : 0;
      }
    });
  }

  document.querySelectorAll('[data-btn-consultation]').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleModal('open');
    });
  });

  closeButton.addEventListener('click', () => toggleModal('close'));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleModal('close');
    }
  });

  document.addEventListener('click', (event) => {
    if (modal.classList.contains('active') && !event.target.closest('.modal')) {
      toggleModal('close');
    }
  });
});