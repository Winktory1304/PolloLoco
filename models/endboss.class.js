class Endboss extends MovableObject {    
    height = 500;
    width = 300;
    y = -35;
    i = 0;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

    ];
    IMAGES_SPAWNING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_SPAWNING);
        this.x = 2500;
        this.animate()
    }

    animate() {
        let i = 0
        setInterval(() => {

            if (i < 8) {
                this.playAnimation(this.IMAGES_SPAWNING);
            } else {                
                this.playAnimation(this.IMAGES_WALKING);
            }
            i++;
            if (world.character.x > 1860 && !world.firstContactBoss) {
                i = 0;
                world.firstContactBoss = true;                
            }
        }, 200);
    }
}