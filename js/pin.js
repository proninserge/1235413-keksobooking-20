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
    for (var i = 0; i < pins.length; i++) {
      if (pins[i].offer) {
        fragment.appendChild(createNewPin(pins[i], i));
      }
    }
    return fragment;
  };

  var removePins = function () {
    var pins = window.map.pinSection.querySelectorAll('button[type="button"]');
    for (var p = 0; p < pins.length; p++) {
      window.map.pinSection.removeChild(pins[p]);
    }
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
