class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;

    applyGravity(){
        setInterval(() =>{
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;                
            }
        },1000 / 25)
    }
    hit(){
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy =0;            
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead(){
        return this.energy == 0;
    }

    isAboveGround(){
        return this.y < 160;
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
        return  this.x + this.width > obj.x && 
                this.y + this.height > obj.y &&
                this.x < obj.x && this.y + obj.height;
    
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

