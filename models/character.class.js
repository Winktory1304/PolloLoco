class Character extends MovableObject {

    world;
    height = 280;
    y = 160;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    walkig_sound = new Audio('audio/walk.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.walkig_sound.pause();
            if (this.world.keyboard.RIGHT  && this.x < this.world.level.level_end_x) {
                this.x += this.speed; 
                console.log('right x', this.x)   
                this.otherDirection = false;
                this.walkig_sound.play();           
            }
            if (this.world.keyboard.LEFT && this.x > 0) {   // char kann nicht mehr links raus laufen
                this.x -= this.speed;
                console.log('left x', this.x)  
                this.otherDirection = true;
                this.walkig_sound.play();         
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {            
            
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {                            
                //walk animation
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    jump() {

    };
}