document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('offer_discount');
  const closeButtons = modal.querySelectorAll('.offer__close');
  const focusableElements = modal.querySelectorAll('button, a, input');
  const claimDiscountButton = document.getElementById('btn-claim-discount');
  const offerContentOne = document.getElementById('offer_content_one');
  const offerContentTwo = document.getElementById('offer_content_two');
  const phoneInput = offerContentTwo.querySelector('.offer__input');
  const submitDiscountButton = document.getElementById('btn-submit-discount');
  const errorPhone = document.getElementById('error-phone');
  const successModal = document.getElementById('modal-success-offer');
  const closeSuccessButton = successModal.querySelector('.modal__close');

  setTimeout(() => {
    modal.classList.add('active');
    focusableElements.forEach((el) => {
      el.removeAttribute('tabindex');
      el.removeAttribute('disabled');
    });
  }, 5000);

  const closeModal = () => {
    modal.classList.remove('active');
    focusableElements.forEach((el) => {
      el.setAttribute('tabindex', '-1');
      el.setAttribute('disabled', 'true');
    });
  };

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  claimDiscountButton.addEventListener('click', () => {
    offerContentOne.classList.remove('active');
    offerContentTwo.classList.add('active');
  });

  submitDiscountButton.addEventListener('click', (e) => {
    e.preventDefault();

    const phoneNumber = phoneInput.value.trim();

    if (phoneNumber.startsWith('+7') || phoneNumber.startsWith('8')) {
      const phoneRegex = /^(\+7|8)\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;

      if (!phoneRegex.test(phoneNumber)) {
        errorPhone.style.display = 'block';
        phoneInput.focus();

        setTimeout(() => {
          errorPhone.style.display = 'none';
        }, 3000);

        return;
      }
    }

    errorPhone.style.display = 'none';

    fetch('php/formDiscount.php', {
      method: 'POST',
      body: new URLSearchParams({phone: phoneNumber}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          modal.classList.remove('active');
          successModal.classList.add('active');
          document.body.classList.add('active');
          document.documentElement.classList.add('active');
        } else {
          alert(data.message || 'Ошибка при отправке данных.');
        }
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        alert('Ошибка при отправке запроса.');
      });
  });

  closeSuccessButton.addEventListener('click', () => {
    successModal.classList.remove('active');
    document.body.classList.remove('active');
    document.documentElement.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
      successModal.classList.remove('active');
      document.body.classList.remove('active');
      document.documentElement.classList.remove('active');
    }
  });
});