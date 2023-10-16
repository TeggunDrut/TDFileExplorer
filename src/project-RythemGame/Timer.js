class Timer {
    constructor(seconds) {
        this.seconds = seconds;
        this.time = 0;
        this.interval = setInterval(() => {
            this.time += 1 / 60;
            if(this.time >= this.seconds) {
                this.onend();
                clearInterval(this.interval);
            }
            this.update();

        }, 1);
    }
    update() {}
    onend() {}
}
