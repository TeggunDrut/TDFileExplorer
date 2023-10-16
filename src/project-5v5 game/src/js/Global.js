let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let gameLoop;
let teams = [
  {name: "red", playerCount: 5, playerList: [], color: "rgb(255, 0, 0)"},
  {name: "blue", playerCount: 5, playerList: [], color: "blue"}, 
];
let maps = [
  {
    name: "map1",
    // x: -900,
    // y: -900,
    x: 100,
    y: 100,
    width: 2000,
    height: 1500,
    objects: [
      { x: 0, y: 200, w: 100, h: 900, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 100, y: 300, w: 100, h: 200, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 500, y: 200, w: 100, h: 200, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 900, y: 500, w: 100, h: 200, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 300, y: 300, w: 200, h: 900, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 300, y: 1300, w: 400, h: 100, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 600, y: 900, w: 200, h: 200, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 600, y: 1200, w: 400, h: 100, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h); } },
      { x: 900, y: 200, w: 700, h: 200, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 900,  y: 800, w: 200, h: 200, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 900,  y: 1100, w: 900, h: 100, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 1500,  y: 1200, w: 100, h: 100, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      { x: 1200,  y: 700, w: 900, h: 200, name: "box", update: function () { ctx.fillStyle = "rgb(168, 128, 15)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);}},
      
      {x: 100, y: 0, w: 400, h: 300, name: "siteA", update: function () { ctx.fillStyle = "rgba(255, 0, 0, 0.4)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h);ctx.font = "25px Arial"; ctx.fillStyle = "white"; ctx.fillText("A Site", (currentMap.x + this.x + this.w / 2) - ctx.measureText("B Site").width / 2, currentMap.y + this.y + this.h / 2);}},
      { x: 1600, y: 1200, w: 400, h: 300, name: "siteB", update: function () { ctx.fillStyle = "rgba(0, 0, 255, 0.4)"; ctx.fillRect(currentMap.x + this.x, currentMap.y + this.y, this.w, this.h); ctx.font = "25px Arial"; ctx.fillStyle = "white"; ctx.fillText("B Site", (currentMap.x + this.x + this.w / 2) - ctx.measureText("A Site").width / 2, currentMap.y + this.y + this.h / 2);}},
    ],
  },
];  
let currentMap = maps[0];
let keyState = { w: false, s: false, a: false, d: false };
let menusOpen = {
  options: false,
  
};
let allowedMovement = { left: true, right: true, up: true, down: true };
let mouseX;
let mouseY;
let mouseDown = false;

let bullets = [];

let looper = 0;
let animation = false;
let progress = 0;

let playerList = [];
let otherPlayers = [];

let assaultRifle = {
  name: "AK47",
  currentAmmo: 30,
  maxAmmo: 30,
  rpm: 500,
  damage: 24,
  reloadTime: 2,
  bulletSpeed: 10,
};
let pistol = {
  name: "M9",
  currentAmmo: 7,
  maxAmmo: 7,
  rpm: 4000,
  damage: 39,
  reloadTime: 1,
  bulletSpeed: 6,
};
let animLoop = setInterval(() => {}, 10);
let crossWidth = 2;
let crossOff = 2;
let crossLength = 10;

let fireloop;
let godMode = false;
let firing = false;

let firstShot = true;
let switchingGun = false;

let availableShoot = true;
let tempLoop;

let Entities = [];
// let Objects = [];