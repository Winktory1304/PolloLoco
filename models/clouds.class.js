class Clouds extends MovableObject {
    height = 250;
    y = 20;
    width = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 700; //Zahl zwischen 0 und 700
        debugger;
        this.animate();
    }
    animate() {
        setInterval( () => {
            this.x -= 0.15;            
        }, 1000 / 60);
    }
    
}