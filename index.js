var buttonColor = ["red", "blue", "green", "yellow"],
  gamePattern = [],
  userClickedPattern = [],
  level = 0;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColor[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(200)
    .fadeIn(200);

  playSound(randomChosenColor);

  level++;

  $("h1").text("level " + level);
}

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(this.id);

  animatePress(this.id);

  checkAnswer(userClickedPattern.length);
});

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  nextSequence();
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel - 1] == gamePattern[currentLevel - 1]) {
    console.log("success");
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  if (currentLevel == gamePattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
    userClickedPattern = [];
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
