Template.footer.rendered = function() {
  if (localStorage["songArray"]) {
    console.log("songArray exists in localStorage");
  } else {
    console.log("songArray does not exist in localStorage and will be initiallized with song 0");
    var songArray = [0];
    localStorage.setItem("songArray", JSON.stringify(songArray));
    localStorage.setItem("randNum", 0);
  }
};

Template.footer.events({
    "ended .my_audio": function(event){
      var songArray = JSON.parse(localStorage["songArray"]);
      var audio = document.getElementById("audio_player0");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray song0: "+songArray);
      }  
      audio = document.getElementById("audio_player1");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(1);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }  
      audio = document.getElementById("audio_player2");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(2);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }  
      audio = document.getElementById("audio_player3");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(3);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }  
      audio = document.getElementById("audio_player4");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(4);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }
      audio = document.getElementById("audio_player5");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(5);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }  
      audio = document.getElementById("audio_player6");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(6);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }
      audio = document.getElementById("audio_player7");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(7);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }
      audio = document.getElementById("audio_player8");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(8);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }
      audio = document.getElementById("audio_player9");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(9);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }
      audio = document.getElementById("audio_player10");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(10);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }
      audio = document.getElementById("audio_player11");
      if (audio.hasAttribute("controls")) {
        audio.removeAttribute("controls");
        console.log("songArray before push: "+songArray);
        songArray.push(11);
        console.log("typeof(songArray): "+typeof(songArray));
        console.log("songArray after push: "+songArray);
      }
      if (songArray.length == 12) {
        console.log('songArray: '+songArray);
        console.log('songArray is maxed - will reset array');
        var songArray = [0];
        var randNum = 0;
      } else {
        while (cond != -1) { 
          var randNum = Math.floor(Math.random()*11)+1; 
          console.log(randNum); 
          console.log(songArray); 
          var cond = $.inArray(randNum, songArray); 
          console.log(cond)
        }
      }
      console.log('randNum: '+randNum);
      console.log('songArray: '+songArray);
      localStorage.setItem("randNum", randNum);
      localStorage.setItem("songArray", JSON.stringify(songArray));
      var display_audio = 'audio_player'+randNum;
      console.log(display_audio);
      var audio = document.getElementById(display_audio);
      audio.setAttribute("controls","controls")   
      var next_audio = "#audio_player"+randNum;
      $(next_audio)[0].play();
    }
});
