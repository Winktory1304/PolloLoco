class Coins extends MovableObject {

    height = 150;
    width = 150;

    IMAGES_COINS = [
        'img/8_coin/coin_1.png'
    ];
    offset = {
        left: 30,
        right: 30,
        top: 30,
        bottom: 30
    };

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_COINS);
        this.animate();
    }
    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }

}