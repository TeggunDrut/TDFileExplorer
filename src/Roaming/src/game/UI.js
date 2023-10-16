let animLoop = setInterval(() => {}, 10);
let crossWidth = 2;
let crossOff = 2;
let crossLength = 10;
function drawUI() {
  if (!menuOpen) {
    ctx.fillStyle = "white";
    ctx.fillRect(
      mouseX - crossWidth,
      mouseY - crossLength * 2,
      crossWidth * 2,
      crossLength
    ); // top rect
    ctx.fillRect(
      mouseX - crossWidth,
      mouseY + crossLength,
      crossWidth * 2,
      crossLength
    ); // bottom rect
    ctx.fillRect(
      mouseX - crossLength * 2,
      mouseY + crossWidth,
      crossLength,
      crossWidth * -2
    ); // left rect
    ctx.fillRect(
      mouseX + crossLength,
      mouseY + crossWidth,
      crossLength,
      crossWidth * -2
    ); // right rect

    ctx.font = "38px sans-serif";
    ctx.fillStyle = "rgb(110, 255, 110)";
    ctx.fillText(Math.floor(player.health) + " ", 10, game.height - 20);

    ctx.fillText("Kills: " + player.killCount + " ", 10, game.height - 85);

    ctx.strokeStyle = "red";
    if (player.heldGun == player.primaryGun) {
      ctx.strokeRect(
        8,
        game.height - 260,
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
        game.height - 200,
        ctx.measureText(player.heldGun.name).width +
          6 * 3 +
          ctx.measureText(
            player.heldGun.currentAmmo + " / " + player.heldGun.maxAmmo
          ).width +
          16,
        60
      );
    }

    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillText(
      player.primaryGun.name +
        " " +
        player.primaryGun.currentAmmo +
        " / " +
        player.primaryGun.maxAmmo,
      16,
      game.height - 220
    );
    ctx.fillText(
      player.secondaryGun.name +
        " " +
        player.secondaryGun.currentAmmo +
        " / " +
        player.secondaryGun.maxAmmo,
      16,
      game.height - 160
    );

    if (player.heldGun.currentAmmo < 1) {
      ctx.fillStyle = "white";
      ctx.fillText("Reload", game.width / 2, game.height - 200);
    }

    // ctx.beginPath();
    // ctx.strokeStyle = "red";
    // ctx.moveTo(player.x + (player.w / 2), player.y + (player.h / 2));
    // ctx.lineTo(mouseX, player.y + (player.h / 2))
    // ctx.moveTo(mouseX, player.y + (player.h / 2));
    // ctx.lineTo(mouseX, mouseY)
    // ctx.moveTo(mouseX, mouseY)
    // ctx.lineTo(player.x + (player.w / 2), player.y + (player.h / 2))
    // ctx.stroke();
  }
}
