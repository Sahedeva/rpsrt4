Players = new Mongo.Collection('players');

Meteor.methods({
	playerInsert: function(playerAttributes) {
		check(Meteor.userId(), String);
		check(playerAttributes, Match.Any);
		console.log("Hitting playerInsert");
		var currentUserId = Meteor.userId();
  	console.log(currentUserId);
    var countPlayer = Players.find({userId: currentUserId}).count();
    console.log("countPlayers: "+countPlayer);
    if (countPlayer === 0) {
      console.log("On playerinsert - should only get here the first time you create a new user");
			// var user = Meteor.user();
			var player = _.extend(playerAttributes, {
				userId: Meteor.userId(),
				author: Meteor.user().username,
				submitted: new Date(),
				avatar_url: "/rps_images/defaultAvatar.jpg",
				active: false,
				lobby: false,
				win: 0,
				loss: 0,
				tie: 0,
				wlt: "",
				player: "player1",
				rock_class: "rps_show",
				rock_url: "/rps_images/femalerock.jpg",
				paper_class: "rps_show",
				paper_url: "/rps_images/femalepaper.jpg",	
				scissors_class: "rps_show",
				scissors_url: "/rps_images/femalescissors.jpg",
				ready_class: 'countdown_show', 
				countone_class: 'countdown_none', 
				counttwo_class: 'countdown_none', 
				countthree_class: 'countdown_none', 
				go_class: 'countdown_none', 
				win_class: 'countdown_none', 
				lose_class: 'countdown_none', 
				tie_class: 'countdown_none', 
				clicked: 'no',
				hal_author: "Hal-9000",
				hal_avatar_url: "/rps_images/femalejedi.jpg",
				hal_win: 0,
				hal_loss: 0,
				hal_tie: 0,
				hal_wlt: "",
				hal_player: "player2",
				hal_rock_class: "rps_show",
				hal_rock_url: "/rps_images/femalerock.jpg",
				hal_paper_class: "rps_show",
				hal_paper_url: "/rps_images/femalepaper.jpg",	
				hal_scissors_class: "rps_show",
				hal_scissors_url: "/rps_images/femalescissors.jpg",
				countdownTimer: "off"
			});
		var playerId = Players.insert(player);
		return {
			_id: playerId
		};
		}
		return;
	},
	computerUpdate: function() {
		check(Meteor.userId(), String);
		console.log("hitting computerUpdate");
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {$set: {player: 'player1', rock_class: "rps_show rps_yellow", paper_class: "rps_show rps_yellow", scissors_class: "rps_show rps_yellow",ready_class: 'countdown_show', countone_class: 'countdown_none', counttwo_class: 'countdown_none', countthree_class: 'countdown_none', go_class: 'countdown_none', win_class: 'countdown_none', lose_class: 'countdown_none', tie_class: 'countdown_none', clicked: 'no'} });
	},
	humanUpdate: function() {
		check(Meteor.userId(), String);
		console.log("hitting humanUpdate");
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {$set: {lobby: false, active: false, rock_class: "rps_show rps_yellow", paper_class: "rps_show rps_yellow", scissors_class: "rps_show rps_yellow",ready_class: 'countdown_show', countone_class: 'countdown_none', counttwo_class: 'countdown_none', countthree_class: 'countdown_none', go_class: 'countdown_none', win_class: 'countdown_none', lose_class: 'countdown_none', tie_class: 'countdown_none', win: 0, loss: 0, tie: 0, choice: '', another: 'hidden'} });
	},
	timerOff: function() {
		check(Meteor.userId(), String);
		console.log("hitting timerOff");
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {$set: {countdownTimer: 'off'} });
	},
	humanGameUpdate: function(opponent_id) {
		check(Meteor.userId(), String);
		check(opponent_id, Match.Any);
		var opponentId = opponent_id['_id'];
		var currentUserId = Meteor.userId();
		console.log("humanGameUpdate opponent_id: " + opponentId);
		console.log("humanGameUpdate currentUserId: " + currentUserId);
		Players.update({'userId': currentUserId}, {
  $set: {rock_class: "rps_show rps_yellow", paper_class: "rps_show rps_yellow", scissors_class: "rps_show rps_yellow",ready_class: 'countdown_show', countone_class: 'countdown_none', counttwo_class: 'countdown_none', countthree_class: 'countdown_none', go_class: 'countdown_none', win_class: 'countdown_none', lose_class: 'countdown_none', tie_class: 'countdown_none', choice: '', another: 'hidden', countdownTimer: 'on'} });
		Players.update(opponent_id, {
  $set: {rock_class: "rps_show rps_yellow", paper_class: "rps_show rps_yellow", scissors_class: "rps_show rps_yellow",ready_class: 'countdown_show', countone_class: 'countdown_none', counttwo_class: 'countdown_none', countthree_class: 'countdown_none', go_class: 'countdown_none', win_class: 'countdown_none', lose_class: 'countdown_none', tie_class: 'countdown_none', choice: '', another: 'hidden', countdownTimer: 'on'} });
	},
	removeHuman: function() {
		check(Meteor.userId(), String),
		console.log("hitting removeHuman");
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {
  $set: {human: false} });
	},
	removeLobby: function() {
		check(Meteor.userId(), String),
		console.log("hitting removeActive");
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {
  $set: {lobby: false} });
	},
	removeLobbyActive: function() {
		check(Meteor.userId(), String),
		console.log("hitting removeLobbyActive");
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {
  $set: {active: false, lobby: false} });
	},
	compRemoveLobbyActive: function() {
		check(Meteor.userId(), String),
		console.log("hitting removeLobbyActive");
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {
  $set: {active: false, lobby: false} });
	},
	realtimeGameUpdate: function(changes, game_id) {
		check(Meteor.userId(), String);
		check(game_id, Match.Any);
		check(changes, Match.Any);
		console.log("hitting realtimeGameUpdate");
		console.log("Realtime game update meteor call: changes: "+JSON.stringify(changes));
		var id = game_id['id'];
		// console.log("id: "+id);
		// var test = Players.find({'_id':id}).fetch();
		// console.log("Players findfetch with _id: "+test);
		Players.update(id, {$set: changes});
	},
	playerGameUpdate: function(opponent_id) {
		check(Meteor.userId(), String);
		check(opponent_id, Match.Any);
		var opponentId = opponent_id['id'];
		var currentUserId = Meteor.userId();
		console.log("Active update opponent_id: " + opponentId);
		console.log("Active update currentUserId: " + currentUserId);
		Players.update({'userId': currentUserId}, {
  $set: {active: true, player: "player1", lobby: false, challenge: "show", accept: "hidden", challenger_name: "", challenger_id: ""} });
	},
	playerRejectUpdate: function(opponent_id) {
		check(Meteor.userId(), String);
		check(opponent_id, Match.Any);
		var opponentId = opponent_id['id'];
		var currentUserId = Meteor.userId();
		var challenger_name = Meteor.user().username;
		console.log("Active update opponent_id: " + opponentId);
		console.log("Active update currentUserId: " + currentUserId);
		Players.update({'userId': currentUserId}, {
  $set: {challenge: "show", accept: "hidden", challenger_name: "", challenger_id: ""} });
		Players.update({'userId': opponentId}, {
  $set: {reject: "show", challenger_name: challenger_name} });
	},
	playerActiveUpdate: function(opponent_id) {
		check(Meteor.userId(), String);
		check(opponent_id, Match.Any);
		var opponentId = opponent_id['id'];
		var currentUserId = Meteor.userId();
		var challenger_name = Meteor.user().username;
		console.log("Active update opponent_id: " + opponentId);
		console.log("Active update currentUserId: " + currentUserId);
		Players.update({'userId': currentUserId}, {
  $set: {active: true, lobby: false, human: true, challenge: "show", accept: "hidden", opponent_id: opponentId} });
		Players.update({'userId': opponentId}, {
  $set: {active: true, lobby: false, human: true, challenge: "show", accept: "hidden", opponent_id: currentUserId} });
	},
	playerLobbyChallengeUpdate: function(playerAttributes, opponent_id) {
		check(Meteor.userId(), String);
		check(playerAttributes, Match.Any);
		check(opponent_id, Match.Any);
		console.log("Meteor method(challengeUpdate) - server: playerAttributes- " + playerAttributes+ " and opponent_id- " + opponent_id);
		console.log("Opponent_id: " + opponent_id['id']);
		console.log("PlayerAttributes(challenge): " +playerAttributes['challenge']);
		console.log("PlayerAttributes(accept): " +playerAttributes['accept']);
		console.log("PlayerAttributes(challenger_name): " +playerAttributes['challenger_name']);
		console.log("PlayerAttributes(challenger_id): " + playerAttributes['challenger_id']);
		console.log("PlayerAttributes(reject): " + playerAttributes['reject']);
		var opponentId = opponent_id['id'];
		console.log("OpponentID: " + opponentId);
		Players.update(opponentId, {
  $set: playerAttributes});
	},
	playerLobbyChallengeTimeout: function(playerAttributes, opponent_id) {
		check(Meteor.userId(), String);
		check(playerAttributes, Match.Any);
		console.log('hitting LobbyChallengeTimeout');
		check(opponent_id, Match.Any);
		var opponentId = opponent_id['id'];
		Players.update(opponentId, {
  $set: playerAttributes});
		Players.update(Meteor.userId(), {
			$set: {ranOutTime: "show"}
		})
	},
	playerLobbyUpdate: function(playerAttributes) {
		check(Meteor.userId(), String);
		check(playerAttributes, Match.Any);
		console.log("Avatar player attributes from meteor method - server: " + playerAttributes);
		console.log(playerAttributes['lobby']);
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {
  $set: playerAttributes});
	},
	playerAvatarUpdate: function(playerAttributes) {
		check(Meteor.userId(), String);
		check(playerAttributes, Match.Any);
		console.log("Avatar player attributes from meteor method - server: " + playerAttributes);
		console.log(playerAttributes['avatar_url']);
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {
  $set: playerAttributes});
	},
	playerRockUpdate: function(playerAttributes) {
		check(Meteor.userId(), String);
		check(playerAttributes, Match.Any);
		console.log("Rock player attributes from meteor method - server: " + playerAttributes);
		console.log(playerAttributes['rock_url']);
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {
  $set: playerAttributes});
	},
	playerPaperUpdate: function(playerAttributes) {
		check(Meteor.userId(), String);
		check(playerAttributes, Match.Any);
		console.log("Paper player attributes from meteor method - server: " + playerAttributes);
		console.log(playerAttributes['paper_url']);
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {
  $set: playerAttributes});
	},
	playerScissorsUpdate: function(playerAttributes) {
		check(Meteor.userId(), String);
		check(playerAttributes, Match.Any);
		console.log("Scissors player attributes from meteor method - server: " + playerAttributes);
		console.log(playerAttributes['scissors_url']);
		var currentUserId = Meteor.userId();
		Players.update({'userId': currentUserId}, {
  $set: playerAttributes});
	}
});
