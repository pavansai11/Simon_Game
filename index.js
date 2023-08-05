var currentLevel = 0;
var userClickedPattern = [];
var gamePattern = [];
var randomNumber;
var buttoncolors = ["green", "red", "yellow", "blue"];

var started = false;
$(document).keypress(function () {
        if (!started == true) {
                started = true;
                nextSequence();
        }
});

$("div .btn").click(function () {
        if (started == true) {
                var userChosenColor = $(this).attr("id");
                userClickedPattern.push(userChosenColor);
                playSound(userChosenColor);
                animatePress(userChosenColor);
                console.log(gamePattern);
                console.log(userClickedPattern);
                checkAnswer(gamePattern, userClickedPattern);
        }
        else
                gameOver();
});

function nextSequence() {
        $("#level-title").html("Level " + ++currentLevel);
        randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttoncolors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
}


function playSound(name) {
        var colorSound = new Audio('sounds/' + name + '.mp3');
        colorSound.play();
}

function animatePress(currrentColor) {
        $("#" + currrentColor).addClass("pressed");
        setTimeout(function () {
                $("#" + currrentColor).removeClass("pressed");
        }, 100);
}

function checkAnswer(currentLevelPattern, userClickedPattern) {
        if (currentLevelPattern.length == userClickedPattern.length) {
                if (arraysEqual(currentLevelPattern, userClickedPattern) == true) {
                        userClickedPattern.length = 0;
                        setTimeout(nextSequence, 1000);
                }
                else {
                        gameOver();
                }
        }
        else if (currentLevelPattern.length > userClickedPattern.length) {
                for (var i = 0; i < userClickedPattern.length; i++) {
                        if (currentLevelPattern[i] != userClickedPattern[i]) {
                                gameOver();
                        }
                }
        }
}

function arraysEqual(a1, a2) {
        if (a1 === a2)
                return true;
        for (var i = 0; i < a1.length; i++) {
                if (a1[i] != a2[i])
                        return false;
        }
        return true;

}

function gameOver() {
        $("body").addClass("game-over");
        setTimeout(function () {
                $("body").removeClass("game-over");
        }, 200);

        playSound("wrong");
        
        $("#level-title").html("Game Over, Press Any Key To Restart");
        gamePattern.length = 0;
        userClickedPattern.length = 0;
        currentLevel = 0;
        started = false;
}
