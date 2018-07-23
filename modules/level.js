var Level = function(pin, opts){
  this._pin = pin;
  opts = opts || {};
  this._pin.mode('analog');
  this._state = this._pin.readout();
  this._prev_state = this._state;
  this._high = opts.high ? opts.high : 0.9;
  this._low = opts.low ? opts.low : 0.1;
  this._observers = {
    high: [],
    low: [],
    change: []
  };
  var id = setInterval(this.check.bind(this), 2000); 
};

Level.prototype.subscribe = function(event, cb) {
  if (event === 'high')
    this._observers.high.push(cb);
  if (event === 'low')
    this._observers.low.push(cb);
}

Level.prototype.emit = function(event) {
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

Level.prototype.check = function() {
  var temp = this._pin.readout();
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

Level.prototype.readout = function() {
  return this._state;
}

exports.connect = function(pin, opts) {
  return new Level(pin, opts);
}