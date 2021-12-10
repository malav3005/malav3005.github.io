(function(window) {
	var speakWord = "Good Bye";
	var byeSpeaker = function (name) {
  		console.log("J "+speakWord + " " + name);
	}
	
	window.byeSpeaker = byeSpeaker;

})(window);
