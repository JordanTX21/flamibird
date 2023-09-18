class Utils {
    constructor() { }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    random(min, max) {
        return Math.random() * (max - min) + min;
    }
    checkCollision(r1, r2) {
        const factorx1 = 10
        const factory1 = 10
        const factory2 = 20
        if (r1.x + r1.width >= r2.x + factorx1 &&     // r1 right edge past r2 left
            r1.x <= r2.x + r2.width &&       // r1 left edge past r2 right
            r1.y + r1.height >= r2.y + factory1 &&       // r1 top edge past r2 bottom
            r1.y + factory2 <= r2.y + r2.height) {       // r1 bottom edge past r2 top
            return true;
        }
        return false;
    }
    checkXCollision(r1, r2) {
        if (r2.x + r2.width < r1.x && r2.x + r2.width + r2.speed >= r1.x) {
            return true;
        }
        return false;
    }
    loadImage(url) {
        return new Promise(r => { 
            let i = new Image();
            i.onload = (() => r(i));
            i.src = url;
        });
    }
}