class Item {
  constructor(options) {
    for (const key in options) {
      this[key] = options[key];
    }
    this.defaults = {
      path: "sprites/Template-16x16.png",
      x: 0,
      y: 0,
      vx: 1,
      vy: 1,
      friction: 0.9,
      parent: null,
      checkTime: 20,
    };
    for (const key in this.defaults) {
      if (this[key] === undefined) {
        this[key] = this.defaults[key];
      }
    }
    this.img = new Image();
    this.img.src = this.path;

    this.relativeX = this.x - this.parent.x;
    this.relativeY = this.y - this.parent.y;

    this.ticks = 0;

    this.realX = this.parent.x * SIZEX;
    this.realY = this.parent.y * SIZEY;

    this.visited = [];

    this.closest = this.getClosest();
  }
  getClosest() {
    let closest = null;
    let closestDistance = Infinity;
    for (let i = 0; i < machines.length; i++) {
      let distance = Math.sqrt(
        (this.x - machines[i].x) ** 2 + (this.y - machines[i].y) ** 2
      );
      if (
        distance < closestDistance &&
        distance < 100 &&
        machines[i] !== this.parent &&
        machines[i] instanceof Conveyor &&
        !this.visited.includes(machines[i])
      ) {
        closest = machines[i];
        closestDistance = distance;
        console.log(closest);
      }
    }
    return closest;
  }
  move(dir) {
    let speedX = SIZEX - SIZEX * 0.9;
    let speedY = SIZEY - SIZEY * 0.9;
    this.moving = true;
    switch (dir) {
      case "up":
        this.vy -= speedY;
        break;
      case "down":
        this.vy += speedY;
        break;
      case "left":
        this.vx -= speedX;
        break;
      case "right":
        this.vx += speedX;
        break;
    }
  }
  draw() {
    ctx.drawImage(
      this.img,
      this.relativeX + this.parent.x * SIZEX,
      this.relativeY + this.parent.y * SIZEY,
      SIZEX,
      SIZEY
    );
  }
  update() {
    if (this.vx <= 0.1 && this.vx >= -0.1) this.vx = 0;
    if (this.vy <= 0.1 && this.vy >= -0.1) this.vy = 0;

    if (this.vx === 0 && this.vy === 0) this.moving = false;

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.relativeX = this.x - this.parent.x;
    this.relativeY = this.y - this.parent.y;

    if (this.ticks >= this.checkTime) {
      if (this.closest !== undefined) {
        let distance = Math.sqrt(
          (this.realX +
            this.relativeX +
            SIZEX / 2 -
            this.closest.realX +
            SIZEX / 2) **
            2 +
            (this.realY +
              this.relativeY +
              SIZEY / 2 -
              this.closest.realY +
              SIZEY / 2) **
              2
        );
        if (distance <= this.closest.radius) {
          let dif1 = this.closest.x - this.x;
          let dif2 = this.closest.y - this.y + SIZEY;

          this.x += dif1 / 10;
          this.y += dif2 / 10;
          this.moving = true;
        }
      }
    }

    if (
      this.moving &&
      this.ticks >= this.checkTime * 3 &&
      this.closest !== undefined
    ) {
      this.moving = false;
      this.visited.push(this.closest);
      this.closest.items.push(this);
      this.closest = undefined;
    }
    this.ticks++;
  }
}
