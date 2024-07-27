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
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('defeatScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'unset';
    document.getElementById('controlSetupButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none'; // Hide restart button when the game starts
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is', world.character);
    showMobileButtons(); // Ensure mobile buttons are visible when the game restarts
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
    hideMobileButtons();
    showRestartButton();
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
    hideMobileButtons();
    showRestartButton();
}

function hideMobileButtons() {
    let mobileButtons = document.querySelectorAll('.btn-mobile, .btn-mobile-bottle, .btn-mobile-jump');
    mobileButtons.forEach(button => {
        button.style.display = 'none';
    });
}

function showMobileButtons() {
    let mobileButtons = document.querySelectorAll('.btn-mobile, .btn-mobile-bottle, .btn-mobile-jump');
    mobileButtons.forEach(button => {
        button.style.display = 'block';
    });
}

function showRestartButton() {
    document.getElementById('restartButton').style.display = 'block';
}

function startScreen() {
    document.getElementById('startScreen').style.display = 'unset';
    document.getElementById('defeatScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'none';
}

let modal = document.getElementById("myModal");
let btn = document.getElementById("controlSetupButton");
let span = document.getElementsByClassName("close")[0];

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
