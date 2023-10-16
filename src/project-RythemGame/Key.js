class Key {
    constructor(col, color) {
        this.col = col;
        this.color = blue;

        this.y = -200;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(centerX - 250 + (this.col * 125), this.y, 125, 200);
    }
}