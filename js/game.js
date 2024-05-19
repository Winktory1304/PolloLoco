let canvas;
let ctx;
let world = new World();

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d'); //holt sich die id canvas, Rufe die Methode getContext('2d') dieses Elements auf, um den 2D-Zeichnungskontext zu erhalten und speichert sie in der Variable ctx

    
    console.log('My character is', world.character);   
}