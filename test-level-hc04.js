/*
btn - A0
potenciometer - A1
red led - A3
blue blinking led - A4
*/
var btn = require('button').connect(A0);
var rled = A3;
var bled = require('blinking-led').connect(A4, {
  period: 100
});
//var poten = require('poten').connect(A1);
var hc = require('hc04').connect({
  echo: P10,
  trigger: P11
});
var level = require('level').connect(hc, {
  low: 5,
  high: 20,
  accuracy: 0.5,
  period: 1000
});

btn.on('press', function(){
  console.log('Current: '+level.readout());
});

if (level.readout() > 20) {
  rled.write(true);
  bled.write(true);
}

level.on('high', function(e){
  console.log('High mark reached: '+e.temp);
  rled.write(true);
});

level.on('low', function(e){
  console.log('Low mark reached: '+e.temp);
  rled.write(false);
});

level.on('change', function(e){
    console.log(e.temp);
});

level.on('high', function(e){
  bled.write(true);
});

level.on('low', function(e){
  bled.write(false);
});


