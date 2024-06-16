class Level{
    enemies;
    clouds;
    coins;
    bottles;
    backgroundsObjects;
    level_end_x = 2200;


    constructor(enemies, clouds, coins, bottles, backgroundsObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundsObjects = backgroundsObjects;
    }
}