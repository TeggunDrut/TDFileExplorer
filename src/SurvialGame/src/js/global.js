let canvas, ctx;
let keyState = {};
document.addEventListener("keydown", (e) => {
  keyState[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keyState[e.key] = false;
});
let worldObjects = [];

let player = {
  x: 0,
  y: 0,
  w: 50,
  h: 50,
  xVel: 0,
  yVel: 0,
  speed: 5,
  canMoveRight: true,
  canMoveLeft: true,
  canMoveUp: true,
  canMoveDown: true,
  color: "rgb(80, 80, 80)",
  heldItem: null,
  facing: "up",
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    switch (this.facing) {
      case "right":
        ctx.fillRect(
          this.x + this.w,
          this.y + this.h / 4,
          this.w / 2,
          this.h / 2
        );
        break;
      case "left":
        ctx.fillRect(
          this.x - this.w / 2,
          this.y + this.h / 4,
          this.w / 2,
          this.h / 2
        );
        break;
      case "up":
        ctx.fillRect(
          this.x + this.w / 4,
          this.y - this.h / 2,
          this.w / 2,
          this.h / 2
        );
        break;
      case "down":
        ctx.fillRect(
          this.x + this.w / 4,
          this.y + this.h,
          this.w / 2,
          this.h / 2
        );
        break;
    }

    if (this.heldItem != null) {
      this.heldItem.draw();
    }
  },
  collision: function () {
    let colliding = false;
    let onLeftRight = false;
    let onTopBottom = false;
  
    worldObjects.forEach((wo) => {
      let wx = wo.x;
      let wy = wo.y;
      let ww = wo.w;
      let wh = wo.h;

      if (this.x < wx + ww &&
        this.x > wx &&
        this.y < wy + wh &&
        this.y + this.h > wy &&
        onTopBottom == false) {
        onSides = true;
      }
      if (this.x + this.w > wx &&
        this.x < wx &&
        this.y < wy + wh &&
        this.y + this.h > wy &&
        onTopBottom == false) {
        onSides = true;
      }
      // if (this.y > wy + wh) {
      //   onSides = false;
      //   onTopBottom = true;
      //   // if(this.y < wy + wh)
      // }

    });
  },
  update: function () {
    this.collision();
    if (keyState.ArrowLeft) {
      this.facing = "left";
    } else if (keyState.ArrowRight) {
      this.facing = "right";
    } else if (keyState.ArrowUp) {
      this.facing = "up";
    } else if (keyState.ArrowDown) {
      this.facing = "down";
    }

    if (keyState.a && this.canMoveLeft) {
      this.xVel = -this.speed;
    } else if (keyState.d && this.canMoveRight) {
      this.xVel = this.speed;
    } else {
      this.xVel = 0;
    }
    if (keyState.w && this.canMoveUp) {
      this.yVel = -this.speed;
    } else if (keyState.s && this.canMoveDown) {
      this.yVel = this.speed;
    } else {
      this.yVel = 0;
    }
    this.x += this.xVel;
    this.y += this.yVel;
  },
};

class Wall {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  draw() {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
