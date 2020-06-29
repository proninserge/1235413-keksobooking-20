'use strict';

(function () {
  var MAX_PINS = 5;

  var defaultFilters = {
    TYPE: 'any',
    PRICE: 'any',
    ROOMS: 'any',
    GUESTS: 'any'
  };

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

  var typeSelect = window.form.filter.querySelector('#housing-type');
  var priceSelect = window.form.filter.querySelector('#housing-price');
  var roomsSelect = window.form.filter.querySelector('#housing-rooms');
  var guestsSelect = window.form.filter.querySelector('#housing-guests');
  // var features = window.form.filter.querySelector('#housing-features');

  var enableFiltration = function (pins) {
    var pinsToRender = pins.slice();
    window.map.pinsFilteredSet = pinsToRender.slice(0, MAX_PINS);

    var getFilterType = function (pin) {
      return pin.offer.type === typeSelect.value || typeSelect.value === defaultFilters.TYPE;
    };

    var getFilterPrice = function (pin) {
      var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
      return (pin.offer.price >= filteringPrice.MIN && pin.offer.price <= filteringPrice.MAX) || priceSelect.value === defaultFilters.PRICE;
    };

    var getFilterRooms = function (pin) {
      return pin.offer.rooms === Number(roomsSelect.value) || roomsSelect.value === defaultFilters.ROOMS;
    };

    var getFilterGuests = function (pin) {
      return pin.offer.guests === Number(guestsSelect.value) || guestsSelect.value === defaultFilters.GUESTS;
    };

    var updatePins = function () {
      var updatedPinsData = pinsToRender.filter(function (pinToRender) {
        return getFilterType(pinToRender) && getFilterPrice(pinToRender) && getFilterRooms(pinToRender) && getFilterGuests(pinToRender);
      });
      updatedPinsData = updatedPinsData.slice(0, MAX_PINS);

      window.map.pinsFilteredSet = updatedPinsData;

      return updatedPinsData;
    };

    var onFilterChange = window.utils.debounce(function () {
      window.utils.hidePopUp();
      window.pin.removePins();
      window.map.pinSection.appendChild(window.pin.renderPins(updatePins()));
    });

    typeSelect.addEventListener('change', onFilterChange);
    priceSelect.addEventListener('change', onFilterChange);
    roomsSelect.addEventListener('change', onFilterChange);
    guestsSelect.addEventListener('change', onFilterChange);
  };

  window.filter = {
    MAX_PINS: MAX_PINS,
    enableFiltration: enableFiltration
  };

})();
