'use strict';

(function () {
  var PROPERTY_TITLE = 'Заголовок';
  var PROPERTY_ADDRESS = 'Адрес предложения';
  var PROPERTY_DESCRIPTION = 'Строка';
  var PIN_NUMBER = 8;

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

  var createProperty = function (i) {
    return {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: PROPERTY_TITLE,
        address: PROPERTY_ADDRESS,
        price: window.utils.getRandomInteger(0, 1000000),
        type: TYPES[window.utils.getRandomInteger(0, (TYPES.length - 1))],
        rooms: window.utils.getRandomInteger(1, 3),
        guests: window.utils.getRandomInteger(1, 3),
        checkin: CHECKIN_TIMES[window.utils.getRandomInteger(0, (CHECKIN_TIMES.length - 1))],
        checkout: CHECKOUT_TIMES[window.utils.getRandomInteger(0, (CHECKOUT_TIMES.length - 1))],
        features: getRandomFeatures(window.utils.getRandomInteger(0, FEATURES.length)),
        description: PROPERTY_DESCRIPTION,
        photos: getRandomPhotos(window.utils.getRandomInteger(0, PHOTOS.length))
      },
      location: {
        x: window.utils.getRandomInteger(0, 1200),
        y: window.utils.getRandomInteger(130, 630)
      }
    };
  };

  var getRandomFeatures = function (count) {
    var randomFeatures = [];
    var shuffledFeatures = window.utils.shuffleArray(FEATURES);
    for (var j = 0; j < count; j++) {
      randomFeatures.push(shuffledFeatures[j]);
    }
    return randomFeatures;
  };

  var getRandomPhotos = function (count) {
    var randomPhotos = [];
    var shuffledPhotos = window.utils.shuffleArray(PHOTOS);
    for (var j = 0; j < count; j++) {
      randomPhotos.push(shuffledPhotos[j]);
    }
    return randomPhotos;
  };

  var generatePins = function () {
    var properties = [];
    for (var i = 0; i < PIN_NUMBER; i++) {
      properties.push(createProperty(i));
    }
    return properties;
  };

  // Оставляю файл, т.к. не знаю, понадобится он или нет.
  // var pins = generatePins();

  /* window.data = {
    pins: pins
  };*/
})();
