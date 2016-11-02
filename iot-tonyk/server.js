const http = require('http');
var iotEvents = require("droopy-iot").register("tonyk");
var universalRemote = require("./universalRemote");

var server = http.createServer(function(req, res) {})

var handleMacro = function(payload) {
    if (!payload || !payload.macro) return;
    var macro = universalRemote.macros[payload.macro];
    if(macro) {
        universalRemote.executeMacro(macro);
    }
}

var handleRemoteCommand = function(payload) {
    if (!payload || !payload.remote || !payload.button) return;
    
    var remote = universalRemote.remotes[payload.remote];
    if (remote) {
        var button = remote.buttons[payload.button];
        if (button) {
            universalRemote.sendCommand(remote.name, button);
        }
    }
};

iotEvents.subscribe("remote-macro", handleMacro);
iotEvents.subscribe("remote-command", handleRemoteCommand);

server.listen(5000, function() {
    console.log("TonyK IOT listening on port 5000");
});