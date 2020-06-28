'use strict';

(function () {
  var MAX_PINS = 5;

  var PriceRange = {
    ANY: {
      MIN: 0,
      MAX: 0
    },

    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },

    LOW: {
      MIN: 0,
      MAX: 10000
    },

    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var selects = window.form.filter.querySelectorAll('.map__filter');
  var typeSelect = window.form.filter.querySelector('#housing-type');
  var priceSelect = window.form.filter.querySelector('#housing-price');
  var roomsSelect = window.form.filter.querySelector('#housing-rooms');
  var guestsSelect = window.form.filter.querySelector('#housing-guests');
  var features = window.form.filter.querySelector('#housing-features');

  var enableFiltration = function (pins) {
    var renderedPins = window.map.pinSection.querySelectorAll('.map__pin:not(.map__pin--main)');

    var filterByType = function () {
      Array.from(renderedPins).forEach(function (renderedPin, index) {
        renderedPin.dataset.type = '0';
        if (typeSelect.value === 'any') {
          renderedPin.dataset.type = '0';
        }
        if (pins[index].offer.type === typeSelect.value) {
          renderedPin.dataset.type = '1';
        }
        renderedPin.dataset.count = Number(renderedPin.dataset.price) + Number(renderedPin.dataset.type) + Number(renderedPin.dataset.rooms);
      });
    };
    typeSelect.addEventListener('change', filterByType);

    var filterbyPrice = function () {
      Array.from(renderedPins).forEach(function (renderedPin, index) {
        renderedPin.dataset.price = '0';
        if (priceSelect.value === 'any') {
          renderedPin.dataset.price = '0';
        }
        var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
        if (pins[index].offer.price >= filteringPrice.MIN && pins[index].offer.price <= filteringPrice.MAX) {
          renderedPin.dataset.price = '1';
        }
        renderedPin.dataset.count = Number(renderedPin.dataset.price) + Number(renderedPin.dataset.type) + Number(renderedPin.dataset.rooms);
      });
    };
    priceSelect.addEventListener('change', filterbyPrice);

    var filterbyRooms = function () {
      Array.from(renderedPins).forEach(function (renderedPin, index) {
        renderedPin.dataset.rooms = '0';
        if (roomsSelect.value === 'any') {
          renderedPin.dataset.rooms = '0';
        }
        if (pins[index].offer.rooms === Number(roomsSelect.value)) {
          renderedPin.dataset.rooms = '1';
        }
        renderedPin.dataset.count = Number(renderedPin.dataset.price) + Number(renderedPin.dataset.type) + Number(renderedPin.dataset.rooms);
      });
    };
    roomsSelect.addEventListener('change', filterbyRooms);

    var onFilter = function () {
      window.utils.hidePopUp();
      var times = 0;
      Array.from(selects).forEach(function (select) {
        if (select.value !== 'any') {
          times++;
        }
      });
      var counts = Array.from(renderedPins).map(function (it) {
        return it.dataset.count;
      });
      var maxValue = Math.max.apply(null, counts);
      Array.from(renderedPins).forEach(function (renderedPin) {
        renderedPin.classList.add('hidden');
        if (Number(renderedPin.dataset.count) === maxValue && maxValue === times) {
          renderedPin.classList.remove('hidden');
        }
      });
    };
    window.form.filter.addEventListener('change', onFilter);
  };

  window.filter = {
    enableFiltration: enableFiltration
  };

})();
