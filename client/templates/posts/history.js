var songNum = -1;
var stop_audio ="";
Template.history.rendered = function() {
  $('.container').css('background-image', 'url(/background_images/samurai.jpg');
  for (i=0;i<12;i++) {
    var control_audio = "audio_player"+i;
    var audio = document.getElementById(control_audio);
    var control_test = audio.hasAttribute("controls");
    console.log("control_audio: "+control_audio);
    console.log("control_test: "+control_test);
    if (control_test) {
        var j = i;
      	songNum=j;
        stop_audio = "#audio_player"+j;
        console.log("stop_audio: "+stop_audio);
      	$(stop_audio)[0].pause();
    }  
	}
  if (Meteor.user() == null) {
    console.log("Meteor.user() is null");
  } else {
    console.log("Meteor.user() is not null");
    if (Players.findOne({userId: Meteor.user()._id})) {
      console.log("logged in user has a player already will check lobby and active");
      if (Players.findOne({lobby: true, userId: Meteor.user()._id})) {
        console.log('lobby is true - hitting removeLobby');
        Meteor.call('removeLobby');
      } else {
        console.log('lobby is false - no need to take action');
      }
      if (Players.findOne({human: true, userId: Meteor.user()._id})) {
        console.log('human is true - hitting removeHuman');
        Meteor.call('removeHuman');
      } else {
        console.log('human is false - no need to take action');
      }
    }
  }
};

Tracker.autorun(function(){
  if (Meteor.user() == null) {
    console.log("Meteor.user() is null");
  } else {
    console.log("Meteor.user() is not null");
    if (Players.findOne({userId: Meteor.user()._id})) {
      console.log("logged in user has a player already");
    } else {
      console.log("On login - should only get here the first time you create a new user");
      var player = {initialize: true};
      Meteor.call('playerInsert', player, function (error, result){
        if (error)
          console.log(error)
      });   
    }
  }
}); 

Template.history.events({
  "ended #history_audio": function(event){
    $('#rashambo_audio')[0].play();
    $('#historyText').html('<span id="rashambo">Ra&nbsp;</span>');
    setTimeout(function(){
      $('#historyText').append('<span id="rashambo">Sham&nbsp;</span>');   
      setTimeout(function(){
        $('#historyText').append('<span id="rashambo">Bo!</span>');
        $(stop_audio)[0].play();
      }, 500);
    },500);      
  }
});
