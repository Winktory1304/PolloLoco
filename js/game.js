let canvas;
let world;
let keyboard = new Keyboard();
let winSound = new Audio('audio/winSound.mp3');
let defeatSound = new Audio('audio/defeatSound.mp3');
let gameLost = false;
let gameWon = false;

function startGame() {
    gameLost = false;
    gameWon = false;
    init();
}

function endTheGameByLost() {
    if (gameLost) return;
    world.endboss.bossMusic.pause();
    gameLost = true;
    defeatSound.currentTime = 0;
    defeatSound.play();
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('defeatScreen').style.display = 'unset';
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'none';
}

function endTheGameByWin() {
    if (gameWon) return;
    world.endboss.bossMusic.pause();
    gameWon = true;
    winSound.play();
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('defeatScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'unset';
    document.getElementById('gameScreen').style.display = 'none';
}

function init() {
    startGame();
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is', world.character);
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('defeatScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'unset';
    document.getElementById('controlSetupButton').style.display = 'none';
}

function startScreen() {
    document.getElementById('startScreen').style.display = 'unset';
    document.getElementById('defeatScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'none';
}

window.addEventListener('keydown', (e) => {
    if (e.code == "ArrowRight") keyboard.RIGHT = true;
    if (e.code == "ArrowLeft") keyboard.LEFT = true;
    if (e.code == "ArrowDown") keyboard.DOWN = true;
    if (e.code == "ArrowUp") keyboard.UP = true;
    if (e.code == "Space") keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

window.addEventListener('keyup', (e) => {
    if (e.code == "ArrowRight") keyboard.RIGHT = false;
    if (e.code == "ArrowLeft") keyboard.LEFT = false;
    if (e.code == "ArrowDown") keyboard.DOWN = false;
    if (e.code == "ArrowUp") keyboard.UP = false;
    if (e.code == "Space") keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});

var modal = document.getElementById("myModal");
var btn = document.getElementById("controlSetupButton");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to check if the device needs to be rotated
function checkOrientation() {
    let rotateMessage = document.getElementById('rotateMessage');
    if (window.innerWidth < 720 && window.innerHeight > window.innerWidth) {
        rotateMessage.style.display = 'flex';
    } else {
        rotateMessage.style.display = 'none';
    }
}

// Initial check
checkOrientation();

// Check on resize and orientation change
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
