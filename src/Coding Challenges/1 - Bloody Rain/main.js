class Rain {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.width = random(1, 3);
    this.height = random(3, 5);
    this.speed = speed;
    this.color = "red";
  }
  draw() {
    fill(this.color);
    stroke(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
  update() {
    if(this.speed > 3) {
      this.width = random(3, 3);
      this.height = random(10, 10);
    }
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(0, width);
    }
  }
}
let rain = [];
for (let i = 0; i < 200; i++) {
  rain.push(new Rain(random(0, width), 0, random(3, 12)));
}

setup = () => {
  createCanvas(300, 300);
  background("#000");
};
setup();
draw = () => {
  background("#000");
  stroke("white");
  ellipse(mouseX - 5, mouseY - 5, 10, 10);
  rain.forEach((r) => {
    r.draw();
    r.update();
  });
  requestAnimationFrame(draw);
};
draw();
