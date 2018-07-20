var p = Pin(A1);

console.log(p.getInfo());

p.mode('analog');

console.log(p.read());

setInterval(function(e){
  console.log(e+analogRead(p))
}, 1000, 'data=');