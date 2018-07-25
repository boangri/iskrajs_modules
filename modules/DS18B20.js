var DS18B20 = function(oneWire, device) {
  this._oneWire = oneWire;
  this._device = device;
};

DS18B20.prototype.start = function() {
  this._oneWire.select(this._device);
  this._oneWire.write(0x44);
}

DS18B20.prototype.getC = function() {
  // Read register
  this._oneWire.select(this._device);
  this._oneWire.write(0xBE);
  var regs = this._oneWire.read(9);

  // Convert
  var temp = regs[0] | regs[1] << 8;
  if (temp > 32767) {
    temp -= 65536;
  }
  temp = temp / 16;
  return temp;
};

exports.connect = function(oW, device) {
  return new DS18B20(oW, device);
};