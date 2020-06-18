'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_KEY = 1;

  var mapSection = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var pinSection = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  var createCardOnFirstLoad = function () {
    var popup = window.card.createPropertyCardTemplate(window.data.pins[0]);
    popup.classList.add('hidden');
    mapSection.insertBefore(popup, filtersContainer);
  };

  var onWindowActivation = function (evt) {
    if (evt.which === LEFT_KEY || evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      mapSection.classList.remove('map--faded');
      window.form.enableFormElements();
      window.form.setPinAddressValue();
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

  window.map = {
    pinMain: pinMain
  };
})();
