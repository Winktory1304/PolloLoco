class Clouds extends MovableObject {
    height = 250;
    y = 20;
    width = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 700; //Zahl zwischen 0 und 700     
        this.animate();
    }
    animate() {
        const animateCloud = () => {
            this.x -= 0.15;
            requestAnimationFrame(animateCloud);
        }
        animateCloud();
    }
    
}



