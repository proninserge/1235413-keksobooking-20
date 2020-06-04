'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_NUMBER = 8;

var mapSection = document.querySelector('.map');

mapSection.classList.remove('map--faded');

var template = document.querySelector('#pin').content.querySelector('.map__pin');

var pinSection = document.querySelector('.map__pins');

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var createProperty = function (i) {
  var randomProperty = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: 'Адрес предложения',
      price: getRandomInteger(10000, 100000),
      type: TYPES[getRandomInteger(0, (TYPES.length - 1))],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: CHECKIN_TIMES[getRandomInteger(0, (CHECKIN_TIMES.length - 1))],
      checkout: CHECKOUT_TIMES[getRandomInteger(0, (CHECKOUT_TIMES.length - 1))],
      features: getRandomFeatures(getRandomInteger(0, FEATURES.length)),
      description: 'Строка',
      photos: getRandomPhotos(getRandomInteger(0, PHOTOS.length))
    },
    location: {
      x: getRandomInteger(0, 1200),
      y: getRandomInteger(130, 630)
    }
  };
  return randomProperty;
};

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var shuffleArray = function (array) {
  for (var m = array.length - 1; m > 0; m--) {
    var j = Math.floor(Math.random() * (m + 1));
    var temp = array[m];
    array[m] = array[j];
    array[j] = temp;
  }
  return array;
};

var getRandomFeatures = function (count) {
  var randomFeatures = [];
  FEATURES = shuffleArray(FEATURES);
  for (var j = 0; j < count; j++) {
    randomFeatures.push(FEATURES[j]);
  }
  return randomFeatures;
};

var getRandomPhotos = function (count) {
  var randomPhotos = [];
  PHOTOS = shuffleArray(PHOTOS);
  for (var j = 0; j < count; j++) {
    randomPhotos.push(PHOTOS[j]);
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

pinSection.appendChild(renderPins(generatePins()));
