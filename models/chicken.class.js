class Chicken extends MovableObject{
    y = 350;
    height = 100;
    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    
    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500; //spawnen zufällig in einer range von 200px bis 700px
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 0 % 6 => 0, rest 6 0 % 6 => 0, rest 6 / 3 % 6 => 0, rest 3 / 6 % 6 => 1, rest 0 / 7 % 6 => 1, rest 1
            //i = 0,1,2,3,4,5,0,1,2,3,4,5
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;//
        }, 200);
    }
}