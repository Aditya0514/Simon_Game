var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var starter = false;

$(".help").click( function () {
  $(".instructions").css("display", "block");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  starter = false;
});

$("body").keydown( function () {
  if (starter === false) {
    $("h1").text("Level "+level);
    $(".instructions").css("display", "none");
    nextSequence();
    starter = true;
  }
});

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  starter = false;
}

function nextSequence() {

  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click( function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio(name+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("Success")
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  }

  else {
    $("h1").text("Game Over, Press any key to restart.");
    $("body").addClass("game-over");
    var wrongAudio = new Audio("wrong.mp3");
    wrongAudio.play();
    setTimeout( function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}
