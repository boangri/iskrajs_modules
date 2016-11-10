var Migalka = function(opts) {
    opts = opts || {};
    this.l1 = opts.led1;
    this.l2 = opts.led2;
    this.n = opts.num || 3;
    this.d_on = opts.delay_on || 100;
    this.d_off = opts.delay_off || 100;
    this.i = 0;
    this.on = false;
    this.btn = require('button').connect(opts.button, {holdTime: 1});
    this.id = undefined;
    
};

Migalka.prototype.loop = function(){
    digitalWrite(this.l1, false);  
    digitalWrite(this.l2, false);
    var self = this;
    this.btn.on('hold', function(){
        self.on = true;
        self.i = 0;
        digitalWrite(self.l1, true);
        self.id = setInterval(function(){
            var led;
            var state;
            var delay;
            if(self.on) {
                led = self.i < 2 * self.n ? self.l1 : self.l2;
                state = self.i % 2 ? false : true;
                delay = state ? self.d_off : self.d_on;
                digitalWrite(led, state);
                self.i++;
                if (self.i == (4 * self.n)) self.i = 0;
                changeInterval(self.id, delay);
            } 
        }, self.d_on);
    });
  
    this.btn.on ('click', function(){
    self.on = false; 
    digitalWrite(self.l1, false);  
    digitalWrite(self.l2, false); 
    if(self.id) {
        clearInterval(self.id);
        self.id = 0;
    }  
}); 
  
  print('Version 12');
};

exports.connect = function(opts){
    return new Migalka(opts);
};
