Router.configure({
 layoutTemplate: 'layout',
 loadingTemplate: 'loading',
 notFoundTemplate: 'notFound',
 waitOn: function() {
 	Meteor.subscribe('players');
 	Meteor.subscribe('hal');
 }
});

Router.map(function() {
    this.route('history', {path: '/'});
});

var mustBeSignedIn = function() {
    if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('history');
    } else {
        this.next();
    }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['about', 'history', 'noLoginHal']});

Router.route('/human', {
	name: 'human',
	data: function(){
		var currentUserId = Meteor.userId();
    var player = Players.findOne({userId: currentUserId, human: true});
    var opp_id = player['opponent_id'];
		var opp = Players.findOne({userId: opp_id, human: true});
		if (opp&&player){
			return {
			player: player,
			opp: opp
			};
		} else {
			Router.go('history');
		}
	}
});

Router.route('/about', {name: 'about'});

Router.route('/noLoginHal', {name: 'noLoginHal'});

Router.route('/new', {
	name: 'new_user',
	data: function(){
        var currentUserId = Meteor.userId();
        var player = Players.findOne({userId: currentUserId});
        return player;
  			}
});

Router.route('/lobby', {
	name: 'lobby',
	data: function(){
		var player = {lobby: true, challenge: 'show', accept: 'hidden', reject: 'hidden', game: 'hidden', ranOutTime: 'hidden'};
    console.log(player);
    Meteor.call('playerLobbyUpdate', player, function(error, result){
      // display the error to the user and about
      if (error)
        console.log(error)
    });
		return Players.find({lobby: true});
	}
});

Router.route('/realtime', {
	name: 'posts_realtime',
	data: function(){
		var players = Players.find({active: true}, {limit: 2});
		var test = Players.find({active: true}, {limit: 2}).fetch();
		console.log("players object: "+test);
		return { players: players};
	}
});

Router.route('/computer', {
	name: 'computer',
	data: function(){
		Meteor.call('computerUpdate');
		var players = Players.find({computer: true}, {limit: 2});
		return { players: players};
	}
});

Router.route('/game', {
	name: 'posts_game',
	data: function(){
        var currentUserId = Meteor.userId();
        console.log(currentUserId);
	      var computer_avatar = Math.floor(Math.random()*20);
        var computer_rps = Math.floor(Math.random()*6);
        var avatar_array = ["/rps_images/catjedi1.jpg","/rps_images/cat-warrior.jpg","/rps_images/cat-wizard.jpg","/rps_images/cat-healer.jpg","/rps_images/dog-jedi.jpg","/rps_images/dogwarrior.jpg","/rps_images/dog-wizard.jpg","/rps_images/dog-healer.jpeg","/rps_images/pickthisone.jpg","/rps_images/malewarrior.jpg","/rps_images/male-wizard.jpg","/rps_images/male-healer.jpg","/rps_images/femalejedi.jpg","/rps_images/femalewarrior.jpg","/rps_images/female-wizard.jpg","/rps_images/femalehealer.jpg","/rps_images/pattern1.jpg","/rps_images/pattern2.jpg","/rps_images/pattern3.jpg","/rps_images/pattern4.jpg"];
        var rock_array = ["/rps_images/malerock.jpg","/rps_images/femalerock.jpg","/rps_images/catrock.JPG","/rps_images/dogrock.jpg","/rps_images/objectrock1.jpg","/rps_images/objectrock2.jpg"];
        var paper_array = ["/rps_images/malepaper.jpg","/rps_images/femalepaper.jpg","/rps_images/catpaper.jpg","/rps_images/dogpaper.jpg","/rps_images/objectpaper1.jpg","/rps_images/objectpaper2.jpg"];
        var scissors_array = ["/rps_images/malescissors.jpg","/rps_images/femalescissors.jpg","/rps_images/catscissors.jpg","/rps_images/dogscissors.jpg","/rps_images/objectscissors1.jpg","/rps_images/objectscissors2.jpg"];
        var loser = "http://recruitingdaily.com/wp-content/uploads/sites/6/2014/08/HelloLoserPX1.jpg";
        var winner = "http://www.reunionsmag.com/images/computer-winner1.jpg";
        var tie = "http://cdn.meme.am/instances/57849610.jpg";
        var opponent_avatar = avatar_array[computer_avatar];
        var opponent_rock = rock_array[computer_rps];
        var opponent_paper = paper_array[computer_rps];
        var opponent_scissors = scissors_array[computer_rps];
				var player = Players.findOne({userId: currentUserId});
				console.log(player);
				return {
					player: player,
					opponent_avatar: opponent_avatar,
					opponent_rock: opponent_rock,
					opponent_paper: opponent_paper,
					opponent_scissors: opponent_scissors,
					opponent_name: "Hal-9000",
					countthree: "/rps_images/counttothree.png",
					countone: "https://marcojohnsonblog.files.wordpress.com/2014/10/count-sesame-street.jpg",
					counttwo: "https://muppetmindset.files.wordpress.com/2009/12/count-bats.png",
					ready: "http://img14.deviantart.net/8841/i/2012/348/5/c/spongebob__are_you_ready__bubbles_by_catz537-d5o1ap0.png",
					go: "http://2.bp.blogspot.com/-FfOLA82EikQ/VKd1dhH_eFI/AAAAAAAAGn4/6WIjRzgHaTU/s1600/go.png",
					loser: loser,
					winner: winner,
					tie: tie
				};
			}
});

Router.route('/formatTest', {
	name: 'formatTest',
	data: function(){
		var player = Players.findOne({userId: Meteor.userId()});
		return {
			player: player
		};
	}
});

Router.route('/hal', {
	name: 'hal',
	data: function(){
        var currentUserId = Meteor.userId();
        console.log(currentUserId);
				var player = Players.findOne({userId: currentUserId});
				return {
					player: player,
				};
			}
});

var requireLogin = function() {
 if (! Meteor.user()) {
 if (Meteor.loggingIn()) {
 this.render(this.loadingTemplate);
 } else {
 this.render('accessDenied');
 }
 } else {
 this.next();
 }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
