'use strict';

(function () {
  var ERROR = 'Ошибка загрузки объявления';
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_KEY = 1;
  var DEBOUNCE_INTERVAL = 500;

  var mainContent = document.querySelector('main');

  var debounce = function (callback) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var hidePopup = function () {
    document.querySelector('.popup').classList.add('hidden');
  };

  var onClick = function (evt, serviceFunction) {
    if (evt.which === LEFT_KEY) {
      serviceFunction();
    }
  };

  var onEscPress = function (evt, serviceFunction) {
    if (evt.keyCode === ESC_KEYCODE) {
      serviceFunction();
    }
  };

  var onEnterPress = function (evt, serviceFunction) {
    if (evt.keyCode === ENTER_KEYCODE) {
      serviceFunction();
    }
  };

  var loadMessageTemplates = function () {
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var successMessage = templateSuccess.cloneNode(true);
    var errorMessage = templateError.cloneNode(true);
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    mainContent.insertAdjacentElement('afterbegin', successMessage);
    mainContent.insertAdjacentElement('afterbegin', errorMessage);

    document.removeEventListener('DOMContentLoaded', loadMessageTemplates);
  };

  var createSuccessMessage = function () {
    var successPopup = document.querySelector('.success');
    successPopup.classList.remove('hidden');

    var hideSuccessPopup = function () {
      successPopup.classList.add('hidden');
    };

    var onPopupClick = function (evt) {
      onClick(evt, hideSuccessPopup);
      mainContent.removeEventListener('click', onPopupClick);
    };

    var onDocumentEsc = function (evt) {
      onEscPress(evt, hideSuccessPopup);
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
      onClick(evt, hideErrorPopup);
      closeButton.removeEventListener('click', onCloseButtonClick);
    };

    var onPopupClick = function (evt) {
      onClick(evt, hideErrorPopup);
      mainContent.removeEventListener('click', onPopupClick);
    };

    var onCloseButtonEnter = function (evt) {
      onEnterPress(evt, hideErrorPopup);
      closeButton.removeEventListener('keydown', onCloseButtonEnter);
    };

    var onDocumentEsc = function (evt) {
      onEscPress(evt, hideErrorPopup);
      document.removeEventListener('keydown', onDocumentEsc);
    };

    mainContent.addEventListener('click', onPopupClick);
    closeButton.addEventListener('click', onCloseButtonClick);
    closeButton.addEventListener('keydown', onCloseButtonEnter);
    document.addEventListener('keydown', onDocumentEsc);
  };

  document.addEventListener('DOMContentLoaded', loadMessageTemplates);

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    LEFT_KEY: LEFT_KEY,
    ERROR: ERROR,
    createSuccessMessage: createSuccessMessage,
    createErrorMessage: createErrorMessage,
    hidePopup: hidePopup,
    onClick: onClick,
    onEnterPress: onEnterPress,
    onEscPress: onEscPress,
    debounce: debounce
  };
})();
