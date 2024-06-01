class Level{
    enemies;
    clouds;
    backgroundsObjects;
    level_end_x = 2200;


    constructor(enemies, clouds, backgroundsObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundsObjects = backgroundsObjects;
    }
}