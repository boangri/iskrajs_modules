// Настраиваем соединение с Ethernet Shield 2
SPI2.setup({baud: 3200000, mosi: B15, miso: B14, sck: B13});
var eth = require('WIZnet').connect(SPI2, P10);
// Подключаем модуль http.
var http = require('http');

// Подключаем реле
var relay = require('@amperka/relay');
var red = relay.connect(P11);
var yellow = relay.connect(P12);
var green = relay.connect(P13);

// Задаём репозиторий в github и ветку, которую хотим отслеживать
var repo = 'boangri/travis-broken-example';
var branch = 'master';
var lastBuild = 0;

// Задаём опции подключения к запрашиваемому серверу
// Поля key, ca и cert необходимы для установления шифрованного соединения https
var options = {
  key :  atob('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'),
  cert :  atob('MIIFijCCA3KgAwIBAgIJANLNn7E5scNGMA0GCSqGSIb3DQEBBQUAMIGBMQswCQYDVQQGEwJVUzELMAkGA1UECAwCTUExDzANBgNVBAcMBkJvc3RvbjETMBEGA1UECgwKRXhhbXBsZSBDbzEQMA4GA1UECwwHdGVjaG9wczELMAkGA1UEAwwCY2ExIDAeBgkqhkiG9w0BCQEWEWNlcnRzQGV4YW1wbGUuY29tMB4XDTE2MDgxMDE0MDEyNFoXDTE5MDUwNjE0MDEyNFowgYYxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJNQTEPMA0GA1UEBwwGQm9zdG9uMRMwEQYDVQQKDApFeGFtcGxlIENvMRAwDgYDVQQLDAd0ZWNob3BzMRAwDgYDVQQDDAdjbGllbnQxMSAwHgYJKoZIhvcNAQkBFhFjZXJ0c0BleGFtcGxlLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAKQeDiU/WPZ9OWg2oA6l76IYBMknHH1rccEFEEDaVbr9PigokVxaiz5MyLMCuWSwON6gyk3Z376UnAtRnkdwcQHWv7hsvgW6VKMyiNQk0P/mfgdUFmzMHkQEZq3LTUgIWHHpQrGHwVOw6a1l6et2aDTwsbTZdMuEBGOj31KZxv3UrbuIsmqqrHhdTFVjJdsabB1qyocb7t7AEqzsEdymsyneIJD6n0zyxA8+KfGJcy7qL7TpV1NVsV/ZzlGHdcb+VO6yMNNjgSKWbciAh8R9il+WiJTJ5IEe3zIDV0uI8FMsAKWKXv/oD7w9PfkJnC6qTc5E4sgHPsMnBP2ix/9kBGVxASxGj+5er8MyPAsGeLc7ASlgeMIYieySY3kmHwelOpHgAphgosTDbkhvYIliM1SKyYCM7UidjJ4zBFhNWPAlDnPT8eNThTNHcPLdlH3KoEC22OF9MENEh6Thppz/bjRP5nEhqWr5PLDPaYBgPBkvgYnCT8CVXsdombC3ov5zvH2Q6nyPcbjLz6yTqkxLmPM0Gib2b36wWDSxACmSs37iyjidc40sm4+k2bHibCOLDm6zazLPJ+dqw7sPrlqvCe+q5zf86nQgcrBNVNpULYy8u/RBwPv5VMlMkuQMsbxD3VcAPnYtEM2/41LNMrBm7Nz6icDEwuRWlHowxe5+xWwbAgMBAAEwDQYJKoZIhvcNAQEFBQADggIBAIq0fsXM/NWlqHecu6EQM18x5JQIeCDrruwrRe9Gj7jEdMka1UzlHWLLnTd6fiyBo0R0Vcdvp96Ic20o5WzK2lx5srBz+B604/Oud682ZE6CogQZUSjw4kxP2GBDjnB8wytgebl5QaLLIHCZTS33WvmE6K2cquxMNmeG9CW4kIi/LKJpcBf7t3Cb5fbusosB32oyRt8BpKi3476A1hhcFRTse0P3RV1NrIyrwgxq0PY+uEtEz9BQRCT1fZohPKlEUMWYzV3Wj8eboaWohW+Tonr2zuu1WhF3bxKe9vd0E3hWoe7bI5I010XlDxogFFokr6MVLzXV95q0zuULu1NqcIAwgttzwe9fsXMd+k+rD9YNNW3fXu4WtqVoovwLIUYNDRQENIIbyigyhCUzIXo97Xn43vKxxTtyu546QrcfgX59hFjxK0yRxwh2EjuUG10bo2UCes6k6QzBvWrH8gNl4mWFyXaqXJJI4o0R5hTIRyVp/lquXYz6pdWNcuR/5SzD/1F0+Z6SJ4xPbxRZTVolPRJ7FFlJ5GaFvkinA4pDskYDvFtfmcy0hdY/0nCJgvYUMtZfMtWYTfKL+4EfjFk1/yqZsNAv/gkP87QQwqA+tn1NJ0kfM0I9n28XDLhdU92f0yHjCScy1o3ewcB7I0smFcUDD4OCYFUiNahxAUA0mwiP'),
  ca :  atob('MIIFgDCCA2gCCQDQNeSIxshM8DANBgkqhkiG9w0BAQUFADCBgTELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAk1BMQ8wDQYDVQQHDAZCb3N0b24xEzARBgNVBAoMCkV4YW1wbGUgQ28xEDAOBgNVBAsMB3RlY2hvcHMxCzAJBgNVBAMMAmNhMSAwHgYJKoZIhvcNAQkBFhFjZXJ0c0BleGFtcGxlLmNvbTAeFw0xNjA4MTAxMzUxMjZaFw0xOTA1MDYxMzUxMjZaMIGBMQswCQYDVQQGEwJVUzELMAkGA1UECAwCTUExDzANBgNVBAcMBkJvc3RvbjETMBEGA1UECgwKRXhhbXBsZSBDbzEQMA4GA1UECwwHdGVjaG9wczELMAkGA1UEAwwCY2ExIDAeBgkqhkiG9w0BCQEWEWNlcnRzQGV4YW1wbGUuY29tMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAs0Tdt33C5DJlFbJBeqbbGDU+ipNNHJeTFU0WC28BUNOPSMcZiWqc99LOCHXaW3M66PYJ9qRoHSoPG2dUBdCTFDeRgh32vVrtKGEgIeILJ19k4d0s2Px8fyOgQQybekDR/o2PWxYxlI+SRS+0SvwJVPqEDzjCaQC7RVMD/r98VvK3uiHziSlQVWTARpbkYWU6PFh9S+rD4Mf6fjY6IKotebHKj5CuS+nv71mUv1l4DmGwTn9kf7ZtLgKEFP51JsuuQ4rXuYWmK2HOn92dquKyXwY+rWwHbXmSW9Toxg4AtQutXd4A6AiNmgNj7Gaa69nnXe7ug4wsMDSLqYWG+1z1FGomTTMngq5eXrURAE5yIPD6KhookZSowdzJKE13S6ijbR/qx8HjaBQD0bi8yrvjGOaXaQwU0NBPBsTBEg6xSQDPgx0nv+4YSLrF9CeDNdWIBPrjrc7wvv7xkG4U6n8ZNG9N9RkC+J6UJQ3C9N57X3xefvi8PbqlMom0ERK9phLjIzyNWqtImO18egS2caYhnccmuHeulFBlfZEoDggdlnL5i0I9QG3Fu9LCE1cziA18q6qbve+sweAH4vVSX/G9ImYfodKWitbDov8lgI+fqaPBK5O1qqgT6ub+NonVPIeicfGBy7VZzDTDImgt8ucA1vXiOSng7ZmLfm3fHD3g3ScCAwEAATANBgkqhkiG9w0BAQUFAAOCAgEAs0SAB49Ws0DudLG+xkFUvMXju+K3o8kJCFNXwzHe6djfTr5dKDwl+Tsx2maQR8JMZfuDcUBeQK/sMxF2Ps3RmQ1rA4OcRYZPwPJXs7LeREZ1mEKJwm4HwOcmnNbuIQ6vqd/TEhc5tpSUpxHytez7QERmncnch4PSJngJCAVgGBUr6sVTJCTBX3hhcsR6JXMVoaXS3OPPpMDwnH4ooS5MV1uZqa9zsubjlJUGEKKFN7Z0FCvPJXI4XC6pHbxQGz4/LeKSeKvBPHG6sTkwJuQFyHm7SXf0E0708tX1FKOCvQFPHAAakccoKDgVxYJhOZ23ZK2ooi43pb7Yu706wgUyZ9B1PPvRymKq2KMaoWvPFC72JuUlLhkIEBONLhsV6gc+rY9HBx6WP6DATRnm5o5HiNQ0gnEjlUnb+ou0BWkVRbIin+iowmYEXuw9/nze8mpC62jufqTu9Uu5NjMr911A4E4VUIHxk7BQ9rLdDppv49bSMU4ccVzXcjCbiP/fo1pPfPHCC96En2sXKGxSEv3HVyJJN2n5E/vVCp/9A7nXZIlGILMD1HHuTqUzs1H6qgtPKWHPLPxo0XGiYhoKMWviP41oPJqRJC1lvrXQV2Ae1+Giz1Ah6s8dR7ufZ0tI+mv2Rg4VOa+gPd2lI/bMhID2hq2DSeZ+am7HHGQrhl5R4OI='),

  // задаем опции подключения к серверу
  host : 'api.travis-ci.org',
  port : '443',
  path :'/repos/'+repo+'/branches/'+branch,
  protocol : 'https:',
  headers : {
    'Accept': 'application/vnd.travis-ci.2+json'
  }
};

