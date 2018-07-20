var Poten = function(pin, opts){
  this._pin = pin;
  opts = opts || {};
  this._pin.mode('analog');
  this._state = analogRead(this._pin);
  this._high = opts.high ? opts.high : 0.9;
  this._low = opts.low ? opts.low : 0.1;
  this._observers = {
    high: [],
    low: []
  };
  var id = setInterval(this.check.bind(this), 2000); 
};

Poten.prototype.subscribe = function(event, cb) {
  if (event === 'high')
    this._observers.high.push(cb);
  if (event === 'low')
    this._observers.low.push(cb);
}

Poten.prototype.emit = function(event) {
  if (event === 'high') {
    this._observers.high.map(function(cb){
      cb({ 
        temp: this._state
      });
    }, this)
  }
  if (event === 'low') {
    this._observers.low.map(function(cb){
      cb({ 
        temp: this._state
      });
    }, this)
  }
}

Poten.prototype.check = function() {
  var temp = analogRead(this._pin);
  if (this._state < this._high && temp >= this._high) {
    this._state = temp;
    this.emit('high');
  } 
  if (this._state > this._low && temp <= this._low) {
    this._state = temp;
    this.emit('low');
  } 
  this._state = temp;
}

Poten.prototype.readout = function() {
  return this._state;
}

exports.connect = function(pin, opts) {
  return new Poten(pin, opts);
}