class SmallChicken extends MovableObject {
    y = 375;
    height = 45;
    energy = 10;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 400 + Math.random() * 2000;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.25;
        this.applyGravityForSmallChicken();
        this.animate();
    }

    /**
     * Starts the animation intervals for the small chicken.
     */
    animate() {
        this.setStoppableAnimationInterval(this.moveAnimationSmallChicken.bind(this), 1000 / 60);
        this.setStoppableAnimationInterval(this.imagesAnimationSmallChicken.bind(this), 200);
        this.setStoppableAnimationInterval(this.randomJump.bind(this), 1000);
    }

    /**
     * Handles the movement animation for the small chicken.
     */
    moveAnimationSmallChicken() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

    /**
     * Handles the image animation for the small chicken.
     */
    imagesAnimationSmallChicken() {
        if (!this.isDead()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    /**
     * Makes the small chicken jump randomly.
     */
    randomJump() {
        if (!this.isDead() && Math.random() < 0.3) {
            this.jump();
        }
    }

    /**
     * Makes the small chicken jump by setting its vertical speed.
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 15 + Math.random() * 15;
        }
    }

    /**
     * Applies gravity to the small chicken, making it fall to the ground.
     */
    applyGravityForSmallChicken() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 375;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the small chicken is above the ground.
     * @returns {boolean} True if the small chicken is above the ground, false otherwise.
     */
    isAboveGround() {
        return this.y < 375;
    }
}
