class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
    collectetCoins = 0;
    collectetBottle = 0;
    animationIntervals = [];
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    stopInterval() {
        this.animationIntervals.forEach((interval) => {
            clearInterval(interval);
        });
        this.animationIntervals = [];
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }
    hit(damge) {
        this.energy -= damge;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }



    collectCoin() {
        if (this.collectetCoins < 5) {
            this.collectetCoins++;
            console.log('Collision with Coin, coins collected:', this.collectetCoins);
        }
    }

    collectBottle() {
        if (this.collectetBottle < 5) {
            this.collectetBottle++;
            console.log('Collision with bottle, bottle collected:', this.collectetBottle);

        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    chickenIsDead(){

    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall
            return this.y < 350;
        } else {
            return this.y < 130;
        }
    }





    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 0 % 6 => 0, rest 6 0 % 6 => 0, rest 6 / 3 % 6 => 0, rest 3 / 6 % 6 => 1, rest 0 / 7 % 6 => 1, rest 1
        //i = 0,1,2,3,4,5,0,1,2,3,4,5
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;//
    }





    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // R -> L
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // T -> B
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // L -> R
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // B -> T
    }


    isCollidingAbove(obj) {
        return this.x + this.width > obj.x &&
            this.x < obj.x + obj.width &&
            this.y < obj.y &&
            this.y + this.height > obj.y;
    }

    moveRight() {
        this.x += this.speed;

    }
    moveLeft() {
        this.x -= this.speed;



    }

    jump() {
        this.speedY = 25;
    }
}

