'use strict';

(function () {
  var NEW_PHOTO_WIDTH = 45;
  var NEW_PHOTO_HEIGHT = 40;
  var NEW_PHOTO_ALT = 'Фотография жилья';

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  var newCard = templateCard.cloneNode(true);

  var createPropertyCardTemplate = function (generatedPin) {

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

  window.card = {
    createPropertyCardTemplate: createPropertyCardTemplate
  };
})();
