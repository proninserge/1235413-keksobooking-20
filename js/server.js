'use strict';

(function () {
  var TIMEOUT = 10000;

  var HttpStatuses = {
    SUCCESS: 200
  };

  var HttpResponseTypes = {
    JSON: 'json'
  };

  var HttpMethods = {
    GET: 'GET',
    POST: 'POST'
  };

  var download = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = HttpResponseTypes.JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === HttpStatuses.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(HttpMethods.GET, url);
    xhr.send();
  };

  var upload = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = HttpResponseTypes.JSON;

    xhr.addEventListener('load', function () {
      onSuccess();
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open(HttpMethods.POST, url);
    xhr.send(data);
  };

  window.server = {
    download: download,
    upload: upload
  };
})();
