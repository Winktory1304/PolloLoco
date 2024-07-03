class Endboss extends MovableObject {    
    IMAGE_SPAWN = '../img/4_enemie_boss_chicken/1_walk/G2.png';
    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    // offset = {
    //     left: +60,
    //     right: -110,
    //     top: -80,
    //     bottom: +75
    // };
    width = 400;
    height = 400;
    y = 50;
    energy = 80;
    alertAnimationPlayed = false;


    constructor() {
        super().loadImage(this.IMAGES_WALKING[1]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1750;
        this.animate();
        this.speed = 15;
    }


    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                gameWon();
                setInterval(() => {
                    this.showImage(this.IMAGES_DEAD[2]);
                }, this.IMAGES_DEAD.length * 150);
                setInterval(() => {
                    gameDone();
                }, this.IMAGES_DEAD.length * 200);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.checkDistance() < 50) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.checkDistance() < 300 && !this.alertAnimationPlayed) {
                this.playAnimation(this.IMAGES_ALERT);
                setInterval(() => {
                    this.alertAnimationPlayed = true;
                }, this.IMAGES_ALERT.length * 150);
            } else if (this.alertAnimationPlayed) {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } else if (this.checkDistance() > 200) {
                this.showImage(this.IMAGE_SPAWN);
            }
        }, 150);
    }


    checkDistance() {
        return this.x - world.character.x;
    }


    showImage(image) {
        this.img = this.imageCache[image];
    }
}