class Container {
    constructor(bpm, keys, song, autoPlay = true) {
        this.bpm = bpm;
        // {2: [0, 'red']} = exmaple of a key
        let copy = JSON.parse(JSON.stringify(keys));
        this.okeys = copy;
        this.keyObj = keys;

        this.time = 0;
        this.keys = [];

        this.perfectLength = 10;
        this.greatLength = 20;
        this.goodLength = 40;

        this.score = 0;
        this.accuracy = 100.0;

        this.perfect = 300;
        this.great = 200;
        this.good = 100;
        this.miss = 0;

        this.keysHit = 0;
        this.keysHitPerfect = 0;
        this.keysHitGreat = 0;
        this.keysHitGood = 0;
        this.keysMissed = 0;

        this.combo = 0;

        this.running = false;
        this.totalKeys = 0;
        this.finished = false;

        this.popupTimers = [];

        this.autoPlay = autoPlay;

        this.lastFrameTimeStamp = Date.now();
        this.interval = 60 / this.bpm;
        this.elapsedTime = 0;

        this.gameLoop = this.gameLoop.bind(this);

        this.currentSong = song;
    }
    start() {
        this.currentSong.play();
        this.running = true;
    }
    pause() {
        this.running = false;
    }
    setSong(song) {
        this.currentSong = song;
    }
    gameLoop() {
        let timeSinceLastFrame = Date.now() - this.lastFrameTimeStamp;
        let deltaTime = timeSinceLastFrame / 1000; // convert to seconds

        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.interval) {
            console.log("update");
            // Perform the update based on the interval
            for (let time of this.keyObj) {
                if (this.time >= time[0]) {
                    this.createKey(time[1]);
                    delete time[1];
                }
            }
            // Reset the elapsed time
            this.elapsedTime = 0;
        }

        // Render the game

