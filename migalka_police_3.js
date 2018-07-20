(function(l1, l2, b){
  var i = 0;
  var Button = require('button');
  var btn = Button.connect(b, {holdTime: 1});
  var on = false;
  var id;
  
  var sched = [
    [100, l1, 1],
    [100, l1, 0],
    [100, l1, 1],
    [100, l1, 0],
    [100, l1, 1],
    [100, l1, 0],
    [100, l2, 1],
    [100, l2, 0],
    [100, l2, 1],
    [100, l2, 0],
    [100, l2, 1],
    [100, l2, 0]
  ];
  
  var action = function(){
    if(on) {
      digitalWrite(sched[i][1], sched[i][2]);
      i++;
      if (i == sched.length) i = 0;
      changeInterval(id, sched[i][0]);
    } 
  };
 
  digitalWrite(l1, false);  
  digitalWrite(l2, false);
  
  btn.on('hold', function(){
    on = true;
    i = 0;
    id = setInterval(action, 10);
  });
  
  btn.on ('click', function(){
    on = false; 
    digitalWrite(l1, false);  
    digitalWrite(l2, false); 
    if(id) {
      clearInterval(id);
      id = 0;
    }  
  }); 
  
  print('Loop');
})(A3, A4, P10);
