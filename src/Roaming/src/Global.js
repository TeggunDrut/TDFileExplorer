const container = document.getElementById("container");
const mainmenu = document.getElementById("ui-mainmenu");
const mainmenuBtnPlay = document.getElementById("mainmenuBtnPlay");
const mainmenuBtnOptions = document.getElementById("mainmenuBtnOptions");
const mainmenuBtnExit = document.getElementById("mainmenuBtnExit");

let font = "30px Arial";

// game settings
let width = window.innerWidth;
let height = window.innerHeight;
// canvas
const gcanv = document.getElementById("galaxy");
const gctx = gcanv.getContext("2d");

let mouseX, mouseY;
let mouseDown = false;

const game = document.createElement("canvas");
game.width = width;
game.height = height;
game.setAttribute("style", "display: none;");
document.body.appendChild(game);
const ctx = game.getContext("2d");

let gameOpen = false;
let menuOpen = false;

let lastCalledTime;
let fps;
let fpsCap = 300;

let roundsStarted = false;
let roundNumber = 1;
let roundInProgress = false;

let gameMap = [
  {name: "spawn"},
  {name: "enemiespawns"},
  {name: "other"}
];

let spawnPoints = [
  { x: 100, y: 700 },
  { x: 450, y: 150 },
  { x: 1300, y: 850 },
  { x: 1100, y: 200 },
  // { x: 1560, y: 170 },

];
let abilitiesOnGround = [];
let abilities = [
  {name: "Ricochet", color: "red"},
  {name: "Faster RPM", color: "green"},
  {name: "Faster Speed", color: "purple"},
  {name: "Multi Shot", color: "gray"},
];

let fireloop;
let firing = false;
let bullets = [];
let godMode = false;

let WorldObjects = [];

WorldObjects.push(new Wall(200, 200, 100, 100, "red"));
WorldObjects.push(new Wall(600, 540, 100, 100, "red"));
WorldObjects.push(new Wall(100, 400, 100, 100, "red"));
WorldObjects.push(new Wall(400, 600, 100, 100, "red"));

let keyState = {
  a: false,
  d: false,
  w: false,
  s: false,
  r: false,
};

let enemyList = [];

let check = setInterval(() => {
  if (gcanv.style.display == "none") {
    gameOpen = true;
    clearInterval(check);
  }
}, 10);

let firstShot = true;
let switchingGun = false;

let tempLoop;
// events
document.addEventListener("keydown", (e) => {
  keyState[e.key] = true;
  if (e.key == "Escape") {
    if (menuOpen) {
      buyMenu.open = false;
      menuOpen = false;
    }
  }
  if (e.key == "b") {
    menuOpen = !menuOpen;
    buyMenu.open = !buyMenu.open;
  }
  if (e.key == "Backspace") {
    enemyList.length = 1;
  }
  if (e.key == "1") {
    mouseDown = false;
    player.heldGun = player.primaryGun;
  } else if (e.key == "2") {
    mouseDown = false;
    player.heldGun = player.secondaryGun;
  }
  if (e.key == "`" || e.key == "~") {
    godMode = !godMode;
  }
  if (e.key == "Enter") {
    if (!roundInProgress)
      roundsStarted = true;
  }
  if (e.key == "l") {
    enemyList.push(
      new Enemy(
        Math.random() * game.width - 60,
        Math.random() * game.height - 60,
        60,
        60,
        "blue",
        100,
        true,
        1,
        100
      )
    );
  }
});
setInterval(() => {
  if (gameOpen) player.health -= 1;
}, 1500);

document.addEventListener("keyup", (e) => {
  keyState[e.key] = false;
  tempLoop = 0;
});
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
let availableShoot = true;
document.addEventListener("mousedown", (e) => {
  console.log(`availableShoot`, availableShoot);
  if(availableShoot == true)
    if (firstShot && player.heldGun.currentAmmo != 0) {
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
    if (mouseDown == true && gameOpen) {
      if (!(player.heldGun.currentAmmo < 1)) {
        if (godMode) {
          enemyList.forEach(e => {
            player.heldGun.currentAmmo = player.heldGun.maxAmmo + 1;
            player.shoot(e.x + e.w / 2, e.y + e.h / 2);
            player.heldGun.currentAmmo--;
          })
        } else {

          player.shoot(mouseX, mouseY);
          player.heldGun.currentAmmo--;
        }
      }
      if (bullets.length > 200) {
        bullets.length = 10;
      }
    }
  }, player.heldGun.rpm / 8);
});
document.addEventListener("mouseup", (e) => {
  mouseDown = false;
  clearInterval(fireloop);
  firing = false;
  firstShot = true;
});

let enemy = new Enemy(
  game.width / 2,
  game.height / 2,
  60,
  60,
  "blue",
  200,
  true,
  1,
  100
);
enemyList.push(enemy);
let fadeDiv = document.getElementById("fadeDiv");
let div = document.createElement("div");

let particles = [];
let count = 70;
let speed = 4;

function getDistance(xA, yA, xB, yB) {
  var xDiff = xA - xB;
  var yDiff = yA - yB;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function fadeOut(seconds) {
  let alpha = 0;
  div.style.display = "inline-block";
  fadeDiv.appendChild(div);
  setInterval(() => {
    if (alpha < 1) {
      alpha += 0.01 * seconds;
      div.setAttribute(
        "style",
        `width: 100%; height: 100%;background-color: rgba(0, 0, 0, ${alpha})`
      );
      
    }
  }, seconds * 10);

  return true;
}
function fadeIn(seconds) {
  let alpha = 1;
  div.style.display = "inline-block";
  fadeDiv.appendChild(div);
  setInterval(() => {
    if (alpha > 0) {
      alpha -= 0.01 * seconds;
      div.setAttribute(
        "style",
        `width: 100%; height: 100%;background-color: rgba(0, 0, 0, ${alpha})`
      );
    }
  }, seconds * 10);
  fadeDiv.appendChild(div);
  return true;
}
