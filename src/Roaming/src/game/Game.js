function init() {
  for (let i = 0; i < count + 1; i++) {
    particles.push({
      x: Math.floor(Math.random() * gcanv.width - 1),
      y: Math.floor(Math.random() * gcanv.height - 1),
      width: 2,
      height: 2,
      xvel: getRandomInt(-speed, speed),
      yvel: getRandomInt(-speed, speed),
    });
  }
}

function gameOver() {
  // game.style.display = "none";
  if (fadeOut(0.5)) {
    let con = document.createElement("div");
    let title = document.createElement("h2");
    title.setAttribute(
      "style",
      "width: auto; height: 20px; color: white; position: absolute; top:0; left:0; right:0; bottom:0; margin:auto; text-align:center; font-size: 20px;"
    );
    title.innerHTML = "Game Over";
    document.body.appendChild(title);
    setTimeout(() => {
      let sub = document.createElement("h3");
      sub.setAttribute(
        "style",
        "width: auto; height: 20px; color: white; position: absolute; top:100px; left:0; right:0; bottom:0; margin:auto; text-align:center; font-size: 20px;"
      );
      sub.innerHTML = "Retry?";
      sub.onclick = () => {
        document.location.href = document.location.href;
      };
      document.body.appendChild(sub);
    }, 1500);
  }
}

function loop() {
  if (document.getElementById("fadeDiv").childElementCount < 1)
    document.getElementById("fadeDiv").style.display = "none";
  else document.getElementById("fadeDiv").style.display = "inline-block";
  gctx.clearRect(0, 0, gcanv.width, gcanv.height);
  particles.forEach((p) => {
    if (p.xvel == 0) p.xvel = getRandomInt(-speed, speed);
    else if (p.yvel == 0) p.yvel = getRandomInt(-speed, speed);
    gctx.fillStyle = "white";
    gctx.fillRect(p.x, p.y, p.width, p.height);

    p.x += p.xvel;
    p.y += p.yvel;

    if (p.x < 0) {
      p.x = gcanv.width;
      p.y = getRandomInt(0, gcanv.height);
    } else if (p.x > gcanv.width) {
      p.x = 0;
      p.y = getRandomInt(0, gcanv.height);
    }
    if (p.y < 0) {
      p.y = gcanv.height;
      p.x = getRandomInt(0, gcanv.width);
    } else if (p.y > gcanv.height) {
      p.y = 0;
      p.x = getRandomInt(0, gcanv.height);
    }

    particles.forEach((p2) => {
      if (getDistance(p.x, p.y, p2.x, p2.y) < 150) {
        let r = getDistance(p.x, p.y, p2.x, p2.y);
        gctx.beginPath();
        gctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
        gctx.moveTo(p.x, p.y);
        gctx.lineTo(p2.x, p2.y);
        gctx.stroke();
      }
    });
  });
}
window.onload = () => {
  init();
};
function startGame() {
  gcanv.style.display = "none";
  container.style.display = "none";

  game.style.display = "inline-block";
  // fadeDiv.removeChild(div);
  setInterval(gameLoop, 1);
}
function gameLoop() {
  ctx.clearRect(0, 0, game.width, game.height);
  ctx.fillStyle = "rgba(90, 90, 90, 0.6)";
  ctx.fillRect(0, 0, game.width, game.height);
  // draw grid
  ctx.beginPath();
  ctx.strokeStyle = "rgba(95, 95, 95, 0.9)";
  for (let xOff = 0; xOff < game.width; xOff += 70) {
    ctx.moveTo( xOff, 0);
    ctx.lineTo( xOff, game.height);
    ctx.stroke();
  }
  for (let yOff = 0; yOff < game.height; yOff += 70) {
    ctx.moveTo(0,  yOff);
    ctx.lineTo(game.width, yOff);
    ctx.stroke();
  }
  ctx.stroke();

  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("FPS: " + Math.floor(fps), 10, 30);
  ctx.fillText("FPS Cap: " + fpsCap, 10, 70);

  enemyList.forEach((e) => {
    e.update();
  });
  if (roundsStarted) {
    roundInProgress = true;
    startRounds();
    roundsStarted = false;
  }

  abilitiesOnGround.forEach((a) => {
    ctx.fillStyle = a.c;
    ctx.fillRect(a.x, a.y, 30, 30);
  });

  // draw walls
  WorldObjects.forEach((o) => {
    o.update();
  });

  if (buyMenu.open == true) {
    buyMenu.update();
  }

  // player update
  player.update();
  refreshLoop();
}

let enemies = [];
let l;

function spawnWave() {
  spawnPoints.forEach((s) => {
    let enemy = new Enemy(s.x, s.y, 60, 60, "blue", 200, false, 1, 100);
    enemies.push(enemy);
    for (e of enemies) {
      enemyList.push(e);
    }
    enemies = [];
    roundNumber++;
    clearInterval(l);
  });
}

function startRounds() {
  l = setInterval(function () {
    spawnWave();
    console.log(roundsStarted);
  }, 2000);
}
