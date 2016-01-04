var VlcService = require("droopy-vlc");
var vlcService = new VlcService("http://:rival5sof@localhost:8080");
var exec = require('child_process').exec;

//var exePath = '"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"'
var exePath = '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe"'
// exePath: '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe"'

var launchVlc = function (filepath) {
    var params = " -f " + " \"" + filepath + "\" --extraintf http";

    exec(exePath + params, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            console.log(stderr);
        }
    });
};

var killVlc = function () {
    try {
        var cmd = 'taskkill /IM vlc.exe';
        exec(cmd, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
                console.log(stderr);
            }
        });
    } catch (ex) {
        console.log("kill catch");
    }
};
vlcService.play = function(filepath) {
    vlcService.status().then(function(status){
        if(status) {
            killVlc();
            setTimeout(launchVlc(filepath), 1000);
        } else {
            launchVlc(filepath);
        }
    }).fail(function(){
        launchVlc(filepath);
    })
};

vlcService.pause = function() {
    vlcService.status().then(function(status) {
        if (status.state === "playing") {
            vlcService.togglePause();
        }
    })
};

vlcService.unpause = function() {
    vlcService.status().then(function(status) {
        if (status.state === "paused") {
            vlcService.togglePause();
        }
    })
};

vlcService.kill = killVlc;

module.exports = vlcService;