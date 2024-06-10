class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 300;
    height = 150;
    width = 100;

    //loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('image')
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

    }
    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();            
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


}