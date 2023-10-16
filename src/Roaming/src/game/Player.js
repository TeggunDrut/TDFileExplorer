let looper = 0;
let animation = false;
let progress = 0;

let assaultRifle = {
  name: "assault rifle",
  currentAmmo: 30,
  maxAmmo: 30,
  rpm: 500,
  damage: 24,
  reloadTime: 2,
};
let pistol = {
  name: "pistol",
  currentAmmo: 7,
  maxAmmo: 7,
  rpm: 4000,
  damage: 39,
  reloadTime: 1,
};
let player = {
  x: game.width / 2 - 35 / 2,
  y: game.height / 2 - 35 / 2,
  speed: 2,
  xVel: 1,
  yVel: 1,
  w: 35,
  h: 35,
  health: 100,
  heldGun: assaultRifle,
  primaryGun: assaultRifle,
  secondaryGun: pistol,
  upgrades: [],
  bulletSpeed: 7,
  maxShots: 0,
  rpm: 0,
  reloading: false,
  killCount: 0,
  shoot: function (mouseX, mouseY) {
    
    let bullet = new Bullet(
      this,
      this.x + this.w / 2,
      this.y + this.h / 2,
      2,
      mouseX,
      mouseY
    );
    var x = mouseX - this.x - this.w / 2;
    var y = mouseY - this.y - this.h / 2;
    var l = Math.sqrt(x * x + y * y);
    x = x / l;
    y = y / l;

    // Reset bullet position
    bullet.x = this.x + this.w / 2;
    bullet.y = this.y + this.h / 2;

    // Get the bullet to travel towards the mouse pos with a new speed of 10.0 (you can change this)
    bullet.velX = x * this.bulletSpeed;
    bullet.velY = y * this.bulletSpeed;
    // this.upgrades.forEach(u => {
    //   if (u.name == "Multi-Shot") {
    //     let bullet2 = new Bullet(
    //       this,
    //       this.x + this.w / 2 + 1,
    //       this.y + this.h / 2 + 1,
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
  },
  update: function () {
    if (this.health <= 0) {
      this.health = 1;
      gameOpen = false;
      gameLoop = 0;
      gameOver();
    }

    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > width) {
      this.x = width - this.w;
    }
    if (this.y < 1) {
      this.y = 0;
    } else if (this.y + this.h > height) {
      this.y = height - this.h;
    }

    WorldObjects.forEach((o) => {

      if (this.x <= o.x + o.w && this.x >= o.x - this.w && this.y + this.h >= o.y && this.y < o.y && this.y < o.y) {
        this.y = o.y - this.h;
      }
      if (this.x <= o.x + o.w && this.x >= o.x - this.w && this.y <= o.y + o.h && this.y > o.y && this.y+ this.h > o.y + o.h) {
        this.y = o.y + o.h;
      }
    
      if (this.y <= o.y + o.h && this.y >= o.y && this.x + this.w >= o.x && this.x < o.x) {
        this.x = o.x - this.w;
      }
      if (this.y <= o.y + o.h && this.y >= o.y && this.x <= o.x + o.w && this.x + this.w > o.x + o.w) {
        this.x = o.x + o.w;
      }
      
    });

    if (keyState.d) {
      this.x += this.speed;
    }
    if (keyState.a) {
      this.x -= this.speed;
    }
    if (keyState.w) {
      this.y -= this.speed;
    } else if (keyState.s) {
      this.y += this.speed;
    }

    bullets.forEach((b) => {
      b.loop();
    });
    if (
      keyState.r == true &&
      player.heldGun.currentAmmo < this.heldGun.maxAmmo
    ) {
      if (this.heldGun.currentAmmo == this.heldGun.maxAmmo) {
      } else {
        if (progress == 0) {
          keyState.r = false;
          this.reloading = true;
          looper = 0;
          progress = 0;
        }
      }
    }

    if (animation) {
      looper++;
      progress++;
      ctx.fillStyle = "red";
      ctx.fillRect(game.width / 2 - 50, game.height - 130, progress * 1.5, 20);
    }
    if (this.reloading) {
      animation = true;
      if (looper > player.heldGun.reloadTime * 100) {
        animation = false;
        this.reloading = false;
        this.heldGun.currentAmmo = this.heldGun.maxAmmo;
        progress = 0;
      }
    } else {
      animation = false;
    }

    drawUI();
  },
};
player.upgrades.push(new Upgrade("Multi-Shot"))