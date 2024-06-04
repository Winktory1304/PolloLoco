class World {
    character = new Character();
    level = level1
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); //holt sich die id canvas, Rufe die Methode getContext('2d') dieses Elements auf, um den 2D-Zeichnungskontext zu erhalten und speichert sie in der Variable ctx
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        //draw character
        this.addObjectsToMap(this.level.backgroundsObjects);
        this.addToMap(this.character)
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        //Draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    //Funktion um alle movableObjects(mo) zur Karte zu adden
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = "blue";
        this.ctx.rect(mo.x, mo.y, mo.x + mo.width, mo.y + mo.height);
        this.ctx.stroke();
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