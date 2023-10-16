class Upgrade {
  constructor(name) {
    this.name = name;
  }
}
class Ability {
  constructor(name, x, y, w, h, c) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
}
class Bullet {
  constructor(sender, x, y, speed, mouseX, mouseY) {
    this.sender = sender;
    this.x = x;
    this.y = y;
    this.w = 2;
    this.h = 2;
    this.velX = 0;
    this.velY = 0;
    this.size = 4;
    this.speed = speed;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }
  destroy() {
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].x == this.x) {
        bullets.splice(i, 1);
      }
    }
  }
  loop() {

    this.x += this.velX;
    this.y += this.velY;

    enemyList.forEach((e) => {
      if (getRectanglesCollided(this, e)
      ) {
        e.currentHealth -= player.heldGun.damage;
        if (e.currentHealth <= 0) {
          this.sender.killCount++;
          player.health += 5;
        }
          
        this.destroy();
      }
    });

    if (
      this.x + this.size < 0.0 ||
      this.x - this.size > game.width ||
      this.y + this.size < 0.0 ||
      this.y - this.size > game.height
    ) {
      this.destroy();
    }
    WorldObjects.forEach(o => {
      if (getRectanglesCollided(this, o)) {
        this.destroy();
      }
    })
    

    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

class Entity {
  Entity(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
class Enemy extends Entity {
  constructor(
    x,
    y,
    w,
    h,
    color,
    viewDistance,
    drawViewDistance,
    maxSpeed,
    maxHealth
  ) {
    super(
      x,
      y,
      w,
      h,
      color,
      viewDistance,
      drawViewDistance,
      maxSpeed,
      maxHealth
    );
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.viewDistance = viewDistance;
    this.drawViewDistance = drawViewDistance;
    this.maxSpeed = maxSpeed;
    this.maxHealth = maxHealth;

    this.currentHealth = this.maxHealth;
    this.attackDmg = 10;
    this.attackSpeed = 1500;
  }
  destroy() {
    let r = Math.floor(Math.random() * 10);
    let abil = abilities[Math.floor(Math.random() * abilities.length)];
    // if (r == 3) {
    //   let a = new Ability(abil.name, this.x + this.width / 3, this.y + this.height / 3, 30, 30, abil.color)
    //   abilitiesOnGround.push(a);
    // }
    
    for (let i = 0; i < enemyList.length; i++) {
      if (enemyList[i].x == this.x) {
        enemyList.splice(i, 1);
        enemyList.push(new Enemy(60 + (Math.random() * game.width - 60), 60 + (Math.random() * game.height - 60), 60, 60, "blue", 200, false, 1, 100))
      }
    }
  }
  draw() {
    // if (this.drawViewDistance) {
    //   ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
    //   ctx.lineWidth = 2;
    //   ctx.strokeRect(this.x - this.viewDistance, this.y - this.viewDistance, this.viewDistance * 2, this.viewDistance * 2);
    //   // console.log(this.x - this.radius, this.y - this.radius, this.radius + this.radius, this.radius + this.radius);
    // }

    // ctx.beginPath();
    ctx.fillStyle = this.color;
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();

    if (!(this.health <= 0)) {
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.x - this.w + 25,
        this.y - this.h + 25,
        this.w * 2 + 25 / 2,
        25
      );
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.x - this.w + 25,
        this.y - this.h + 25,
        this.w * 2 + 25 / 2 - (this.maxHealth - this.currentHealth),
        25
      );
    } else {
      enemyList.shift(enemyList.indexOf(this));
    }
  }
  targetPlayer() {
    if (
      player.x + player.w >= this.x - this.w - this.viewDistance &&
      player.x <= this.x + this.w + this.viewDistance &&
      player.y + player.h >= this.y - this.h - this.viewDistance &&
      player.y <= this.y + this.h + this.viewDistance
    ) {
      if (player.x + player.w <= this.x) {
        this.x -= this.maxSpeed;
      } else if (player.x > this.x) {
        this.x += this.maxSpeed;
      }
      if (player.y + player.h <= this.y) {
        this.y -= this.maxSpeed;
      } else if (player.y > this.y) {
        this.y += this.maxSpeed;
      }
    }

    if (this.x <= player.x + player.w && player.x >= player.x && this.y <= player.y + player.h && this.y >= player.y) {
      player.health -= 0.1;
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
    
    if (this.drawViewDistance) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.arc(
        this.x + this.radius + this.viewDistance,
        this.y - this.radius - this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.arc(
        this.x - this.radius - this.viewDistance,
        this.y - this.radius - this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.arc(
        this.x - this.radius - this.viewDistance,
        this.y + this.radius + this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.arc(
        this.x + this.radius + this.viewDistance,
        this.y + this.radius + this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.arc(
        this.x + this.radius + this.viewDistance,
        this.y - this.radius - this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }
  update() {
    
    if (this.currentHealth <= 0) {
      this.destroy();
    }
    this.draw();
    this.targetPlayer();
  }
}

