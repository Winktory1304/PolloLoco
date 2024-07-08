class Bottles extends MovableObject {
   
    height = 60;
    width = 60;
    offset = {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5
    };


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');        
        this.x = x;
        this.y = y;
        
    } 
    
    
}