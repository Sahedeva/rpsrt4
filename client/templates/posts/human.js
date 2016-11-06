if (Meteor.isClient) {
  function countdown_timer() {
    var id = $("#player1rock").attr('alt');
    var game_id = {id: id};
    var changes = {win_class: 'countdown_none',lose_class: 'countdown_none',tie_class: 'countdown_none',winD_class: 'countdown_none',loseD_class: 'countdown_none',tieD_class: 'countdown_none',ready_class: 'countdown_show'};
    Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
    });
    setTimeout(function(){
      var changes = {countthree_class: 'countdown_none', go_class: 'countdown_show', rock_class: 'rps_green', scissors_class: 'rps_green', paper_class: 'rps_green'};
      $('#goSound')[0].play();
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
      	function songStart() {
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
	      }
        $("#player1rock").css("pointer-events", "none");
    		$("#player1paper").css("pointer-events", "none");
    		$("#player1scissors").css("pointer-events", "none");
    		var choice1 = $('#player1').attr('alt');
    		console.log('choice1: '+choice1);
    		var choice2 = $('#player2').attr('alt');
    		console.log('choice2: '+choice2);
    		if (choice1 === "rock") {
		      if (choice2 === "paper") {
		        var player1loss = parseInt($("#player1loss").val());
		        var loss = player1loss += 1;
		        console.log("Player two chose paper - you lose");
		    		setTimeout(function(){
		          $('#paperRockSound')[0].play();
              var changes = {wlt: 'lose', loss: loss, go_class: 'countdown_none', lose_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#loserSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1550);
		          },1900);
		        },500);
		      } else if (choice2 === "rock") {
		        var player1tie = parseInt($("#player1tie").val());
		        var tie = player1tie += 1;
		        console.log("Player two chose rock - you tie");

		    		setTimeout(function(){
		          $('#rockRockSound')[0].play();
              var changes = {wlt: 'tie', tie: tie, go_class: 'countdown_none', tie_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#tieSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1500);
		          },1500);
		        },500);
		      } else if (choice2 === "scissors") {
		        var player1win = parseInt($("#player1win").val());
		        var win = player1win += 1;
		        console.log("Player two chose scissors or nothing - you win");

		    		setTimeout(function(){
		          $('#rockScissorsSound')[0].play();
              var changes = {wlt: 'win', win: win, go_class: 'countdown_none', win_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#winnerSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1700);
		          },2100);
		        },500);
		      } else {
            var player1winD = ($("#player1winD").val() == "NaN") ? 0 : parseInt($("#player1winD").val());
		        var winD = player1winD += 1;
		        console.log("Player 2 chose nothing - you win");
		    		setTimeout(function(){
		          $('#opponentTooSlowSound')[0].play();
              var changes = {wlt: 'win', winD: winD, go_class: 'countdown_none', winD_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#winnerSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1700);
		          },2000);
		        },500);
		      }
		    } else if (choice1 === "paper") {
		      if (choice2 === "scissors") {
		        var player1loss = parseInt($("#player1loss").val());
		        var loss = player1loss += 1;
		        console.log("Player two chose scissors - you lose");
		    		setTimeout(function(){
		          $('#scissorsPaperSound')[0].play();
              var changes = {wlt: 'lose', loss: loss, go_class: 'countdown_none', lose_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#loserSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1550);
		          },1900);
		        },500);
		      } else if (choice2 === "paper") {
		        var player1tie = parseInt($("#player1tie").val());
		        var tie = player1tie += 1;
		        console.log("Player two chose paper - you tie");
		    		setTimeout(function(){
		          $('#paperPaperSound')[0].play();
              var changes = {wlt: 'tie', tie: tie, go_class: 'countdown_none', tie_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#tieSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1400);
		          },1900);
		        },500);
		      } else if (choice2 === "rock") {
		        var player1win = parseInt($("#player1win").val());
		        var win = player1win += 1;
		        console.log("Player two chose rock - you win");
		    		setTimeout(function(){
		          $('#paperRockSound')[0].play();
              var changes = {wlt: 'win', win: win, go_class: 'countdown_none', win_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#winnerSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1700);
		          },1900);
		        },500);
		      } else {
            var player1winD = ($("#player1winD").val() == "NaN") ? 0 : parseInt($("#player1winD").val());
		        var winD = player1winD += 1;
		        console.log("Player 2 chose nothing - you win");
		    		setTimeout(function(){
		          $('#opponentTooSlowSound')[0].play();
              var changes = {wlt: 'win', winD: winD, go_class: 'countdown_none', winD_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#winnerSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1700);
		          },2000);
		        },500);
		      }
		    } else if (choice1 === "scissors") {
		      if (choice2 === "rock") {
		        var player1loss = parseInt($("#player1loss").val());
		        var loss = player1loss += 1;
		        console.log("Player two chose rock - you lose");
				    setTimeout(function(){
		          $('#rockScissorsSound')[0].play();
              var changes = {wlt: 'lose', loss: loss, go_class: 'countdown_none', lose_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#loserSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1550);
		          },2100);
		        },500);
		      } else if (choice2 === "scissors") {
		        var player1tie = parseInt($("#player1tie").val());
		        var tie = player1tie += 1;
		        console.log("Player two chose scissors - you tie");
				    setTimeout(function(){
		          $('#scissorsScissorsSound')[0].play();
              var changes = {wlt: 'tie', tie: tie, go_class: 'countdown_none', tie_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#tieSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1400);
		          },1950);
		        },500);
		      } else if (choice2 === "paper") {
		        var player1win = parseInt($("#player1win").val());
		        var win = player1win += 1;
		        console.log("Player two chose paper - you win");
		    		setTimeout(function(){
		          $('#scissorsPaperSound')[0].play();
              var changes = {wlt: 'win', win: win, go_class: 'countdown_none', win_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#winnerSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1700);
		          },1850);
		        },500);
		      } else {
            var player1winD = ($("#player1winD").val() == "NaN") ? 0 : parseInt($("#player1winD").val());
		        var winD = player1winD += 1;
		        console.log("Player 2 chose nothing - you win");
		    		setTimeout(function(){
		          $('#opponentTooSlowSound')[0].play();
              var changes = {wlt: 'win', winD: winD, go_class: 'countdown_none', winD_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#winnerSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1700);
		          },2000);
		        },500);
		      }
		    } else {
		    	if (choice2 ==="rock") {
            var player1lossD = ($("#player1lossD").val() == "NaN") ? 0 : parseInt($("#player1lossD").val());
		        var lossD = player1lossD += 1;
		    		console.log("You chose nothing and opponent chose rock - you lose");
		    		setTimeout(function(){
		          $('#tooSlowSound')[0].play();
              var changes = {wlt: 'lose', lossD: lossD, go_class: 'countdown_none', loseD_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#loserSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1550);
		          },2000);
		        },500);
		    	} else if (choice2 ==="paper") {
            var player1lossD = ($("#player1lossD").val() == "NaN") ? 0 : parseInt($("#player1lossD").val())
		        var lossD = player1lossD += 1;
		    		console.log("You chose nothing and opponent chose paper - you lose");
		    		setTimeout(function(){
		          $('#tooSlowSound')[0].play();
              var changes = {wlt: 'lose', lossD: lossD, go_class: 'countdown_none', loseD_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#loserSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1550);
		          },2000);
		        },500);
		    	} else if (choice2 ==="scissors") {
            var player1lossD = ($("#player1lossD").val() == "NaN") ? 0 : parseInt($("#player1lossD").val())
		        var lossD = player1lossD += 1;
		    		console.log("You chose nothing and opponent chose scissors - you lose");
		    		setTimeout(function(){
		          $('#tooSlowSound')[0].play();
              var changes = {wlt: 'lose', lossD: lossD, go_class: 'countdown_none', loseD_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#loserSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1550);
		          },2000);
		        },500);
		    	} else {
            var player1tieD = ($("#player1tieD").val() == "NaN") ? 0 : parseInt($("#player1tieD").val());
		        var tieD = player1tieD += 1;
		    		console.log("You chose nothing and opponent chose nothing - you tie");
            // console.log($("#player1winD").val());
            // console.log($("#player1winD").val()=="NaN");
            // console.log($("#player1lossD").val());
            // console.log($("#player1lossD").val()==NaN);
            // console.log($("#player1tieD").val());
            // console.log($("#player1tieD").val()==NaN);
		    		setTimeout(function(){
		          $('#bothTooSlowSound')[0].play();
              var changes = {wlt: 'tie', tieD: tieD, go_class: 'countdown_none', tieD_class: 'countdown_show'};
  		    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
  				      if (error)
  				        console.log(error)
  				    	});
		          setTimeout(function(){
		            $('#tieSound')[0].play();
		            setTimeout(function(){
		              songStart();
                  var changes = {another: 'show'};
                  Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      				      if (error)
      				        console.log(error)
      				    	});
		            },1400);
		          },2000);
		        },500);
		    	}
		    }
		  }, 700);
    }, 6200);
    setTimeout(function(){
      var changes = {counttwo_class: 'countdown_none', countthree_class: 'countdown_show'};
      $('#threeSound')[0].play();
      console.log('4 seconds should have elapsed');
      console.log('changes: '+changes);
      console.log('game_id: '+game_id);
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    }, 4800);
    setTimeout(function(){
      var changes = {countone_class: 'countdown_none', counttwo_class: 'countdown_show'};
      $('#twoSound')[0].play();
      console.log('3 seconds should have elapsed');
      console.log('changes: '+changes);
      console.log('game_id: '+game_id);
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    }, 4000);
    setTimeout(function(){
      var changes = {ready_class: 'countdown_none', countone_class: 'countdown_show'};
      $('#oneSound')[0].play();
      console.log('2 seconds should have elapsed');
      console.log('changes: '+changes);
      console.log('game_id: '+game_id);
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        });
    }, 2800);
  };

  Template.human.rendered = function() {
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
          $(start_audio)[0].pause();
      }
    }
    console.log("should hit this for humanUpdate");
    Meteor.call('humanUpdate');
    $("#player1rock").css("pointer-events", "none");
    $("#player1paper").css("pointer-events", "none");
    $("#player1scissors").css("pointer-events", "none");
    $("#player2rock").css("pointer-events", "none");
    $("#player2paper").css("pointer-events", "none");
    $("#player2scissors").css("pointer-events", "none");
    setTimeout(function(){
    	console.log('waiting 1 seconds to allow for both players to hit game room');
    	$('#readySound')[0].play();
    	countdown_timer();
    }, 1000);
    Tracker.autorun(function(){
    	if (Players.findOne({countdownTimer: "on", userId: Meteor.userId()})) {
        Meteor.call('timerOff');
	    	console.log("setting countdownTimer to off so route doesn't get hit again")
	      console.log("timer was on - start countdown");
	      for (i=0;i<12;i++) {
	        var control_audio = "audio_player"+i;
	        var audio = document.getElementById(control_audio);
	        var control_test = audio.hasAttribute("controls");
	        console.log("control_audio: "+control_audio);
	        console.log("control_test: "+control_test);
	        if (control_test) {
	            var start_audio = "#audio_player"+i;
	            console.log("start_audio: "+start_audio);
	            $(start_audio)[0].pause();
	        }
	      }
	      $('#readySound')[0].play();
	      countdown_timer();
      }
    });
  };

  Template.human.events({
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
  	},
    "click #player1paper": function (event) {
      $("#player1paper").css("pointer-events", "none");
      console.log("Player one chose paper");
      var id = $("#player1rock").attr('alt');
      var game_id = {id: id};
      var changes =  {rock_class: 'rps_hidden', scissors_class: 'rps_hidden', paper_class: 'rps_red', choice: 'paper', clicked: 'yes'};
  		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
	      if (error)
	        console.log(error)
	    	});
	  },
    "click #player1scissors": function (event) {
      $("#player1scissors").css("pointer-events", "none");
      console.log("Player one chose scissors");
      var id = $("#player1rock").attr('alt');
      var game_id = {id: id};
      var changes = {rock_class: 'rps_hidden', scissors_class: 'rps_red', paper_class: 'rps_none', choice: 'scissors', clicked: 'yes'};
      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
      if (error)
        console.log(error)
    	});
    },
    "click #another_game": function(event) {
    	var oppId = $("#player2scissors").attr('alt');
    	console.log('oppId: '+oppId);
    	var opponent_id = {_id: oppId};
    	console.log('JSON.stringify(opponent_id): '+JSON.stringify(opponent_id));
      $("#player1rock").css("pointer-events", "none");
      $("#player1paper").css("pointer-events", "none");
      $("#player1scissors").css("pointer-events", "none");
      $("#player2rock").css("pointer-events", "none");
      $("#player2paper").css("pointer-events", "none");
      $("#player2scissors").css("pointer-events", "none");
      Meteor.call('humanGameUpdate', opponent_id);
    }
  });
}
