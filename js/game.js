let canvas;
let world; 
let keyboard = new Keyboard();


function startGame(){
    init();
}

function endTheGameByLost(){
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