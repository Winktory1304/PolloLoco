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
    animationIntervals = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); //holt sich die id canvas, Rufe die Methode getContext('2d') dieses Elements auf, um den 2D-Zeichnungskontext zu erhalten und speichert sie in der Variable ctx
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
            this.checkFirstContactBoss();
            this.checkEndTheGame();
        }, 25);
    }

    // -------------------------------------------------------------------------

    checkCollision() {
        this.checkCollisionWithEnemies();
        this.checkCollisionWithCoins();
        this.checkCollisionWithBottles();
        this.checkCollisionThrowableObjects();
        this.checkCollisionBottleWithEnemy()
    }

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

    checkCollisionThrowableObjects() {
        let objectsToRemove = [];
        let enemiesToRemove = [];

        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((throwableObject, index) => {
                if (enemy.isColliding(throwableObject) && !enemy.isDead()) {
                    enemy.hit(20);
                    // playAnimation(throwableObject.x, throwableObject.y, IMAGES_SPLASH, 200); // Play the splash animation at the specified position
                    objectsToRemove.push(index); // Index der zu entfernenden Wurfobjekte speichern
                    enemiesToRemove.push(enemy); // Enemy zum Entfernen speichern
                    console.log('Collision with throwable object');
                }
            });
        });

        // Entferne Wurfobjekte in umgekehrter Reihenfolge, um Index-Probleme zu vermeiden
        objectsToRemove.sort((a, b) => b - a).forEach((index) => {
            this.throwableObjects.splice(index, 1);
        });

        // Entferne Feinde, wenn es sich nicht um den Endboss handelt
        if (!this.endboss) {
            enemiesToRemove.forEach((enemy) => {
            this.removeEnemyAtIndex(enemy);
            });
        }
    }

    handleEnemyCollisionFromAbove(enemy) {
        enemy.hit(100);
        this.removeEnemyAtIndex(enemy);
        console.log('Collision from above with enemy');
    }
    checkCollisionBottleWithEnemy() {
        let objectsToRemove = [];
        let enemiesToRemove = [];

        this.throwableObjects.forEach((throwableObject, index) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(throwableObject) && !enemy.isDead()) {
                    enemy.hit(throwableObject.damage);
                    objectsToRemove.push(index);
                    enemiesToRemove.push(enemy);
                    console.log('Collision with throwable object');
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

    removeEnemyAtIndex(enemy) {
        let index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            setTimeout(() => {
                this.level.enemies.splice(index, 1);
                console.log('Enemy removed from level');
            }, 2000);
        }
    }

    handleCharacterHitByEnemy() {
        this.character.hit(10);
        this.statusBar.setPercentages(this.character.energy);
        console.log('Collision with Character, energy', this.character.energy);
    }

    checkCollisionWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.handleCoinCollision(index);
            }
        });
    }

    handleCoinCollision(index) {
        this.character.collectCoin();
        this.statusBarCoin.setPercentages(this.character.collectetCoins);
        this.level.coins.splice(index, 1);
    }

    checkCollisionWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.handleBottleCollision(index);
            }
        });
    }

    handleBottleCollision(index) {
        this.character.collectBottle();
        this.statusBarBottle.setPercentages(this.character.collectetBottle);
        this.level.bottles.splice(index, 1);
    }

    // -------------------------------------------------------------------------

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectetBottle > 0 && this.lastThrow() > 1) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.collectetBottle--;
            this.statusBarBottle.setPercentages(this.character.collectetBottle);
            this.timeOfThrow = new Date().getTime();

        }
    }

    lastThrow() {
        let timepassed = (new Date().getTime() - this.timeOfThrow) / 1000;
        return timepassed;
    }

    // -------------------------------------------------------------------------

    checkFirstContactBoss() {
        if (this.firstContactBoss && !this.firstContactBosshandle) {
            //play sound
            console.log('Rohhhharrr');
            this.firstContactBosshandle = true;           
        }
    }

    checkEndTheGame() {
        if (this.character.energy <= 0) {
            endTheGameByLost();
        } else if (this.endboss.energy <= 0) {
            endTheGameByWin();
        }
    }

    
    

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundsObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fix Objects -----
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);        
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        //Draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    //Funktion um alle movableObjects(mo) zur Karte zu adden
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

    restoreFlipImage(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
}
