window.onload = function (e) {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      switch (map[i][j]) {
        case "W":
          worldObjects.push(new Wall(j * 50, i * 50, 50, 50, "rgb(30, 30, 40)"));
          break;
      }
    }
  }
  loop();
};

function loop() {
  ctx.fillStyle = "rgba(170, 170, 170)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  worldObjects.forEach(wo => {
    wo.draw();
  })

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      switch (map[i][j]) {
        case "E":
          ctx.fillStyle = "rgba(170, 170, 170)";
          ctx.fillRect(j * 50, i * 50, 50, 50);
          break;
        case "W":
          ctx.fillStyle = "rgb(30, 30, 40)";
          ctx.fillRect(j * 50, i * 50, 50, 50);
      }
    }
  }
  player.draw();
  player.update();
  requestAnimationFrame(loop);
}
