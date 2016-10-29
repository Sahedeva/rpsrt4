Template.about.rendered = function() {
  $('.container').css('background-image', 'url(/background_images/samurai.jpg');
  for (i=0;i<12;i++) {
    var control_audio = "audio_player"+i;
    var audio = document.getElementById(control_audio);
    var control_test = audio.hasAttribute("controls");
    if (control_test) {
        var start_audio = "#audio_player"+i;
        console.log("start_audio: "+start_audio);
        $(start_audio)[0].play();
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
}
