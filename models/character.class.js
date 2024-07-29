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
        snoreSound.pause();
        this.startIdleTimer();
    }

    startIdleTimer() {
        this.idleTimer = setTimeout(() => {
            snoreSound.play();
            this.playIdleAnimation();
        }, this.idleTime);
    }

    playIdleAnimation() {
        this.idleAnimationInterval = setInterval(() => {
            if (snoreSound.paused) {
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

    /**
     * Animates the movement of the character.
     */
    animateMovement() {
        setInterval(() => {
            this.handleMovement();
            this.updateCamera();
        }, 1000 / 60);
    }

    handleMovement() {
        walkingSound.pause();
        if (this.isMovingRight()) {
            this.moveRight();
            walkingSound.play();
            this.resetIdleTimer();
            this.otherDirection = false;
        }
        if (this.isMovingLeft()) {
            this.moveLeft();
            walkingSound.play();
            this.resetIdleTimer();
            this.otherDirection = true;
        }
        if (this.isJumping()) {
            this.jump();
            this.resetIdleTimer();
        }
    }

    isMovingRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    isMovingLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    isJumping() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }


    /**
     * Animates the actions of the character.
     * This method is responsible for handling the character's animations based on its current state.
     * It uses setInterval to repeatedly check the character's state and play the appropriate animation.
     */
    animateActions() {
        setInterval(() => {
            if (this.isDead() && !this.deadAnimationPlayed) {
                this.handleDeath();
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

    /**
     * Handles the death of the character.
     */
    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        world.clearAllIntervals();
        endTheGameByLost();
        this.deadAnimationPlayed = true;
    }

    /**
     * Checks if the character is idle and starts the idle timer.
     */
    checkIdle() {
        this.idleTimer = null;
        this.idleTime = 3000;

        this.startIdleTimer();
    }
}
