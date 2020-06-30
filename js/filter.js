'use strict';

(function () {
  var MAX_PINS = 5;

  var DEFAULT_FILTER = 'any';

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

  var pinsToRender = [];

  var typeSelect = window.form.filter.querySelector('#housing-type');
  var priceSelect = window.form.filter.querySelector('#housing-price');
  var roomsSelect = window.form.filter.querySelector('#housing-rooms');
  var guestsSelect = window.form.filter.querySelector('#housing-guests');
  var featuresFieldset = window.form.filter.querySelector('#housing-features');
  var featureInputs = window.form.filter.querySelectorAll('input[type=checkbox]');

  var getFilterType = function (pin) {
    return pin.offer.type === typeSelect.value || typeSelect.value === DEFAULT_FILTER;
  };

  var getFilterPrice = function (pin) {
    var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
    return (pin.offer.price >= filteringPrice.MIN && pin.offer.price <= filteringPrice.MAX) || priceSelect.value === DEFAULT_FILTER;
  };

  var getFilterRooms = function (pin) {
    return pin.offer.rooms === Number(roomsSelect.value) || roomsSelect.value === DEFAULT_FILTER;
  };

  var getFilterGuests = function (pin) {
    return pin.offer.guests === Number(guestsSelect.value) || guestsSelect.value === DEFAULT_FILTER;
  };

  // Чекает чекбокс. Это вообще нужно делать вручную?
  var setFilterFeatures = function (evt) {
    Array.from(featureInputs).forEach(function (featureInput) {
      if (featureInput.id === evt.target.dataset.id) {
        featureInput.checked = true;
      }
    });
  };

  var getFilterFeatures = function (pin) {
    var checkedFeatures = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (checkedFeature) {
      return pin.offer.features.includes(checkedFeature.value);
    });
  };

  var updatePins = function () {
    var updatedPinsData = pinsToRender.filter(function (pinToRender) {
      return getFilterType(pinToRender) && getFilterPrice(pinToRender) && getFilterRooms(pinToRender) && getFilterGuests(pinToRender) && getFilterFeatures(pinToRender);
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

  var enableFiltration = function (pins) {
    pinsToRender = pins.slice();
    window.map.pinsFilteredSet = pinsToRender.slice(0, MAX_PINS);

    typeSelect.addEventListener('change', onFilterChange);
    priceSelect.addEventListener('change', onFilterChange);
    roomsSelect.addEventListener('change', onFilterChange);
    guestsSelect.addEventListener('change', onFilterChange);
    featuresFieldset.addEventListener('click', onFilterChange);
    featuresFieldset.addEventListener('click', setFilterFeatures);
  };

  window.filter = {
    MAX_PINS: MAX_PINS,
    enableFiltration: enableFiltration
  };

})();
