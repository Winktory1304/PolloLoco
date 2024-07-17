class StatusBarBoss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 480;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentages(100);
        this.visible = false;  // Initial visibility set to false
    }

    setPercentages(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    draw(ctx) {
        if (this.visible) {
            super.draw(ctx);
        }
    }
}
