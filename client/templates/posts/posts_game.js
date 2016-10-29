if (Meteor.isClient) {
		Template.postsGame.rendered = function() {
    	setTimeout(function(){
    		console.log("go");
				document.getElementById('countone').style.display = 'none';
		    document.getElementById('go').style.display = '';
		  }, 5000);
			setTimeout(function(){
				console.log("one");
				document.getElementById('counttwo').style.display = 'none';
		    document.getElementById('countone').style.display = '';
			}, 4000);
			setTimeout(function(){
				console.log("two");
				document.getElementById('countthree').style.display = 'none';
		    document.getElementById('counttwo').style.display = '';
			}, 3000);
			setTimeout(function(){
				console.log("three");
				document.getElementById('ready').style.display = 'none';
		    document.getElementById('countthree').style.display = '';
			}, 2000);
			console.log('hitting removeLobbyActive');
    	Meteor.call('removeLobbyActive');
		};
		var comp_random = Math.floor(Math.random()*3);
		function storage_getter() {
			pwin = localStorage.getItem("pwin");
			ploss = localStorage.getItem("ploss");
			ptie = localStorage.getItem("ptie");
			cwin = localStorage.getItem("cwin");
			closs = localStorage.getItem("closs");
			ctie = localStorage.getItem("ctie");
		}

		function storage_setter() {
			localStorage.setItem("pwin", pwin);
			localStorage.setItem("ploss", ploss);
			localStorage.setItem("ptie", ptie);
			localStorage.setItem("cwin", cwin);
			localStorage.setItem("closs", closs);
			localStorage.setItem("ctie", ctie);
		}
		function table_update() {
			$("#pwin").html(pwin);
			$("#ploss").html(ploss);
			$("#ptie").html(ptie);
			$("#cwin").html(cwin);
			$("#closs").html(closs);
			$("#ctie").html(ctie);
		}
		storage_getter();
		table_update();
		Template.postsGame.events({
			"click #rock": function (event) {
				var name = $(".player_name").attr("id");
				console.log("you clicked Rock");
				document.getElementById('rock').style.marginTop = '90px';
				document.getElementById('rock').style.border = '4px solid red';
				document.getElementById('rock').style.padding = '0px';
				document.getElementById('paper').style.display = 'none';
        document.getElementById('scissors').style.visibility = 'hidden';
        console.log(name);
        if (name === "Mike Dang" || comp_random == 1) {
	        console.log("Mike, you lose!");
	        console.log(comp_random);
	        ploss++
	        cwin++
	        console.log("ploss: "+ploss+" cwin: "+cwin);
	        table_update();
	      	storage_setter();
	        document.getElementById('go').style.display = 'none';
	        document.getElementById('loser').style.display = '';
	        document.getElementById('opp_paper').style.border = '4px solid red';
					document.getElementById('opp_paper').style.padding = '0px';
					document.getElementById('opp_rock').style.visibility = 'hidden';
	        document.getElementById('opp_scissors').style.visibility = 'hidden';
      	} else if (comp_random == 2) {
      		console.log("You Win!");
      		console.log(comp_random);
      		pwin++
      		closs++
      		table_update();
	      	storage_setter();
      		document.getElementById('go').style.display = 'none';
      		$("#winner").addClass( "reverser" );
	        document.getElementById('winner').style.display = '';
	        document.getElementById('opp_scissors').style.border = '4px solid red';
					document.getElementById('opp_scissors').style.padding = '0px';
					document.getElementById('opp_rock').style.visibility = 'hidden';
	        document.getElementById('opp_paper').style.display = 'none';

      	} else {
      		console.log("You tied.");
      		console.log(comp_random);
      		ptie++
      		ctie++
      		table_update();
	      	storage_setter();
      		document.getElementById('go').style.display = 'none';
	        document.getElementById('tie').style.display = '';
	        document.getElementById('opp_rock').style.marginTop = '90px';
					document.getElementById('opp_rock').style.border = '4px solid red';
					document.getElementById('opp_rock').style.padding = '0px';
					document.getElementById('opp_paper').style.display = 'none';
	        document.getElementById('opp_scissors').style.visibility = 'hidden';
      	}
			},
			"click #paper": function (event) {
				var name = $(".player_name").attr("id");
				console.log("you clicked Paper");
				document.getElementById('paper').style.border = '4px solid red';
				document.getElementById('paper').style.padding = '0px';
				document.getElementById('rock').style.visibility = 'hidden';
        document.getElementById('scissors').style.visibility = 'hidden';
        console.log(name);
        if (name === "Mike Dang" || comp_random == 2) {
	        console.log("Mike, you lose!");
	        console.log(comp_random);
	        ploss++
	        cwin++
	        table_update();
	      	storage_setter();
	        document.getElementById('go').style.display = 'none';
	        document.getElementById('loser').style.display = '';
	        document.getElementById('opp_scissors').style.border = '4px solid red';
					document.getElementById('opp_scissors').style.padding = '0px';
					document.getElementById('opp_rock').style.visibility = 'hidden';
	        document.getElementById('opp_paper').style.display = 'none';
	        } else if (comp_random == 0) {
	      		console.log("You Win!");
	      		console.log(comp_random);
	      		pwin++
	      		closs++
	      		table_update();
	      		storage_setter();
	      		document.getElementById('go').style.display = 'none';
	      		$("#winner").addClass( "reverser" );
		        document.getElementById('winner').style.display = '';
		        document.getElementById('opp_rock').style.marginTop = '90px';
						document.getElementById('opp_rock').style.border = '4px solid red';
						document.getElementById('opp_rock').style.padding = '0px';
						document.getElementById('opp_paper').style.display = 'none';
		        document.getElementById('opp_scissors').style.visibility = 'hidden';
      		} else {
	      		console.log("You tied.");
	      		console.log(comp_random);
	      		ptie++
	      		ctie++
	      		table_update();
	      		storage_setter();
	      		document.getElementById('go').style.display = 'none';
		        document.getElementById('tie').style.display = '';
		        document.getElementById('opp_paper').style.border = '4px solid red';
						document.getElementById('opp_paper').style.padding = '0px';
						document.getElementById('opp_rock').style.visibility = 'hidden';
		        document.getElementById('opp_scissors').style.visibility = 'hidden';
      	}
			},
			"click #scissors": function (event) {
				var name = $(".player_name").attr("id");
				console.log("you clicked Scissors");
				document.getElementById('scissors').style.border = '4px solid red';
				document.getElementById('scissors').style.padding = '0px';
				document.getElementById('rock').style.visibility = 'hidden';
        document.getElementById('paper').style.display = 'none';
        console.log(name);
        if (name === "Mike Dang" || comp_random == 0) {
	        console.log("Mike, you lose!");
	        console.log(comp_random);
	        ploss++
      		cwin++
      		table_update();
      		storage_setter();
	        document.getElementById('go').style.display = 'none';
	        document.getElementById('loser').style.display = '';
	        document.getElementById('opp_rock').style.marginTop = '90px';
					document.getElementById('opp_rock').style.border = '4px solid red';
					document.getElementById('opp_rock').style.padding = '0px';
					document.getElementById('opp_paper').style.display = 'none';
	        document.getElementById('opp_scissors').style.visibility = 'hidden';
	        } else if (comp_random == 1) {
	      		console.log("You Win!");
	      		console.log(comp_random);
	      		pwin++
	      		closs++
	      		table_update();
	      		storage_setter();
	      		document.getElementById('go').style.display = 'none';
	      		$("#winner").addClass( "reverser" );
		        document.getElementById('winner').style.display = '';
		        document.getElementById('opp_paper').style.border = '4px solid red';
						document.getElementById('opp_paper').style.padding = '0px';
						document.getElementById('opp_rock').style.visibility = 'hidden';
		        document.getElementById('opp_scissors').style.visibility = 'hidden';
		      } else {
	      		console.log("You tied.");
	      		console.log(comp_random);
	      		ptie++
	      		ctie++
	      		table_update();
	      		storage_setter();
	      		document.getElementById('go').style.display = 'none';
		        document.getElementById('tie').style.display = '';
		        document.getElementById('opp_scissors').style.border = '4px solid red';
						document.getElementById('opp_scissors').style.padding = '0px';
						document.getElementById('opp_rock').style.visibility = 'hidden';
		        document.getElementById('opp_paper').style.display = 'none';
		      }
			},
			"click #reset_scores": function (event) {
				localStorage.setItem("pwin", 0);
				localStorage.setItem("ploss", 0);
				localStorage.setItem("ptie", 0);
				localStorage.setItem("cwin", 0);
				localStorage.setItem("closs", 0);
				localStorage.setItem("ctie", 0);
			},
			"click #toggle_scores": function (event) {
				$(".score_table").toggle();
			},
			"click #start": function (event) {
				location.reload();
			}
		});
}
