class Chicken extends MovableObject {
    y = 367;
    height = 60;
    width = 60;
    energy = 10;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 400 + Math.random() * 2000;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.35 + Math.random() * 0.8;
        this.animate();
    }

    /**
     * Starts the animation intervals for the chicken.
     */
    animate() {
        this.setStoppableAnimationInterval(this.moveAnimationChicken.bind(this), 1000 / 60);
        this.setStoppableAnimationInterval(this.imagesAnimationChicken.bind(this), 200);
    }

    /**
     * Handles the movement animation for the chicken.
     */
    moveAnimationChicken() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

    /**
     * Handles the image animation for the chicken.
     */
    imagesAnimationChicken() {
        if (!this.isDead()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }
}
