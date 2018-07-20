/*
btn - A0
poten - A1
red led - P8
blue blinking led - P9
*/

var poten = require('poten').connect(A1, {
  low: 0.5,
  high: 0.6
});
var btn = require('button').connect(A0);
bled = require('blinking-led').connect(P9, {
  period: 100
});

btn.on('press', function(){
  console.log('Current: '+poten.readout());
});

if (poten.readout() > 0.6) {
  P8.write(true);
  bled.write(true);
}

poten.subscribe('high', function(e){
  console.log('High mark reached: '+e.temp);
  P8.write(true);
});

poten.subscribe('low', function(e){
  console.log('Low mark reached: '+e.temp);
  P8.write(false);
});

poten.subscribe('high', function(e){
  bled.write(true);
});

poten.subscribe('low', function(e){
  bled.write(false);
});


