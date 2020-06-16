'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_AFTER_HEIGHT = 18;
var PIN_NUMBER = 8;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var PROPERTY_TITLE = 'Заголовок';
var PROPERTY_ADDRESS = 'Адрес предложения';
var PROPERTY_DESCRIPTION = 'Строка';

var NEW_PHOTO_WIDTH = 45;
var NEW_PHOTO_HEIGHT = 40;
var NEW_PHOTO_ALT = 'Фотография жилья';

var TYPES = [
  {
    palace: 'Дворец'
  },
  {
    flat: 'Квартира'
  },
  {
    house: 'Дом'
  },
  {
    bungalo: 'Бунгало'
  }
];

var RoomAndGuestValues = {
  MIN_VALUE: 0,
  MAX_VALUE: 100
};

var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var template = document.querySelector('#pin').content.querySelector('.map__pin');
var pinSection = document.querySelector('.map__pins');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var mapSection = document.querySelector('.map');
var pinMain = document.querySelector('.map__pin--main');

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
  adFormGuests.disabled = false;
  for (var o = 0; o < adFormGuestsOptions.length; o++) {
    if (evt.target.value < adFormGuestsOptions[o].value) {
      adFormGuests.value = evt.target.value;
      adFormGuestsOptions[o].disabled = true;
    } else {
      adFormGuestsOptions[o].disabled = false;
    }
  }
  if (evt.target.value === String(RoomAndGuestValues.MAX_VALUE)) {
    adFormGuests.value = RoomAndGuestValues.MIN_VALUE;
    adFormGuests.disabled = true;
  }
};

var onGuestNumberSelection = function (evt) {
  evt.preventDefault();
  if (evt.target.value === String(RoomAndGuestValues.MIN_VALUE)) {
    adFormRooms.value = RoomAndGuestValues.MAX_VALUE;
    adFormGuests.disabled = true;
  }
};

var onPriceInput = function (evt) {
  evt.preventDefault();
  var value = Number(adFormPrice.value);
  if (value > 1000000) {
    adFormPrice.setCustomValidity('Введите числовое значение менее 1 000 000');
  } else if (adFormPrice.placeholder === '1000' && value < 1000) {
    adFormPrice.setCustomValidity('Введите числовое значение более 1 000');
  } else if (adFormPrice.placeholder === '5000' && value < 5000) {
    adFormPrice.setCustomValidity('Введите числовое значение более 5 000');
  } else if (adFormPrice.placeholder === '10000' && value < 10000) {
    adFormPrice.setCustomValidity('Введите числовое значение более 10 000');
  } else {
    adFormPrice.setCustomValidity('');
  }
};

var onTypeChange = function (evt) {
  evt.preventDefault();
  if (adFormType.value === 'bungalo') {
    adFormPrice.placeholder = '0';
    adFormPrice.value = '';
  } else if (adFormType.value === 'flat') {
    adFormPrice.placeholder = '1000';
    adFormPrice.value = '';
  } else if (adFormType.value === 'house') {
    adFormPrice.placeholder = '5000';
    adFormPrice.value = '';
  } else if (adFormType.value === 'palace') {
    adFormPrice.placeholder = '10000';
    adFormPrice.value = '';
  }
};

var onCheckTimeChange = function (evt) {
  evt.preventDefault();
  adFormTimeout.value = evt.target.value;
  adFormTimein.value = evt.target.value;
};

var onWindowActivation = function (evt) {
  if (evt.which === 1 || evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    mapSection.classList.remove('map--faded');
    enableFormElements();
    setPinAddressValue();
    pinSection.appendChild(renderPins(generatePins()));
  }
  pinMain.removeEventListener('mousedown', onWindowActivation);
  pinMain.removeEventListener('keydown', onWindowActivation);
};

adFormRooms.addEventListener('change', onRoomNumberSelection);
adFormGuests.addEventListener('change', onGuestNumberSelection);
adFormPrice.addEventListener('input', onPriceInput);
adFormType.addEventListener('change', onTypeChange);
adFormTime.addEventListener('change', onCheckTimeChange);

pinMain.addEventListener('mousedown', onWindowActivation);
pinMain.addEventListener('keydown', onWindowActivation);

var createProperty = function (i) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: PROPERTY_TITLE,
      address: PROPERTY_ADDRESS,
      price: getRandomInteger(0, 1000000),
      type: TYPES[getRandomInteger(0, (TYPES.length - 1))],
      rooms: getRandomInteger(1, 3),
      guests: getRandomInteger(1, 3),
      checkin: CHECKIN_TIMES[getRandomInteger(0, (CHECKIN_TIMES.length - 1))],
      checkout: CHECKOUT_TIMES[getRandomInteger(0, (CHECKOUT_TIMES.length - 1))],
      features: getRandomFeatures(getRandomInteger(0, FEATURES.length)),
      description: PROPERTY_DESCRIPTION,
      photos: getRandomPhotos(getRandomInteger(0, PHOTOS.length))
    },
    location: {
      x: getRandomInteger(0, 1200),
      y: getRandomInteger(130, 630)
    }
  };
};

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var shuffleArray = function (array) {
  var result = array.slice();
  for (var m = result.length - 1; m > 0; m--) {
    var j = Math.floor(Math.random() * (m + 1));
    var temp = result[m];
    result[m] = result[j];
    result[j] = temp;
  }
  return result;
};

