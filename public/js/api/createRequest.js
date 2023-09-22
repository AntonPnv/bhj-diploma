/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

  // Объект XMLHttpRequest() для выполнения запроса на сервер
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  // Извлекает параметры запроса из объекта options
  let { url, data, method = 'GET', callback } = options;
  const formData = new FormData();

  // Если метод GET, формируем параметры запроса в URL
  if (method === 'GET') {
    url = url + '?';
    for (let key in data) {
      url += key + '=' + data[key] + '&';
    }
    url = url.slice(0, -1); // Удаляет последний символ '&' из URL
  } else {
    // Формирует данные в объект FormData для POST и других методов
    for (let key in data) {
      formData.append(key, data[key]);
    }
  }

  xhr.open(method, url); // Открывает соединение с сервером
  xhr.send(formData); // Отправляет запрос на сервер

  // Обработчик ошибок при выполнении запроса
  xhr.onerror = function() {
    if (typeof callback === 'function') {
      callback(new Error('Произошла ошибка при загрузке данных на сервер!'));
    }
  };

  // Обработчик события для отслеживания состояния запроса
  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState == xhr.DONE) {
      if (xhr.status === 200) {
        if (typeof callback === 'function') {
          callback(null, xhr.response);
        }
      } else {
        if (typeof callback === 'function') {
          callback(new Error(`Request failed with status: ${xhr.status}`));
        }
      }
    }
  });
};
