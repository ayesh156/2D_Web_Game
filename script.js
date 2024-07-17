var runSound = new Audio("resources/run.mp3");
runSound.loop = true;
runSound.volume = 0.5;

var jumpSound = new Audio("resources/jump.mp3");
jumpSound.volume = 0.5;

var backgroundMusic = new Audio("resources/MyAudio.mp3")
backgroundMusic.loop = true;


var score = 0;
var total = 0;

function loginContainer() {
    var scoreCon = document.querySelector('.login-container');
    scoreCon.classList.add('active');
}

function keyCheck(event) {

    var keyCode = event.which;

    if (keyCode == 13) {
        if (backgroundAnimationId == 0) {
            clearInterval(boyIdleAnimationId);
            backgroundAnimationId = setInterval(moveBackground, 5);
            createBoxes();
            moveBoxesAnimationId = setInterval(moveBoxes, 20);
        }

        if (boyRunAnimationId == 0) {
            boyRunAnimationId = setInterval(boyRun, 100);
            runSound.play();
            backgroundMusic.play();
        }
    }

    if (keyCode == 32) {

        if (boyJumpAnimationId == 0) {
            clearInterval(boyIdleAnimationId);
            boyRunImageNumber = 1;
            clearInterval(boyRunAnimationId);
            runSound.pause();

            boyJumpAnimationId = setInterval(boyJump, 100);
            jumpSound.currentTime = 0;
            jumpSound.play();
            backgroundMusic.play();
        }

        scoreIncrese();

    }
}

var backgroundAnimationId = 0;
var backgroundX = 0;

function moveBackground() {

    var background = document.getElementById("background");
    backgroundX = backgroundX - 1;
    background.style.backgroundPositionX = backgroundX + "px";

}

var boyIdleAnimationId = 0;
var boyIdleImageNumber = 0;

function boyIdle() {

    var boy = document.getElementById("boy");
    boyIdleImageNumber = boyIdleImageNumber + 1;

    if (boyIdleImageNumber == 10) {
        boyIdleImageNumber = 0;
    }

    boy.src = "resources/Idle__00" + boyIdleImageNumber + ".png"
}

boyIdleAnimationId = setInterval(boyIdle, 100)

var boyRunAnimationId = 0;
var boyRunImageNumber = 0;

function boyRun() {
    var boy = document.getElementById("boy");
    boyRunImageNumber = boyRunImageNumber + 1;

    if (boyRunImageNumber == 8) {
        boyRunImageNumber = 0;
    }

    boy.src = "resources/Run__00" + boyRunImageNumber + ".png"
}


var boyJumpAnimationId = 0;
var boyJumpImageNumber = 0;
var boyMarginTop = 485;

var scoreIncreseId = 0;
function scoreIncrese() {
    var name = document.getElementById("name").value;
    score = score + 1;
    total = score;   
    
    document.getElementById("score").innerHTML = name + "'s Score: " + score;
    document.getElementById("header1").innerHTML = name +"'s Score: " + total;
}

function boyJump() {
    var boy = document.getElementById("boy");
    boyJumpImageNumber = boyJumpImageNumber + 1;

    if (boyJumpImageNumber <= 5) {
        boyMarginTop = boyMarginTop - 30;
        boy.style.marginTop = boyMarginTop + "px";

    }

    if (boyJumpImageNumber > 5) {
        boyMarginTop = boyMarginTop + 30;
        boy.style.marginTop = boyMarginTop + "px";

    }

    if (boyJumpImageNumber == 10) {
        boyJumpImageNumber = 0;
        clearInterval(boyJumpAnimationId);
        boyJumpAnimationId = 0;

        boyRunAnimationId = setInterval(boyRun, 100);
        runSound.play();

        if (backgroundAnimationId == 0) {
            backgroundAnimationId = setInterval(moveBackground, 5);
            createBoxes();
            moveBoxesAnimationId = setInterval(moveBoxes, 20);
        }
    }

    boy.src = "resources/Jump__00" + boyJumpImageNumber + ".png";
}

var boxMarginLeft = 1000;
var boxMarginLeft2 = 1500;
var boxMarginLeft3 = 2000;

function createBoxes() {

    for (var i = 0; i < 50; i++) {

        var d = document.createElement("div");
        d.className = "box";
        d.id = "box" + i;
        d.style.marginLeft = boxMarginLeft + "px";
        boxMarginLeft = boxMarginLeft + 1000;
        document.getElementById("background").appendChild(d);
    }

    for (var i = 50; i < 100; i++) {

        var d = document.createElement("div");
        d.className = "box";
        d.id = "box" + i;
        d.style.marginLeft = boxMarginLeft2 + "px";
        boxMarginLeft2 = boxMarginLeft2 + 2000;
        document.getElementById("background").appendChild(d);
    }

    for (var i = 100; i < 150; i++) {

        var d = document.createElement("div");
        d.className = "box";
        d.id = "box" + i;
        d.style.marginLeft = boxMarginLeft2 + "px";
        boxMarginLeft2 = boxMarginLeft2 + 3000;
        document.getElementById("background").appendChild(d);
    }


}

var moveBoxesAnimationId = 0

function moveBoxes() {
    for (var i = 0; i < 150; i++) {
        var d = document.getElementById("box" + i);
        var dCSS = getComputedStyle(d);
        var currentMarginLeft = dCSS.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 5;
        d.style.marginLeft = newMarginLeft + "px";

        if (50 <= newMarginLeft & newMarginLeft <= 110) {

            if (boyMarginTop > 440) {
                function scoreContainer() {
                    var scoreCon = document.querySelector('.score-container');
                    scoreCon.classList.add('active');
                }
                scoreContainer();

                clearInterval(boyRunAnimationId);
                boyRunAnimationId = -1;
                runSound.pause();

                clearInterval(boyJumpAnimationId);
                boyJumpAnimationId = -1;
                jumpSound.pause();

                clearInterval(backgroundAnimationId);
                backgroundAnimationId = -1;

                clearInterval(moveBoxesAnimationId);
                moveBoxesAnimationId = -1;

                boyDeadAnimationId = setInterval(boyDead, 50);
                deadSound.play();

                backgroundMusic.pause();
                
            }

        }

    }
}

var deadSound = new Audio("resources/Failing.wav");
deadSound.volume = 0.5;

var boyDeadAnimationId = 0;
var boyDeadImageNumber = 0;

function boyDead() {

    var boy = document.getElementById("boy");
    boyDeadImageNumber = boyDeadImageNumber + 1;

    if (boyDeadImageNumber == 10) {
        clearInterval(boyDeadAnimationId);
        boyDeadImageNumber = 9;
        boy.style.marginTop = "500px";
    }

    boy.src = "resources/Dead__00" + boyDeadImageNumber + ".png"
}





