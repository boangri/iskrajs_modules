var red = Pin(P8);
var myButton = require('@amperka/button').connect(A0);

myButton.on('press', function() {
  console.log("I'm just pressed");
  red.write(true);
});
 
myButton.on('release', function() {
  console.log("I'm released");
  red.write(false);
});

// var  on = false;
// setInterval(function() {
//   on = !on;
//   red.write(on);
// }, 500);
