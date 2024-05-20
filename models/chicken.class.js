class Chicken extends MovableObject{
    y = 350;
    height = 100;
    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500; //spawnen zufällig in einer range von 200px bis 700px
    }
}