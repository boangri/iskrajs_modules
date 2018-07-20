var red = require('poten').connect(A1, {
  low: 0.5,
  high: 0.6
});
var blue = require('poten').connect(A1, {
  low: 0.2,
  high: 0.3
});
var btn = require('button').connect(A0);

btn.on('press', function(){
  console.log('Current: '+red.readout());
});

if (red.readout() > 0.6) P8.write(true);

red.subscribe('high', function(e){
  console.log('High mark reached: '+e.temp);
  P8.write(true);
});

red.subscribe('low', function(e){
  console.log('Low mark reached: '+e.temp);
  P8.write(false);
});

if (blue.readout() < 0.2) P9.write(true);

blue.subscribe('high', function(e){
  console.log('Stop heating: '+e.temp);
  P9.write(false);
});

blue.subscribe('low', function(e){
  console.log('Start heating: '+e.temp);
  P9.write(true);
});


