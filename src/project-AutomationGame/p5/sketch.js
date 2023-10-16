// Wave Function Collapse (tiled model)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/171-wave-function-collapse
// https://youtu.be/0zac-cDzJwA

// Code from Challenge: https://editor.p5js.org/codingtrain/sketches/pLW3_PNDM
// Corrected and Expanded: https://github.com/CodingTrain/Wave-Function-Collapse

// Array for tiles and tile images
const tiles = [];
const tileImages = [];

// Current state of the grid
let grid = [];

// Width and height of each cell
let DIMX = Math.ceil(window.innerWidth / 32);
let DIMY = Math.ceil(window.innerHeight / 32);

// Load images
let obj = {};
function preload() {
  const path = "grass";
  const path2 = "var";
  let len = 14;
  for (let i = 0; i < len; i++) {
    if (i < 10) {
      tileImages[i] = loadImage(`${path}/grass0${i}.png`);
      obj[i] = { path: `${path}/grass0${i}.png` };
    } else {
      tileImages[i] = loadImage(`${path}/grass${i}.png`);
      obj[i] = { path: `${path}/grass${i}.png` };
    }
  }
  let len2 = 13;
  for (let i = 0; i < len2; i++) {
    if (i < 10) {
      tileImages[len + i] = loadImage(`${path2}/var0${i}.png`);
      obj[len + i] = { path: `${path2}/var0${i}.png` };
    } else {
      tileImages[len + i] = loadImage(`${path2}/var${i}.png`);
      obj[len + i] = { path: `${path2}/var${i}.png` };
    }
  }
}
let lib;
let sizeX = 32;
let sizeY = 32;
function setup() {
  createCanvas(DIMX * sizeX, DIMY * sizeY);

  lib = {
    grassTop: tileImages[0], //
    grass: tileImages[1], //
    dirt: tileImages[2], //
    dirtTopRight: tileImages[3], //
    grassTopLeft: tileImages[4], //
    grassLeft: tileImages[5], //
    grassBottomLeft: tileImages[6], //
    // island: tileImages[7],
    grassRight: tileImages[7], //
    grassTopRight: tileImages[8], //
    grassBottomRight: tileImages[9], //
    grassBottom: tileImages[10], //
    dirtTopLeft: tileImages[11], //
    dirtBottomLeft: tileImages[12], //
    dirtBottomRight: tileImages[13], //

    var1: tileImages[14],
    var2: tileImages[15],
    var3: tileImages[16],
    var4: tileImages[17],

    var5: tileImages[18],
    var6: tileImages[19],
    var7: tileImages[20],
    var8: tileImages[21],
    var9: tileImages[22],
    var10: tileImages[23],
    var11: tileImages[24],
    var12: tileImages[25],
    var13: tileImages[26],
  };

  // Key
  // AAA = grass
  // ZZZ = dirt
  // BBB = grassTop
  // CCC = grassRight
  // DDD = grassBottom
  // EEE = grassLeft

  // Create and label the tiles
  //                                  TOP     RIGHT   BOTTOM  LEFT
  tiles[0] = new Tile(lib.grassTop, ["AAA", "BBB", "ZZZ", "BBB"]);
  tiles[1] = new Tile(lib.grass, ["AAA", "AAA", "AAA", "AAA"]);
  tiles[2] = new Tile(lib.dirt, ["ZZZ", "ZZZ", "ZZZ", "ZZZ"]); // dirt
  tiles[3] = new Tile(lib.dirtTopRight, ["ZZZ", "ZZZ", "EEE", "DDD"]); // dirtTopRight
  tiles[4] = new Tile(lib.grassTopLeft, ["AAA", "BBB", "EEE", "AAA"]);
  tiles[5] = new Tile(lib.grassLeft, ["EEE", "ZZZ", "EEE", "AAA"]);
  tiles[6] = new Tile(lib.grassBottomLeft, ["EEE", "DDD", "AAA", "AAA"]);
  tiles[7] = new Tile(lib.grassRight, ["CCC", "AAA", "CCC", "ZZZ"]); // grassRight
  tiles[8] = new Tile(lib.grassTopRight, ["AAA", "AAA", "CCC", "BBB"]); // grassTopRight
  tiles[9] = new Tile(lib.grassBottomRight, ["CCC", "AAA", "AAA", "DDD"]); // grassBottomRight
  tiles[10] = new Tile(lib.grassBottom, ["ZZZ", "DDD", "AAA", "DDD"]); // grassBottom
  tiles[11] = new Tile(lib.dirtTopLeft, ["ZZZ", "DDD", "CCC", "ZZZ"]); // dirtTopLeft
  tiles[12] = new Tile(lib.dirtBottomLeft, ["CCC", "BBB", "ZZZ", "ZZZ"]); // dirtBottomLeft
  tiles[13] = new Tile(lib.dirtBottomRight, ["EEE", "ZZZ", "ZZZ", "BBB"]); // dirtBottomRight
  // insert at 7th index

  // tiles[7] = new Tile(lib.dirt,                       ["ZZZ",  "ZZZ",  "ZZZ",  "ZZZ"]);

  // tiles[14] = new Tile(lib.var1, ["AAA", "AAA", "AAA", "AAA"]);
  // tiles[15] = new Tile(lib.var2, ["AAA", "AAA", "AAA", "AAA"]);
  // tiles[16] = new Tile(lib.var3, ["AAA", "AAA", "AAA", "AAA"]);
  // tiles[17] = new Tile(lib.var4, ["AAA", "AAA", "AAA", "AAA"]);
  // tiles[18] = new Tile(lib.var5, ["AAA", "AAA", "AAA", "AAA"]);
  // tiles[19] = new Tile(lib.var6, ["AAA", "AAA", "AAA", "AAA"]);

  // tiles[20] = new Tile(lib.var7, ["AAA", "AAA", "AAA", "AAA"]);
  // tiles[21] = new Tile(lib.var8, ["ZZZ", "ZZZ", "ZZZ", "ZZZ"]);
  // tiles[22] = new Tile(lib.var9, ["ZZZ", "ZZZ", "ZZZ", "ZZZ"]);
  // tiles[23] = new Tile(lib.var10, ["ZZZ", "ZZZ", "ZZZ", "ZZZ"]);
  // tiles[24] = new Tile(lib.var11, ["ZZZ", "ZZZ", "ZZZ", "ZZZ"]);
  // tiles[25] = new Tile(lib.var12, ["ZZZ", "ZZZ", "ZZZ", "ZZZ"]);
  // tiles[26] = new Tile(lib.var13, ["ZZZ", "ZZZ", "ZZZ", "ZZZ"]);

  // tiles[0] = new Tile(loadImage("grass/grass01.png"), ["AAA", "AAA", "AAA", "AAA"]);
  // tiles[1] = new Tile(loadImage("grass/grass02.png"), ["ZZZ", "ZZZ", "ZZZ", "ZZZ"]);

  // Generate the adjacency rules based on edges
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.id = i;
    tile.analyze(tiles);
  }

  // Start over
  startOver();
}

