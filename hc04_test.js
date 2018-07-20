var hc = require('hc04').connect({
  echo: P8,
  trigger: P9,
});

hc.on('read', function(dist) {
  print(dist);
});

hc.loop(500, 'mm');