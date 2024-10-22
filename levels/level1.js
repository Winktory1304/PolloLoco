let level1;
function initLevel1() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            // new Endboss()
        ],
        [
            new Clouds()
        ],
        [
            new Coins(10, 100),
            new Coins(250, 325),
            new Coins(350, 300),
            new Coins(500, 100),
            new Coins(650, 200),
            new Coins(800, 150),
            new Coins(950, 250),
            new Coins(1100, 350),
            new Coins(1250, 200),
            new Coins(1300, 300)
            
        ],
        [
            new Bottles(250, 120),
            new Bottles(400, 120),
            new Bottles(700, 120),
            new Bottles(1000, 120),
            new Bottles(1250, 120),
            new Bottles(300, 220),
            new Bottles(450, 220),
            new Bottles(750, 220),
            new Bottles(1050, 220),
            new Bottles(1300, 220)

        ],
        [
            new BackgroundObject("img/5_background/layers/air.png", -719),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

            new BackgroundObject("img/5_background/layers/air.png", 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/air.png", 719),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

            new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),

        ]
    )
}
