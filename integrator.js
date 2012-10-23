var Rx = require('rx');
var periodInMs = 100;
var deltaT = 1/periodInMs;
var gravity = Rx.Observable.interval(periodInMs).select(function () { return 9.81 ;});

var speedIntegrator = (function(initialSpeed) {
    var speed = initialSpeed,
        airResistance = 0.03;
    return gravity.select( function (gravity) {
        speed += deltaT*(gravity - airResistance * speed * speed);
        return speed;
    });
}(0)); // Initial value to function (initialSpeed)

var positionIntegrator = (function(initialPosition) {
    var position = initialPosition;
    return speedIntegrator.select( function (speed) {
        position -= deltaT*speed;
        if (position < 0) {console.log('CRASH!');}
        return position;
    });
}(100)); // Initial value to function (initialPosition)

speedIntegrator.subscribe(function (val) {
    console.log('Speed: ' + val);
});

positionIntegrator.subscribe(function (val) {
    console.log('Position: ' + val);
});

speedIntegrator.take(10).average().subscribe(function (avg) {console.log('AVG SPEED: ' + avg);});
speedIntegrator.take(100).average().subscribe(function (avg) {console.log('AVG SPEED: ' + avg);});
