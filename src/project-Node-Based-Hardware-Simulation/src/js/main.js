let nodeRadius = 7;

let xIndex = 250;
let yIndex = 100;

let canvasOffsetX = 0;
let canvasOffsetY = 0;

let zoom = 1;

let drag = false;
let dragStart;
let dragEnd;

document.addEventListener("mousemove", (e) => {
  let c = 0;
  nodeElements.forEach((node) => {
    if (
      !mouseOver(node.x - 10, node.y, node.w + 10, node.h, mouse.x, mouse.y) &&
      mouse
      ) {
        c++;
        if (c == nodeElements.length) {
          if (mouse.down) {
          if (!posSet) {
            dragStart = { x: mouse.x, y: mouse.y };
            drag = true;
          }
          if (drag) {
            dragEnd = {
              x: e.pageX - canvas.offsetLeft,
              y: e.pageY - canvas.offsetTop,
            };
            // canvasOffsetX += dragEnd.x - dragStart.x;
            // canvasOffsetY += dragEnd.y - dragStart.y;
            // console.log(ctx.translate(dragEnd.x - dragStart.x, dragEnd.y - dragStart.y));
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            // dragStart = dragEnd;
            // console.log(dragStart, dragEnd);
          }
        } else {
          drag = false;
        }
      }
    }
  });
});

let zoomMultiplier = 1;
let otherLights = [];
let sizeOfArray = 5;

let largeArray = [];
for (let i = 0; i < sizeOfArray; i++) {
  largeArray[i] = [];
  for (let j = 0; j < sizeOfArray; j++) {
    // largeArray[i][j] = Math.floor(Math.random() * 2);
    largeArray[i][j] = 1;
  }
}
let selectedmap = largeArray;
let size = selectedmap.length;
let margin = 0;
let nodeSize = 100;

let lightMap = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0],
];

// create a large array of 30 colmns and 30 rows
function createLights() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let l = new LightRGBA(
        xIndex + (nodeSize + margin) * j,
        yIndex + i * (nodeSize + margin),
        nodeSize,
        nodeSize,
        "Light",
        false,
        {
          r: Math.floor(Math.random() * 255),
          g: Math.floor(Math.random() * 255),
          b: Math.floor(Math.random() * 255),
          a: Math.floor(Math.random() * (255 - 0 + 50)) + 0,
        }
      );
      otherLights.push(l);
    }
  }
  // for (let i = 0; i < size; i++) {
    //   for (let j = 0; j < size; j++) {
      //     // connect wire if light is connected to switch
      //     if (selectedmap[i][j] == 1) {
        //       let w = new Wire(
          //         switch1.nodes[0],
          //         otherLights[i * size + j].nodes[0],
          //         "yellow"
          //       );
          //       wires.push(w);
          //       otherLights[i * size + j].nodes[0].connectedWire = w;
          //     }
          //   }
          // }
          otherLights.forEach((l) => {
            nodeElements.push(l);
          });
}
// createLights();
// for (let i = 0; i < size * size; i++) {
  //   let w = new Wire(switch1.nodes[0], otherLights[i].nodes[0], "yellow");
//   wires.push(w);
//   if (Math.floor(Math.random() * 2) == 1) {
  //     otherLights[i].nodes[0].connectedWire = w;
  //   }
  // }
  // use light map to determin if a light is connected to a switch

// let switch1 = new Switch(100, 100, 100, 100, "Switch", true);
// nodeElements.push(switch1);

// let and1 = new And(300, 100, 100, 100, "And");
// nodeElements.push(and1);
  
// let or1 = new Or(300, 200, 100, 100, "Or");
// nodeElements.push(or1);

// let xor1 = new XOr(300, 300, 100, 100, "XOr");
// nodeElements.push(xor1);

// let not1 = new Not(300, 400, 100, 100, "Not");
// nodeElements.push(not1);

// let nand1 = new NAnd(300, 500, 100, 100, "NAnd");
// nodeElements.push(nand1);

// let nor1 = new NOr(400, 100, 100, 100, "NOr");
// nodeElements.push(nor1);

// let xnor1 = new XNOr(400, 200, 100, 100, "XNOr");
// nodeElements.push(xnor1);
  
// let light1 = new LightRGBA(500, 100, nodeSize, nodeSize, "Light", false, {
//   r: Math.floor(Math.random() * 255),
//   g: Math.floor(Math.random() * 255),
//   b: Math.floor(Math.random() * 255),
//   a: Math.floor(Math.random() * (255 - 0 + 50)) + 0,
// });
// nodeElements.push(light1);

play.onclick = () => {
  looper([switch1], {
    0: {
      type: "toggle"
    },
    1: {
      type: "skip"
    }
  }, .5, 2, 4);
}


let setCanvPos = false;
function gameLoop(canvas, ctx, mouse) {
  // always make the x and y of a node equal to the top left corner of the closest grid square
  nodeElements.forEach((node) => {
    node.x = Math.floor(node.x / gridSize) * gridSize;
    node.y = Math.floor(node.y / gridSize) * gridSize;
  });

  wires.forEach((wire) => {
    wire.update();
    wire.draw(ctx);
  });
  let c = 0;
  nodes.forEach((node) => {
    if (wires.length == 0) {
      if (!(node.parent instanceof Switch)) {
        node.powered = false;
      }
    }
    if (node.hasWire && node.connectedWire.startParent.powered) {
      node.powered = true;
    }
    node.draw(ctx);
    node.update(mouse, nodes);
  });
  nodeElements.forEach((node) => {
    if (node instanceof And) {
      node.updateNodes(mouse);
    }
    if (node instanceof Light) {
      node.updateNodes(mouse);
    }
    if (node instanceof Switch) {
      node.updateNodes(mouse);
    }
    if (node instanceof Or) {
      node.updateNodes(mouse);
    }
    if (node instanceof XOr) {
      node.updateNodes(mouse);
    }
    if (node instanceof Not) {
      node.updateNodes(mouse);
    }
    if (node instanceof NAnd) {
      node.updateNodes(mouse);
    }
    if (node instanceof NOr) {
      node.updateNodes(mouse);
    }
    if (node instanceof XNOr) {
      node.updateNodes(mouse);
    }
    if (node instanceof Button) {
      node.updateNodes(mouse);
    }
    node.update(mouse, nodeElements);
    node.draw(ctx);
  });

  // change canvas offset
  // moveCanvasByMouse(mouse);
}
