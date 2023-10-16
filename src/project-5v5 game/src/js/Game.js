window.onload = () => {
  gameLoop = setInterval(loop, 10);
};
function loop() {
  // background
  ctx.fillStyle = "rgb(168, 128, 15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // map
  ctx.fillStyle = "rgb(199, 151, 14)";
  ctx.fillRect(currentMap.x, currentMap.y, currentMap.width, currentMap.height);
  // draw objects
  currentMap.objects.forEach((o) => {
    o.update();
  });
  // draw bullets
  bullets.forEach((b) => {
    b.loop();
  });
  // draw other entities
  Entities.forEach((e) => {
    // console.log("asd");
    e.findPlayer();
    e.loop();
  });
  // drawGrid();
  // playerList.forEach((e) => {
    
  //   if (!(e.name == player.name)) {
  //   ctx.beginPath();
  //     ctx.fillStyle = e.team.color;
  //     ctx.arc(currentMap.x + e.x, currentMap.y + e.y, e.radius, Math.PI * 2, 0);
  //     // console.log(e.name + player.name);
  //     // ctx.fillRect(this.virtualX, this.virtualY, this.radius, this.radius);
  //     ctx.fill();
  //     ctx.strokeStyle = "black";
  //     ctx.stroke();
  //   }
  // })
  // draw player
  playerList.forEach((e) => {
    ctx.beginPath();
    ctx.fillStyle = e.team;
    ctx.arc(currentMap.x + e.virtualX, currentMap.y + e.virtualY, e.radius, Math.PI * 2, 0);
    // ctx.fillRect(e.virtualX, e.virtualY, e.radius, e.radius);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    playerList = [];
  })
  
  if (!player.health <= 0)
    player.update();

  
}
