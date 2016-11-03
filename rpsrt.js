User = new Mongo.Collection("user");

if (Meteor.isClient) {
  var choice1 = "";
  Template.newUser.rendered = function() {
    $('.container').css('background-image', 'url(/background_images/samurai.jpg');
    for (i=0;i<12;i++) {
      var control_audio = "audio_player"+i;
      var audio = document.getElementById(control_audio);
      var control_test = audio.hasAttribute("controls");
      if (control_test) {
          var start_audio = "#audio_player"+i;
          $(start_audio)[0].play();
      }
    }
    console.log("should hit this to make active and lobby false");
    Meteor.call('removeActiveLobbyFxn');
  }
  var currentUserId = Meteor.userId();
  Template.newUser.events({
    "mouseenter #rock": function() {
      $('#rockSound')[0].play();
    },
    "mouseenter #paper": function() {
      $('#paperSound')[0].play();
    },
    "mouseenter #scissors": function() {
      $('#scissorsSound')[0].play();
    },
    "mouseenter .female": function() {
      $('#femaleSound')[0].play();
    },
    "mouseenter .male": function() {
      $('#maleSound')[0].play();
    },
    "mouseenter .cat": function() {
      $('#catSound')[0].play();
    },
    "mouseenter .dog": function() {
      $('#dogSound')[0].play();
    },
    "mouseenter .abstract": function() {
      $('#elementSound')[0].play();
    },
    "mouseenter .custom": function() {
      $('#customSound')[0].play();
    },
    "mouseenter .modern": function() {
      $('#modernSound')[0].play();
    },
    "mouseenter .anceint": function() {
      $('#ancientSound')[0].play();
    },
    "mouseenter #jedi": function() {
      $('#jediSound')[0].play();
    },
    "mouseenter #warrior": function() {
      $('#warriorSound')[0].play();
    },
    "mouseenter #wizard": function() {
      $('#wizardSound')[0].play();
    },
    "mouseenter #healer": function() {
      $('#healerSound')[0].play();
    },
    "mouseenter #first_choice_title": function() {
      $('#generalSound')[0].play();
    },
    "mouseenter #rps_title": function() {
      $('#troopsSound')[0].play();
    },
    // first choice of avatar
    "click .first_choice": function(event){
      choice1 = event.currentTarget.id;
      document.getElementById('first_choice_div').style.display = 'none';
      document.getElementById('first_choice_title').style.display = 'none';
      console.log(choice1);
      if (choice1 === "abstract") {
        console.log("element choices");
        document.getElementById('element_choice_div').style.display = '';
        document.getElementById('element_choice_title').style.display = '';

      } else if (choice1 === "custom") {
        console.log("input avatar url");
        document.getElementById('custom_avatar').style.display = '';
        document.getElementById('custom_title').style.display = '';
      } else {
        console.log("class choices")
        document.getElementById('class_choice_div').style.display = '';
        document.getElementById('class_choice_title').style.display = '';
      }
    },

    "click .second_choice": function(event){
      var choice2 = event.currentTarget.id;
      document.getElementById('element_choice_div').style.display = 'none';
      document.getElementById('element_choice_title').style.display = 'none';
      document.getElementById('class_choice_div').style.display = 'none';
      document.getElementById('class_choice_title').style.display = 'none';
      console.log(choice2);
      if (choice2 === "jedi") {
        console.log("jedi");
        if (choice1 === "female") {
        console.log("Female Jedi choice");
        Meteor.call('modifyUsersAvatar', '/rps_images/femalejedi.jpg');
        $("#avatar_text").html("Female Jedi");
        document.getElementById('player_name').style.display = '';
        $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/femalejedi.jpg">');
        } else if (choice1 === "male"){
          console.log("Male Jedi choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/pickthisone.jpg');
          $("#avatar_text").html("Male Jedi");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/pickthisone.jpg">');
        } else if (choice1 === "cat"){
          console.log("Cat Jedi choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/catjedi1.jpg');
          $("#avatar_text").html("Cat Jedi");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/catjedi1.jpg">');
        } else if (choice1 === "dog"){
          console.log("Dog Jedi choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/dog-jedi.jpg');
          $("#avatar_text").html("Dog Jedi");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/dog-jedi.jpg">');
        }
      } else if (choice2 === "warrior") {
        console.log("warrior");
        if (choice1 === "female") {
        console.log("Female Warrior choice");
        Meteor.call('modifyUsersAvatar', '/rps_images/femalewarrior.jpg');
        $("#avatar_text").html("Female Warrior");
        document.getElementById('player_name').style.display = '';
        $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/femalewarrior.jpg">');
        } else if (choice1 === "male"){
          console.log("Male Warrior choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/malewarrior.jpg');
          $("#avatar_text").html("Male Warrior");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/malewarrior.jpg">');
        } else if (choice1 === "cat"){
          console.log("Cat Warrior choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/cat-warrior.jpg');
          $("#avatar_text").html("Cat Warrior");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/cat-warrior.jpg">');
        } else if (choice1 === "dog"){
          console.log("Dog Warrior choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/dogwarrior.jpg');
          $("#avatar_text").html("Dog Warrior");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/dogwarrior.jpg">');
        }
      } else if (choice2 === "wizard") {
        console.log("wizard");
        if (choice1 === "female") {
        console.log("Female Wizard choice");
        Meteor.call('modifyUsersAvatar', '/rps_images/female-wizard.jpg');
        $("#avatar_text").html("Female Wizard");
        document.getElementById('player_name').style.display = '';
        $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/female-wizard.jpg">');
        } else if (choice1 === "male"){
          console.log("Male Wizard choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/male-wizard.jpg');
          $("#avatar_text").html("Male Wizard");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/male-wizard.jpg">');
        } else if (choice1 === "cat"){
          console.log("Cat Wizard choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/cat-wizard.jpg');
          $("#avatar_text").html("Cat Wizard");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/cat-wizard.jpg">');
        } else if (choice1 === "dog"){
          console.log("Dog Wizard choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/dog-wizard.jpg');
          $("#avatar_text").html("Dog Wizard");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/dog-wizard.jpg">');
        }
      } else if (choice2 === "healer") {
        console.log("healer");
        if (choice1 === "female") {
        console.log("Female Healer choice");
        Meteor.call('modifyUsersAvatar', '/rps_images/femalehealer.jpg');
        $("#avatar_text").html("Female Healer");
        document.getElementById('player_name').style.display = '';
        $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/femalehealer.jpg">');
        } else if (choice1 === "male"){
          console.log("Male Healer choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/male-healer.jpg');
          $("#avatar_text").html("Male Healer");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/male-healer.jpg">');
        } else if (choice1 === "cat"){
          console.log("Cat Healer choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/cat-healer.jpg');
          $("#avatar_text").html("Cat Healer");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/cat-healer.jpg">');
        } else if (choice1 === "dog"){
          console.log("Dog Healer choice");
          Meteor.call('modifyUsersAvatar', '/rps_images/dog-healer.jpeg');
          $("#avatar_text").html("Dog Healer");
          document.getElementById('player_name').style.display = '';
          $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/dog-healer.jpeg">');
        }
      } else if (choice2 === "earth") {
        console.log("earth");
        Meteor.call('modifyUsersAvatar', '/rps_images/pattern1.jpg');
        $("#avatar_text").html("Earth");
        document.getElementById('player_name').style.display = '';
        $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/pattern1.jpg">');
      } else if (choice2 === "wind") {
        console.log("wind");
        Meteor.call('modifyUsersAvatar', '/rps_images/pattern2.jpg');
        $("#avatar_text").html("Wind");
        document.getElementById('player_name').style.display = '';
        $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/pattern2.jpg">');
      } else if (choice2 === "fire") {
        console.log("fire");
        Meteor.call('modifyUsersAvatar', '/rps_images/pattern3.jpg');
        $("#avatar_text").html("Fire");
        document.getElementById('player_name').style.display = '';
        $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/pattern3.jpg">');
      } else if (choice2 === "water") {
        console.log("water");
        Meteor.call('modifyUsersAvatar', '/rps_images/pattern4.jpg');
        $("#avatar_text").html("Water");
        document.getElementById('player_name').style.display = '';
        $("#avatar_placeholder").append('<img id="chosen_avatar" src="/rps_images/pattern4.jpg">');
      }else {
        console.log("class choices")
        document.getElementById('class_choice_div').style.display = '';
        document.getElementById('class_choice_title').style.display = '';
      }
      document.getElementById('rps_choice_div').style.display = '';
      document.getElementById('rps_title').style.display = '';
    },

    "click .rps_choice": function(event){
      var rpsChoice = event.currentTarget.id;
      document.getElementById('rps_choice_div').style.display = 'none';
      document.getElementById('rps_title').style.display = 'none';
      console.log(rpsChoice);
      if (rpsChoice === "female") {
        console.log("Female RPS choice");
        $("#rock_placeholder").append('<img id="rock" class="rps_image" src="/rps_images/femalerock.jpg">');
        $("#paper_placeholder").append('<img id="paper" class="rps_image" src="/rps_images/femalepaper.jpg">');
        $("#scissors_placeholder").append('<img id="scissors" class="rps_image" src="/rps_images/femalescissors.jpg">');
        var choice1 = "/rps_images/femalerock.jpg"
        var choice2 = "/rps_images/femalepaper.jpg"
        var choice3 = "/rps_images/femalescissors.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
      } else if (rpsChoice === "male") {
        console.log("Male RPS choice");
        $("#rock_placeholder").append('<img id="rock" class="rps_image" src="/rps_images/malerock.jpg">');
        $("#paper_placeholder").append('<img id="paper" class="rps_image" src="/rps_images/malepaper.jpg">');
        $("#scissors_placeholder").append('<img id="scissors" class="rps_image" src="/rps_images/malescissors.jpg">');
        var choice1 = "/rps_images/malerock.jpg"
        var choice2 = "/rps_images/malepaper.jpg"
        var choice3 = "/rps_images/malescissors.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
      } else if (rpsChoice === "cat") {
        console.log("Cat RPS choice");
        $("#rock_placeholder").append('<img id="rock" class="rps_image" src="/rps_images/catrock.JPG">');
        $("#paper_placeholder").append('<img id="paper" class="rps_image" src="/rps_images/catpaper.jpg">');
        $("#scissors_placeholder").append('<img id="scissors" class="rps_image" src="/rps_images/catscissors.jpg">');
        var choice1 = "/rps_images/catrock.JPG"
        var choice2 = "/rps_images/catpaper.jpg"
        var choice3 = "/rps_images/catscissors.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
      } else if (rpsChoice === "dog") {
        console.log("Dog RPS choice");
        $("#rock_placeholder").append('<img id="rock" class="rps_image" src="/rps_images/dogrock.jpg">');
        $("#paper_placeholder").append('<img id="paper" class="rps_image" src="/rps_images/dogpaper.jpg">');
        $("#scissors_placeholder").append('<img id="scissors" class="rps_image" src="/rps_images/dogscissors.jpg">');
        var choice1 = "/rps_images/dogrock.jpg"
        var choice2 = "/rps_images/dogpaper.jpg"
        var choice3 = "/rps_images/dogscissors.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
      } else if (rpsChoice === "modern") {
        console.log("Modern RPS choice");
        $("#rock_placeholder").append('<img id="rock" class="rps_image" src="/rps_images/objectrock1.jpg">');
        $("#paper_placeholder").append('<img id="paper" class="rps_image" src="/rps_images/objectpaper1.jpg">');
        $("#scissors_placeholder").append('<img id="scissors" class="rps_image" src="/rps_images/objectscissors1.jpg">');
        var choice1 = "/rps_images/objectrock1.jpg"
        var choice2 = "/rps_images/objectpaper1.jpg"
        var choice3 = "/rps_images/objectscissors1.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
      } else if (rpsChoice === "ancient") {
        console.log("Ancient RPS choice");
        $("#rock_placeholder").append('<img id="rock" class="rps_image" src="/rps_images/objectrock2.jpg">');
        $("#paper_placeholder").append('<img id="paper" class="rps_image" src="/rps_images/objectpaper2.jpg">');
        $("#scissors_placeholder").append('<img id="scissors" class="rps_image" src="/rps_images/objectscissors2.jpg">');
        var choice1 = "/rps_images/objectrock2.jpg"
        var choice2 = "/rps_images/objectpaper2.jpg"
        var choice3 = "/rps_images/objectscissors2.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
      } else if (rpsChoice === "custom") {
        console.log("Custom RPS choice");
        document.getElementById('custom_rock').style.display = '';
        document.getElementById('custom_paper').style.display = '';
        document.getElementById('custom_scissors').style.display = '';
      }
    },

    //custom avatar selector
    "submit #custom_avatar_form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      var dropSelect = document.getElementById("custom_avatar");
      var choice1 = dropSelect.value;
      Meteor.call('modifyUsersAvatar', choice1);
      document.getElementById('custom_avatar').style.display = 'none';
      var image_entry = '<img id="chosen_avatar" src="'+choice1+'">'
      $("#avatar_placeholder").append(image_entry);
    },

    //rps image selector
    "change #rps_images": function (event) {
      var dropSelect = document.getElementById("rps_images");
      var choice1 = dropSelect.value;
      console.log(choice1);
      if (choice1 === "") {
        document.getElementById("choose_rps_images").label = "Choose an RPS image set from list below";
      } else if (choice1 === "cat") {
        console.log("Cat RPS images");
        $("#rock_placeholder").append('<img class="rps_image" src="/rps_images/catrock.JPG">');
        $("#paper_placeholder").append('<img class="rps_image" src="/rps_images/catpaper.jpg">');
        $("#scissors_placeholder").append('<img class="rps_image" src="/rps_images/catscissors.jpg">');
        var choice1 = "/rps_images/catrock.JPG"
        var choice2 = "/rps_images/catpaper.jpg"
        var choice3 = "/rps_images/catscissors.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
        document.getElementById('rps_images').style.display = 'none';
      } else if (choice1 === "dog") {
        console.log("Dog RPS images");
        $("#rock_placeholder").append('<img class="rps_image" src="/rps_images/dogrock.jpg">');
        $("#paper_placeholder").append('<img class="rps_image" src="/rps_images/dogpaper.jpg">');
        $("#scissors_placeholder").append('<img class="rps_image" src="/rps_images/dogscissors.jpg">');
        var choice1 = "/rps_images/dogrock.jpg"
        var choice2 = "/rps_images/dogpaper.jpg"
        var choice3 = "/rps_images/dogscissors.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
        document.getElementById('rps_images').style.display = 'none';
      } else if (choice1 === "human") {
        console.log("Human choices");
        document.getElementById('mf_rps_images').style.display = '';
        document.getElementById('rps_images').style.display = 'none';
      } else if (choice1 === "objects") {
        console.log("Actual object choices");
        document.getElementById('objects_choices').style.display = '';
        document.getElementById('rps_images').style.display = 'none';
      } else {
        console.log("Custom RPS images");
        document.getElementById('custom_rock').style.display = '';
        document.getElementById('custom_paper').style.display = '';
        document.getElementById('custom_scissors').style.display = '';
        document.getElementById('rps_images').style.display = 'none';
      }
    },

    //custom rock selector
    "submit #custom_rock_form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      console.log("custom rock");
      var rockSelect = document.getElementById("custom_rock");
      var choice1 = rockSelect.value;
      var rock_image = '<img class="rps_image" src="'+choice1+'">';
      $("#rock_placeholder").append(rock_image);
      Meteor.call('modifyUsersRock', choice1);
      document.getElementById('rock_image').style.display = '';
      document.getElementById('custom_rock').style.display = 'none';
    },

    //custom paper selector
    "submit #custom_paper_form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      console.log("custom paper");
      var paperSelect = document.getElementById("custom_paper");
      var choice2 = paperSelect.value;
      var paper_image = '<img class="rps_image" src="'+choice2+'">';
      $("#paper_placeholder").append(paper_image);
      Meteor.call('modifyUsersPaper', choice2);
      document.getElementById('paper_image').style.display = '';
      document.getElementById('custom_paper').style.display = 'none';
    },

    //custom scissor selector
    "submit #custom_scissors_form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      console.log("custom scissors");
      var scissorsSelect = document.getElementById("custom_scissors");
      var choice3 = scissorsSelect.value;
      var scissor_image = '<img class="rps_image" src="'+choice3+'">';
      $("#scissors_placeholder").append(scissor_image);
      Meteor.call('modifyUsersScissors', choice3);
      document.getElementById('scissors_image').style.display = '';
      document.getElementById('custom_scissors').style.display = 'none';
    },

    //rps object selector
    "change #objects_choices": function (event) {
      var dropSelect = document.getElementById("objects_choices");
      var choice1 = dropSelect.value;
      console.log(choice1);
      if (choice1 === "") {
        document.getElementById("choose_objects_choices").label = "Choose object RPS images from list below";
      } else if (choice1 === "pat1") {
        console.log("Pattern 1 choice");
        $("#rock_placeholder").append('<img class="rps_image" src="/rps_images/objectrock1.jpg">');
        $("#paper_placeholder").append('<img class="rps_image" src="/rps_images/objectpaper1.jpg">');
        $("#scissors_placeholder").append('<img class="rps_image" src="/rps_images/objectscissors1.jpg">');
        var choice1 = "/rps_images/objectrock1.jpg"
        var choice2 = "/rps_images/objectpaper1.jpg"
        var choice3 = "/rps_images/objectscissors1.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
        document.getElementById('objects_choices').style.display = 'none';
      } else {
        console.log("Pattern 2 choice");
        $("#rock_placeholder").append('<img class="rps_image" src="/rps_images/objectrock2.jpg">');
        $("#paper_placeholder").append('<img class="rps_image" src="/rps_images/objectpaper2.jpg">');
        $("#scissors_placeholder").append('<img class="rps_image" src="/rps_images/objectscissors2.jpg">');
        var choice1 = "/rps_images/objectrock2.jpg"
        var choice2 = "/rps_images/objectpaper2.jpg"
        var choice3 = "/rps_images/objectscissors2.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
        document.getElementById('objects_choices').style.display = 'none';
      }
    },

    //rps male and female selector
    "change #mf_rps_images": function (event) {
      var dropSelect = document.getElementById("mf_rps_images");
      var choice1 = dropSelect.value;
      console.log(choice1);
      if (choice1 === "") {
        document.getElementById("choose_mf_rps_images").label = "Choose a sex from list below";
      } else if (choice1 === "male") {
        console.log("Male choice");
        $("#rock_placeholder").append('<img class="rps_image" src="/rps_images/malerock.jpg">');
        $("#paper_placeholder").append('<img class="rps_image" src="/rps_images/malepaper.jpg">');
        $("#scissors_placeholder").append('<img class="rps_image" src="/rps_images/malescissors.jpg">');
        var choice1 = "/rps_images/malerock.jpg"
        var choice2 = "/rps_images/malepaper.jpg"
        var choice3 = "/rps_images/malescissors.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
        document.getElementById('mf_rps_images').style.display = 'none';
      } else {
        console.log("Female choice");
        $("#rock_placeholder").append('<img class="rps_image" src="/rps_images/femalerock.jpg">');
        $("#paper_placeholder").append('<img class="rps_image" src="/rps_images/femalepaper.jpg">');
        $("#scissors_placeholder").append('<img class="rps_image" src="/rps_images/femalescissors.jpg">');
        var choice1 = "/rps_images/femalerock.jpg"
        var choice2 = "/rps_images/femalepaper.jpg"
        var choice3 = "/rps_images/femalescissors.jpg"
        Meteor.call('modifyUsersRock', choice1);
        Meteor.call('modifyUsersPaper', choice2);
        Meteor.call('modifyUsersScissors', choice3);
        document.getElementById('rock_image').style.display = '';
        document.getElementById('paper_image').style.display = '';
        document.getElementById('scissors_image').style.display = '';
        document.getElementById('mf_rps_images').style.display = 'none';
      }
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
        },
        'modifyUsersAvatar': function(avatar_url){
          check(avatar_url, Match.Any);
          var currentUserId = Meteor.userId();
          console.log("Modify users avatar fxn = userId and avatar-url: "+currentUserId+" " +avatar_url);
          var player = {avatar_url: avatar_url, win: 0, loss: 0, tie: 0, choice: '', name: '', active: false, lobby: false, wlt: ''};
          console.log("player object: "+JSON.stringify(player));
          Meteor.call('playerAvatarUpdate', player, function(error, result){
            if (error)
              console.log(error)
          });
        },
        'modifyUsersRock': function(rock_url){
          check(rock_url, Match.Any);
          var currentUserId = Meteor.userId();
          console.log("Modify users rock fxn = userId and rock-url: "+currentUserId+" " +rock_url);
          var player = {rock_url: rock_url};
          console.log("player object: "+JSON.stringify(player));
          Meteor.call('playerRockUpdate', player, function(error, result){
            if (error)
              console.log(error)
          });
        },
        'modifyUsersPaper': function(paper_url){
          check(paper_url, Match.Any);
          var currentUserId = Meteor.userId();
          console.log("Modify users paper fxn = userId and paper-url: "+currentUserId+" " +paper_url);
          var player = {paper_url: paper_url};
          console.log("player object: "+JSON.stringify(player));
          Meteor.call('playerPaperUpdate', player, function(error, result){
            if (error)
              console.log(error)
          });
        },
        'modifyUsersScissors': function(scissors_url){
          check(scissors_url, Match.Any);
          var currentUserId = Meteor.userId();
          console.log("Modify users scissors fxn = userId and scissors-url: "+currentUserId+" " +scissors_url);
          var player = {scissors_url: scissors_url};
          console.log("player object: "+JSON.stringify(player));
          Meteor.call('playerScissorsUpdate', player, function(error, result){
            if (error)
              console.log(error)
          });
        },
        'removeActiveLobbyFxn': function() {
          Meteor.call('removeLobbyActive', function(error, result){
            if (error)
              console.log(error)
          });
        }
      });
    }
