'use strict';

(function () {
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

  window.utils = {
    getRandomInteger: getRandomInteger,
    shuffleArray: shuffleArray
  };
})();
