'use strict';

(function () {
  var NEW_PHOTO_WIDTH = 45;
  var NEW_PHOTO_HEIGHT = 40;
  var NEW_PHOTO_ALT = 'Фотография жилья';

  var ApartmentTypes = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  var createPropertyCardTemplate = function (generatedPin) {
    var card = document.querySelector('.map__card');
    var newCard = card || templateCard.cloneNode(true);

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

    if (generatedPin.offer.address) {
      newCard.querySelector('.popup__text--address').textContent = generatedPin.offer.address;
      newCard.querySelector('.popup__text--address').classList.remove('hidden');
    } else {
      newCard.querySelector('.popup__text--address').classList.add('hidden');
    }

    if (generatedPin.offer.price) {
      newCard.querySelector('.popup__text--price').textContent = generatedPin.offer.price + '₽/ночь.';
      newCard.querySelector('.popup__text--price').classList.remove('hidden');
    } else {
      newCard.querySelector('.popup__text--price').classList.add('hidden');
    }

    if (generatedPin.offer.type) {
      newCard.querySelector('.popup__type').textContent = ApartmentTypes[generatedPin.offer.type.toUpperCase()];
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


    renderCardFeatures(newCard, generatedPin);

    renderCardPhotos(newCard, generatedPin);

    if (generatedPin.offer.description) {
      newCard.querySelector('.popup__description').textContent = generatedPin.offer.description;
      newCard.querySelector('.popup__description').classList.remove('hidden');
    } else {
      newCard.querySelector('.popup__description').classList.add('hidden');
    }

    return newCard;
  };

  var renderCardFeatures = function (newCard, generatedPin) {
    var featuresList = newCard.querySelector('.popup__features');
    featuresList.innerHTML = '';
    var features = generatedPin.offer.features;
    if (features.length !== 0) {
      features.forEach(function (feature) {
        var newItem = document.createElement('li');
        newItem.classList.add('popup__feature');
        var newClass = 'popup__feature--' + feature;
        newItem.classList.add(newClass);
        featuresList.appendChild(newItem);
        featuresList.classList.remove('hidden');
      });
    } else {
      featuresList.classList.add('hidden');
    }

    return featuresList;
  };

  var renderCardPhotos = function (newCard, generatedPin) {
    var photosList = newCard.querySelector('.popup__photos');
    photosList.innerHTML = '';
    var photos = generatedPin.offer.photos;
    if (photos.length !== 0) {
      photos.forEach(function (photo) {
        var newPhoto = document.createElement('img');
        newPhoto.classList.add('popup__photo');
        newPhoto.width = NEW_PHOTO_WIDTH;
        newPhoto.height = NEW_PHOTO_HEIGHT;
        newPhoto.alt = NEW_PHOTO_ALT;
        newPhoto.src = photo;
        photosList.appendChild(newPhoto);
        photosList.classList.remove('hidden');
      });
    } else {
      photosList.classList.add('hidden');
    }

    return photosList;
  };

  window.card = {
    create: createPropertyCardTemplate
  };
})();
