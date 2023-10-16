const player = {
  position: { x: width / 2, y: height / 2 },
  velocity: { x: 0, y: 0 },
  width: SIZEX,
  height: SIZEY,
  maxSpeed: 3,
  acceleration: 2,
  friction: 0.5,
  sprite: new Sprite("sprites/template-16x16.png", 32, 32),
  update: function () {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    if (keys["w"]) {
      this.velocity.y -= this.acceleration;
    }
    if (keys["s"]) {
      this.velocity.y += this.acceleration;
    }
    if (keys["a"]) {
      this.velocity.x -= this.acceleration;
    }
    if (keys["d"]) {
      this.velocity.x += this.acceleration;
    }
    if (this.velocity.x > this.maxSpeed) {
      this.velocity.x = this.maxSpeed;
    } else if (this.velocity.x < -this.maxSpeed) {
      this.velocity.x = -this.maxSpeed;
    }
    if (this.velocity.y > this.maxSpeed) {
      this.velocity.y = this.maxSpeed;
    } else if (this.velocity.y < -this.maxSpeed) {
      this.velocity.y = -this.maxSpeed;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  },
  draw: function () {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    // ctx.drawImage(this.sprite.img, this.position.x, this.position.y, SIZEX, SIZEY)
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  },
};
