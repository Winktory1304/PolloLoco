let canvas;
let ctx;
let character = new Image();

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d'); //holt sich die id canvas, Rufe die Methode getContext('2d') dieses Elements auf, um den 2D-Zeichnungskontext zu erhalten und speichert sie in der Variable ctx

    character.src ='../img/2_character_pepe/2_walk/W-21.png';

    ctx.drawImage(character, 20, 20, 50, 150);
}