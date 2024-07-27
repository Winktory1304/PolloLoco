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
    if (gameLost) return; // Wenn das Spiel bereits verloren wurde, nichts tun
    world.endboss.bossMusic.pause();
    gameLost = true; // Setzt den Status auf verloren    
    defeatSound.currentTime = 0; // Setzt den Sound auf den Anfang
    defeatSound.play();
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    let defeatScreen = document.getElementById('defeatScreen');
    defeatScreen.style.display = 'unset';
    let winScreen = document.getElementById('winScreen');
    winScreen.style.display = 'none';
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.style.display = 'none';
}

function endTheGameByWin() {
    if (gameWon) return;
    world.endboss.bossMusic.pause();
    gameWon = true;
    winSound.play();
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    let defeatScreen = document.getElementById('defeatScreen');
    defeatScreen.style.display = 'none';
    let winScreen = document.getElementById('winScreen');
    winScreen.style.display = 'unset';
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.style.display = 'none';
}

function init() {
    startGame();
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    movableObject = new MovableObject();
    console.log('My character is', world.character);
}

function startGame() {
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    let defeatScreen = document.getElementById('defeatScreen');
    defeatScreen.style.display = 'none';
    let winScreen = document.getElementById('winScreen');
    winScreen.style.display = 'none';
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.style.display = 'unset';
    let controlContainer = document.getElementById('controlsContainer');
    controlContainer.style.display = 'none';

}

function startScreen() {
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'unset';
    let defeatScreen = document.getElementById('defeatScreen');
    defeatScreen.style.display = 'none';
    let winScreen = document.getElementById('winScreen');
    winScreen.style.display = 'none';
    let gameScreen = document.getElementById('gameScreen');
    gameScreen.style.display = 'none';

}

window.addEventListener('keydown', (e) => {
    if (e.code == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (e.code == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (e.code == "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (e.code == "ArrowUp") {
        keyboard.UP = true;
    }
    if (e.code == "Space") {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (e.code == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (e.code == "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (e.code == "ArrowUp") {
        keyboard.UP = false;
    }
    if (e.code == "Space") {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("controlSetupButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
