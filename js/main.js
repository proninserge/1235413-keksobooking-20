'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var mapSection = document.querySelector('.map');

mapSection.classList.remove('map--faded');

var fragment = document.createDocumentFragment();

var template = document.querySelector('#pin').content.querySelector('.map__pin');

var pinSection = document.querySelector('.map__pins');

var properties = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var createProperty = function (i) {
  var randomProperty = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: 'Адрес предложения',
      price: randomInteger(10000, 100000),
      type: types[randomInteger(0, (types.length - 1))],
      rooms: randomInteger(1, 5),
      guests: randomInteger(1, 5),
      checkin: checkinTimes[randomInteger(0, (checkinTimes.length - 1))],
      checkout: checkoutTimes[randomInteger(0, (checkoutTimes.length - 1))],
      features: selectFeatures(randomInteger(0, features.length)),
      description: 'Строка',
      photos: selectPhotos(randomInteger(0, photos.length))
    },
    location: {
      x: randomInteger(0, 1200),
      y: randomInteger(130, 630)
    }
  };
  return randomProperty;
};

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var selectFeatures = function (iter) {
  var featuresList = [];
  for (var j = 0; j < iter; j++) {
    featuresList.push(features[j]);
  }
  return featuresList;
};

var selectPhotos = function (iter) {
  var photosList = [];
  for (var j = 0; j < iter; j++) {
    photosList.push(photos[j]);
  }
  return photosList;
};

var createNewLocation = function (k) {
  var newLocation = template.cloneNode(true);
  newLocation.style.left = (properties[k].location.x - PIN_WIDTH / 2) + 'px';
  newLocation.style.top = (properties[k].location.y - PIN_HEIGHT) + 'px';
  newLocation.children[0].src = properties[k].author.avatar;
  newLocation.children[0].alt = properties[k].offer.title;
  return newLocation;
};

for (var i = 0; i < 8; i++) {
  properties.push(createProperty(i));
  fragment.appendChild(createNewLocation(i));
}

pinSection.appendChild(fragment);
