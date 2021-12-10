(function(window) {
	var speakWord = "Good Bye";
	var byeSpeaker = function (name) {
  		console.log(speakWord + " J " + name);
	}
	
	window.byeSpeaker = byeSpeaker;

})(window);
