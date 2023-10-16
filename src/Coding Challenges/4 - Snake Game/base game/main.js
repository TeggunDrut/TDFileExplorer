let snake;
let scl = 20;
let apples = [];
function setup() {
  createCanvas(800, 800);
  snake = new Snake();
}
function draw() {
  background(0);
  // snake game
  snake.update();
  snake.show();

  apples.forEach(apple => {
    if (snake.x == apple.x && snake.y == apple.y) {
      snake.total++;
      apples.splice(apples.indexOf(apple), 1);
      snake.spawnApple();
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

  frameRate(20);
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
    fill(255);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
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
    apple.x = floor(random(0, width / scl)) * scl;
    apple.y = floor(random(0, height / scl)) * scl;
    apples.push(apple);
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
    fill(255, 0, 100);
    rect(this.x, this.y, scl, scl);
  }

}