let player = {
  name: "Player " + Math.floor(Math.random() * 1000), 
  health: 100,
  team: teams[0],
  radius: 30,
  x: currentMap.x + 805,
  y: currentMap.y + 800,
  virtualX: canvas.width / 2,
  virtualY: canvas.height / 2,
  reloading: false,
  primaryGun: assaultRifle,
  secondaryGun: pistol,
  killCount: 0,
  heldGun: assaultRifle,
  reloading: false,
  shoot: function (mouseX, mouseY) {
    let bullet = new Bullet(
      this,
      this.virtualX,
      this.virtualY,
      2,
      mouseX,
      mouseY
    );
    var x = mouseX - this.virtualX;
    var y = mouseY - this.virtualY;
    var l = Math.sqrt(x * x + y * y);
    x = x / l;
    y = y / l;


    // Reset bullet position
    bullet.x = this.virtualX;
    bullet.y = this.virtualY;

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
  },
  takeHealth: function (health) {
    let yOff = 100;
    let loop = setInterval(() => {
      if (yOff != 150) {
        yOff++;
        ctx.font = "25px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("-" + health, 10, canvas.height - yOff);
        // Wctx.font = "23px Arial";
        ctx.fillText(
          "-" + health,
          player.virtualX - 10,
          player.virtualY + 50 - yOff
        );
      }
    }, 1);
    player.health -= health;
    setTimeout(() => {
      clearInterval(loop);
    }, 300);
  },
  update() {
    // health
    ctx.fillStyle = "rgb(220, 220, 220)";
    ctx.font = "45px Arial";
    if (this.radiusealth <= 10) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.fillText("+" + player.health, 15, canvas.height - 30);

    ctx.strokeStyle = "red";
    if (player.heldGun == player.primaryGun) {
      ctx.strokeRect(
        8,
        canvas.height - 240,
        ctx.measureText(player.heldGun.name).width +
          6 * 3 +
          ctx.measureText(
            player.heldGun.currentAmmo + " / " + player.heldGun.maxAmmo
          ).width +
          16,
        60
      );
    } else if (player.heldGun == player.secondaryGun) {
      ctx.strokeRect(
        8,
        canvas.height - 180,
        ctx.measureText(player.heldGun.name).width +
          6 * 3 +
          ctx.measureText(
            player.heldGun.currentAmmo + " / " + player.heldGun.maxAmmo
          ).width +
          16,
        60
      );
    }

    if (player.heldGun == player.secondaryGun) {
      ctx.fillStyle = "rgba(240, 240, 240, 0.8)";
    } else {
      ctx.fillStyle = "rgba(240, 240, 240, 0.9)";
    }
    ctx.fillText(
      player.primaryGun.name +
        " " +
        player.primaryGun.currentAmmo +
        " / " +
        player.primaryGun.maxAmmo,
      16,
      canvas.height - 200
    );
    if (player.heldGun == player.primaryGun) {
      ctx.fillStyle = "rgba(240, 240, 240, 0.8)";
    } else {
      ctx.fillStyle = "rgba(240, 240, 240, 0.9)";
    }
    ctx.fillText(
      player.secondaryGun.name +
        " " +
        player.secondaryGun.currentAmmo +
        " / " +
        player.secondaryGun.maxAmmo,
      16,
      canvas.height - 140
    );

    if (player.heldGun.currentAmmo < 1) {
      ctx.fillStyle = "white";
      ctx.fillText("Reload", canvas.width / 2, canvas.height - 200);
    }

    // crosshair
    ctx.fillStyle = "white";
    ctx.fillRect(
      mouseX - options.crosshair.width,
      mouseY - options.crosshair.length * options.crosshair.lineOffY,
      options.crosshair.width * 2,
      options.crosshair.length
    ); // top rect
    ctx.fillRect(
      mouseX - options.crosshair.width,
      mouseY - options.crosshair.length * -options.crosshair.lineOffX,
      options.crosshair.width * 2,
      options.crosshair.length
    ); // bottom rect
    ctx.fillRect(
      mouseX - options.crosshair.length * options.crosshair.lineOffY,
      mouseY + options.crosshair.width,
      options.crosshair.length,
      options.crosshair.width * -2
    ); // left rect
    ctx.fillRect(
      mouseX - options.crosshair.length * -options.crosshair.lineOffX,
      mouseY + options.crosshair.width,
      options.crosshair.length,
      options.crosshair.width * -2
    ); // right rect

    if (options.crosshair.dot) {
      ctx.fillStyle = "white";
      // ctx.fillRect(
      //   mouseX - options.crosshair.length,
      //   mosueY - options.crosshair.length,
      //   mouseX + options.crosshair.length * 2,
      //   mouseY + options.crosshair.length * 2
      // );
    }

    if (
      (this.virtualX - this.radius <= currentMap.x)
    ) {
      allowedMovement.left = false;
    } else {
      allowedMovement.left = true;
    }
    if (this.virtualY - this.radius <= currentMap.y) {
      allowedMovement.up = false;
    } else {
      allowedMovement.up = true;
    }

    if (this.virtualX + this.radius >= currentMap.x + currentMap.width) {
      allowedMovement.right = false;
    } else {
      allowedMovement.right = true;
    }
    if (this.virtualY + this.radius >= currentMap.y + currentMap.height) {
      allowedMovement.down = false;
    } else {
      allowedMovement.down = true;
    }

    currentMap.objects.forEach((o) => {
      if (o.name == "box") {
        if (
          this.virtualX - this.radius < currentMap.x + o.x + o.w &&
          this.virtualY > currentMap.y + o.y - this.radius &&
          this.virtualY + this.radius <
            currentMap.y + o.y + o.h + this.radius * 2 &&
          this.virtualX > currentMap.x + o.x + o.w
        ) {
          allowedMovement.left = false;
        }
        if (
          this.virtualX + this.radius > currentMap.x + o.x &&
          this.virtualY > currentMap.y + o.y - this.radius &&
          this.virtualY + this.radius <
            currentMap.y + o.y + o.h + this.radius * 2 &&
          this.virtualX < currentMap.x + o.x
        ) {
          allowedMovement.right = false;
        }
        if (
          this.virtualY + this.radius > currentMap.y + o.y &&
          this.virtualX > currentMap.x + o.x - this.radius &&
          this.virtualX + this.radius <
            currentMap.x + o.x + o.w + this.radius * 2 &&
          this.virtualY < currentMap.y + o.y
        ) {
          allowedMovement.down = false;
        }
        if (
          this.virtualY - this.radius < currentMap.y + o.y + o.h &&
          this.virtualX > currentMap.x + o.x - this.radius &&
          this.virtualX + this.radius <
            currentMap.x + o.x + o.w + this.radius * 2 &&
          this.virtualY > currentMap.y + o.y + o.h
        ) {
          allowedMovement.up = false;
        }
      }
    });

    // the map is inverted becuase if it isnt, the map will be going the wrong way
    if (keyState.a && allowedMovement.left) {
      currentMap.x += 3;
      this.x -= 3;
      bullets.forEach((b) => {
        b.x += 3;
      });
      Entities.forEach((e) => {
        e.x += 3;
      });
    } else if (keyState.d && allowedMovement.right) {
      currentMap.x -= 3;
      this.x += 3;
      bullets.forEach((b) => {
        b.x -= 3;
      });
      Entities.forEach((e) => {
        e.x -= 3;
      });
    }
    if (keyState.w && allowedMovement.up) {
      currentMap.y += 3;
      this.y -= 3;
      bullets.forEach((b) => {
        b.y += 3;
      });
      Entities.forEach((e) => {
        e.y += 3;
      });
    } else if (keyState.s && allowedMovement.down) {
      currentMap.y -= 3;
      this.y += 3;
      bullets.forEach((b) => {
        b.y -= 3;
      });
      Entities.forEach((e) => {
        e.y -= 3;
      });
    }

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
      ctx.fillRect(
        canvas.width / 2 - 50,
        canvas.height - 130,
        progress * 1.5,
        20
      );
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

    ctx.beginPath();
    ctx.fillStyle = this.team.color;
    ctx.arc(this.virtualX, this.virtualY, this.radius, Math.PI * 2, 0);
    // ctx.fillRect(this.virtualX, this.virtualY, this.radius, this.radius);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  },
};
