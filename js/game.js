let canvas;
let world; 
let keyboard = new Keyboard();

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
    console.log(e);
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
    console.log(e);
});