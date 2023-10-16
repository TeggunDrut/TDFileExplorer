const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = 400);
const height = (canvas.height = 400);

const mouse = {};

const sandSize = 10;

function findSandAt(x, y) {
    for (let i = 0; i < sandArr.length; i++) {
        if (sandArr[i].x === x && sandArr[i].y === y) {
            return true;
        }
    }
    return false;
}

class Sand {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * sandSize, this.y * sandSize, sandSize, sandSize);
    }
    getPos() {
        return { x: this.x, y: this.y };
    }
    update() {
        // Check if the sand is at the bottom of the screen
        if (this.y > 399/sandSize - 1) {
            return;
        } else {
            // Check if there is sand below
            if (!findSandAt(this.x, this.y + 1)) {
                this.y++;
                return;
            }
            // Check if there is sand below and to the left
            if (!findSandAt(this.x - 1, this.y + 1) && this.x > 0) {
                this.x--;
                this.y++;
                return;
            }
            // Check if there is sand below and to the right
            if (!findSandAt(this.x + 1, this.y + 1) && this.x < 200) {
                this.x++;
                this.y++;
                return;
            }
        }
    }
}
let sandArr = [];

function init() {
    let s1 = new Sand(9, 50, "red");
    let s2 = new Sand(10, 50, "red");
    let s3 = new Sand(11, 50, "red");
    let s4 = new Sand(10, 4, "red");

    sandArr.push(s1, 
        s2, 
        // s3, 
        s4
        );
    render();
}

let count = 0;

function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, width, height);

    sandArr.forEach((s) => {
        s.draw();
    });

    if (count > 2) {
        sandArr.forEach((s) => {
            s.update();
        });
        count = 0;
    }

    count++;

    let radius = 1;
    if (mouse.down) {
        let x = Math.floor(mouse.x / sandSize);
        let y = Math.floor(mouse.y / sandSize);

        for (let i = -radius; i < radius; i++) {
            for (let j = -radius; j < radius; j++) {
                let s = new Sand(x, y, "red");
                sandArr.push(s);
            }
        }
    }
}

window.onload = init;
window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener("mousedown", (e) => {
    mouse.down = true;
});
window.addEventListener("mouseup", (e) => {
    mouse.down = false;
});
