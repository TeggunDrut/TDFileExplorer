let canvas, ctx;

// let zoomIn = document.getElementById('zoomIn');
// let zoomOut = document.getElementById('zoomOut');
// let reset = document.getElementById('reset');

let mouse = {
  x: 0,
  y: 0,
  down: false,
};

function mouseOver(x, y, w, h, mx, my) {
  return (
    mx > x &&
    mx < x + w &&
    my > y &&
    my < y + h
  );
}
// get mouseX nd mouseY
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX / zoomMultiplier;
  mouse.y = e.clientY / zoomMultiplier;
});
document.addEventListener('mousedown', (e) => {
  mouse.down = true;
});
document.addEventListener('mouseup', (e) => {
  mouse.down = false;
});

// document.addEventListener('keydown', (e) => {
//   if (e.key == "e") {
//     zoomIn.click();
//   } else if (e.key == "q") {
//     zoomOut.click();
//   }
// });

window.onload = (e) => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  loop();
};
let bgColorMain = '#a9a9b0';
window.onresize = (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};



function loop() {
  ctx.fillStyle = bgColorMain;
  ctx.fillRect(
    canvasOffsetX,
    canvasOffsetY,
    canvas.width,
    canvas.height
  );

  // make a grid
  
  // draw grid relative to canvasOffsetX

  for (let i = 0; i < canvas.width; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(i + canvasOffsetX, canvasOffsetY);
    ctx.lineTo(i + canvasOffsetX, canvas.height + canvasOffsetY);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  // draw grid relative to canvasOffsetY
  for (let i = 0; i < canvas.height; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(canvasOffsetX, i + canvasOffsetY);
    ctx.lineTo(canvas.width + canvasOffsetX, i + canvasOffsetY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ctx.strokeStyle = '#fff';
  // ctx.lineWidth = 0.4;
  // // for (let i = 0; i < canvas.width; i += gridSize) {
  // //   ctx.beginPath();
  // //   ctx.moveTo(i, 0);
  // //   ctx.lineTo(i, canvas.height);
  // //   ctx.stroke();
  // // }

  // for (let i = 0; i < canvas.height; i += gridSize) {
  //   ctx.beginPath();
  //   ctx.moveTo(0, i);
  //   ctx.lineTo(canvas.width, i);
  //   ctx.stroke();
  // }
  gameLoop(canvas, ctx, mouse);
  requestAnimationFrame(loop);
}
function radians(num) {
  return num * Math.PI / 180;
}