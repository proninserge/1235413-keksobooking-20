'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_NUMBER = 8;
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

var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var template = document.querySelector('#pin').content.querySelector('.map__pin');

var pinSection = document.querySelector('.map__pins');

var templateCard = document.querySelector('#card').content.querySelector('.map__card');

var createProperty = function (i) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: PROPERTY_TITLE,
      address: PROPERTY_ADDRESS,
      price: getRandomInteger(10000, 100000),
      type: TYPES[getRandomInteger(0, (TYPES.length - 1))],
      rooms: getRandomInteger(1, 3),
      guests: getRandomInteger(1, 5),
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

var mapSection = document.querySelector('.map');

mapSection.classList.remove('map--faded');

pinSection.appendChild(renderPins(generatePins()));

var newCard = templateCard.cloneNode(true);

var createPropertyCard = function (generatedPin) {

  if (generatedPin.author.avatar) {
    newCard.querySelector('.popup__avatar').src = generatedPin.author.avatar;
  } else {
    newCard.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (generatedPin.offer.title) {
    newCard.querySelector('.popup__title').textContent = generatedPin.offer.title;
  } else {
    newCard.querySelector('.popup__title').classList.add('hidden');
  }

  if (generatedPin.offer.price) {
    newCard.querySelector('.popup__text--price').textContent = generatedPin.offer.price + '₽/ночь.';
  } else {
    newCard.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (generatedPin.offer.type) {
    newCard.querySelector('.popup__type').textContent = Object.values(generatedPin.offer.type)[0];
  } else {
    newCard.querySelector('.popup__type').classList.add('hidden');
  }

  if (generatedPin.offer.rooms && generatedPin.offer.guests) {
    newCard.querySelector('.popup__text--capacity').textContent = generatedPin.offer.rooms + ' комнаты для ' + generatedPin.offer.guests + ' гостей';
  } else {
    newCard.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (generatedPin.offer.checkin && generatedPin.offer.checkout) {
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + generatedPin.offer.checkin + ', выезд до ' + generatedPin.offer.checkout;
  } else {
    newCard.querySelector('.popup__text--time').classList.add('hidden');
  }


  renderCardFeatures(generatedPin);

  renderCardPhotos(generatedPin);

  if (generatedPin.offer.description) {
    newCard.querySelector('.popup__description').textContent = generatedPin.offer.description;
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
    }
  } else {
    photosList.classList.add('hidden');
  }

  return photosList;
};

var filtersContainer = document.querySelector('.map__filters-container');

var pins = generatePins();

mapSection.insertBefore(createPropertyCard(pins[0]), filtersContainer);
