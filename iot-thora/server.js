var http = require("http");
var req = new (require("droopy-http"))();
var iotEvents = require("droopy-iot").create("thora");
var vlc = require("./vlc");
var baseApi = "http://api.cineprowl.com";

var playMovie = function(payload) {
		console.log("play-movie: " + payload.title)
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
	} else {
		iotEvents.trigger("unpause-movie", {}, "thora")
	}

};

iotEvents.subscribe("play-movie", playMovie)
iotEvents.subscribe("pause-movie", vlc.pause)
iotEvents.subscribe("unpause-movie", vlc.unpause)


var server = http.createServer(function(req, res) {})

server.listen(5000, function() {
    console.log("Thora IOT listening on port 5000");
});