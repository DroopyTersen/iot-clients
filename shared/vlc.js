var VlcService = require("droopy-vlc");
var vlcService = new VlcService("http://:rival5sof@localhost:8080");
var exec = require('child_process').exec;
var fs = require("fs");
var path = require("path");

var exePaths = [
    'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe',
    'C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe'
];
// var exePath = 
var exePath = exePaths.find(p => {
    console.log(fs.existsSync(p));
    return fs.existsSync(p);
});

var launchVlc = function (filepath) {
    var params = " -f " + " \"" + filepath + "\" --extraintf http";

    exec(`"${exePath}" ${params}`, function (err, stdout, stderr) {
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

var ensureFile = function(filepath) {
    var resolvedPath = path.resolve(filepath);
    if (!fs.existsSync(resolvedPath) && filepath.startsWith("/mnt")) {
        resolvedPath = filepath.replace("/mnt/nas-movies", "\\\\ix4-300d\\movies");
        resolvedPath = path.resolve(resolvedPath);
    }
    return resolvedPath;
};

vlcService.play = function(filepath) {
    filepath = ensureFile(filepath);
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