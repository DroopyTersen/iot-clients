var http = require("http");
var req = new (require("droopy-http"))();
var iotEvents = require("droopy-iot").create("thora");
var vlc = require("./vlc");
var chrome = require("./chrome");
var baseApi = "http://api.cineprowl.com";

var playMovie = function(payload) {
		console.log(payload)
	if (payload.title) {
	    req.getJSON(baseApi + "/movies/search/" + payload.title)
	    .then(function(movies) {
	        if (movies.length) {
	            return req.getJSON(baseApi + "/movies/" + movies[0].id);
	        } else {
	            return null;
	        }
	    })
	    .then(function(movie) {
	        if (movie) {
	            vlc.play(movie.file.filepath)
	        }
	    })		
	} else if (payload.id) {
        req.getJSON(baseApi + "/movies/" + payload.id).then(function(movie){
            if (movie) {
                vlc.play(movie.file.filepath);
            }
        })  
    } else {
		iotEvents.trigger("unpause-movie", {}, "thora")
	}

};

var handleChromeRequest = function(payload) {
    if (payload && payload.command) {
        chrome.launch(payload.command, payload.param)
    }
    console.log(payload);
};

iotEvents.subscribe("play-movie", playMovie)
iotEvents.subscribe("pause-movie", vlc.pause)
iotEvents.subscribe("unpause-movie", vlc.unpause)
iotEvents.subscribe("launch-chrome", handleChromeRequest)


var server = http.createServer(function(req, res) {})

server.listen(5000, function() {
    console.log("Thora IOT listening on port 5000");
});