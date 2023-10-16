let snake;
let scl = 100;
let apples = [];
function setup() {
  createCanvas(800, 800);
  snake = new Snake();

  // fill every grid spot with an apple
  for (let i = 0; i < width / scl; i += 1) {
    for (let j = 0; j < height / scl; j += 1) {
      let a = new Apple();
      a.x = i * scl;
      a.y = j * scl;
      // if (a.x == 0 * scl) {
      apples.push(a);
      // console.log(1);
      // }
    }
  }
}
function draw() {
  background(0);
  // snake game
  snake.update();
  snake.show();

  apples.forEach((apple) => {
    // move snake towards the apple
    if (snake.x == apple.x) snake.xspeed = 0;
    if (snake.y == apple.y) snake.yspeed = 0;

    if (snake.x < apple.x) {
      snake.xspeed = 1;
      snake.yspeed = 0;
    } else if (snake.x > apple.x) {
      snake.xspeed = -1;
      snake.yspeed = 0;
    }
    if (snake.y < apple.y) {
      snake.yspeed = 1;
      snake.xspeed = 0;
    } else if (snake.y > apple.y) {
      snake.yspeed = -1;
      snake.xspeed = 0;
    }

    if (snake.x == apple.x && snake.y == apple.y) {
      apples.splice(apples.indexOf(apple), 1);
      snake.spawnApple();
      snake.total += 1;
    }
    apple.show();
  });

  // if (snake.death()) {
  //   snake.total = 0;
  // }
  // spawn apple
  if (snake.total === 0 && apples.length === 0) {
    snake.spawnApple();
  }
}
// p5 js
class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
  }
  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }
  show() {
    let a = 0;
    for (let i = 0; i < this.tail.length; i++) {
      colorMode(HSB, 100);
      // make each tail segment a different color
      // if it is greater than 100 reset the color to 0
      if (i * 2 > 100 + a) {
        a += 100;
      }
      fill(i * 2 - a, 100, 100);
      // rect(this.tail[i].x, this.tail[i].y, scl, scl);
      // draw a line between each tail segment
      // weight
      stroke(i * 2 - a, 100, 100);
      strokeWeight(10);
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    strokeWeight(1);
    rect(this.x, this.y, scl, scl);
  }
  eat() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.tail[i].x === this.x && this.tail[i].y === this.y) {
        return true;
      }
    }
    return false;
  }
  death() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      return true;
    }
    for (let i = 0; i < this.tail.length; i++) {
      if (this.tail[i].x === this.x && this.tail[i].y === this.y) {
        return true;
      }
    }
    return false;
  }
  spawnApple() {
    let apple = new Apple();
    // align applex with grid
    // apple cannot land on top of the snake's tail

    snake.tail.forEach((tail) => {
      if (apple.x == tail.x && apple.y == tail.y) {
        apple.x = floor(random(0, width / scl)) * scl;
        apple.y = floor(random(0, height / scl)) * scl;
      }
    });
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.xspeed = 0;
    snake.yspeed = -1;
  } else if (keyCode === DOWN_ARROW) {
    snake.xspeed = 0;
    snake.yspeed = 1;
  } else if (keyCode === RIGHT_ARROW) {
    snake.xspeed = 1;
    snake.yspeed = 0;
  } else if (keyCode === LEFT_ARROW) {
    snake.xspeed = -1;
    snake.yspeed = 0;
  }
}
class Apple {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  show() {
    colorMode(RGB, 100);
    fill(255, 0, 100);
    rect(this.x, this.y, scl, scl);
  }
}
