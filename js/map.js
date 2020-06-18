'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_KEY = 1;

  var MapCoordinates = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var mapSection = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var pinSection = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  var createCardOnFirstLoad = function () {
    var popup = window.card.createPropertyCardTemplate(window.data.pins[0]);
    popup.classList.add('hidden');
    mapSection.insertBefore(popup, filtersContainer);
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
        if (pinY <= (MapCoordinates.MAX_Y - window.form.MAIN_PIN_HEIGHT - window.form.MAIN_PIN_AFTER_HEIGHT) && pinY >= (MapCoordinates.MIN_Y - window.form.MAIN_PIN_HEIGHT - window.form.MAIN_PIN_AFTER_HEIGHT)) {
          pinMain.style.top = pinY + 'px';
        } else {
          pinMain.removeEventListener('mousemove', onPinMove);
        }
        if (pinX <= (MapCoordinates.MAX_X - window.form.MAIN_PIN_WIDTH / 2) && pinX >= (MapCoordinates.MIN_X - window.form.MAIN_PIN_WIDTH / 2)) {
          pinMain.style.left = pinX + 'px';
        } else {
          pinMain.removeEventListener('mousemove', onPinMove);
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
      pinSection.appendChild(window.pin.renderPins(window.data.pins));
      createCardOnFirstLoad();
    }
    pinMain.removeEventListener('mousedown', onWindowActivation);
    pinMain.removeEventListener('keydown', onWindowActivation);
  };

  var createPropertyCard = function (evt) {
    var source = Number(evt.target.dataset.id);
    var currentPin = window.data.pins[source];
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

  pinMain.addEventListener('mousedown', onWindowActivation);
  pinMain.addEventListener('keydown', onWindowActivation);
  pinMain.addEventListener('mousedown', onPinMouseDown);

  window.map = {
    pinMain: pinMain
  };
})();
