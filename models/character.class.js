class Character extends MovableObject {

    world;
    height = 280;
    y = 140;
    speed = 5;
    IMAGES_WAITING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    walkig_sound = new Audio('audio/walk.mp3');
    snore_sound = new Audio('audio/snore.mp3');
    deadAnimationPlayed = false;
    offset = {
        left: 25,
        right: 40,
        top: 80,
        bottom: 10
    };

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WAITING);
        this.animate();
        this.applyGravity();
        this.checkIdle();
        this.deadAnimationPlayed = false;
    }

    resetIdleTimer() {
        clearTimeout(this.idleTimer);
        this.snore_sound.pause();
        this.startIdleTimer();
    }

    startIdleTimer() {
        this.idleTimer = setTimeout(() => {
            this.snore_sound.play();
            this.playIdleAnimation();
        }, this.idleTime);
    }

    playIdleAnimation() {
        this.idleAnimationInterval = setInterval(() => {
            if (this.snore_sound.paused) {
                clearInterval(this.idleAnimationInterval);
            } else {
                this.playAnimation(this.IMAGES_WAITING);
            }
        }, 10000 / 60); // Adjust the interval time as needed
    }

    animate() {
        this.animateMovement();
        this.animateActions();
    }

    animateMovement() {
        setInterval(() => {
            this.walkig_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walkig_sound.play();
                this.resetIdleTimer();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.walkig_sound.play();
                this.resetIdleTimer();
                this.otherDirection = true;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.resetIdleTimer();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    animateActions() {
        setInterval(() => {
            if (this.isDead() && !this.deadAnimationPlayed) {
                this.handleDeaath();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.resetIdleTimer();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    handleDeaath() {
        this.playAnimation(this.IMAGES_DEAD);
        debugger;
        this.world.endboss.pauseMusic();
        world.clearAllIntervals();
        endTheGameByLost();
        this.deadAnimationPlayed = true;
    }

    checkIdle() {
        this.idleTimer = null;
        this.idleTime = 555000; // 5 seconds

        this.startIdleTimer();
    }
}
