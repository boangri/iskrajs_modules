var hc = require('hc04').connect({
  echo: P10,
  trigger: P11,
});

var level = require('level').connect(hc, {
  high: 20,
  low: 5,
  period: 1000,
  accuracy: 1
});

// hc.on('read', function(dist) {
//   print(dist);
// });

//hc.loop(2000);

// setInterval(function(){
//   hc.read(function(time){
//     print(time*1000000);
//   });
// }, 2000);

// setInterval(function(){
//   print('dist='+hc.readout());
// }, 2000);

level.on('high', function(e){
  print ('high='+e.temp);
});