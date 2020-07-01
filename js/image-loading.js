'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarContainer = document.querySelector('.ad-form-header__preview img');
  // var pictureContainer = document.querySelector('.ad-form__photo');
  // var pictureChooser = document.querySelector('#images');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarContainer.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
