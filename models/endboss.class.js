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
        left: 15,
        right: 15,
        top: 80,
        bottom: 30
    };

    constructor() {
        super();
        this.initImages();
        this.loadImage(Endboss.IMAGES_WALKING[1]);
        this.animate();
    }

    /**
     * Initializes all images for the end boss by loading them into memory.
     */
    initImages() {
        this.loadImages(Endboss.IMAGES_WALKING);
        this.loadImages(Endboss.IMAGES_ALERT);
        this.loadImages(Endboss.IMAGES_ATTACK);
        this.loadImages(Endboss.IMAGES_HURT);
        this.loadImages(Endboss.IMAGES_DEAD);
    }

    /**
     * Starts the animation interval for the end boss.
     */
    animate() {
        setInterval(() => this.handleAnimation(), 150);
    }

    /**
     * Handles the animation logic for the end boss.
     */
    handleAnimation() {
        if (this.isDead()) {
            this.handleDeath();
        } else if (this.isCurrentlyHurt) {
            this.handleHurt();
        } else if (this.isInAttackRange()) {
            this.handleAttack();
        } else if (this.isInAlertRange() && !this.alertAnimationPlayed) {
            this.handleAlertRange();
        } else if (this.alertAnimationPlayed) {
            this.handleAlertAnimationPlayed();
        } else {
            this.handleDefault();
        }
    }

    /**
     * Handles the animation when the end boss is hurt.
     */
    handleHurt() {
        this.playAnimation(Endboss.IMAGES_HURT);
    }

    /**
     * Handles the animation and logic when the end boss attacks.
     */
    handleAttack() {
        this.playAnimation(Endboss.IMAGES_ATTACK);
        world.handleCharacterHitByEnemy();
    }

    /**
     * Handles the alert state of the end boss.
     */
    handleAlertRange() {
        this.musicPlayedFunction = true;
        this.playMusicOnce(); // Musik einmal abspielen
        world.statusBarBoss.show();
        this.handleAlert();
    }

    /**
     * Handles the animation when the alert animation has been played.
     */
    handleAlertAnimationPlayed() {
        this.walkAndMoveLeft();
    }

    /**
     * Handles the default state of the end boss.
     */
    handleDefault() {
        this.showSpawnImage();
    }

    /**
     * Plays the boss music once when the end boss is alerted.
     */
    playMusicOnce() {
        if (!this.musicPlayed) {
            this.musicPlayed = true;  // Setze die Flagge sofort
            ingameMusic.pause();
            bossMusic.play();
        }
    }

    /**
     * Inflicts damage on the end boss and updates its state.
     */
    hit() {
        const damage = 20;
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.isCurrentlyHurt = true;
        setTimeout(() => this.isCurrentlyHurt = false, 1000);
    }

    /**
     * Checks if the end boss is hurt.
     * @returns {boolean} True if the end boss is hurt, false otherwise.
     */
    isHurt() {
        return this.energy > 0 && this.energy < 80;
    }

    /**
     * Handles the death animation and logic for the end boss.
     */
    handleDeath() {
        this.playAnimation(Endboss.IMAGES_DEAD);
        this.pauseMusic();
        setTimeout(() => this.showImage(Endboss.IMAGES_DEAD[2]), Endboss.IMAGES_DEAD.length * 150);
        setTimeout(() => {
            world.clearAllIntervals();
            endTheGameByWin();
        }, Endboss.IMAGES_DEAD.length * 200);
    }

    /**
     * Checks if the end boss is dead.
     * @returns {boolean} True if the end boss is dead, false otherwise.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Pauses the boss music.
     */
    pauseMusic() {
        bossMusic.pause();
    }

    /**
     * Checks if the end boss is in attack range.
     * @returns {boolean} True if the end boss is in attack range, false otherwise.
     */
    isInAttackRange() {
        return this.checkDistance() < 50;
    }

    /**
     * Checks if the end boss is in alert range.
     * @returns {boolean} True if the end boss is in alert range, false otherwise.
     */
    isInAlertRange() {
        return this.checkDistance() < 500;
    }

    /**
     * Handles the alert animation and logic for the end boss.
     */
    handleAlert() {
        this.playAnimation(Endboss.IMAGES_ALERT);
        setTimeout(() => {
            this.alertAnimationPlayed = true;
        }, Endboss.IMAGES_ALERT.length * 150);
    }

    /**
     * Handles the walking animation and movement to the left for the end boss.
     */
    walkAndMoveLeft() {
        this.playAnimation(Endboss.IMAGES_WALKING);
        this.moveLeft();
    }

    /**
     * Shows the spawn image of the end boss.
     */
    showSpawnImage() {
        if (this.checkDistance() > 200) {
            this.showImage(Endboss.IMAGE_SPAWN);
        }
    }

    /**
     * Checks the distance between the end boss and the player character.
     * @returns {number} The distance between the end boss and the player character.
     */
    checkDistance() {
        return this.x - world.character.x;
    }

    /**
     * Shows a specific image for the end boss.
     * @param {string} image - The path to the image to be shown.
     */
    showImage(image) {
        this.img = this.imageCache[image];
    }
}
