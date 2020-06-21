'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_AFTER_HEIGHT = 16;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_KEY = 1;

  var mapSection = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var pinSection = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  var MapCoordinates = {
    MIN_X: 0,
    MAX_X: mapSection.offsetWidth,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var createCardOnFirstLoad = function (pins) {
    var popup = window.card.createPropertyCardTemplate(pins[0]);
    popup.classList.add('hidden');
    mapSection.insertBefore(popup, filtersContainer);
  };

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (pins) {
    pinSection.appendChild(window.pin.renderPins(pins));
    createCardOnFirstLoad(pins);
    var dataPins = pins;
    var createPropertyCard = function (evt) {
      var source = Number(evt.target.dataset.id);
      var currentPin = dataPins[source];
      var popup = window.card.createPropertyCardTemplate(currentPin);
      if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
      }
      var close = popup.querySelector('.popup__close');
      var closeCard = function (e) {
        if (e.which === 1 || e.keyCode === ESC_KEYCODE) {
          popup.classList.add('hidden');
          close.removeEventListener('click', closeCard);
          document.removeEventListener('keydown', closeCard);
        }
      };
      close.addEventListener('click', closeCard);
      document.addEventListener('keydown', closeCard);
    };

    var onPinClick = function (evt) {
      if (evt.which === LEFT_KEY || evt.keyCode === ENTER_KEYCODE) {
        evt.preventDefault();
        createPropertyCard(evt);
      }
    };
    mapSection.addEventListener('click', onPinClick);
    mapSection.addEventListener('keydown', onPinClick);
  };

  var setMainPinPosition = function () {
    pinMain.style.left = (mapSection.offsetWidth / 2 - MAIN_PIN_WIDTH / 2) + 'px';
  };

  var onPinMouseDown = function (evt) {
    if (evt.which === LEFT_KEY) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onPinMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var pinX = pinMain.offsetLeft - shift.x;
        var pinY = pinMain.offsetTop - shift.y;
        if ((pinY <= (MapCoordinates.MAX_Y - MAIN_PIN_HEIGHT - MAIN_PIN_AFTER_HEIGHT) && pinY >= (MapCoordinates.MIN_Y - MAIN_PIN_HEIGHT - MAIN_PIN_AFTER_HEIGHT)) && (pinX <= (MapCoordinates.MAX_X - MAIN_PIN_WIDTH / 2) && pinX >= (MapCoordinates.MIN_X - MAIN_PIN_WIDTH / 2))) {
          pinMain.style.top = pinY + 'px';
          pinMain.style.left = pinX + 'px';
        } else {
          pinMain.removeEventListener('mousemove', onPinMove); // изменить далее по заданию
        }
        window.form.setPinAddressValue();
      };

      var onPinMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.form.setPinAddressValue();
        pinMain.removeEventListener('mousemove', onPinMove);
        pinMain.removeEventListener('mouseup', onPinMouseUp);
      };

      pinMain.addEventListener('mousemove', onPinMove);
      pinMain.addEventListener('mouseup', onPinMouseUp);
    }
  };

  var onWindowActivation = function (evt) {
    if (evt.which === LEFT_KEY || evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      mapSection.classList.remove('map--faded');
      window.form.enableFormElements();
      window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);
    }
    pinMain.removeEventListener('mousedown', onWindowActivation);
    pinMain.removeEventListener('keydown', onWindowActivation);
  };

  setMainPinPosition();

  pinMain.addEventListener('mousedown', onWindowActivation);
  pinMain.addEventListener('keydown', onWindowActivation);
  pinMain.addEventListener('mousedown', onPinMouseDown);

  window.map = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_AFTER_HEIGHT: MAIN_PIN_AFTER_HEIGHT,
    pinMain: pinMain
  };
})();
