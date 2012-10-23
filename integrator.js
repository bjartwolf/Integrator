var Rx = require('rx');
var constant = Rx.Observable.interval(100).select(function () { return 1 ;});
acc = 0;
k = 0.4;
var integrator = constant.select( function (val) {
    acc += val - (k * acc);
    return acc;
});

integrator.subscribe(function (val) {
    console.log(val);
});

