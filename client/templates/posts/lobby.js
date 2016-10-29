if (Meteor.isClient) {
  Template.lobby.rendered = function() {
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
    Tracker.autorun(function(){
      if (Players.findOne({active: true, userId: Meteor.userId()})) {
        console.log("checkActive is true - reroute to human");
        Router.go('/human');
      }
    }); 
  }

  Template.lobby.helpers({
    players: function() {
      return Players.find({lobby: true});
    },
    isCurrent: function (name) {
    	var currentUserName = Meteor.user().username;
    	return name === currentUserName;
  	}
  });

  Template.lobby.events({
  	"click .lobby_challengers": function (event) {
  		var currentUserName = Meteor.user().username;
  		var currentUserId = Meteor.userId();
  		var clicked_id = $('.lobby_challengers').attr('id');
      var challenger_name = $('.lobby_challengers').attr("value")
  		var player = {challenge: 'hidden', accept: 'show', challenger_name: currentUserName, challenger_id: currentUserId};
  		var opponent_id = {id: clicked_id}
      Meteor.call('playerLobbyChallengeUpdate', player, opponent_id,function(error, result){
        if (error)
          console.log(error)
      });
      setTimeout(function(){
        console.log('ten seconds and challenge resets');
        var message = "<p class='rejectMessage'>"+challenger_name+" ran out of time!</p>";
        $('#reject').append(message);
        player = {challenge: 'show', accept: 'hidden', challenger_name: "", challenger_id: ""};
        Meteor.call('playerLobbyChallengeTimeout', player, opponent_id,function(error, result){
        if (error)
          console.log(error)
        });
      }, 10000);
  		
  	},
  	
  	"click .yes": function (event) {
      var click_opponent = $('.yes').attr('id');
      var opponent_id = {id: click_opponent};
      Meteor.call('playerActiveUpdate', opponent_id, function(error, result){
        if (error)
          console.log(error);
      });
  	}
  });
}
