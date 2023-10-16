let cam;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  cam = createCamera();
}
let rez = 10;
let num = 1000;
let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;

let colored = true;

function draw() {
  background(0);
  // cam.camera(250, 250, 500);
  // terain generation in 3d
  translate(-maxWidth / 2, -maxHeight / 2, -num);
  rotateX(radians(45));
  for (let x = 0; x < maxWidth; x += rez) {
    for (let y = 0; y < maxHeight; y += rez) {
      let val = noise(x / 150, y / 150);
      if (colored) {
        colorMode(HSB, 100);
        fill(val * 100, 50, 100);
      } else {
        fill(val * 255);
      }
      push();
      translate(x, y, val * 100);
      box(rez);
      pop();
    }
  }
}