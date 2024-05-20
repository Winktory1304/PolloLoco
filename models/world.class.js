class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Clouds()
    ];
    backgroundsObjects = [
        new BackgroundObject("img/5_background/layers/air.png", 0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    ]

    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d'); //holt sich die id canvas, Rufe die Methode getContext('2d') dieses Elements auf, um den 2D-Zeichnungskontext zu erhalten und speichert sie in der Variable ctx
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //draw character
        this.addObjectsToMap(this.backgroundsObjects);
        this.addToMap(this.character)        
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

        //Draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }
    addObjectsToMap(objects){
        objects.forEach(o=>{
            this.addToMap(o);
        })
    }

    //Funktion um alle movableObjects(mo) zur Karte zu adden
    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y,  mo.width, mo.height);
    }
    
}