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
    ]


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
    animate() {
        setInterval(() => {
            
            if (this.world.keyboard.RIGHT  && this.x < this.world.level.level_end_x) {
                this.x += this.speed; 
                console.log('right x', this.x)   
                this.otherDirection = false;           
            }
            if (this.world.keyboard.LEFT && this.x > 0) {   // char kann nicht mehr links raus laufen
                this.x -= this.speed;
                console.log('left x', this.x)  
                this.otherDirection = true;         
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {            
            
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {   
                this.x += this.speed;            
                let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 0 % 6 => 0, rest 6 0 % 6 => 0, rest 6 / 3 % 6 => 0, rest 3 / 6 % 6 => 1, rest 0 / 7 % 6 => 1, rest 1
                //i = 0,1,2,3,4,5,0,1,2,3,4,5
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;//
            }
        }, 50);
    }

    jump() {

    };
}