// Функция включения реле в зависимости от состояния state
// blink(5) включает реле на 5 секунд, а затем автоматически выключает его
var lightUp = function(state) {
  console.log('lightUP: ', state);
  switch(state) {
    case 'failed': red.blink(5); break;
    case 'passed': green.blink(60); break;
    case 'created': yellow.blink(5); break;
    case 'started': yellow.blink(5); break;
    default: yellow.blink(5);
  }
};

// функция запроса данных с сервера Travis CI
var request = function() {

  var response = '';

  http.get(options, function(res)  {
    // Большие ответы от сервера могут приходить по частям.
    // В переменной response собираем весь ответ целиком.
    res.on('data', function(data) {
      response += data;
    });
    // После закрытия соединения обрабатываем весь пришедший ответ
    res.on('close', function(noError) {
      // Преобразуем ответ сервера из формата JSON в объект JavaScript
      var answer = JSON.parse(response);
      //console.log(answer);
      // проверяем результат преобразования на корректность
      if (answer !== undefined) {
        // Получаем номер и статус последнего теста
        var build = answer.branch.number;
        var state = answer.branch.state;
        console.log(build, state, lastBuild);
        // Если текущий тест в процессе выполнения,
        // ещё успеваем отобразить его статус
        if (state === 'created' || state === 'started') {
          lightUp(state);
        } else {
          // Если появились свежие выполненные тесты,
          // на которые мы ещё не реагировали.
          //if (lastBuild !== build) {
            // Если lastBuild равен нулю, светофор
            // только что включили в питание, а результаты
            // тестов уже известны без виджета.
            if (lastBuild !== 0) {
              lightUp(state);
            }
            // Запоминаем номер последнего теста,
            // чтобы больше на него не реагировать.
            lastBuild = build;
          //}
        }
      }
      // Повторяем запрос к Travis-ci через 5 секунд
      //setTimeout(request, 5000);
    });
  });
};

// Получаем IP-адрес от DHCP-сервера
eth.setIP();

// Делаем первый запрос к сервису
setInterval(request, 5000);