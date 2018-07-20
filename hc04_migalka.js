var hc = require('hc04').connect({
  echo: P8,
  trigger: P9,
});

hc.on('read', function(dist) {
  print(dist);
});
var migalka = require('migalka').connect({
    led1: A3,
    led2: A4,
    button: P10
});

migalka.loop();
hc.loop(1000, 'mm');
