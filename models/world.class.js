class World {
    character = new Character();
    chicken = new Chicken();
    endboss = new Endboss();
    smallChicken = new SmallChicken();
    level = level1;
    ctx;
    firstContactBoss = false;
    firstContactBosshandle = false;
    canvas;
    keyboard;
    camera_x = 0;
    timeOfThrow = 0;
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.statusBarBoss = new StatusBarBoss();
        this.statusBarBoss.hide();

        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Starts the game loop by setting intervals to check for collisions and throwable objects.
     */
    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
        }, 25);
    }

    /**
     * Clears all intervals set in the browser window.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Checks all types of collisions in the game.
     */
    checkCollision() {
        this.checkCollisionWithEnemies();
        this.checkCollisionWithCoins();
        this.checkCollisionWithBottles();
        this.checkCollisionThrowableObjects();
        this.checkCollisionBottleWithEnemy();
    }

    /**
     * Checks for collisions between the character and enemies in the level.
     */
    checkCollisionWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead()) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.handleEnemyCollisionFromAbove(enemy);
                } else {
                    this.handleCharacterHitByEnemy();
                }
            }
        });
    }

    /**
     * Checks for collision between throwable objects and enemies or the end boss.
     * Removes collided objects and updates the status bar accordingly.
     */
    checkCollisionThrowableObjects() {
        let objectsToRemove = [];
        let enemiesToRemove = [];
        this.throwableObjects.forEach((throwableObject, index) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(throwableObject) && !enemy.isDead()) {
                    this.handleCollision(enemy, objectsToRemove, index, enemiesToRemove);
                }
            });
            if (this.endboss.isColliding(throwableObject) && !this.endboss.isDead()) {
                this.handleDamageToBoss(throwableObject, objectsToRemove, index);
            }
        });
        objectsToRemove.sort((a, b) => b - a).forEach((index) => {
            this.throwableObjects.splice(index, 1);
        });
        if (!this.endboss) {
            enemiesToRemove.forEach((enemy) => {
                this.removeEnemyAtIndex(enemy);
            });
        }
    }

    /**
     * Handles damage to the boss when hit by a throwable object.
     * @param {Object} throwableObject - The throwable object that hit the boss.
     * @param {Array} objectsToRemove - The list of objects to remove.
     * @param {number} index - The index of the throwable object.
     */
    handleDamageToBoss(throwableObject, objectsToRemove, index) {
        this.endboss.hit(throwableObject.damage);
        bottleBreakSound.play();
        this.statusBarBoss.setPercentages(this.endboss.energy); // Update the status bar
        objectsToRemove.push(index);
    }

    /**
     * Handles collision between an enemy and a throwable object.
     * @param {Object} enemy - The enemy object.
     * @param {Array} objectsToRemove - The list of objects to remove.
     * @param {number} index - The index of the throwable object.
     * @param {Array} enemiesToRemove - The list of enemies to remove.
     */
    handleCollision(enemy, objectsToRemove, index, enemiesToRemove) {
        enemy.hit(10);
        bottleBreakSound.play();
        objectsToRemove.push(index);
        enemiesToRemove.push(enemy);
    }

    /**
     * Handles collision with an enemy from above.
     * @param {Object} enemy - The enemy object.
     */
    handleEnemyCollisionFromAbove(enemy) {
        killChickenSound.play();
        enemy.hit(100);
        this.removeEnemyAtIndex(enemy);
    }

    /**
     * Checks for collision between throwable objects and enemies.
     * Removes collided objects and enemies from the world.
     */
    checkCollisionBottleWithEnemy() {
        let objectsToRemove = [];
        let enemiesToRemove = [];

        this.throwableObjects.forEach((throwableObject, index) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(throwableObject) && !enemy.isDead()) {
                    if (enemy instanceof Endboss) {
                        enemy.hit(); // Call the hit method of Endboss
                        this.statusBarBoss.setPercentages(enemy.energy); // Update the status bar
                    } else {
                        enemy.hit(throwableObject.damage);
                    }
                    objectsToRemove.push(index);
                    enemiesToRemove.push(enemy);
                }
            });
        });
        objectsToRemove.sort((a, b) => b - a).forEach((index) => {
            this.throwableObjects.splice(index, 1);
        });
        enemiesToRemove.forEach((enemy) => {
            this.removeEnemyAtIndex(enemy);
        });
    }

    /**
     * Removes an enemy from the level's enemies array at the specified index.
     * @param {Object} enemy - The enemy object to be removed.
     */
    removeEnemyAtIndex(enemy) {
        let index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            setTimeout(() => {
                this.level.enemies.splice(index, 1);
            }, 2000);
        }
    }

    /**
     * Handles the character being hit by an enemy.
     */
    handleCharacterHitByEnemy() {
        this.character.hit(10);
        this.statusBar.setPercentages(this.character.energy);
    }

    /**
     * Checks for collision between the character and coins in the level.
     */
    checkCollisionWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.handleCoinCollision(index);
            }
        });
    }

    /**
     * Handles collision between the character and a coin.
     * @param {number} index - The index of the coin in the coins array.
     */
    handleCoinCollision(index) {
        this.character.collectCoin();
        collectCoinSound.play();
        this.statusBarCoin.setPercentages(this.character.collectetCoins);
        this.level.coins.splice(index, 1);
    }

    /**
     * Checks for collision between the character and bottles in the level.
     */
    checkCollisionWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.handleBottleCollision(index);
            }
        });
    }

    /**
     * Handles collision between the character and a bottle.
     * @param {number} index - The index of the bottle in the bottles array.
     */
    handleBottleCollision(index) {
        this.character.collectBottle();
        this.character.changeBorderColor();
        this.statusBarBottle.setPercentages(this.character.collectetBottle);
        this.level.bottles.splice(index, 1);
        this.character.changeBorderColor();
    }

    /**
     * Checks if the character can throw objects and creates a throwable object if possible.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectetBottle > 0 && this.lastThrow() > 1) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.collectetBottle--;
            this.statusBarBottle.setPercentages(this.character.collectetBottle);
            this.timeOfThrow = new Date().getTime();
            this.character.changeBorderColor();
        }
    }

    /**
     * Returns the time passed since the last throw in seconds.
     * @returns {number} The time passed since the last throw in seconds.
     */
    lastThrow() {
        let timepassed = (new Date().getTime() - this.timeOfThrow) / 1000;
        return timepassed;
    }

    /**
     * Checks if the game should end based on the character's and the boss's health.
     */
    checkEndTheGame() {
        if (this.character.energy <= 0) {
            this.endboss.pauseMusic();
            endTheGameByLost();
            this.clearAllIntervals();
        } else if (this.endboss.isDead()) {
            endTheGameByWin();
            this.clearAllIntervals();
        }
    }

    /**
     * Sets the world reference in the character object.
     */
    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.clearCanvas();
        this.drawBackground();
        this.drawFixedObjects();
        this.drawDynamicObjects();
        this.requestNextFrame();
    }

    /**
     * Clears the entire canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the background objects onto the canvas.
     */
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundsObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the fixed objects such as status bars onto the canvas.
     */
    drawFixedObjects() {
        // ----- Space for fixed Objects -----
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (this.statusBarBoss.visible) {
            this.addToMap(this.statusBarBoss);
        }
    }

    /**
     * Draws the dynamic objects such as the character, enemies, and throwable objects onto the canvas.
     */
    drawDynamicObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Requests the next animation frame to keep the draw loop running.
     */
    requestNextFrame() {
        requestAnimationFrame(() => {
            this.draw();
        });
    }


    /**
     * Adds an array of objects to the map.
     * @param {Array} objects - The objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a movable object to the map and handles its drawing and flipping.
     * @param {MovableObject} mo - The movable object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.restoreFlipImage(mo);
        }
    }

    /**
     * Restores the flipped image of a movable object.
     * @param {MovableObject} mo - The movable object to restore the image for.
     */
    restoreFlipImage(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Flips the image of a movable object.
     * @param {MovableObject} mo - The movable object to flip the image for.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
}
