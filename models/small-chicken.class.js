class SmallChicken extends MovableObject{
    y = 400; 
    height = 50;
    energy = 10;
    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    
    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 400 + Math.random() * 500; //spawnen zufällig in einer range von 200px bis 700px
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
            this.moveLeft();            
            }
        }, 1000 / 60);
        
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);                
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }           
        }, 200);
    }
}