function startOver() {
  // Create cell for each spot on the grid
  for (let i = 0; i < DIMX * DIMY; i++) {
    grid[i] = new Cell(tiles.length, null);
  }
}

// Check if any element in arr is in valid, e.g.
// VALID: [0, 2]
// ARR: [0, 1, 2, 3, 4]
// result in removing 1, 3, 4
// Could use filter()!
function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
}

function draw() {
  background(0);

  // Draw the grid
  const w = width / DIMX;
  const h = height / DIMY;
  for (let j = 0; j < DIMY; j++) {
    for (let i = 0; i < DIMX; i++) {
      let cell = grid[i + j * DIMX];
      if (cell.collapsed) {
        let index = cell.options[0];
        cell.id = tiles[index].id;
        if (tiles[index].rotated != null) cell.rotated = tiles[index].rotated;
        image(tiles[index].img, i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(100);
        rect(i * w, j * h, w, h);
      }
    }
  }

  // Make a copy of grid
  let gridCopy = grid.slice();
  // Remove any collapsed cells
  gridCopy = gridCopy.filter((a) => !a.collapsed);

  // The algorithm has completed if everything is collapsed
  if (grid.length == 0) {
    return;
  }

  // Pick a cell with least entropy

  // Sort by entropy
  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });

  // Keep only the lowest entropy cells
  let len = gridCopy[0].options.length;
  let stopIndex = 0;
  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }
  if (stopIndex > 0) gridCopy.splice(stopIndex);

  // Collapse a cell
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  if (pick === undefined) {
    startOver();
    return;
  }
  cell.options = [pick];

  // Calculate entropy
  const nextGrid = [];
  for (let j = 0; j < DIMY; j++) {
    for (let i = 0; i < DIMX; i++) {
      let index = i + j * DIMX;
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);
        // Look up
        if (j > 0) {
          let up = grid[i + (j - 1) * DIMX];
          let validOptions = [];
          for (let option of up.options) {
            let valid = tiles[option].down;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look right
        if (i < DIMX - 1) {
          let right = grid[i + 1 + j * DIMX];
          let validOptions = [];
          for (let option of right.options) {
            let valid = tiles[option].left;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look down
        if (j < DIMY - 1) {
          let down = grid[i + (j + 1) * DIMX];
          let validOptions = [];
          for (let option of down.options) {
            let valid = tiles[option].up;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look left
        if (i > 0) {
          let left = grid[i - 1 + j * DIMX];
          let validOptions = [];
          for (let option of left.options) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        // I could immediately collapse if only one option left?
        nextGrid[index] = new Cell(options);
      }
    }
  }

  grid = nextGrid;
}

function saveGrid() {
  let keys = Object.keys(lib);
  let obj2 = {};
  for (let i = 0; i < keys.length; i++) {
    if (lib[keys[i]] === tiles[i].img) {
      obj2[i] = keys[i];
    }
  }
  return {
    width: DIMX,
    height: DIMY,
    grid: grid.map((x) => x.id),
    key1: obj2,
    key2: obj,
  };
}
