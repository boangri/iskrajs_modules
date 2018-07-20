var migalka = require('migalka').connect({
    led1: A3,
    led2: A4,
    button: P10
});

migalka.loop();