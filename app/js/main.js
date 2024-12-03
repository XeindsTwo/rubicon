import {bindScrollToLinks} from './scroll.js';
import {setupMobileMenu} from './mobileMenu.js';

bindScrollToLinks();
setupMobileMenu();

document.addEventListener('DOMContentLoaded', function() {
  const serviceButtons = document.querySelectorAll('[data-service-btn]');
  const serviceBodies = document.querySelectorAll('.services__body');

  serviceBodies.forEach(serviceBody => {
    if (serviceBody.classList.contains('services__body--active')) {
      updateTabIndexes(serviceBody, false);
      serviceBody.style.maxHeight = serviceBody.scrollHeight + 'px';
    } else {
      updateTabIndexes(serviceBody, true);
    }
  });

  serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const serviceBody = this.nextElementSibling;

      document.querySelectorAll('.services__body').forEach((body, index) => {
        const relatedButton = serviceButtons[index];
        if (body !== serviceBody) {
          body.style.maxHeight = '0px';
          body.classList.remove('services__body--active');
          updateTabIndexes(body, true);
          if (relatedButton) {
            relatedButton.classList.remove('active');
          }
        }
      });

      if (serviceBody.classList.contains('services__body--active')) {
        serviceBody.style.maxHeight = '0px';
        serviceBody.classList.remove('services__body--active');
        updateTabIndexes(serviceBody, true);
        this.classList.remove('active');
      } else {
        serviceBody.style.maxHeight = serviceBody.scrollHeight + 'px';
        serviceBody.classList.add('services__body--active');
        updateTabIndexes(serviceBody, false);
        this.classList.add('active');
      }
    });
  });

  function updateTabIndexes(container, isHidden) {
    const focusableElements = container.querySelectorAll('a, button, input, [tabindex]');
    focusableElements.forEach(el => {
      if (isHidden) {
        el.setAttribute('tabindex', '-1');
      } else {
        el.removeAttribute('tabindex');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const serviceButtons = document.querySelectorAll('[data-price-btn]');
  const serviceBodies = document.querySelectorAll('.prices__body');

  serviceBodies.forEach(serviceBody => {
    if (serviceBody.classList.contains('prices__body--active')) {
      updateTabIndexes(serviceBody, false);
      serviceBody.style.maxHeight = serviceBody.scrollHeight + 'px';
    } else {
      updateTabIndexes(serviceBody, true);
    }
  });

  serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const serviceBody = this.nextElementSibling;

      document.querySelectorAll('.prices__body').forEach((body, index) => {
        const relatedButton = serviceButtons[index];
        if (body !== serviceBody) {
          body.style.maxHeight = '0px';
          body.classList.remove('prices__body--active');
          updateTabIndexes(body, true);
          if (relatedButton) {
            relatedButton.classList.remove('active');
          }
        }
      });

      if (serviceBody.classList.contains('prices__body--active')) {
        serviceBody.style.maxHeight = '0px';
        serviceBody.classList.remove('prices__body--active');
        updateTabIndexes(serviceBody, true);
        this.classList.remove('active');
      } else {
        serviceBody.style.maxHeight = serviceBody.scrollHeight + 'px';
        serviceBody.classList.add('prices__body--active');
        updateTabIndexes(serviceBody, false);
        this.classList.add('active');
      }
    });
  });

  function updateTabIndexes(container, isHidden) {
    const focusableElements = container.querySelectorAll('a, button, input, [tabindex]');
    focusableElements.forEach(el => {
      if (isHidden) {
        el.setAttribute('tabindex', '-1');
      } else {
        el.removeAttribute('tabindex');
      }
    });
  }
});

Fancybox.bind("[data-fancybox]", {});