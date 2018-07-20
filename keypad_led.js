var exports = {};

exports.connect = function (columns, rows, callback) {
  var watches = [];
  var lastState = 0;
  var readState = function() {
    var press = -1;
    for (var i in rows) {
      digitalWrite(rows, 1 << i);
      var v = digitalRead(columns);
      for (var j in columns)
        if (v & (1<<j))
          press = j+i*columns.length;
    }
    // reset state
    digitalWrite(rows, 0xFFFFFFFF);
    return press;
  };
  var setup = function() {
    for (var i in columns) pinMode(columns[i], "input_pulldown");
    digitalWrite(rows, 0xFFFFFFFF);
  };
  var onWatch = function() {
    var s = digitalRead(columns);
    if (s!=lastState) {
      lastState = s;
      removeWatches();
      var c = readState();
      addWatches();
      if (c>=0) callback(c);
    }
  };
  var addWatches = function() {
    for (var i in columns)
      watches[i] = setWatch(onWatch, columns[i], { repeat:true, edge:"both" });
  };
  var removeWatches = function() {
    for (var i in watches)
      clearWatch(watches[i]);
  };
  setup();
  if (callback!==undefined) addWatches();
  return {
    read: readState
  };
};



function led_print(e){
  print("123A456B789C*0#D"[e]);
  digitalWrite(A3,1);
  setTimeout(function(){digitalWrite(A3,0);}, 300);
  
}



var SPEAKERA = P8;
var SPEAKERB = P9;
var silenceTimeout;

function onKeyPad(key) {
  print("123A456B789C*0#D"[key]);
  digitalWrite(A3,1);
  // tones for the row and column
  var tone_col = [1209, 1336, 1477, 1633];
  var tone_row = [697, 770, 852, 941];
  // our key is a number between 0 and 15
  // work out row and column
  var col = key&3;
  var row = key>>2;
  // now output two tones, one on each pin
  analogWrite(SPEAKERA,0.5,{freq:tone_col[col]});
  analogWrite(SPEAKERB,0.5,{freq:tone_row[row]});
  // finally make sure we get rid of the beeping after a second
  if (silenceTimeout!==undefined) clearTimeout(silenceTimeout);
  silenceTimeout = setTimeout(function() {
    silenceTimeout = undefined;
    // make sure we turn out beeping off
    digitalRead(SPEAKERA);
    digitalRead(SPEAKERB);
    digitalWrite(A3);
  }, 200);
}

exports.connect([P0,P1,P2,P3],[P4,P5,P6,P7],onKeyPad);

print("Ready");