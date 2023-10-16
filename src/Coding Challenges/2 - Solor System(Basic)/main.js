setup = () => {
  createCanvas(600, 600);
  background("#000");
};
setup();
let rectangle = {
  x: 100,
  y: 100,
  width: 100,
  height: 100,
};
// let points = [
//   { x: width / 2 - 50, y: height / 2, z: 0 },

// ];
// let p1 = points[0];
let angle = radians(1);

let s = new Sphere(width / 2, height / 2, 0, 10);
s.init();

let c = new Cube(width / 2, height / 2, 0, 100, 100, 100);
c.init();
c.rotateZ({x: c.x, y: c.y, z: c.z}, 45);
let x = 50;

let c2 = new Cube(width / 2 - 150, height / 2, 0, 100, 100, 100);
c2.init();
c2.rotateZ({x: c2.x, y: c2.y, z: c2.z}, 45);

draw = () => {
  fps();  

  background("#000");

  fontSize(20);
  fill("#fff");
  text("fps: " + floor(fpsCount), 10, 20);
  
  c.update();
  c.draw(); 
  c.fill();
  c.rotateY({ x: c.x, y: c.y, z: c.z }, 1);

  c2.update();
  c2.draw(); 
  c2.fill();
  c2.rotateY({x: c.x, y: c.y, z: c.z}, 1);

  requestAnimationFrame(draw);
};
draw();
