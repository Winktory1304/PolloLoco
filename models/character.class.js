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
    IMAGES_DO_NOTHING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    deadAnimationPlayed = false;
    offset = {
        left: 25,
        right: 40,
        top: 80,
        bottom: 10
    };

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png'); // Start with Do Nothing image
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WAITING);
        this.loadImages(this.IMAGES_DO_NOTHING);
        this.animate();
        this.applyGravity();
        this.lastMoveTime = Date.now();
        this.idleAnimationStarted = false;
        this.deadAnimationPlayed = false;
        this.isJumpingAnimationPlaying = false; // Neuer Zustand für die Sprunganimation
        this.currentAnimationInterval = null; // Neue Variable für das aktuelle Animationsintervall
    }

    /**
     * Updates the last move time.
     */
    updateLastMoveTime() {
        this.lastMoveTime = Date.now();
        this.idleAnimationStarted = false; // Reset idle animation status
    }

    /**
     * Starts the animation intervals for the character.
     */
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

    /**
     * Handles the character's movement based on user input.
     */
    handleMovement() {
        walkingSound.pause();
        if (this.isMovingRight()) {
            this.moveRight();
            walkingSound.play();
            this.updateLastMoveTime();
            this.otherDirection = false;
        }
        if (this.isMovingLeft()) {
            this.moveLeft();
            walkingSound.play();
            this.updateLastMoveTime();
            this.otherDirection = true;
        }
        if (this.isJumping()) {
            this.jump();
            this.updateLastMoveTime();
        }
    }

    /**
     * Checks if the character is moving to the right.
     * @returns {boolean} True if the character is moving right, false otherwise.
     */
    isMovingRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character is moving to the left.
     * @returns {boolean} True if the character is moving left, false otherwise.
     */
    isMovingLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if the character is jumping.
     * @returns {boolean} True if the character is jumping, false otherwise.
     */
    isJumping() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Updates the camera position based on the character's position.
     */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Animates the actions of the character.
     */
    animateActions() {
        setInterval(() => {
            const now = Date.now();
            if (this.isDead() && !this.deadAnimationPlayed) {
                this.handleDeathAnimation();
            } else if (this.isHurt()) {
                this.handleHurtAnimation();
            } else if (this.isAboveGround()) {
                this.handleJumpingAnimation();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.handleWalkingAnimation();
                this.isJumpingAnimationPlaying = false;  // Setze Zustand zurück, wenn der Charakter den Boden berührt
                this.stopJumpingAnimation(); // Stoppt das Sprung-Intervall
            } else if (now - this.lastMoveTime > 5000 && !this.idleAnimationStarted) {
                this.handleIdleAnimation();
            } else if (now - this.lastMoveTime > 1) {
                this.handleDoNothingAnimation();
            }
        }, 50);
    }

    /**
     * Handles the death animation of the character.
     */
    handleDeathAnimation() {
        this.stopAllAnimations();
        this.playAnimation(this.IMAGES_DEAD);
        world.clearAllIntervals();
        endTheGameByLost();
        this.deadAnimationPlayed = true;
    }

    /**
     * Handles the hurt animation of the character.
     */
    handleHurtAnimation() {
        this.stopAllAnimations();
        this.playAnimation(this.IMAGES_HURT);
        this.updateLastMoveTime();
    }

    /**
     * Handles the jumping animation of the character.
     */
    startJumpingAnimation() {
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_JUMPING);
        }, 250); 
    }

    /**
     * Stops the jumping animation interval.
     */
    stopJumpingAnimation() {
        if (this.currentAnimationInterval) {
            clearInterval(this.currentAnimationInterval);
            this.currentAnimationInterval = null;
        }
    }

    /**
     * Handles the jumping animation of the character.
     */
    handleJumpingAnimation() {
        if (!this.isJumpingAnimationPlaying) {
            this.stopAllAnimations();
            this.startJumpingAnimation();
            this.isJumpingAnimationPlaying = true;  
        }
    }

    /**
     * Handles the walking animation of the character.
     */
    handleWalkingAnimation() {
        this.stopAllAnimations();
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Handles the do-nothing animation of the character.
     */
    handleDoNothingAnimation() {
        if (!this.idleAnimationStarted) { // Ensure idle animation is not already playing
            this.stopAllAnimations();
            this.playAnimation(this.IMAGES_DO_NOTHING);
        }
    }

    /**
     * Handles the idle animation of the character.
     */
    handleIdleAnimation() {
        this.stopAllAnimations();
        this.playAnimation(this.IMAGES_WAITING);
        this.idleAnimationStarted = true;
        snoreSound.play();
    }

    /**
     * Stops all currently running animations.
     */
    stopAllAnimations() {
        clearInterval(this.currentAnimationInterval);
        this.currentAnimationInterval = null;
        this.isJumpingAnimationPlaying = false;
        this.idleAnimationStarted = false; // Reset idle animation status
    }

    /**
     * Starts the game and manages the idle and do-nothing animations.
     */
    startGame() {
        this.checkForIdle();
    }

    /**
     * Checks for idle status and starts the appropriate animations.
     */
    checkForIdle() {
        setInterval(() => {
            const now = Date.now();
            if (now - this.lastMoveTime > 5000 && !this.idleAnimationStarted) {
                this.handleIdleAnimation();
            } else if (now - this.lastMoveTime > 1) {
                this.handleDoNothingAnimation();
            }
        }, 50);
    }
}
