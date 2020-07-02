'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var createNewPin = function (pin, index) {
    var newLocation = template.cloneNode(true);
    newLocation.style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
    newLocation.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    newLocation.dataset.id = index;
    newLocation.children[0].dataset.id = newLocation.dataset.id;
    newLocation.children[0].src = pin.author.avatar;
    newLocation.children[0].alt = pin.offer.title;
    return newLocation;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin, index) {
      if (pin.offer) {
        fragment.appendChild(createNewPin(pin, index));
      }
    });
    return fragment;
  };

  var removePins = function () {
    var pins = window.map.pinSection.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      window.map.pinSection.removeChild(pin);
    });
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
