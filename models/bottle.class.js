class Bottles extends MovableObject {
    y = 200;
    x = 400;
    height = 100;
    width = 100;


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');        
        this.x = x;
        this.y = y;
        
    } 
    
    
}