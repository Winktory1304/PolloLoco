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

    /**
     * Sets an interval for the given function and stores the interval ID for future reference.
     * @param {Function} func - The function to be executed at each interval.
     * @param {number} time - The time in milliseconds between each function call.
     */
    setStoppableAnimationInterval(func, time) {
        let id = setInterval(func, time);
        this.animationIntervals.push(id);
    }

    /**
     * Clears all stored animation intervals.
     */
    stopInterval() {
        this.animationIntervals.forEach(clearInterval);
    }

    /**
     * Applies gravity to the object by adjusting its vertical position at each interval.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Reduces the object's energy by the specified damage amount and updates the last hit time.
     * @param {number} damage - The amount of damage to inflict.
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Increases the collected coins count if it is less than 5.
     */
    collectCoin() {
        if (this.collectetCoins < 5) {
            this.collectetCoins++;
        }
    }

    /**
     * Increases the collected bottles count if it is less than 5 and changes the border color of the bottle button.
     */
    collectBottle() {
        if (this.collectetBottle < 5) {
            this.collectetBottle++;
            this.changeBorderColor();
        }
    }

    /**
     * Changes the border color of the bottle button based on the number of collected bottles.
     */
    changeBorderColor() {
        const button = document.querySelector('.btn-mobile-bottle');
        if (this.collectetBottle > 0) {
            button.style.borderColor = '#52DA1A';
        } else {
            button.style.borderColor = 'red';
        }
    }

    /**
     * Checks if the object was hit within the last second.
     * @returns {boolean} - True if the object was hit within the last second, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object's energy is zero.
     * @returns {boolean} - True if the object's energy is zero, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
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

    /**
     * Checks if the current movable object is colliding with another object from above.
     * @param {Object} obj - The object to check collision with.
     * @returns {boolean} - True if collision occurs, false otherwise.
     */
    isCollidingAbove(obj) {
        return this.x + this.width > obj.x &&
            this.x < obj.x + obj.width &&
            this.y < obj.y &&
            this.y + this.height > obj.y;
    }

    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 25;
    }
}
