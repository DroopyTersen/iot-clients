var open = require("open");

var urls = {
	hbo: "http://hbonow.com",
	netflix: "http://www.netflix.com",
	netflixQueue: "http://www.netflix.com/browse/my-list",
	netflixSearch: "http://www.netflix.com/search/",
	spotify: "https://play.spotify.com/user/andrew.petersen15",
	spotifySearch: "https://play.spotify.com/search/",
	imdbSearch: "http://www.imdb.com/find?q=",
	youtubeSearch: "https://www.youtube.com/results?search_query=",
	torrentSearch: "https://thepiratebay.org/search/"
};

var launchChrome = function(urlKey, param) {
	param = param || "";
	param = encodeURIComponent(param);
	if (urls[urlKey]) open(urls[urlKey] + param);
};

module.exports = {
	launch: launchChrome
};
// Open my netfix queue
// http://www.netflix.com/browse/my-list

// Search netflix
// http://www.netflix.com/search/always%20sunny

// Open/Launch netflix

// Search Youtube
// https://www.youtube.com/results?search_query=diy+extension

// Search Imdb
// http://www.imdb.com/find?q=creed

// Search Google
// https://www.google.com/#q=maggie+rose

// Launch spotify
// https://play.spotify.com/user/andrew.petersen15

// Search Spotify
// https://play.spotify.com/search/maggie%20rose