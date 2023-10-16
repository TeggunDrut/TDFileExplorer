const bpm = 240;
const speedBasedOnBPM = 60000 / bpm;

let nums = [0, 1, 2, 3];

let keyArr = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0]
];

let audio = new Audio("pumped_up_kicks.m4a");  

let con = new Container(bpm, keyArr, audio, true);


let timer = new Timer(0.5);

function init() {
    render();
    // gameLoop();
}

function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, width, height);

    con.draw();
    con.update();
}
