var ow = new OneWire(P12);
ow.reset();

// Находим подключенные устройства на шине 1-Wire и отображаем массив
var devices = ow.search();
print(devices);

devices.map(function(device, i){
  var t = new require('DS18B20').connect(ow, device);
  setTimeout(function(){
    t.start();
    setInterval(function(){
      var temp = t.getC();
      print('t'+i+'='+temp);
      t.start();
    }, 1000);
  }, 100*(i+1));
});
