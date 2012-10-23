var Rx = require('rx');
var periodInMs = 100;
var deltaT = 1/periodInMs;
var gravity = Rx.Observable.interval(periodInMs).select(function () { return 9.81 ;});

var accelerationIntegrator = (function(initialSpeed) {
    var speed = initialSpeed,
        airResistance = 0.03;
    return gravity.select( function (acceleration) {
        speed += deltaT*(acceleration - airResistance * speed * speed)  ;
        return speed;
    });
}(0)); // Initial value to function (initialSpeed)

var velocityIntegrator = (function(initialPosition) {
    var position = initialPosition;
    return accelerationIntegrator.select( function (velocity) {
        position -= deltaT*velocity;
        if (position < 0) {console.log('CRASH!');}
        return position;
    });
}(1000)); // Initial value to function (initialPosition)

accelerationIntegrator.subscribe(function (val) {
    console.log('Speed: ' + val);
});
velocityIntegrator.subscribe(function (val) {
    console.log('Position: ' + val);
});

