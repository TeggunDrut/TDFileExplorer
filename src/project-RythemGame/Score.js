class Score {
    constructor(score) {
        this.score = score;
        this.c = "white";
        switch (score) {
            case 300:
                this.c = "lightgreen";
                break;
            case 200:
                this.c = "#ffff00";
                break;
            case 100:
                this.c = "#ff7f00";
                break;
            case 0:
                this.c = "red";
                break;
        }

        this.y = 0;
    }
    update() {
        this.draw();
        this.y += 1;
    }
    draw() {
        ctx.fillStyle = this.c;
        ctx.font = "50px Arial";
        ctx.fillText("+" + this.score, centerX + 500 - 20, centerY - this.y);
    }
}
