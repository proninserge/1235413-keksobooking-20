'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_AFTER_HEIGHT = 16;

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

  var setAddress = function () {
    window.map.pinMain.style.left = window.form.InitialCoords.x;
    window.map.pinMain.style.top = window.form.InitialCoords.y;
  };

  var createCardOnFirstLoad = function (pins) {
    var popup = window.card.create(pins[0]);
    popup.classList.add('hidden');
    mapSection.insertBefore(popup, filtersContainer);
  };

  var activatePin = function (evt) {
    if (evt.target.alt) {
      evt.target.closest('.map__pin').classList.add('map__pin--active');
    } else {
      evt.target.classList.add('map__pin--active');
    }
  };

  var deactivatePin = function (evt) {
    if (evt.target.alt) {
      evt.target.closest('.map__pin').classList.remove('map__pin--active');
    } else {
      evt.target.classList.remove('map__pin--active');
    }
  };

  var deactivatePins = function () {
    var pins = pinSection.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(pins).forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var onError = function (message) {
    window.utils.createErrorMessage(message);
  };

  var createPropertyCard = function (evt) {
    var source = Number(evt.target.dataset.id);
    var currentPin = window.map.pinsFilteredSet[source];
    var popup = window.card.create(currentPin);
    var close = popup.querySelector('.popup__close');

    var closePopup = function () {
      popup.classList.add('hidden');
      deactivatePin(evt);
      close.removeEventListener('click', onCloseClick);
      document.removeEventListener('keydown', onEscPress);
    };

    var onCloseClick = function (e) {
      window.utils.onClick(e, closePopup);
    };

    var onEscPress = function (e) {
      window.utils.onEscPress(e, closePopup);
    };

    if (popup.classList.contains('hidden')) {
      popup.classList.remove('hidden');
      close.addEventListener('click', onCloseClick);
      document.addEventListener('keydown', onEscPress);
    }
  };

  var handlePin = function (evt) {
    evt.preventDefault();
    if (evt.target.dataset.id) {
      createPropertyCard(evt);
      deactivatePins();
      activatePin(evt);
    }
  };

  var onPinClick = function (evt) {
    if (evt.which === window.utils.LEFT_KEY) {
      handlePin(evt);
    }
  };

  var onPinEnter = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      handlePin(evt);
    }
  };

  var onSuccess = function (pins) {
    pinSection.appendChild(window.pin.renderAll(pins.slice(0, window.filter.MAX_PINS)));
    window.form.filter.classList.remove('hidden');
    createCardOnFirstLoad(pins);
    window.filter.enable(pins);
    window.imageLoading.enable();

    pinSection.addEventListener('click', onPinClick);
    pinSection.addEventListener('keydown', onPinEnter);
  };

  var clearPins = function () {
    mapSection.removeEventListener('click', onPinClick);
    mapSection.removeEventListener('keydown', onPinEnter);
  };

  var setMainPinPosition = function () {
    pinMain.style.left = (mapSection.offsetWidth / 2 - MAIN_PIN_WIDTH / 2) + 'px';
  };

  var onPinMouseDown = function (evt) {
    if (evt.which === window.utils.LEFT_KEY) {
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
          document.removeEventListener('mousemove', onPinMove);
        }
        window.form.setPinAddressValue();
      };

      var onPinMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.form.setPinAddressValue();
        document.removeEventListener('mousemove', onPinMove);
        document.removeEventListener('mouseup', onPinMouseUp);
      };

      document.addEventListener('mousemove', onPinMove);
      document.addEventListener('mouseup', onPinMouseUp);
    }
  };

  var activateWindow = function () {
    mapSection.classList.remove('map--faded');
    window.form.enableElements();
    window.server.download('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);
  };

  var onWindowClickActivation = function (evt) {
    evt.preventDefault();
    if (mapSection.classList.contains('map--faded')) {
      window.utils.onClick(evt, activateWindow);
    }
  };

  var onWindowEnterActivation = function (evt) {
    evt.preventDefault();
    if (mapSection.classList.contains('map--faded')) {
      window.utils.onEnterPress(evt, activateWindow);
    }
  };

  setMainPinPosition();

  pinMain.addEventListener('mousedown', onWindowClickActivation);
  pinMain.addEventListener('keydown', onWindowEnterActivation);
  pinMain.addEventListener('mousedown', onPinMouseDown);

  window.map = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_AFTER_HEIGHT: MAIN_PIN_AFTER_HEIGHT,
    pinsFilteredSet: [],
    setAddress: setAddress,
    clearPins: clearPins,
    pinMain: pinMain,
    mapSection: mapSection,
    pinSection: pinSection
  };
})();
