'use strict';

(function () {
  var ERROR = 'Ошибка загрузки объявления';
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_KEY = 1;

  var mainContent = document.querySelector('main');

  var hidePopUp = function () {
    document.querySelector('.popup').classList.add('hidden');
  };

  document.addEventListener('DOMContentLoaded', function () {
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var successMessage = templateSuccess.cloneNode(true);
    var errorMessage = templateError.cloneNode(true);
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    mainContent.insertAdjacentElement('afterbegin', successMessage);
    mainContent.insertAdjacentElement('afterbegin', errorMessage);
  });

  var createSuccessMessage = function () {
    var successPopup = document.querySelector('.success');
    successPopup.classList.remove('hidden');
    var onPopupClick = function (evt) {
      if (evt.which === LEFT_KEY || evt.keyCode === ESC_KEYCODE) {
        successPopup.classList.add('hidden');
        mainContent.removeEventListener('click', onPopupClick);
        window.removeEventListener('keydown', onPopupClick);
      }
    };
    mainContent.addEventListener('click', onPopupClick);
    window.addEventListener('keydown', onPopupClick);
  };

  var createErrorMessage = function (errorMessage) {
    var errorPopup = document.querySelector('.error');
    var message = errorPopup.querySelector('.error__message');
    var closeButton = errorPopup.querySelector('.error__button');
    message.textContent = errorMessage;
    errorPopup.classList.remove('hidden');
    var onPopupClick = function (evt) {
      if (evt.which === LEFT_KEY || evt.keyCode === ENTER_KEYCODE || evt.keyCode === ESC_KEYCODE) {
        errorPopup.classList.add('hidden');
        closeButton.removeEventListener('keydown', onPopupClick);
        mainContent.removeEventListener('click', onPopupClick);
        window.removeEventListener('keydown', onPopupClick);
      }
    };
    mainContent.addEventListener('click', onPopupClick);
    closeButton.addEventListener('keydown', onPopupClick);
    window.addEventListener('keydown', onPopupClick);
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    LEFT_KEY: LEFT_KEY,
    ERROR: ERROR,
    createSuccessMessage: createSuccessMessage,
    createErrorMessage: createErrorMessage,
    hidePopUp: hidePopUp
  };
})();
