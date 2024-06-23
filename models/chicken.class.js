class Chicken extends MovableObject{
    y = 350;
    height = 100;
    energy = 10;
    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
    
    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500; //spawnen zufällig in einer range von 200px bis 700px
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();            
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