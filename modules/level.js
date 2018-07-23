var Level = function(pin, opts){
  this._pin = pin;
  opts = opts || {};
  this._state = this._pin.readout();
  this._prev_state = this._state;
  this._high = opts.high ? opts.high : 0.9;
  this._low = opts.low ? opts.low : 0.1;
  this._accuracy = opts.accuracy ? opts.accuracy : 0.1;
  this._period = opts.period ? opts.period : 100;
  this._observers = {
    high: [],
    low: [],
    change: []
  };
  var id = setInterval(this.check.bind(this), this._period); 
};

Level.prototype.on = function(event, cb) {
  switch (event) {
    case 'high':
      this._observers.high.push(cb);
      break;
    case 'low':
      this._observers.low.push(cb);
      break;
    case 'change':
      this._observers.change.push(cb);
      break;
  };
}

Level.prototype.emit = function(event) {
  var observers;
  switch (event) {
    case 'high':
      observers = this._observers.high;
      break;
    case 'low':
      observers = this._observers.low;
      break;
    case 'change':
      observers = this._observers.change;
      break;
  };
  observers.map(function(cb){
    cb({
      temp: this._state
    });
  }, this);
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
  if (Math.abs(temp - this._prev_state) >= this._accuracy) {
    this._prev_state = temp;
    this.emit('change');
  }
  this._state = temp;
}

Level.prototype.readout = function() {
  return this._state;
}

exports.connect = function(pin, opts) {
  return new Level(pin, opts);
}