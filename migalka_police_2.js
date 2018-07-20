(function(l1,l2){
  var i = 0;
  var sched = [
    [100, l1, true],
    [100, l1, false],
    [100, l1, true],
    [100, l1, false],
    [100, l1, true],
    [400, l1, false],
    [100, l2, true],
    [100, l2, false],
    [100, l2, true],
    [100, l2, false],
    [100, l2, true],
    [400, l2, false]
  ];
  var id;
    
  var action = function(){
    if(BTN.read() || true) {
      digitalWrite(sched[i][1], sched[i][2]);
      i++;
      if (i == sched.length) i = 0;
      changeInterval(id, sched[i][0]);
    } else {
      changeInterval(id, 100);
      i = 0;
      digitalWrite(l1, false);  
      digitalWrite(l2, false); 
    }
  };
 
  digitalWrite(l1, false);  
  digitalWrite(l2, false); 
  
  digitalWrite(sched[i][1], sched[i][2]);
  id = setInterval(action, sched[i][0]);
  i++;
  
})(A3, A4);
