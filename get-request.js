// Настраиваем соединение с Ethernet Shield по протоколу SPI.
SPI2.setup({baud: 3200000, mosi: B15, miso: B14, sck: B13});
var eth = require('WIZnet').connect(SPI2, P10);
// Подключаем модуль http.
var http = require('http');

// Получаем IP-адрес от DHCP-сервера
eth.setIP();

// Задаём опции подключения к запрашиваемому серверу
var options = {
  host : 'google.ru',
  port : '80',
  path :'/',
  protocol : 'http:',
  headers : {
    'Accept': 'text/html'
  }
};

var request = function () {
  var response = '';
  http.get(options, function(res)  {
    // Большие ответы от сервера могут приходить по частям.
    // В переменной response собираем весь ответ целиком.
    res.on('data', function(data) {
      response += data;
    });
    // После закрытия соединения обрабатываем весь пришедший ответ
    res.on('close', function() {
      if (response === undefined) {
        print('Error. Response is undefined.');
      } else {
        print(response);
      }
      setTimeout(request, 5000);
    });
  });
};

// Производим запрос
request();
  