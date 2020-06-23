'use strict';

(function () {
  var ERROR = 'Ошибка загрузки объявления';
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_KEY = 1;

  var mainContent = document.querySelector('main');

  var createErrorMessage = function (errorMessage) {
    var errorPopup = document.querySelector('#error').content.querySelector('.error') || document.querySelector('.error');
    errorPopup.innerHTML = '';
    var message = document.createElement('p');
    var closeButton = document.createElement('button');
    message.classList.add('error__message');
    closeButton.classList.add('error__button');
    message.textContent = errorMessage;
    closeButton.textContent = 'Попробовать снова';
    errorPopup.insertAdjacentElement('afterbegin', message);
    errorPopup.insertAdjacentElement('beforeend', closeButton);
    mainContent.insertAdjacentElement('afterbegin', errorPopup);
    errorPopup.classList.remove('hidden');
    var onPopupClick = function (evt) {
      if (evt.which === LEFT_KEY) {
        errorPopup.classList.add('hidden');
        closeButton.removeEventListener('keydown', onButtonKeydown);
      }
    };
    var onButtonKeydown = function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        errorPopup.classList.add('hidden');
        mainContent.removeEventListener('click', onPopupClick);
      }
    };
    mainContent.addEventListener('click', onPopupClick);
    closeButton.addEventListener('keydown', onButtonKeydown);
  };

  var hideErrorPopup = function () {
    createErrorMessage(ERROR);
    var errorPopup = document.querySelector('.error');
    errorPopup.classList.add('hidden');
  };

  hideErrorPopup();

  /* var createSuccessMessage = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    console.log(template);  В консоли отображается либо объект div.success, либо пустой div с классом .success, либо ОЧЕНЬ редко то, что нужно.
  };*/

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    LEFT_KEY: LEFT_KEY,
    ERROR: ERROR,
    createErrorMessage: createErrorMessage
  };
})();
