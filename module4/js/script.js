(function () {

var names = ["Malav", "Janushi", "Nihar", "Vidhi", "Shivangi", "Krina", "Jack", "John", "Jason", "Rushit"];

for (var i = 0; i < names.length; i++) {
  var firstLetter = names[i].charAt(0).toLowerCase();

  if (firstLetter === 'j') {
    byeSpeaker(names[i]);
  }
  else {
    helloSpeaker(names[i]);
  }
}

})();



