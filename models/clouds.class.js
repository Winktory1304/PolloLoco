class Clouds extends MovableObject{
    height = 250;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.y = 20;
        this.x =Math.random() * 700;
        this.width = 250;
        
    };
}