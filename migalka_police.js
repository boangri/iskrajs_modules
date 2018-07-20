(function() {
  var i = 0;
  var value = true;
  setInterval(function(){
    if(BTN.read()) {
      digitalWrite(i >= 6 ? A4 : A3, value);
      value = !value;
      i++;
      if (i >= 12) {i = 0;}
    } else {
      digitalWrite(A3, 0);
      digitalWrite(A4, 0);
      i = 0;
    }  
  }, 100);
  
})  (A3, A4);
