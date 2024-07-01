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
    ]

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_ROTATE);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.throw();

    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        const intervalId = setInterval(() => {  
            this.x += 10;
            if (this.isAboveGround() && !this.hit) {
                this.playAnimation(this.IMAGES_ROTATE);
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
                clearInterval(intervalId);
                // debugger;  
            }
        }, 25);
    }


}