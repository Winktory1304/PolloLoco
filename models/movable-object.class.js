class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
    collectetCoins = 0;
    collectetBottle = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }
    hit() {
        this.energy -= 10;
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

    isAboveGround() {
        if (this instanceof ThrowableObject) { //always fall
            return true;
        } else {
            return this.y < 160;

        }
    }




    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 0 % 6 => 0, rest 6 0 % 6 => 0, rest 6 / 3 % 6 => 0, rest 3 / 6 % 6 => 1, rest 0 / 7 % 6 => 1, rest 1
        //i = 0,1,2,3,4,5,0,1,2,3,4,5
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;//
    }




    //character colliding
    isColliding(obj) {
        return this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x && this.y + obj.height;

    }

    isCollidingAbove(obj) {
        if (
            this.x + this.width > obj.x &&       // Rechte Kante von 'this' ist rechts von der linken Kante von 'obj'
            this.x < obj.x + obj.width &&        // Linke Kante von 'this' ist links von der rechten Kante von 'obj'
            this.y < obj.y &&                    // Obere Kante von 'this' ist oberhalb der oberen Kante von 'obj'
            this.y + this.height > obj.y
        ) {
            // Collision from above
            // Do something for collision from above
            return true;
        } else {
            return false;
        }
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

