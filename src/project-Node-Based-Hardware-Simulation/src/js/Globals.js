let nodeElements = [];
let nodes = [];
let wires = [];

let translatePos = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
let startDragOffsetX = 0;
let startDragOffsetY = 0;
let posSet = false;
let gridSize = 50;

function executeInstruction(nodeElement, instruction) {
  if (instruction.type == "toggle") {
    nodeElement.powered = !nodeElement.powered;
  } else if (instruction.type == "skip") {
    console.log(1);
  }
}

function looper(nodeElements, instructions, time, count, runTimes) {
  let step = 0;
  let e = setInterval(() => {
    executeInstruction(nodeElements[step], instructions[step]);
    step++;
    if (step >= count) {
      clearInterval(e);
      if (runTimes > 1) {
        setTimeout(() => {
          looper(nodeElements, instructions, time, count, runTimes - 1);
        });
      }
    }
  }, time * 1000);
}

let play = document.getElementById("play");
let elementCreateButtons = document.getElementsByClassName("create");

for (let i = 0; i < 9; i++) {
  switch (elementCreateButtons[i].id.split("create")[1]) {
    case "AND":
      elementCreateButtons[i].onclick = () => {
        let and = new And(
          canvas.width / 2,
          canvas.height / 2,
          100, 100,
          "and" + i,
        );
        nodeElements.push(and);
      };
      break;
    case "OR":
      elementCreateButtons[i].onclick = () => {
        let or = new Or(
          canvas.width / 2,
          canvas.height / 2,
          100, 100,
          "or" + i,
        );
        nodeElements.push(or);
      }
      break;
    case "XOR":
      elementCreateButtons[i].onclick = () => {
        let xor = new XOr(
          canvas.width / 2,
          canvas.height / 2,
          100, 100,
          "xor" + i,
        );
        nodeElements.push(xor);
      }
      break;
    case "NOT":
      elementCreateButtons[i].onclick = () => {
        let not = new Not(
          canvas.width / 2,
          canvas.height / 2,
          100, 100,
          "not" + i,
        );
        nodeElements.push(not);
      }
      break;
    case "NAND":
      elementCreateButtons[i].onclick = () => {
        let nand = new NAnd(
          canvas.width / 2,
          canvas.height / 2,
          100, 100,
          "nand" + i,
        );
        nodeElements.push(nand);
      }
      break;
    case "NOR":
      elementCreateButtons[i].onclick = () => {
        let nor = new NOr(
          canvas.width / 2,
          canvas.height / 2,
          100, 100,
          "nor" + i,
        );
        nodeElements.push(nor);
      }
      break;
    case "XNOR":
      elementCreateButtons[i].onclick = () => {
        let xnor = new XNOr(
          canvas.width / 2,
          canvas.height / 2,
          100, 100,
          "xnor" + i,
        );
        nodeElements.push(xnor);
      }
      break;
    case "XOR":
      elementCreateButtons[i].onclick = () => {
        let xor = new XOr(
          canvas.width / 2,
          canvas.height / 2,
          100, 100,
          "xor" + i,
        );
        nodeElements.push(xor);
      }
      break;
    case "LED":
      elementCreateButtons[i].onclick = () => {
        let led = new LightRGBA(
          canvas.width / 2,
          canvas.height / 2,
          100, 100,
          "led" + i,
          false,
          {
            r: 255,
            g: 255,
            b: 255,
            a: 255,
          }
        );
        nodeElements.push(led);
      }
  }
}

function exportToJSON() {
  let json = {
    nodes: [],
    wires: [],
  };
  nodeElements.forEach((node) => {
    let nodeList = [];
    node.nodes.forEach((node1) => {
      nodeList.push({
        id: node1.id,
        x: node1.x,
        y: node1.y,
        r: node1.r,
        powered: node1.powered,
        connectedWire: node1.connectedWire,
      });
    });
    json.nodes.push({
      x: node.x,
      y: node.y,
      w: node.w,
      h: node.h,
      powered: node.powered,
      nodes: nodeList,
    });
  }
  );
  wires.forEach((wire) => {
    
    json.wires.push({
      startNode: {
        x: wire.startParent.x,
        y: wire.startParent.y,
        r: wire.startParent.r,
        powered: wire.startParent.powered,
      },
      endNode: {
        x: wire.endParent.x,
        y: wire.endParent.y,
        r: wire.endParent.r,
        powered: wire.endParent.powered,
      },
      
    });
  });
  // log the JSON object
  let e = JSON.parse(JSON.stringify(json));
  console.log(e);
  // console.log(JSO N.stringify(json));
}