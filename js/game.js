let canvas;
let world; 
let keyboard = new Keyboard();
let winSound = new Audio('audio/winSound.mp3');
let defeatSound = new Audio('audio/defeatSound.mp3');
let gameLost = false;
let gameWon = false;


function startGame(){
    gameLost = false;
    gameWon = false;
    init();
}



function endTheGameByLost(){
    world.endboss.bossMusic.pause();
    if (gameLost) return; // Wenn das Spiel bereits verloren wurde, nichts tun
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

function endTheGameByWin(){
    if (gameWon) return; // Wenn das Spiel bereits gewonnen wurde, nichts tun
    world.endboss.bossMusic.pause();
    gameWon = true; // Setzt den Status auf gewonnen
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

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    movableObject = new MovableObject();
    console.log('My character is', world.character);   
}

window.addEventListener('keydown', (e) =>{
    if(e.code == "ArrowRight"){        
        keyboard.RIGHT = true;
    }
    if(e.code == "ArrowLeft"){
        keyboard.LEFT = true;
    }
    if(e.code == "ArrowDown"){
        keyboard.DOWN = true;
    }
    if(e.code == "ArrowUp"){
        keyboard.UP = true;
    }
    if(e.code == "Space"){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68){
        keyboard.D = true;        
    }
});

window.addEventListener('keyup', (e) =>{
    if(e.code == "ArrowRight"){ 
        keyboard.RIGHT = false;
    }
    if(e.code == "ArrowLeft"){
        keyboard.LEFT = false;
    }
    if(e.code == "ArrowDown"){
        keyboard.DOWN = false;
    }
    if(e.code == "ArrowUp"){
        keyboard.UP = false;
    }
    if(e.code == "Space"){
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68){
        keyboard.D = false;        
    }
});
