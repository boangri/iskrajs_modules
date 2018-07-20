var SSID = 'MGTS_GPON_1131';
var PASSWORD = '23f0167a';

var bot = require('@amperka/telegram').create({
    token: '443053274:AAG_N2oWUO8uCzgctwGCW1K7OH6sVhGPW1E',
    polling: { timeout: 10 }
});
var light = require('@amperka/led').connect(P3);

bot.on('/start', function(msg) {
    var keyboard = bot.keyboard([
        ['/TurnOff', '/TurnOn'],
    ], { resize: true });
    bot.sendMessage(msg.from.id, 'Light control', {
        markup: keyboard
    });
});

bot.on('/TurnOff', function(msg) {
    light.turnOff();
    bot.sendMessage(msg.from.id, 'Light is off');
});

bot.on('/TurnOn', function(msg) {
    light.turnOn();
    bot.sendMessage(msg.from.id, 'Light is on');
});

var wifi = require('@amperka/wifi').setup(function(err) {
    wifi.connect(SSID, PASSWORD, function(err) {
        print('I\'m ready!');
        bot.connect();
    });
});
