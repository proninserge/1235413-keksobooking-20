'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var avatarChooser = document.querySelector('#avatar');
  var avatarContainer = document.querySelector('.ad-form-header__preview img');
  var pictureContainer = document.querySelector('.ad-form__photo-container');
  var pictureChooser = document.querySelector('#images');
  var emptyWrapper = document.querySelector('.ad-form__photo--empty');

  var checkFileType = function (file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  };

  var changeAvatar = function (pictureSrc) {
    avatarContainer.src = pictureSrc;
  };

  var addPictures = function (pictureSrc) {
    var newPicture = document.createElement('div');
    var pic = document.createElement('img');
    newPicture.classList.add('ad-form__photo');
    pic.src = pictureSrc;
    newPicture.appendChild(pic);
    pictureContainer.insertBefore(newPicture, emptyWrapper);
  };

  var addPictureContainer = function () {
    if (!document.querySelector('.ad-form__photo')) {
      var pictureWrapper = document.createElement('div');
      pictureWrapper.classList.add('ad-form__photo');
      pictureWrapper.classList.add('ad-form__photo--empty');
      pictureContainer.appendChild(pictureWrapper);
    }
  };

  var loadFile = function (chooser, callback) {
    var file = chooser.files[0];
    if (checkFileType(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        callback(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  var resetPictures = function () {
    avatarContainer.src = DEFAULT_AVATAR;
    if (document.querySelectorAll('.ad-form__photo')) {
      document.querySelectorAll('.ad-form__photo').forEach(function (pictureWrapper) {
        pictureWrapper.remove();
      });
    }
    addPictureContainer();
  };

  var onAvatarChange = function () {
    loadFile(avatarChooser, changeAvatar);
  };

  var onPhotoAdd = function () {
    loadFile(pictureChooser, addPictures);
  };

  var enableLoading = function () {
    avatarChooser.addEventListener('change', onAvatarChange);
    pictureChooser.addEventListener('change', onPhotoAdd);
  };

  var disableLoading = function () {
    avatarChooser.removeEventListener('change', onAvatarChange);
    pictureChooser.removeEventListener('change', onPhotoAdd);
  };

  window.imageLoading = {
    enable: enableLoading,
    disable: disableLoading,
    remove: resetPictures
  };
})();
