/*
btn - A0
potenciometer - A1
red led - P8
blue blinking led - P9
*/
var poten = require('poten').connect(A1);

var level = require('level').connect(poten, {
  low: 0.5,
  high: 0.6,
  accuracy: 0.05
});

bled = require('blinking-led').connect(P9, {
  period: 100
});

if (level.readout() > 0.6) {
  P8.write(true);
  bled.write(true);
}

level.on('high', function(e){
  //console.log('High mark reached: '+e.temp);
  P8.write(true);
});

level.on('low', function(e){
  //console.log('Low mark reached: '+e.temp);
  P8.write(false);
});

level.on('high', function(e){
  bled.write(true);
});

level.on('low', function(e){
  bled.write(false);
});


