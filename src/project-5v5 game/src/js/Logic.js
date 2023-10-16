function isHoveringOver(mouseX, mouseY, x, y, w, h) {
  if (mouseX <= x + w && mouseX >= x && mouseY <= y + h && mouseY >= y) {
    return true;
  } else {
    return false;
  }
}
function getRectanglesCollided(a1, a2) {
  if (
    a1.x + a1.w <= a2.x + a2.w &&
    a1.x >= a2.x &&
    a1.y + a1.h <= a2.y + a2.h &&
    a1.y >= a2.y
  ) {
    return true;
  } else {
    return false;
  }
}
function shoot() {
  if (availableShoot == true)
    if (
      !player.reloading &&
      firstShot &&
      player.heldGun.currentAmmo != 0 &&
      !menusOpen.options &&
      !getRectanglesCollided(
        { x: mouseX, y: mouseY, w: 1, h: 1 },
        { x: canvas.width - 100, y: 0, w: 100, h: 100 }
      )
    ) {
      availableShoot = false;
      player.heldGun.currentAmmo--;
      player.shoot(mouseX, mouseY);
      firstShot = false;
      setTimeout(function () {
        availableShoot = true;
      }, player.heldGun.rpm / 10);
    }
  mouseDown = true;
  fireloop = setInterval(() => {
    if (
      mouseDown == true &&
      !menusOpen.options &&
      !getRectanglesCollided(
        { x: mouseX, y: mouseY, w: 1, h: 1 },
        { x: canvas.width - 50, y: 0, w: 50, h: 50 }
      )
    ) {
      if (!(player.heldGun.currentAmmo < 1)) {
        if (godMode) {
          enemyList.forEach((e) => {
            player.heldGun.currentAmmo = player.heldGun.maxAmmo + 1;
            player.shoot(e.x + e.w / 2, e.y + e.h / 2);
            player.heldGun.currentAmmo--;
          });
        } else {
          if (!player.reloading) {
            player.shoot(mouseX, mouseY);
            player.heldGun.currentAmmo--;
          }
        }
      }
      if (bullets.length > 200) {
        bullets.length = 10;
      }
    }
  }, player.heldGun.rpm / 8);
}
// let xoff = 0;
// let yoff = 0;
function drawGrid() {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(95, 95, 95, 0.9)";
  for (let xOff = 0; xOff < currentMap.width; xOff += 70) {
    ctx.moveTo(currentMap.x + xOff, 0);
    ctx.lineTo(currentMap.x + xOff, currentMap.height);
    ctx.stroke();
  }
  for (let yOff = 0; yOff < currentMap.height; yOff += 70) {
    ctx.moveTo(0, currentMap.y + yOff);
    ctx.lineTo(currentMap.width, currentMap.y + yOff);
    ctx.stroke();
  }
  ctx.stroke();
}
