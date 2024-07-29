class ThrowableObject extends MovableObject {
    hit = false;
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_EMPTY = [''];

    constructor(x, y, throwDirection) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_EMPTY);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.throw(throwDirection);
    }

    /**
     * Initiates the throwing of the object in the specified direction.
     * @param {boolean} throwDirection - The direction in which to throw the object.
     */
    throw(throwDirection) {
        this.initializeThrow();
        const intervalId = setInterval(() => {
            this.updatePosition(throwDirection);
            this.handleAnimationDuringThrow(intervalId);
        }, 50);
    }

    /**
     * Initializes the throw by setting the vertical speed and applying gravity.
     */
    initializeThrow() {
        this.speedY = 25;
        this.applyGravity();
    }

    /**
     * Updates the position of the object based on the throw direction.
     * @param {boolean} throwDirection - The direction in which to throw the object.
     */
    updatePosition(throwDirection) {
        if (!throwDirection) {
            this.x += 10;
        } else {
            this.x -= 10;
        }
    }

    /**
     * Handles the animation of the object during the throw.
     * @param {number} intervalId - The ID of the interval controlling the animation.
     */
    handleAnimationDuringThrow(intervalId) {
        if (this.isAboveGround() && !this.hit) {
            this.playAnimation(this.IMAGES_ROTATE);
        } else {
            this.playSplashAnimation(intervalId);
        }
    }

    /**
     * Plays the splash animation and stops the interval controlling the throw animation.
     * @param {number} intervalId - The ID of the interval controlling the animation.
     */
    playSplashAnimation(intervalId) {
        this.playAnimation(this.IMAGES_SPLASH);
        setTimeout(() => {
            this.playAnimation(this.IMAGES_EMPTY);
        }, 100);
        clearInterval(intervalId);
    }
}
