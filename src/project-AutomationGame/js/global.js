function rand(min, max) {
  return Math.random() * (max - min) + min; // The maximum is exclusive and the minimum is inclusive
}

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let width = canvas.width;
let height = canvas.height;
let mouse = { x: 0, y: 0, down: false };
let keys = {};

let SIZEX = 32;
let SIZEY = 32;

const SPRITE_PATH = "sprites/";
const TILES = {
  grass: [],
  dirt: [],
  var: [],
};

function addSprites(path, prefix, count) {
  let arr = [];
  if (path[path.length - 1] !== "/") path += "/";
  for (let i = 0; i < count; i++) {
    // if i is less than ten, add a zero to the front of the number
    if (i < 10) {
      i = "0" + i;
    }
    arr.push(new Tile(path + prefix + i + ".png", SIZEX, SIZEY, null));
  }
  return arr;
}

TILES.dirt = addSprites(SPRITE_PATH + "dirt/", "dirt", 48);
TILES.grass = addSprites(SPRITE_PATH + "grass/", "grass", 48);
TILES.var = addSprites(SPRITE_PATH + "var/", "var", 14);

let machines = [];
let items = [];

let timers = [];