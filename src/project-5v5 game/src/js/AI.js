class AIPlayer {
  constructor(x, y, radius, diff) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.diff = diff;
    this.id = Math.random() * 10000;
    this.viewDistance = 300;
    this.allowedMovement = { left: true, right: true, up: true, down: true };
    this.posBlocks = { left: false, right: false, top: false, down: false };
    this.allowFind = true;
    this.heldGun = assaultRifle;

    this.allowShoot = true;
  }
  loop() {
    ctx.beginPath();
    ctx.fillStyle = teams[1].color;
    ctx.strokeStyle = "black";
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0);
    ctx.fill();
    ctx.stroke();
  }
  destory() {
    for (let i = 0; i < Entities.length; i++) {
      if (Entities[i].id == this.id) {
        Entities.splice(i, 1);
      }
    }
  }
  findPlayer() {
    let dist = Math.sqrt(
      Math.pow(this.x - player.virtualX, 2) +
        Math.pow(this.y - player.virtualY, 2)
    );
    // console.log(player.virtualX - this.x + "    " + dist);
    // console.log(dist);
    let height = player.virtualY - this.y;
    let length = player.virtualX - this.x;
    let mid = (height * 2 + length * 2) / 2;

    // let leftPos = { x: this.x + dist / 2, y: this.y, w: 4, h: 4 };
    // let rightPos = { x: this.x - dist / 2, y: this.y, w: 4, h: 4 };

    // if (this.posBlocks.top) {
    //   if (this.posBlocks.left) {
    //     this.allowFind = false;
    //     this.x += 1;
    //   } else if (this.posBlocks.right) {
    //     this.x -= 1;
    //     this.allowFind = false;
    //   }
    // }

    if (dist <= this.viewDistance && this.allowFind) {
      if (this.x >= player.virtualX && this.allowedMovement.left) {
        this.x -= 1;
      } else if (this.x <= player.virtualX && this.allowedMovement.right) {
        this.x += 1;
      }
      if (this.y >= player.virtualY && this.allowedMovement.up) {
        this.y -= 1;
      } else if (this.y <= player.virtualY && this.allowedMovement.down) {
        this.y += 1;
      }
      currentMap.objects.forEach((o) => {
        if (o.name == "box") {
          if (
            this.x - this.radius < currentMap.x + o.x + o.w &&
            this.y > currentMap.y + o.y - this.radius &&
            this.y + this.radius < currentMap.y + o.y + o.h + this.radius * 2 &&
            this.x > currentMap.x + o.x + o.w
          ) {
            // left
            this.posBlocks.left = true;
            this.x = currentMap.x + o.x + o.w + this.radius;
          }
          if (
            this.x + this.radius > currentMap.x + o.x &&
            this.y > currentMap.y + o.y - this.radius &&
            this.y + this.radius < currentMap.y + o.y + o.h + this.radius * 2 &&
            this.x < currentMap.x + o.x
          ) {
            // right
            this.posBlocks.right = true;
            this.x = currentMap.x + o.x - this.radius;
          }
          if (
            this.y + this.radius > currentMap.y + o.y &&
            this.x > currentMap.x + o.x - this.radius &&
            this.x + this.radius < currentMap.x + o.x + o.w + this.radius * 2 &&
            this.y < currentMap.y + o.y
          ) {
            // top
            this.posBlocks.bottom = true;
            this.y = currentMap.y + o.y - this.radius;
          }
          if (
            this.y - this.radius < currentMap.y + o.y + o.h &&
            this.x > currentMap.x + o.x - this.radius &&
            this.x + this.radius < currentMap.x + o.x + o.w + this.radius * 2 &&
            this.y > currentMap.y + o.y + o.h
          ) {
            // bottom
            this.posBlocks.top = true;
            this.y = currentMap.y + o.y + o.h + this.radius;
          }
        }
      });
      // if (this.x + this.radius > currentMap.x + currentMap.width) {
      //   this.allowedMovement.right = false;
      //   this.x = currentMap.x + currentMap.width - this.radius;
      // } else if (this.x - this.radius < 0) {
      //   this.allowedMovement.left = false;
      // }
      // if (this.y + this.radius > currentMap.y + currentMap.height) {
      //   this.allowedMovement.down = false;
      // } else if (this.y - this.radius < 0) {
      //   this.allowedMovement.up = false;
      // }
      let points = [];
      // raytracing BABBBY
      ctx.strokeStyle = "red";
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(player.virtualX, player.virtualY);
      // ctx.fillRect(player.virtualX + mid, player.virtualY, 4, 4)
      // for (let k = -10; k < 2; k += .1) {
      //   points.push([this.x - dist / k, this.y, 4, 4])
      // ctx.fillRect(th is.x - dist / k, this.y, 4, 4)
      // ctx.fillRect(this.x + dist / k, this.y, 4, 4)
      // }
      // console.log(points[Math.ceil(points.length / 2)]);
      // let num = 1.1;
      // ctx.fillRect(points[Math.ceil(points.length / num)][0], points[Math.ceil(points.length / num)][1], points[Math.ceil(points.length / num)][2], points[Math.ceil(points.length / num)][3]);
      // // console.log(points[Math.ceil(points.length / num)]);
      // points = [];
      // ctx.stroke();/
    }
  }
  shoot() {
    let bullet = new Bullet(
      this,
      this.x,
      this.y,
      2,
      player.virtualX,
      player.virtualY
    );
    var x = player.virtualX - this.x;
    var y = player.virtualY - this.y;
    var l = Math.sqrt(x * x + y * y);
    x = x / l;
    y = y / l;


    // Reset bullet position
    bullet.x = this.x;
    bullet.y = this.y;

    // Get the bullet to travel towards the mouse pos with a new speed of 10.0 (you can change this)
    bullet.velX = x * this.heldGun.bulletSpeed;
    bullet.velY = y * this.heldGun.bulletSpeed;
    // this.upgrades.forEach(u => {
    //   if (u.name == "Multi-Shot") {
    //     let bullet2 = new Bullet(
    //       this,
    //       this.x + this.radius / 2 + 1,
    //       this.y + this.radius / 2 + 1,
    //       2,
    //       mouseX,
    //       mouseY
    //     );
    //     bullet2.velX = x * this.bulletSpeed;
    //     bullet2.velY = y * this.bulletSpeed;
    //     bullets.push(bullet2);
    //   }
    // })
    bullets.push(bullet);
  }
}
