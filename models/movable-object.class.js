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

    setStoppableAnimationInterval(func, time) {
        let id = setInterval(func, time);
        this.animationIntervals.push(id);

    }

    stopInterval() {
        this.animationIntervals.forEach(clearInterval);

    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    // applyGravity() {
    //     setInterval(() => {
    //         if (this.isAboveGround() || this.speedY > 0) {
    //             this.y -= this.speedY;
    //             this.speedY -= this.acceleration;
    //         } else {
    //             this.y = 375; // Ensure the object lands on the ground (for SmallChicken)
    //             this.speedY = 0; // Reset speedY when object is on the ground
    //         }
    //     }, 1000 / 25);
    // }


    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    collectCoin() {
        if (this.collectetCoins < 5) {
            this.collectetCoins++;

        }
    }

    collectBottle() {
        if (this.collectetBottle < 5) {
            this.collectetBottle++;
            this.changeBorderColor();
        }
    }

    changeBorderColor() {
        const button = document.querySelector('.btn-mobile-bottle');
        if (this.collectetBottle > 0) {
            button.style.borderColor = '#52DA1A';
        } else {
            button.style.borderColor = 'red';
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

    chickenIsDead() {
        // Implementiere diese Methode falls benötigt
    }

    // isAboveGround() {
    //     if (this instanceof ThrowableObject) { // Throwable objects should always fall
    //         return this.y < 350;
    //     } else {
    //         return this.y < 130;
    //     }
    // }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall
            return this.y < 350;
        } else if (this instanceof SmallChicken) {
            return this.y < 130;
        } else {
            return this.y < 140; // Specific y-position for Character
        }
    }

    /**
     * Plays the animation for the movable object.
     * 
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Checks if the current movable object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} - True if collision occurs, false otherwise.
     */
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
