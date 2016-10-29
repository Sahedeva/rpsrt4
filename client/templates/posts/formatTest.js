if (Meteor.isClient) {
	var comp_choice_array = ['rock','paper','scissors']; 
  function countdown_timer() {
  	var meteorId = Meteor.userId();
  	console.log("Meteor.userId(): "+meteorId);
    var id = $("#player1rock").attr('alt');
    console.log('Player1rock alt (id): '+id);
    var game_id = {id: id};
    console.log('Game_id: '+JSON.stringify(game_id));
    var changes = {win_class: 'countdown_none',lose_class: 'countdown_none',tie_class: 'countdown_none',ready_class: 'countdown_show'};
    Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        }); 
    setTimeout(function(){ 
      var changes = {countthree_class: 'countdown_none', go_class: 'countdown_show'};
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
          var player2win = parseInt($("#player2win").val());
          var hal_win = player2win += 1;
	        var changes = {go_class: 'countdown_none', lose_class: 'countdown_show', loss: loss};
          setTimeout(function(){
            $('#loserSound')[0].play();
            setTimeout(function(){
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
              $('#another_game').css('display', 'inline');
            },1000);
          },500);
	    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});
    			if (comp_choice=="rock") {
            var changes = {hal_win: hal_win, hal_rock_class: 'rps_red rps_rock', hal_scissors_class: 'rps_hidden', hal_paper_class: 'rps_none', hal_choice: 'rock'}
  					Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
	      			if (error)
	        			console.log(error)
	    			});    
    			} else if (comp_choice=="paper") {
    				var changes =  {hal_win: hal_win, hal_rock_class: 'rps_hidden', hal_scissors_class: 'rps_hidden', hal_paper_class: 'rps_red', hal_choice: 'paper'};
			  		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
				      if (error)
				        console.log(error)
				    });
    			} else if (comp_choice=="scissors") {
    				var changes = {hal_win: hal_win, hal_rock_class: 'rps_hidden', hal_scissors_class: 'rps_red', hal_paper_class: 'rps_none', hal_choice: 'scissors'};
			      Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
			      if (error)
			        console.log(error)
			    	});    
    			}
			  }    
      }, 1300);
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

  Template.formatTest.rendered = function() {
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
    var currentUserId = Meteor.userId();
    console.log("On Hal screen load: "+currentUserId);
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
    var changes = {win_class: 'countdown_none',lose_class: 'countdown_none',tie_class: 'countdown_none',ready_class: 'countdown_show',rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', choice: '', hal_rock_class: 'rps_show', hal_scissors_class: 'rps_show', hal_paper_class: 'rps_show', hal_choice: '', ready_class: 'countdown_show', countone_class: 'countdown_none', counttwo_class: 'countdown_none', countthree_class: 'countdown_none', go_class: 'countdown_none', win_class: 'countdown_none', lose_class: 'countdown_none', tie_class: 'countdown_none', clicked: 'no'};
    Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
        if (error)
          console.log(error)
        }); 
    $('#readySound')[0].play();  
    countdown_timer();
  };

  Template.formatTest.events({
    "click #player1rock": function (event) {
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
        var player2win = parseInt($("#player2win").val());
        var hal_win = player2win += 1; 
        console.log("Player two chose paper - you lose");
        var changes = {wlt: 'lose', loss: loss, go_class: 'countdown_none', lose_class: 'countdown_show',hal_win: hal_win, hal_rock_class: 'rps_hidden', hal_scissors_class: 'rps_hidden', hal_paper_class: 'rps_red', hal_choice: 'paper'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
        setTimeout(function(){
          $('#paperRockSound')[0].play();
          setTimeout(function(){
            $('#loserSound')[0].play();
            setTimeout(function(){
              songStart();
              $('#another_game').css('display', 'inline');
            },2000);
          },2000);
        },500); 
      } else if (choice2 === "rock") {
        var player1tie = parseInt($("#player1tie").val());
        var tie = player1tie += 1;
        var player2tie = parseInt($("#player2tie").val());
        var hal_tie = player2tie += 1;
        console.log("Player two chose rock - you tie");
        var changes = {wlt: 'tie', tie: tie, go_class: 'countdown_none', tie_class: 'countdown_show',hal_tie: hal_tie, hal_rock_class: 'rps_red rps_rock', hal_scissors_class: 'rps_hidden', hal_paper_class: 'rps_none', hal_choice: 'rock'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
        setTimeout(function(){
          $('#tieSound')[0].play();
          setTimeout(function(){
            songStart();
            $('#another_game').css('display', 'inline');
          },1000);
        },500);
      } else {   
        var player1win = parseInt($("#player1win").val());
        var win = player1win += 1;
        var player2loss = parseInt($("#player2loss").val());
        var hal_loss = player2loss += 1;
        console.log("Hal chose scissors - you win");
        var changes = {wlt: 'win', win: win, go_class: 'countdown_none', win_class: 'countdown_show',hal_loss: hal_loss, hal_rock_class: 'rps_hidden', hal_scissors_class: 'rps_red', hal_paper_class: 'rps_none', hal_choice: 'scissors'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    });
        setTimeout(function(){
          $('#rockScissorsSound')[0].play();
          setTimeout(function(){
            $('#winnerSound')[0].play();
            setTimeout(function(){
              songStart();
              $('#another_game').css('display', 'inline');
            },2000);
          },2200);
        },500); 
      }     
    },
    "click #player1paper": function (event) {
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
        var player2win = parseInt($("#player2win").val());
        var hal_win = player2win += 1; 
        console.log("Player two chose scissors - you lose");
        var changes = {wlt: 'lose', loss: loss, go_class: 'countdown_none', lose_class: 'countdown_show',hal_win: hal_win, hal_rock_class: 'rps_hidden', hal_scissors_class: 'rps_red', hal_paper_class: 'rps_none', hal_choice: 'scissors'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
        setTimeout(function(){
          $('#scissorsPaperSound')[0].play();
          setTimeout(function(){
            $('#loserSound')[0].play();
            setTimeout(function(){
              songStart();
              $('#another_game').css('display', 'inline');
            },2000);
          },2000);
        },500); 
      } else if (choice2 === "paper") {
        var player1tie = parseInt($("#player1tie").val());
        var tie = player1tie += 1;
        var player2tie = parseInt($("#player2tie").val());
        var hal_tie = player2tie += 1;
        console.log("Player two chose paper - you tie");
        var changes = {wlt: 'tie', tie: tie, go_class: 'countdown_none', tie_class: 'countdown_show',hal_tie: hal_tie, hal_rock_class: 'rps_hidden', hal_scissors_class: 'rps_hidden', hal_paper_class: 'rps_red', hal_choice: 'paper'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
        setTimeout(function(){
          $('#tieSound')[0].play();
          setTimeout(function(){
            songStart();
            $('#another_game').css('display', 'inline');
          },1000);
        },500);
      } else {  
        var player1win = parseInt($("#player1win").val());
        var win = player1win += 1;
        var player2loss = parseInt($("#player2loss").val());
        var hal_loss = player2loss += 1;
        console.log("Hal chose rock - you win");
        var changes = {wlt: 'win', win: win, go_class: 'countdown_none', win_class: 'countdown_show', hal_wlt: 'lose', hal_loss: hal_loss, hal_rock_class: 'rps_red rps_rock', hal_scissors_class: 'rps_hidden', hal_paper_class: 'rps_none', hal_choice: 'rock'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
        setTimeout(function(){
          $('#paperRockSound')[0].play();
          setTimeout(function(){
            $('#winnerSound')[0].play();
            setTimeout(function(){
              songStart();
              $('#another_game').css('display', 'inline');
            },2000);
          },2000);
        },500); 
      }
    },
    "click #player1scissors": function (event) {
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
        var player2win = parseInt($("#player2win").val());
        var hal_win = player2win += 1;         
        console.log("Hal chose rock - you lose");
        var changes = {wlt: 'lose', loss: loss, go_class: 'countdown_none', lose_class: 'countdown_show', hal_win: hal_win, hal_rock_class: 'rps_red rps_rock', hal_scissors_class: 'rps_hidden', hal_paper_class: 'rps_none', hal_choice: 'rock'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
        setTimeout(function(){
          $('#rockScissorsSound')[0].play();
          setTimeout(function(){
            $('#loserSound')[0].play();
            setTimeout(function(){
              songStart();
              $('#another_game').css('display', 'inline');
            },2000);
          },2200);
        },500); 
      } else if (choice2 === "scissors") {
        var player1tie = parseInt($("#player1tie").val());
        var tie = player1tie += 1;
        var player2tie = parseInt($("#player2tie").val());
        var hal_tie = player2tie += 1;
        console.log("Player two chose scissors - you tie");
        var changes = {wlt: 'tie', tie: tie, go_class: 'countdown_none', tie_class: 'countdown_show', hal_tie: hal_tie, hal_rock_class: 'rps_hidden', hal_scissors_class: 'rps_show', hal_paper_class: 'rps_none', hal_choice: 'scissors'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
        setTimeout(function(){
          $('#tieSound')[0].play();
          setTimeout(function(){
            songStart();
            $('#another_game').css('display', 'inline');
          },1000);
        },500);
		  } else {
        var player1win = parseInt($("#player1win").val());
        var win = player1win += 1;
        var player2loss = parseInt($("#player2loss").val());
        var hal_loss = player2loss += 1;
        console.log("Hal chose paper - you win");
        var changes = {wlt: 'win', win: win, go_class: 'countdown_none', win_class: 'countdown_show', hal_loss: hal_loss, hal_rock_class: 'rps_hidden', hal_scissors_class: 'rps_hidden', hal_paper_class: 'rps_red', hal_choice: 'paper'};
    		Meteor.call('realtimeGameUpdate', changes, game_id, function(error, result){
		      if (error)
		        console.log(error)
		    	});
        setTimeout(function(){
          $('#scissorsPaperSound')[0].play();
          setTimeout(function(){
            $('#winnerSound')[0].play();
            setTimeout(function(){
              songStart();
              $('#another_game').css('display', 'inline');
            },2000);
          },2000);
        },500); 
      }
    },
    "click #another_game": function(event) {
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
      var changes = {rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', choice: '', clicked: 'no', hal_avatar_url: avatar_array[computer_avatar], hal_rock_url: rock_array[computer_rps], hal_paper_url: paper_array[computer_rps], hal_scissors_url: scissors_array[computer_rps], hal_rock_class: 'rps_show', hal_scissors_class: 'rps_show', hal_paper_class: 'rps_show', hal_choice: ''};
  		Meteor.call('realtimeGameUpdate', changes, game_id1, function(error, result){
	      if (error)
	        console.log(error)
	    	});    
      $('#readySound')[0].play();
	    countdown_timer();    
    }
  });
}