var http = require("http");
var iotEvents = require("droopy-iot").register("thora");
var handlers = require("./handlers");

iotEvents.subscribe("play-movie", handlers.playMovie)
iotEvents.subscribe("pause-movie", handlers.pauseMovie)
iotEvents.subscribe("unpause-movie", handlers.unpauseMovie)
iotEvents.subscribe("launch-chrome", handlers.launchChrome)


var server = http.createServer(function(req, res) {})

server.listen(5002, function() {
    console.log("Thora IOT listening on port 5002");
});