Bled = function (pin, opts) {
  this.opts = opts || {};
  this._period = (opts.period === 'undefined') ? 100 : opts.period;
  this._pin = pin;
  this._id = null;
  this._state = false;
  this._on = false;
}

Bled.prototype.write = function(state) {
  if (state) {
    if (!this._state) {
      this._state = true;
      this._id = setInterval((function(){
        this._on = !this._on;
        this._pin.write(this._on);
      }).bind(this), this._period);
    }
  } else {
    if (this._state) {
      this._state = false;
      this._on = false;
      this._pin.write(this._on);
      if (this._id) {
        clearInterval(this._id);
      }
    }
  }
};

exports.connect = function(pin, opts) {
  return new Bled(pin, opts);
}