        this.lastFrameTimeStamp = Date.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    draw() {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.strokeRect(centerX - 250, 0, 500, height);
        ctx.stroke();

        // left line
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(centerX - 125, 0);
        ctx.lineTo(centerX - 125, height);
        ctx.stroke();

        // right line
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(centerX + 125, 0);
        ctx.lineTo(centerX + 125, height);
        ctx.stroke();

        // middle line
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();

        // bottom line
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(centerX - 250, height - 200);
        ctx.lineTo(centerX + 250, height - 200);
        ctx.stroke();

        // // perfect line
        // ctx.strokeStyle = "green";
        // ctx.beginPath();
        // ctx.moveTo(centerX - 250, height - 200 - this.perfectLength);
        // ctx.lineTo(centerX + 250, height - 200 - this.perfectLength);
        // ctx.stroke();

        // // great line
        // ctx.strokeStyle = "yellow";
        // ctx.beginPath();
        // ctx.moveTo(centerX - 250, height - 200 - this.greatLength);
        // ctx.lineTo(centerX + 250, height - 200 - this.greatLength);
        // ctx.stroke();

        // // good line
        // ctx.strokeStyle = "red";
        // ctx.beginPath();
        // ctx.moveTo(centerX - 250, height - 200 - this.goodLength);
        // ctx.lineTo(centerX + 250, height - 200 - this.goodLength);
        // ctx.stroke();

        this.displayScore();
    }  
    update() {
        for (let i = 0; i < this.keys.length; i++) {
            this.keys[i].draw();
            if (this.keys[i].y >= height) {
                this.keysMissed += 1;
                this.combo = 0;
                this.keys.splice(i, 1);
                this.totalKeys++;
            }
        }
        if (this.running) {
            // update time based on bpm
            this.time += 1 / 60;

            // update keys and delete if off screen
            for (let i = 0; i < this.keys.length; i++) {
                // change y value based on bpm
                this.keys[i].y += (this.bpm / 60) * 2;
            }

            for (let i = 0; i < this.keyObj.length; i++) {
                let time = this.keyObj[i];
                if (this.time >= time[0]) {
                    this.createKey(time[1]);
                    this.keyObj.splice(i, 1);
                }
            }

            // update popup timers
            for (let i = 0; i < this.popupTimers.length; i++) {
                this.popupTimers[i].update();
                if (this.popupTimers[i].time >= this.popupTimers[i].seconds) {
                    this.popupTimers.splice(i, 1);
                }
            }

            let totalHits =
                this.keysHitPerfect +
                this.keysHitGreat +
                this.keysHitGood +
                this.keysMissed;

            this.accuracy =
                (this.keysHitPerfect * 100 +
                    this.keysHitGreat * 80 +
                    this.keysHitGood * 65) /
                (totalHits * 100);

            this.accuracy = Math.round(this.accuracy * 100);

            if (!(this.accuracy >= 0 && this.accuracy <= 100)) {
                this.accuracy = 100;
            }
        }

        if (this.totalKeys === this.okeys.length) {
            this.finished = true;
        }
        if (this.autoPlay)
            this.keys.forEach((key) => {
                if (key.y >= height - 200) {
                    switch (key.col) {
                        case 0:
                            this.click("f");
                            break;
                        case 1:
                            this.click("g");
                            break;
                        case 2:
                            this.click("h");
                            break;
                        case 3:
                            this.click("j");
                            break;
                    }
                }
            });
    }
    createKey(col, color) {
        let key = new Key(col, color);
        this.keys.push(key);
    }
    restart() {
        this.time = 0;
        this.keys = [];
        this.keyObj = this.okeys;
    }
    displayScore() {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(`Score: ${this.score}`, centerX - 500 - 20, 40);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(`Accuracy: ${this.accuracy}%`, centerX - 500 - 20, 80);

        ctx.fillStyle = "lightgreen";
        ctx.font = "30px Arial";
        ctx.fillText(
            `Perfect: ${this.keysHitPerfect}`,
            centerX - 500 - 20,
            160
        );

        ctx.fillStyle = "#ffff00";
        ctx.font = "30px Arial";
        ctx.fillText(`Great: ${this.keysHitGreat}`, centerX - 500 - 20, 200);

        ctx.fillStyle = "#ff7f00";
        ctx.font = "30px Arial";
        ctx.fillText(`Good: ${this.keysHitGood}`, centerX - 500 - 20, 240);

        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText(`Missed: ${this.keysMissed}`, centerX - 500 - 20, 280);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(`Combo: ${this.combo}`, centerX - 500 - 20, 360);
    }
    popup(score) {
        let popupTimer = new Timer(1);
        let s = new Score(score);
        popupTimer.update = () => {
            s.update();
        };
        popupTimer.onend = () => {
            this.popupTimers.splice(this.popupTimers.indexOf(popupTimer), 1);
        };
        this.popupTimers.push(popupTimer);
    }
    check(col) {
        let key = this.keys.find((key) => key.col === col);
        if (key) {
            if (
                key.y >= height - 200 - this.perfectLength &&
                key.y <= height - 200 + this.perfectLength
            ) {
                this.score += this.perfect;
                this.popup(this.perfect);
                this.keysHitPerfect += 1;
                this.combo += 1;
                this.totalKeys++;
            } else if (
                key.y >= height - 200 - this.greatLength &&
                key.y <= height - 200 + this.greatLength
            ) {
                console.log("great");
                this.score += this.great;
                this.popup(this.great);
                this.keysHitGreat += 1;
                this.combo += 1;
                this.totalKeys++;
            } else if (
                key.y >= height - 200 - this.goodLength &&
                key.y <= height - 200 + this.goodLength
            ) {
                console.log("good");
                this.score += this.good;
                this.popup(this.good);
                this.keysHitGood += 1;
                this.combo += 1;
                this.totalKeys++;
            } else {
                console.log("miss");
                this.keysMissed += 1;
                this.combo = 0;
                this.popup(this.miss);
                this.totalKeys++;
            }
            this.keys.splice(this.keys.indexOf(key), 1);
        }
    }
    click(key) {
        // key is the keyboard key
        if (key === "r") {
            this.restart();
        }

        if (key === "f") {
            // left most column
            this.check(0);
        }
        if (key === "g") {
            // middle left column
            this.check(1);
        }
        if (key === "h") {
            // middle right column
            this.check(2);
        }
        if (key === "j") {
            // right most column
            this.check(3);
        }

        if (key === "Escape") {
            this.running = !this.running;
        }
    }
}
