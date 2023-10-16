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

    // enemyList.forEach((e) => {
    //   if (getRectanglesCollided(this, e)
    //   ) {
    //     e.currentHealth -= player.heldGun.damage;
    //     if (e.currentHealth <= 0) {
    //       this.sender.killCount++;
    //       player.health += 5;
    //     }
          
    //     this.destroy();
    //   }
    // });

    if (
      this.x + this.size < 0.0 ||
      this.x - this.size > canvas.width ||
      this.y + this.size < 0.0 ||
      this.y - this.size > canvas.height
    ) {
      this.destroy();
    }
    currentMap.objects.forEach(o => {
      if(o.name == "box")
        if (this.x < currentMap.x + o.x + o.w && this.x > currentMap.x + o.x && this.y < currentMap.y + o.y + o.h && this.y > currentMap.y + o.y || this.x < currentMap.x || this.x + this.w > currentMap.x + currentMap.width || this.y < currentMap.y || this.y + this.h > currentMap.y + currentMap.height) {
          this.destroy();
      }
    })
    // WorldObjects.forEach(o => {
    //   if (getRectanglesCollided(this, o)) {
    //     this.destroy();
    //   }
    // })

    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}