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
        this.x = 400 + Math.random() * 2000; // Spawnen zufällig in einer range von 200px bis 700px
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.25;
        this.applyGravityForSmallChicken(); // Anwenden der Schwerkraft für SmallChicken
        this.animate();
    }

    animate() {
        this.setStoppableAnimationInterval(this.moveAnimationSmallChicken.bind(this), 1000 / 60);
        this.setStoppableAnimationInterval(this.imagesAnimationSmallChicken.bind(this), 200);
        this.setStoppableAnimationInterval(this.randomJump.bind(this), 1000); // Füge diese Zeile hinzu
    }

    moveAnimationSmallChicken() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

    imagesAnimationSmallChicken() {
        if (!this.isDead()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    randomJump() {
        if (!this.isDead() && Math.random() < 0.1) { // 10% Wahrscheinlichkeit zu springen
            this.jump();
        }
    }

    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 15; // Setze die Sprunghöhe
        }
    }

    applyGravityForSmallChicken() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 375; // Stellt sicher, dass das Objekt wieder auf dem Boden landet
                this.speedY = 0; // Wenn das Objekt den Boden berührt, bleibt es stehen
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 375;
    }
}
