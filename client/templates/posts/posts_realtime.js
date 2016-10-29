if (Meteor.isClient) {
  function countdown_timer() {
    var id = $("#player1rock").attr('alt');
    var game_id = {id: id};
    setTimeout(function(){
      var changes = {countone_class: 'countdown_none', go_class: 'countdown_show'};
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
      $("#player1rock").css("pointer-events", "auto");
      $("#player1paper").css("pointer-events", "auto");
      $("#player1scissors").css("pointer-events", "auto");
    }, 5000);
    setTimeout(function(){
      var changes = {counttwo_class: 'countdown_none', countone_class: 'countdown_show'};
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    }, 4000);
    setTimeout(function(){
      var changes = {countthree_class: 'countdown_none', counttwo_class: 'countdown_show'};
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    }, 3000);
    setTimeout(function(){
      var changes = {ready_class: 'countdown_none', countthree_class: 'countdown_show'};
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    }, 2000);
  };
  Template.postsRealtime.rendered = function() {
    $("#player1rock").css("pointer-events", "none");
    $("#player1paper").css("pointer-events", "none");
    $("#player1scissors").css("pointer-events", "none");
    $("#player2rock").css("pointer-events", "none");
    $("#player2paper").css("pointer-events", "none");
    $("#player2scissors").css("pointer-events", "none");
  };
	Template.postsRealtime.helpers({
    players: function() {
      return Players.find({active: true});
    },
    isCurrent: function (name) {
    var currentUserName = Meteor.user().username;
    return name === currentUserName;
    }
  });

  Template.postsRealtime.events({
    "click .realtime_ready": function (event) {
      var id1 = $("#player1scissors").attr('alt');
      var game_id1 = {id: id1};
      var id2 = $("#player2scissors").attr('alt');
      var game_id2 = {id: id2};
      var play1_ready = $("#player1ready").attr('title');
      var play2_ready = $("#player2ready").attr('title');
      if (play1_ready=="yes" && play2_ready=="yes") {
        var changes = {rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', wlt: '', choice: ''};
        Meteor.call('realtimeGameUpdate', changes, game_id1, function(error, result){
        if (error)
          console.log(error)
        });
        var changes = {ready1_class: 'ready_check', ready1_text: 'Ready'};
        var changes = {ready2_class: 'ready_check', ready2_text: 'Ready'};
        Meteor.call('realtimeGameUpdate', changes, game_id2, function(error, result){
        if (error)
          console.log(error)
        });
        $(".realtime_ready").append("Game will start in 1 second");
        setTimeout(function(){
          countdown_timer()
        },1000);
      } else if (play1_ready=="yes") {
        var changes = {ready1_class: 'ready_check', ready1_text: 'Ready'};
        Meteor.call('realtimeGameUpdate', changes, game_id1, function(error, result){
          if (error)
            console.log(error)
        });
      } else if (play2_ready=="yes") {
       var changes = {ready2_class: 'ready_check', ready2_text: 'Ready'};
        Meteor.call('realtimeGameUpdate', changes, game_id2, function(error, result){
          if (error)
            console.log(error)
        });
    }
    },


    "click #player1rock": function (event) {
      $("#player1rock").css("pointer-events", "none");
      $("#player1paper").css("pointer-events", "none");
      $("#player1scissors").css("pointer-events", "none");
      console.log("Player one chose rock");
      var id = $("#player1rock").attr('alt');
      var game_id = {id: id};
      var changes = {rock_class: 'rps_red rps_rock', scissors_class: 'rps_hidden', paper_class: 'rps_none', choice: 'rock'};
  		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
	      if (error)
	        console.log(error)
	    	});
      setTimeout(function(){
        var choice2 = $("#player2").attr('alt');
        if (choice2 === "paper") {
          var player1loss = parseInt($("#player1loss").val());
          var loss = player1loss += 1;
          console.log("Player two chose paper - you lose");
          var changes = {wlt: 'lose', loss: loss};
      		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
        } else if (choice2 === "rock") {
          var player1tie = parseInt($("#player1tie").val());
          var tie = player1tie += 1;
          console.log("Player two chose rock - you tie");
          var changes = {wlt: 'tie', tie: tie};
      		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
        } else {
          var player1win = parseInt($("#player1win").val());
          var win = player1win += 1;
          console.log("Player two chose scissors or nothing - you win");
          var changes = {wlt: 'win', win: win};
      		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
        }
      }, 5000);
    },
    "click #player1paper": function (event) {
      $("#player1paper").css("pointer-events", "none");
      console.log("Player one chose paper");
      var id = $("#player1scissors").attr('alt');
      var game_id = {id: id};
      var changes =  {rock_class: 'rps_hidden', scissors_class: 'rps_hidden', paper_class: 'rps_red', choice: 'paper'};
  		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
	      if (error)
	        console.log(error)
	    	});
      setTimeout(function(){
        var choice2 = $("#player2").attr('alt');
        if (choice2 === "scissors") {
          var player1loss = parseInt($("#player1loss").val());
          var loss = player1loss += 1;
          console.log("Player two chose scissors - you lose");
          var changes = {wlt: 'lose', loss: loss};
      		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
        } else if (choice2 === "paper") {
          var player1tie = parseInt($("#player1tie").val());
          var tie = player1tie += 1;
          console.log("Player two chose paper - you tie");
          var changes = {wlt: 'tie', tie: tie};
      		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
        } else {
          var player1win = parseInt($("#player1win").val());
          var win = player1win += 1;
          console.log("Player two chose rock or nothing - you win");
          var changes = {wlt: 'win', win: win};
      		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
        }
      }, 5000);
    },
    "click #player1scissors": function (event) {
      $("#player1scissors").css("pointer-events", "none");
      console.log("Player one chose scissors");
      var id = $("#player1scissors").attr('alt');
      var game_id = {id: id};
      var changes = {rock_class: 'rps_hidden', scissors_class: 'rps_red', paper_class: 'rps_none', choice: 'scissors'};
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      if (error)
        console.log(error)
    	});
      setTimeout(function(){
        var choice2 = $("#player2").attr('alt');
        if (choice2 === "rock") {
          var player1loss = parseInt($("#player1loss").val());
          var loss = player1loss += 1;
          console.log("Player two chose rock - you lose");
          var changes = {wlt: 'lose', loss: loss};
      		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
        } else if (choice2 === "scissors") {
          var player1tie = parseInt($("#player1tie").val());
          var tie = player1tie += 1;
          console.log("Player two chose scissors - you tie");
          var changes = {wlt: 'tie', tie: tie};
      		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
        } else {
          var player1win = parseInt($("#player1win").val());
          var win = player1win += 1;
          console.log("Player two chose paper or nothing - you win");
          var changes = {wlt: 'win', win: win};
      		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
        }
      }, 5000);
    },
    "click #another_game": function(event) {
      var id1 = $("#player1scissors").attr('alt');
      var game_id1 = {id: id1};
      var id2 = $("#player2scissors").attr('alt');
      var game_id2 = {id: id2};
      $("#player1rock").css("pointer-events", "auto");
      $("#player1paper").css("pointer-events", "auto");
      $("#player1scissors").css("pointer-events", "auto");
      // $("#player2rock").css("pointer-events", "auto");
      // $("#player2paper").css("pointer-events", "auto");
      // $("#player2scissors").css("pointer-events", "auto");
      var changes = {rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', wlt: '', choice: ''};
  		Meteor.call('realtimeGameUpdate', changes, game_id1, function(error, result){
	      if (error)
	        console.log(error)
	    	});
      var changes = {rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', wlt: '', choice: ''};
  		Meteor.call('realtimeGameUpdate', changes, game_id2, function(error, result){
	      if (error)
	        console.log(error)
	    	});
    }
  });
}
