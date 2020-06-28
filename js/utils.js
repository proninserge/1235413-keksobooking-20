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

  var onClicks = function (evt, serviceFunction) {
    if (evt.which === LEFT_KEY) {
      serviceFunction();
    }
  };

  var onEsc = function (evt, serviceFunction) {
    if (evt.keyCode === ESC_KEYCODE) {
      serviceFunction();
    }
  };

  var onEnter = function (evt, serviceFunction) {
    if (evt.keyCode === ENTER_KEYCODE) {
      serviceFunction();
    }
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

    var hideSuccessPopup = function () {
      successPopup.classList.add('hidden');
    };

    var onPopupClick = function (evt) {
      onClicks(evt, hideSuccessPopup);
      mainContent.removeEventListener('click', onPopupClick);
    };

    var onDocumentEsc = function (evt) {
      onEsc(evt, hideSuccessPopup);
      document.removeEventListener('keydown', onDocumentEsc);
    };

    mainContent.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onDocumentEsc);
  };

  var createErrorMessage = function (errorMessage) {
    var errorPopup = document.querySelector('.error');
    var message = errorPopup.querySelector('.error__message');
    var closeButton = errorPopup.querySelector('.error__button');
    message.textContent = errorMessage;
    errorPopup.classList.remove('hidden');

    var hideErrorPopup = function () {
      errorPopup.classList.add('hidden');
    };

    var onCloseButtonClick = function (evt) {
      onClicks(evt, hideErrorPopup);
      closeButton.removeEventListener('click', onCloseButtonClick);
    };

    var onPopupClick = function (evt) {
      onClicks(evt, hideErrorPopup);
      mainContent.removeEventListener('click', onPopupClick);
    };

    var onCloseButtonEnter = function (evt) {
      onEnter(evt, hideErrorPopup);
      closeButton.removeEventListener('keydown', onCloseButtonEnter);
    };

    var onDocumentEsc = function (evt) {
      onEsc(evt, hideErrorPopup);
      document.removeEventListener('keydown', onDocumentEsc);
    };

    mainContent.addEventListener('click', onPopupClick);
    closeButton.addEventListener('click', onCloseButtonClick);
    closeButton.addEventListener('keydown', onCloseButtonEnter);
    document.addEventListener('keydown', onDocumentEsc);
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    LEFT_KEY: LEFT_KEY,
    ERROR: ERROR,
    createSuccessMessage: createSuccessMessage,
    createErrorMessage: createErrorMessage,
    hidePopUp: hidePopUp,
    onClicks: onClicks,
    onEnter: onEnter,
    onEsc: onEsc
  };
})();
