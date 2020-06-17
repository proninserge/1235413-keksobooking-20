'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_AFTER_HEIGHT = 18;

  var pinMain = document.querySelector('.map__pin--main');

  var RoomAndGuestValues = {
    MIN_VALUE: 0,
    MAX_VALUE: 100
  };

  var typeAndPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormPrice = adForm.querySelector('#price');
  var adFormType = adForm.querySelector('#type');
  var adFormAddress = adForm.querySelector('#address');
  var adFormRooms = adForm.querySelector('#room_number');
  var adFormGuests = adForm.querySelector('#capacity');
  var adFormTime = adForm.querySelector('.ad-form__element--time');
  var adFormTimein = adForm.querySelector('#timein');
  var adFormTimeout = adForm.querySelector('#timeout');
  var adFormGuestsOptions = adFormGuests.querySelectorAll('option');

  var setAddressValue = function () {
    adFormAddress.value = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT / 2);
  };

  var setPinAddressValue = function () {
    adFormAddress.value = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(pinMain.offsetTop + (MAIN_PIN_HEIGHT + MAIN_PIN_AFTER_HEIGHT));
  };

  var disabledFormElements = function () {
    adFormHeader.disabled = true;
    for (var f = 0; f < adFormFieldsets.length; f++) {
      adFormFieldsets[f].disabled = true;
    }
  };

  var enableFormElements = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormHeader.disabled = false;
    for (var n = 0; n < adFormFieldsets.length; n++) {
      adFormFieldsets[n].disabled = false;
    }
  };

  setAddressValue();
  disabledFormElements();

  var onRoomNumberSelection = function (evt) {
    evt.preventDefault();
    var targetValue = Number(evt.target.value);
    adFormGuests.disabled = false;
    for (var o = 0; o < adFormGuestsOptions.length; o++) {
      if (targetValue < adFormGuestsOptions[o].value) {
        adFormGuests.value = targetValue;
        adFormGuestsOptions[o].disabled = true;
      } else {
        adFormGuestsOptions[o].disabled = false;
      }
    }
    if (targetValue === RoomAndGuestValues.MAX_VALUE) {
      adFormGuests.value = RoomAndGuestValues.MIN_VALUE;
      adFormGuests.disabled = true;
    }
  };

  var onGuestNumberSelection = function (evt) {
    evt.preventDefault();
    var targetValue = Number(evt.target.value);
    if (targetValue === RoomAndGuestValues.MIN_VALUE) {
      adFormRooms.value = RoomAndGuestValues.MAX_VALUE;
      adFormGuests.disabled = true;
    }
  };

  var onTypeChange = function (evt) {
    evt.preventDefault();
    var minPrice = typeAndPrice[evt.target.value.toUpperCase()];
    adFormPrice.min = minPrice;
    adFormPrice.value = '';
    adFormPrice.placeholder = String(minPrice);
  };

  var onCheckTimeChange = function (evt) {
    evt.preventDefault();
    adFormTimeout.value = evt.target.value;
    adFormTimein.value = evt.target.value;
  };

  adFormRooms.addEventListener('change', onRoomNumberSelection);
  adFormGuests.addEventListener('change', onGuestNumberSelection);
  adFormType.addEventListener('change', onTypeChange);
  adFormTime.addEventListener('change', onCheckTimeChange);

  window.form = {
    pinMain: pinMain,
    setPinAddressValue: setPinAddressValue,
    enableFormElements: enableFormElements
  };
})();
