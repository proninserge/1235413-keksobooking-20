'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var PictureSpecs = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  var avatarChooser = document.querySelector('#avatar');
  var avatarContainer = document.querySelector('.ad-form-header__preview img');
  var pictureContainer = document.querySelector('.ad-form__photo-container');
  var pictureChooser = document.querySelector('#images');
  var emptyDiv = document.querySelector('.ad-form__photo--empty');

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
    pic.style.width = PictureSpecs.WIDTH;
    pic.style.height = PictureSpecs.HEIGHT;
    pic.style.borderRadius = PictureSpecs.BORDER_RADIUS;
    newPicture.appendChild(pic);
    pictureContainer.insertBefore(newPicture, emptyDiv);
  };

  var addPictureDiv = function () {
    if (!document.querySelector('.ad-form__photo')) {
      var pictureDiv = document.createElement('div');
      pictureDiv.classList.add('ad-form__photo');
      pictureDiv.classList.add('ad-form__photo--empty');
      pictureContainer.appendChild(pictureDiv);
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
      document.querySelectorAll('.ad-form__photo').forEach(function (pictureDiv) {
        pictureDiv.remove();
      });
    }
    addPictureDiv();
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
