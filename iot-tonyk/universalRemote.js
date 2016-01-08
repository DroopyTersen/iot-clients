var util = require("util");
var exec = require('child_process').exec;

var remotes = {
    tv: {
        name: "samsungTV",
        buttons: {
            power: "KEY_POWER"
        }
    },
    soundbar: {
        name: "soundbar",
        buttons: {
            power: "BTN_POWER",
            volumeUp: "BTN_VOLUME_UP",
            volumeDown: "BTN_VOLUME_DOWN",
            mute: "BTN_MUTING",
            dvd: "BTN_DVD",
            sat: "BTN_SAT"
        }
    }
};

var sendCommand = function(remoteName, buttonName) {
    var command = util.format("irsend SEND_ONCE %s %s", remoteName, buttonName );
    exec(command, function(err, stdout, stderr){
        if (err) console.log(err)
        else if (stderr) console.log(stderr)
        else console.log("Success: %s %s", remoteName, buttonName)
    }) 
};

module.exports = {
    remotes: remotes,
    sendCommand: sendCommand
};