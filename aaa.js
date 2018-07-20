var MyObj = function(opts) {
    this.prop1 = opts.prop1 || '1111';
    this.prop2 = opts.prop2 || 2;
};

MyObj.prototype.fun = function() {
    console.log(this);
};

var obj = new MyObj ({
    prop2: 3,
    prop1: 'qwerty'
});

obj.fun();
var d = new Date();
console.log(d.valueOf());