if (Meteor.isClient) {
	var comp_choice_array = ['rock','paper','scissors'];
  function countdown_timer() {
    var id = $("#player1rock").attr('alt');
    var game_id = {id: id};
    var changes = {win_class: 'countdown_none',lose_class: 'countdown_none',tie_class: 'countdown_none',ready_class: 'countdown_show'};
    Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    setTimeout(function(){
      var changes = {countthree_class: 'countdown_none', go_class: 'countdown_show'};
      console.log('5 seconds should have elapsed');
      console.log('changes: '+JSON.stringify(changes));
      console.log('game_id: '+JSON.stringify(game_id));
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
      $("#player1rock").css("pointer-events", "auto");
      $("#player1paper").css("pointer-events", "auto");
      $("#player1scissors").css("pointer-events", "auto");
      setTimeout(function(){
        var clicked = $('#player1clicked').val();
      	if (clicked=="no") {
	      	console.log('player did not choose fast enough and so forfeited');
	      	$("#player1rock").css("pointer-events", "none");
	    		$("#player1paper").css("pointer-events", "none");
	    		$("#player1scissors").css("pointer-events", "none");
	    		var comp_random = Math.floor(Math.random()*3);
	    		var comp_choice = comp_choice_array[comp_random];
	    		var player1loss = parseInt($("#player1loss").val());
	        var loss = player1loss += 1;
	        var changes = {go_class: 'countdown_none', lose_class: 'countdown_show', loss: loss};
	    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
	    		var comp_id = $("#player2rock").attr('alt');
    			var comp_game_id = {id: comp_id};
    			var player2win = parseInt($("#player2win").val());
	        var win = player2win += 1;
    			if (comp_choice=="rock") {
    				var changes = {win: win, rock_class: 'rps_red rps_rock', scissors_class: 'rps_hidden', paper_class: 'rps_none', choice: 'rock'};
    				console.log('comp rock choice - comp_game_id: '+JSON.stringify(comp_game_id));
  					Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
	      			if (error)
	        			console.log(error)
	    			});
    			} else if (comp_choice=="paper") {
    				var changes =  {win: win, rock_class: 'rps_hidden', scissors_class: 'rps_hidden', paper_class: 'rps_red', choice: 'paper'};
    				console.log('comp paper choice - comp_game_id: '+JSON.stringify(comp_game_id));
			  		Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
				      if (error)
				        console.log(error)
				    });
    			} else if (comp_choice=="scissors") {
    				var changes = {win: win, rock_class: 'rps_hidden', scissors_class: 'rps_red', paper_class: 'rps_none', choice: 'scissors'};
    				console.log('comp scissors choice - comp_game_id: '+JSON.stringify(comp_game_id));
			      Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
    			}
          $('#another_game').css('display', 'inline');
			  }
      }, 1000);
    }, 5000);
    setTimeout(function(){
      var changes = {counttwo_class: 'countdown_none', countthree_class: 'countdown_show'};
      console.log('4 seconds should have elapsed');
      console.log('changes: '+changes);
      console.log('game_id: '+game_id);
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    }, 4000);
    setTimeout(function(){
      var changes = {countone_class: 'countdown_none', counttwo_class: 'countdown_show'};
      console.log('3 seconds should have elapsed');
      console.log('changes: '+changes);
      console.log('game_id: '+game_id);
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    }, 3000);
    setTimeout(function(){
      var changes = {ready_class: 'countdown_none', countone_class: 'countdown_show'};
      console.log('2 seconds should have elapsed');
      console.log('changes: '+changes);
      console.log('game_id: '+game_id);
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    }, 2000);
  };

  Template.computer.rendered = function() {
    $('.container').css('background-image', 'url(/background_images/battleInHeaven.jpg');
    for (i=0;i<12;i++) {
      var control_audio = "audio_player"+i;
      var audio = document.getElementById(control_audio);
      var control_test = audio.hasAttribute("controls");
      console.log("control_audio: "+control_audio);
      console.log("control_test: "+control_test);
      if (control_test) {
          var start_audio = "#audio_player"+i;
          console.log("start_audio: "+start_audio);
          $(start_audio)[0].play();
      }
    }
    currentUserId = Meteor.userId();
    console.log("On screen load: "+currentUserId);
    console.log("should hit this to make active and lobby false");
    Meteor.call('compRemoveLobbyActive');
    $("#player1rock").css("pointer-events", "none");
    $("#player1paper").css("pointer-events", "none");
    $("#player1scissors").css("pointer-events", "none");
    $("#player2rock").css("pointer-events", "none");
    $("#player2paper").css("pointer-events", "none");
    $("#player2scissors").css("pointer-events", "none");
    var id = $("#player1rock").attr('alt');
    var game_id = {id: id};
    var changes = {rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', choice: ''};
    Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    var comp_id = $("#player2rock").attr('alt');
    var comp_game_id = {id: comp_id};
    var changes =  {rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', choice: ''};
    Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
      if (error)
        console.log(error)
    });
    countdown_timer();
  };
	Template.computer.helpers({
    isCurrent: function (name) {
    var currentUserName = Meteor.user().username;
    return name === currentUserName;
    }
  });

  Template.computer.events({
    "click #player1rock": function (event) {
    	// clicked = "yes";
      $("#player1rock").css("pointer-events", "none");
      $("#player1paper").css("pointer-events", "none");
      $("#player1scissors").css("pointer-events", "none");
      console.log("Player one chose rock");
      var id = $("#player1rock").attr('alt');
      var game_id = {id: id};
      var changes = {rock_class: 'rps_red rps_rock', scissors_class: 'rps_hidden', paper_class: 'rps_none', choice: 'rock', clicked: 'yes'};
  		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
	      if (error)
	        console.log(error)
	    	});
	    var comp_random = Math.floor(Math.random()*3);
	    var choice2 = comp_choice_array[comp_random];
      if (choice2 === "paper") {
        var player1loss = parseInt($("#player1loss").val());
        var loss = player1loss += 1;
        console.log("Player two chose paper - you lose");
        var changes = {wlt: 'lose', loss: loss, go_class: 'countdown_none', lose_class: 'countdown_show'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
        var comp_id = $("#player2rock").attr('alt');
        var comp_game_id = {id: comp_id};
				var player2win = parseInt($("#player2win").val());
      	var win = player2win += 1;
      	var changes =  {win: win, rock_class: 'rps_hidden', scissors_class: 'rps_hidden', paper_class: 'rps_red', choice: 'paper'};
	  		Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
		      if (error)
		        console.log(error)
		    });
      } else if (choice2 === "rock") {
        var player1tie = parseInt($("#player1tie").val());
        var tie = player1tie += 1;
        console.log("Player two chose rock - you tie");
        var changes = {wlt: 'tie', tie: tie, go_class: 'countdown_none', tie_class: 'countdown_show'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
		    var comp_id = $("#player2rock").attr('alt');
        var comp_game_id = {id: comp_id};
				var player2tie = parseInt($("#player2tie").val());
      	var tie = player2tie += 1;
      	var changes = {tie: tie, rock_class: 'rps_red rps_rock', scissors_class: 'rps_hidden', paper_class: 'rps_none', choice: 'rock'};
				Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
    			if (error)
      			console.log(error)
  			});
      } else {
        var player1win = parseInt($("#player1win").val());
        var win = player1win += 1;
        console.log("Player two chose scissors or nothing - you win");
        var changes = {wlt: 'win', win: win, go_class: 'countdown_none', win_class: 'countdown_show'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
		    var comp_id = $("#player2rock").attr('alt');
				var comp_game_id = {id: comp_id};
				var player2loss = parseInt($("#player2loss").val());
      	var loss = player2loss += 1;
      	var changes = {loss: loss, rock_class: 'rps_hidden', scissors_class: 'rps_red', paper_class: 'rps_none', choice: 'scissors'};
	      Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
	      if (error)
	        console.log(error)
	    	});
      }
      $('#another_game').css('display', 'inline');
    },
    "click #player1paper": function (event) {
      $("#player1paper").css("pointer-events", "none");
      console.log("Player one chose paper");
      var id = $("#player1scissors").attr('alt');
      var game_id = {id: id};
      var changes =  {rock_class: 'rps_hidden', scissors_class: 'rps_hidden', paper_class: 'rps_red', choice: 'paper', clicked: 'yes'};
  		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
	      if (error)
	        console.log(error)
	    	});

      var choice2 = $("#player2").attr('alt');
      var comp_random = Math.floor(Math.random()*3);
	    var choice2 = comp_choice_array[comp_random];
      if (choice2 === "scissors") {
        var player1loss = parseInt($("#player1loss").val());
        var loss = player1loss += 1;
        console.log("Player two chose scissors - you lose");
        var changes = {wlt: 'lose', loss: loss, go_class: 'countdown_none', lose_class: 'countdown_show'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
		    var comp_id = $("#player2rock").attr('alt');
				var comp_game_id = {id: comp_id};
				var player2win = parseInt($("#player2win").val());
	      var win = player2win += 1;
	      var changes = {win: win, rock_class: 'rps_hidden', scissors_class: 'rps_red', paper_class: 'rps_none', choice: 'scissors'};
	      Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
	      if (error)
	        console.log(error)
	    	});
      } else if (choice2 === "paper") {
        var player1tie = parseInt($("#player1tie").val());
        var tie = player1tie += 1;
        console.log("Player two chose paper - you tie");
        var changes = {wlt: 'tie', tie: tie, go_class: 'countdown_none', tie_class: 'countdown_show'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
		    var comp_id = $("#player2rock").attr('alt');
				var comp_game_id = {id: comp_id};
				var player2tie = parseInt($("#player2tie").val());
	      var tie = player2tie += 1;
	      var changes =  {tie: tie, rock_class: 'rps_hidden', scissors_class: 'rps_hidden', paper_class: 'rps_red', choice: 'paper'};
	  		Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
		      if (error)
		        console.log(error)
		    });
      } else {
        var player1win = parseInt($("#player1win").val());
        var win = player1win += 1;
        console.log("Player two chose rock or nothing - you win");
        var changes = {wlt: 'win', win: win, go_class: 'countdown_none', win_class: 'countdown_show'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
		    var comp_id = $("#player2rock").attr('alt');
				var comp_game_id = {id: comp_id};
				var player2loss = parseInt($("#player2loss").val());
	      var loss = player2loss += 1;
	      var changes = {wlt: 'lose', loss: loss, rock_class: 'rps_red rps_rock', scissors_class: 'rps_hidden', paper_class: 'rps_none', choice: 'rock'};
				Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
    			if (error)
      			console.log(error)
  			});
      }
      $('#another_game').css('display', 'inline');
    },
    "click #player1scissors": function (event) {
      $("#player1scissors").css("pointer-events", "none");
      console.log("Player one chose scissors");
      var id = $("#player1scissors").attr('alt');
      var game_id = {id: id};
      var changes = {rock_class: 'rps_hidden', scissors_class: 'rps_red', paper_class: 'rps_none', choice: 'scissors', clicked: 'yes'};
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      if (error)
        console.log(error)
    	});
			var comp_random = Math.floor(Math.random()*3);
	    var choice2 = comp_choice_array[comp_random];
      if (choice2 === "rock") {
        var player1loss = parseInt($("#player1loss").val());
        var loss = player1loss += 1;
        console.log("Player two chose rock - you lose");
        var changes = {wlt: 'lose', loss: loss, go_class: 'countdown_none', lose_class: 'countdown_show'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
		    var comp_id = $("#player2rock").attr('alt');
				var comp_game_id = {id: comp_id};
				var player2win = parseInt($("#player2win").val());
	      var win = player2win += 1;
	      var changes = {win: win, rock_class: 'rps_red rps_rock', scissors_class: 'rps_hidden', paper_class: 'rps_none', choice: 'rock'};
				Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
    			if (error)
      			console.log(error)
  			});
      } else if (choice2 === "scissors") {
        var player1tie = parseInt($("#player1tie").val());
        var tie = player1tie += 1;
        console.log("Player two chose scissors - you tie");
        var changes = {wlt: 'tie', tie: tie, go_class: 'countdown_none', tie_class: 'countdown_show'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
		    var comp_id = $("#player2rock").attr('alt');
				var comp_game_id = {id: comp_id};
				var player2tie = parseInt($("#player2tie").val());
	      var tie = player2tie += 1;
	      var changes = {tie: tie, rock_class: 'rps_hidden', scissors_class: 'rps_show', paper_class: 'rps_none', choice: 'scissors'};
				Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
    			if (error)
      			console.log(error)
  			});
      } else {
        var player1win = parseInt($("#player1win").val());
        var win = player1win += 1;
        console.log("Player two chose paper or nothing - you win");
        var changes = {wlt: 'win', win: win, go_class: 'countdown_none', win_class: 'countdown_show'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
		    var comp_id = $("#player2rock").attr('alt');
				var comp_game_id = {id: comp_id};
				var player2loss = parseInt($("#player2loss").val());
	      var loss = player2loss += 1;
	      var changes =  {loss: loss, rock_class: 'rps_hidden', scissors_class: 'rps_hidden', paper_class: 'rps_red', choice: 'paper'};
	  		Meteor.call('realtimeGameUpdate', changes, comp_game_id, function(error, result){
		      if (error)
		        console.log(error)
		    });
      }
      $('#another_game').css('display', 'inline');
    },
    "click #another_game": function(event) {
      $("#player1rock").css("pointer-events", "none");
      $("#player1paper").css("pointer-events", "none");
      $("#player1scissors").css("pointer-events", "none");
      $("#player2rock").css("pointer-events", "none");
      $("#player2paper").css("pointer-events", "none");
      $("#player2scissors").css("pointer-events", "none");
      $('#another_game').css('display', 'none');
      var id1 = $("#player1scissors").attr('alt');
      var game_id1 = {id: id1};
      var id2 = $("#player2scissors").attr('alt');
      var game_id2 = {id: id2};
      var computer_avatar = Math.floor(Math.random()*20);
		  var computer_rps = Math.floor(Math.random()*6);
		  var avatar_array = ["/rps_images/catjedi1.jpg","/rps_images/cat-warrior.jpg","/rps_images/cat-wizard.jpg","/rps_images/cat-healer.jpg","/rps_images/dog-jedi.jpg","/rps_images/dogwarrior.jpg","/rps_images/dog-wizard.jpg","/rps_images/dog-healer.jpeg","/rps_images/pickthisone.jpg","/rps_images/malewarrior.jpg","/rps_images/male-wizard.jpg","/rps_images/male-healer.jpg","/rps_images/femalejedi.jpg","/rps_images/femalewarrior.jpg","/rps_images/female-wizard.jpg","/rps_images/femalehealer.jpg","/rps_images/pattern1.jpg","/rps_images/pattern2.jpg","/rps_images/pattern3.jpg","/rps_images/pattern4.jpg"];
		  var rock_array = ["/rps_images/malerock.jpg","/rps_images/femalerock.jpg","/rps_images/catrock.JPG","/rps_images/dogrock.jpg","/rps_images/objectrock1.jpg","/rps_images/objectrock2.jpg"];
		  var paper_array = ["/rps_images/malepaper.jpg","/rps_images/femalepaper.jpg","/rps_images/catpaper.jpg","/rps_images/dogpaper.jpg","/rps_images/objectpaper1.jpg","/rps_images/objectpaper2.jpg"];
		  var scissors_array = ["/rps_images/malescissors.jpg","/rps_images/femalescissors.jpg","/rps_images/catscissors.jpg","/rps_images/dogscissors.jpg","/rps_images/objectscissors1.jpg","/rps_images/objectscissors2.jpg"];
      var changes = {rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', choice: '', clicked: 'no'};
  		Meteor.call('realtimeGameUpdate', changes, game_id1, function(error, result){
	      if (error)
	        console.log(error)
	    	});
      var changes = {avatar_url: avatar_array[computer_avatar], rock_url: rock_array[computer_rps], paper_url: paper_array[computer_rps], scissors_url: scissors_array[computer_rps], rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', choice: ''};
  		Meteor.call('realtimeGameUpdate', changes, game_id2, function(error, result){
	      if (error)
	        console.log(error)
	    	});
	    countdown_timer();
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'initializePlayer': function(){
      var player = {initialize: true};
      Meteor.call('playerInsert', player, function (error, result){
        if (error)
          console.log(error)
      });
    }
  });
}
