require("KeyPad").connect([P0,P1,P2,P3],[P4,P5,P6,P7], function(e) {
  print("123A456B789C*0#D"[e]);
});
