var Rx = require('rx');
var constant = Rx.Observable.interval(100).select(function () { return 1 ;});

var integrator  = (function() {
    var acc = 0
      , k = 0.04;
    return constant.select( function (val) {
        acc += val - (k * acc);
        return acc;
    });
}());

integrator.subscribe(function (val) {
    console.log(val);
});

