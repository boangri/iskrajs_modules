var Poten = function(pin, opts){
  this._pin = pin;
  opts = opts || {};
  this._pin.mode('analog');
};

Poten.prototype.readout = function() {
  return analogRead(this._pin);
}

exports.connect = function(pin, opts) {
  return new Poten(pin, opts);
}