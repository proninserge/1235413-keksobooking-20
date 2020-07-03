'use strict';

(function () {
  var RoomAndGuestValues = {
    MIN_VALUE: 0,
    MAX_VALUE: 100
  };

  var ApartmentsTypes = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  var adForm = document.querySelector('.ad-form');
  var adFormReset = document.querySelector('.ad-form__reset');
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
  var filter = document.querySelector('.map__filters');

  var InitialCoords = {
    x: window.map.pinMain.style.left,
    y: window.map.pinMain.style.top
  };

  filter.classList.add('hidden');

  var setAddressValue = function () {
    adFormAddress.value = Math.floor(window.map.pinMain.offsetLeft + window.map.MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(window.map.pinMain.offsetTop + window.map.MAIN_PIN_HEIGHT / 2);
  };

  var setPinAddressValue = function () {
    adFormAddress.value = Math.floor(window.map.pinMain.offsetLeft + window.map.MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(window.map.pinMain.offsetTop + (window.map.MAIN_PIN_HEIGHT + window.map.MAIN_PIN_AFTER_HEIGHT));
  };

  var disabledFormElements = function () {
    adForm.classList.add('ad-form--disabled');
    adFormHeader.disabled = true;
    Array.from(adFormFieldsets).forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  var enableFormElements = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormHeader.disabled = false;
    Array.from(adFormFieldsets).forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    adForm.addEventListener('submit', onSubmit);
    adFormReset.addEventListener('click', onFormReset);

    adFormRooms.addEventListener('change', onRoomNumberChange);
    adFormGuests.addEventListener('change', onGuestNumberChange);
    adFormType.addEventListener('change', onTypeChange);
    adFormTime.addEventListener('change', onCheckTimeChange);
  };

  var onRoomNumberChange = function (evt) {
    evt.preventDefault();
    var targetValue = Number(evt.target.value);
    adFormGuests.disabled = false;
    Array.from(adFormGuestsOptions).forEach(function (adFormGuestsOption) {
      if (targetValue < adFormGuestsOption.value) {
        adFormGuests.value = targetValue;
        adFormGuestsOption.disabled = true;
      } else {
        adFormGuestsOption.disabled = false;
      }
    });
    if (targetValue === RoomAndGuestValues.MAX_VALUE) {
      adFormGuests.value = RoomAndGuestValues.MIN_VALUE;
      adFormGuests.disabled = true;
    }
  };

  var onGuestNumberChange = function (evt) {
    evt.preventDefault();
    var targetValue = Number(evt.target.value);
    if (targetValue === RoomAndGuestValues.MIN_VALUE) {
      adFormRooms.value = RoomAndGuestValues.MAX_VALUE;
      adFormGuests.disabled = true;
    }
  };

  var onTypeChange = function (evt) {
    evt.preventDefault();
    var minPrice = ApartmentsTypes[evt.target.value.toUpperCase()];
    adFormPrice.min = minPrice;
    adFormPrice.value = '';
    adFormPrice.placeholder = String(minPrice);
  };

  var priceReset = function () {
    adFormPrice.min = ApartmentsTypes.FLAT;
    adFormPrice.placeholder = String(ApartmentsTypes.FLAT);
  };

  var onCheckTimeChange = function (evt) {
    evt.preventDefault();
    adFormTimeout.value = evt.target.value;
    adFormTimein.value = evt.target.value;
  };

  var onFormReset = function (evt) {
    evt.preventDefault();
    window.pin.removePins();
    window.map.clearPins(); // При удалении пинов удаляет обработчики на пинах
    window.utils.hidePopup();
    window.map.mapSection.classList.add('map--faded');
    filter.reset();
    window.filter.disable();
    adForm.reset();
    priceReset(); // Обнаружил баг без этой функции
    clearFormEventListeners(); // Отписка от обработчика сабмит и обработчиков на элементах
    window.map.setAddress();
    setAddressValue();
    disabledFormElements();
    window.imageLoading.disable();
    window.imageLoading.remove();
  };

  var onError = function () {
    window.utils.createErrorMessage(window.utils.ERROR);
  };

  var onSuccess = function () {
    onFormReset();
    window.utils.createSuccessMessage();
  };

  var onSubmit = function (evt) {
    window.server.upload('https://javascript.pages.academy/keksobooking', new FormData(adForm), onSuccess, onError);
    evt.preventDefault();
  };

  var clearFormEventListeners = function () {
    adForm.removeEventListener('submit', onSubmit);

    adFormRooms.removeEventListener('change', onRoomNumberChange);
    adFormGuests.removeEventListener('change', onGuestNumberChange);
    adFormType.removeEventListener('change', onTypeChange);
    adFormTime.removeEventListener('change', onCheckTimeChange);
  };

  setAddressValue();
  disabledFormElements();

  window.form = {
    filter: filter,
    InitialCoords: InitialCoords,
    setPinAddressValue: setPinAddressValue,
    enableElements: enableFormElements
  };
})();
