class Endboss extends MovableObject {
    static IMAGE_SPAWN = './img/4_enemie_boss_chicken/1_walk/G2.png';
    static IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    static IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    static IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    static IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    static IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    bossChickenSound = new Audio('audio/bossChicken.mp3');
    musicPlayed = false;
    musicPlayedFunction = false;

    width = 400;
    height = 400;
    y = 50;
    energy = 80;
    alertAnimationPlayed = false;
    isCurrentlyHurt = false;
    speed = 15;
    x = 1750;
    offset = {
        left: 60,
        right: 60,
        top: 80,
        bottom: 20
    };

    constructor() {
        super();
        this.initImages();
        this.loadImage(Endboss.IMAGES_WALKING[1]);
        this.animate();
    }

    initImages() {
        this.loadImages(Endboss.IMAGES_WALKING);
        this.loadImages(Endboss.IMAGES_ALERT);
        this.loadImages(Endboss.IMAGES_ATTACK);
        this.loadImages(Endboss.IMAGES_HURT);
        this.loadImages(Endboss.IMAGES_DEAD);
    }

    animate() {
        setInterval(() => this.handleAnimation(), 150);
    }

    handleAnimation() {
        if (this.isDead()) {
            this.handleDeath();
        } else if (this.isCurrentlyHurt) {
            this.playAnimation(Endboss.IMAGES_HURT);
        } else if (this.isInAttackRange()) {
            this.playAnimation(Endboss.IMAGES_ATTACK);
        } else if (this.isInAlertRange() && !this.alertAnimationPlayed) {
            this.musicPlayedFunction = true;
            this.playMusicOnce(); // Musik einmal abspielen
            world.statusBarBoss.show();
            this.handleAlert();
        } else if (this.alertAnimationPlayed) {
            this.walkAndMoveLeft();
        } else {
            this.showSpawnImage();
        }
    }

    playMusicOnce() {
        if (!this.musicPlayed) {
            console.log('Setting musicPlayed to true');
            this.musicPlayed = true;  // Setze die Flagge sofort
            ingameMusic.pause();
            bossMusic.play();
            console.log('Boss music played');

        }
    }


    hit() {
        const damage = 20;
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.isCurrentlyHurt = true;
        setTimeout(() => this.isCurrentlyHurt = false, 1000); // Hurt status lasts for 1 second
        console.log(`Endboss hit! Current energy: ${this.energy}`);
    }

    isHurt() {
        return this.energy > 0 && this.energy < 80;
    }

    handleDeath() {
        this.playAnimation(Endboss.IMAGES_DEAD);
        this.pauseMusic();
        setTimeout(() => this.showImage(Endboss.IMAGES_DEAD[2]), Endboss.IMAGES_DEAD.length * 150);
        setTimeout(() => {
            world.clearAllIntervals(); // Call the clearAllIntervals method of the world instance
            endTheGameByWin();
        }, Endboss.IMAGES_DEAD.length * 200);
    }
    isDead() {
        return this.energy <= 0;
    }
    pauseMusic() {
        bossMusic.pause();
    }

    isInAttackRange() {
        return this.checkDistance() < 50;
    }

    isInAlertRange() {
        return this.checkDistance() < 300;
    }

    handleAlert() {
        this.playAnimation(Endboss.IMAGES_ALERT);
        setTimeout(() => {
            this.alertAnimationPlayed = true;
        }, Endboss.IMAGES_ALERT.length * 150);
    }

    walkAndMoveLeft() {
        this.playAnimation(Endboss.IMAGES_WALKING);
        this.moveLeft();
    }

    showSpawnImage() {
        if (this.checkDistance() > 200) {
            this.showImage(Endboss.IMAGE_SPAWN);
        }
    }

    checkDistance() {
        return this.x - world.character.x;
    }

    showImage(image) {
        this.img = this.imageCache[image];
    }
}
