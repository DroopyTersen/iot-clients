var request = require("request-promise-native");
var vlc = require("../../shared/vlc");
var chrome = require("../../shared/chrome");
var baseApi = "http://api.cineprowl.com";

var _api = function(path) {
    var req = {
        url: baseApi + path,
        json: true
    };
    return request(req);
};

var searchMovie = function(title) {
    return _api("/movies/search/" + title).then(movies => {
        var options = {
            shouldSort: true,
            threshold: 0.4,
            keys: [ "title" ]
        };
        var fuse = new Fuse(movies, options);
        return fuse.search(title)
    })
};

var pauseMovie = exports.pauseMovie = vlc.pause;
var unpauseMovie = exports.unpauseMovie = vlc.unpause;

var playMovie = exports.playMovie = function(payload) {
    console.log(payload);
    // if payload has a title, search for the movie and play it
	if (payload.title) {
        _api("/movies/search/" + payload.title)
	    .then(function(movies) {
            
	        if (movies && movies.length) {
	            vlc.play(movies[0].file.filepath)
	        }
	    })	
        .catch(err => console.log(err));	
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

var launchChrome = exports.launchChrome = function(payload) {
    console.log(payload);
    if (payload && payload.command) {
        chrome.launch(payload.command, payload.param)
    }
};