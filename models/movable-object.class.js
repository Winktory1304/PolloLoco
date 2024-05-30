class MovableObject {
    x = 120;
    y = 300;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    //loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('image')
        this.img.src = path;
    }
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right')
    }
    moveLeft() {       
            setInterval(()=>{
                this.x -= this.speed;
            }, 1000 / 60);
        
    }
}