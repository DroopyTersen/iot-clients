var util = require("util");
var exec = require('child_process').exec;

var soundbarButtons = {
    power: "BTN_POWER",
    volumeUp: "BTN_VOLUME_UP",
    volumeDown: "BTN_VOLUME_DOWN",
    mute: "BTN_MUTING",
    dvd: "BTN_DVD",
    sat: "BTN_SAT"
};


var tvButtons = {
    power: "KEY_POWER"
};

var remotes = {
    tv: {
        name: "samsungTV",
        buttons: tvButtons
    },
    soundbar: {
        name: "soundbar",
        buttons: soundbarButtons
    }
};

var duplicateMacroCommands = function(remoteName, button, count) {
    var commands = [];
    for(var i = 0; i < count; i++) {
        commands.push({ remote: remoteName, button: button });
    }
    return commands;
};

var macros = {
    turnUp: duplicateMacroCommands(remotes.soundbar.name, soundbarButtons.volumeUp, 5),
    turnDown: duplicateMacroCommands(remotes.soundbar.name, soundbarButtons.volumeUp, 5),
    togglePower: [{
        remote: remotes.soundbar.name,
        button: soundbarButtons.power
    },{
        remote: remotes.tv.name,
        button: tvButtons.power
    }]
};



var executeMacro = function(cmds) {
    var delay = 250;
    cmds.forEach(function(cmd, i) {
        setTimeout(function(){
            sendCommand(cmd.remote, cmd.button);
        }, delay * i)
    });
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
    macros: macros,
    remotes: remotes,
    sendCommand: sendCommand,
    executeMacro: executeMacro
};