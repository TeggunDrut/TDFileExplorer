function setup() {
  createCanvas(550, 550);
}
let rez = 5;
function draw() {
  background(0);

  // draw the terrain
  for (let x = 0; x < width; x += rez) {
    for (let y = 0; y < height; y += rez) {
      let val = noise(x / 100, y / 100);
      fill(val * 255);
      rect(x, y, rez, rez);
    }
  }
}