var getRandomFeatures = function (count) {
  var randomFeatures = [];
  var shuffledFeatures = shuffleArray(FEATURES);
  for (var j = 0; j < count; j++) {
    randomFeatures.push(shuffledFeatures[j]);
  }
  return randomFeatures;
};

var getRandomPhotos = function (count) {
  var randomPhotos = [];
  var shuffledPhotos = shuffleArray(PHOTOS);
  for (var j = 0; j < count; j++) {
    randomPhotos.push(shuffledPhotos[j]);
  }
  return randomPhotos;
};

var createNewLocation = function (pin) {
  var newLocation = template.cloneNode(true);
  newLocation.style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
  newLocation.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
  newLocation.children[0].src = pin.author.avatar;
  newLocation.children[0].alt = pin.offer.title;
  return newLocation;
};

var generatePins = function () {
  var properties = [];
  for (var i = 0; i < PIN_NUMBER; i++) {
    properties.push(createProperty(i));
  }
  return properties;
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createNewLocation(pins[i]));
  }
  return fragment;
};

/* Отрисовка карточки */
var newCard = templateCard.cloneNode(true);

var createPropertyCard = function (generatedPin) {

  if (generatedPin.author.avatar) {
    newCard.querySelector('.popup__avatar').src = generatedPin.author.avatar;
    newCard.querySelector('.popup__avatar').classList.remove('hidden');
  } else {
    newCard.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (generatedPin.offer.title) {
    newCard.querySelector('.popup__title').textContent = generatedPin.offer.title;
    newCard.querySelector('.popup__title').classList.remove('hidden');
  } else {
    newCard.querySelector('.popup__title').classList.add('hidden');
  }

  if (generatedPin.offer.price) {
    newCard.querySelector('.popup__text--price').textContent = generatedPin.offer.price + '₽/ночь.';
    newCard.querySelector('.popup__text--price').classList.remove('hidden');
  } else {
    newCard.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (generatedPin.offer.type) {
    newCard.querySelector('.popup__type').textContent = Object.values(generatedPin.offer.type)[0];
    newCard.querySelector('.popup__type').classList.remove('hidden');
  } else {
    newCard.querySelector('.popup__type').classList.add('hidden');
  }

  if (generatedPin.offer.rooms && generatedPin.offer.guests) {
    newCard.querySelector('.popup__text--capacity').textContent = generatedPin.offer.rooms + ' комнаты для ' + generatedPin.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--capacity').classList.remove('hidden');
  } else {
    newCard.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (generatedPin.offer.checkin && generatedPin.offer.checkout) {
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + generatedPin.offer.checkin + ', выезд до ' + generatedPin.offer.checkout;
    newCard.querySelector('.popup__text--time').classList.remove('hidden');
  } else {
    newCard.querySelector('.popup__text--time').classList.add('hidden');
  }


  renderCardFeatures(generatedPin);

  renderCardPhotos(generatedPin);

  if (generatedPin.offer.description) {
    newCard.querySelector('.popup__description').textContent = generatedPin.offer.description;
    newCard.querySelector('.popup__description').classList.remove('hidden');
  } else {
    newCard.querySelector('.popup__description').classList.add('hidden');
  }

  return newCard;
};

var renderCardFeatures = function (generatedPin) {
  var featuresList = newCard.querySelector('.popup__features');
  featuresList.innerHTML = '';
  var features = generatedPin.offer.features;
  if (features.length !== 0) {
    for (var n = 0; n < features.length; n++) {
      var newItem = document.createElement('li');
      newItem.classList.add('popup__feature');
      var newClass = 'popup__feature--' + features[n];
      newItem.classList.add(newClass);
      featuresList.appendChild(newItem);
      featuresList.classList.remove('hidden');
    }
  } else {
    featuresList.classList.add('hidden');
  }

  return featuresList;
};

var renderCardPhotos = function (generatedPin) {
  var photosList = newCard.querySelector('.popup__photos');
  photosList.innerHTML = '';
  var photos = generatedPin.offer.photos;
  if (photos.length !== 0) {
    for (var p = 0; p < photos.length; p++) {
      var newPhoto = document.createElement('img');
      newPhoto.classList.add('popup__photo');
      newPhoto.width = NEW_PHOTO_WIDTH;
      newPhoto.height = NEW_PHOTO_HEIGHT;
      newPhoto.alt = NEW_PHOTO_ALT;
      newPhoto.src = photos[p];
      photosList.appendChild(newPhoto);
      photosList.classList.remove('hidden');
    }
  } else {
    photosList.classList.add('hidden');
  }

  return photosList;
};

var filtersContainer = document.querySelector('.map__filters-container');
var pins = generatePins();

var onPinClick = function (evt) {
  if (evt.which === 1 || evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    var source = evt.target.src || evt.target.firstChild.src;
    for (var p = 0; p < pins.length; p++) {
      var target = pins[p].author.avatar;
      if (source.substr(-5, 5) === target.substr(-5, 5)) {
        mapSection.insertBefore(createPropertyCard(pins[p]), filtersContainer);
        var popup = createPropertyCard(pins[p]);
        var close = popup.querySelector('.popup__close');
        var closeCard = function (e) {
          if (e.which === 1 || e.keyCode === ESC_KEYCODE) {
            popup.remove();
            close.removeEventListener('click', closeCard);
            document.removeEventListener('keydown', closeCard);
          }
        };
        close.addEventListener('click', closeCard);
        document.addEventListener('keydown', closeCard);
      }
    }
  }
};

mapSection.addEventListener('click', onPinClick);
mapSection.addEventListener('keydown', onPinClick);
