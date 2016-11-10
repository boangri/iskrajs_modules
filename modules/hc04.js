var HC04 = function(opts) {
    opts = opts || {};
    this._echo = opts.echo;
    this._trigger = opts.trigger;
    this._intID = undefined;
};

HC04.prototype.read = function(callback) {
    id = setWatch(function(info){
        if(!info.state) {
            clearWatch(id);
            var time = info.time - info.lastTime;
            callback(time);
        }
    }, this._echo, {
        repeat: true,
        edge: 'both'
    });     
    digitalPulse(this._trigger, 1, 0.01);
};

HC04.prototype.loop = function(time, units) {
    if(this._intID) {
        clearInterval(this._intID);
    }
    if(!time) {
        return;
    }
    var self = this;
    this._intID = setInterval(function(){
        self.read(function(result){
            self.emit('read', result*17000);
        });
    }, time);
};

exports.connect = function(opts) {
    return new HC04(opts);
};
