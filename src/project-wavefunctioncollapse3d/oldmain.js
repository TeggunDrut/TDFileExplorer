const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cubes = [];
let keyArray = [
  {
    id: "grass",
    top: "dirt",
    right: "grass",
    left: "grass",
    back: "grass",
    front: "grass",
    bottom: "dirt",
    dir: "./grass/",
  },
  // {
  //   id: "oak",
  //   top: "oak",
  //   right: "",
  //   left: "",
  //   back: "",
  //   front: "",
  //   bottom: "grass",
  //   dir: "./oak/",
  // },
  {
    id: "dirt",
    top: "grass",
    right: "dirt",
    left: "dirt",
    back: "dirt",
    front: "dirt",
    bottom: "dirt",
    dir: "./dirt/",
  },
];

camera.position.set(5, 15, 15);
camera.rotation.x = -0.6;

let width = 10,
  height = 10,
  depth = 10;

function step() {
  if (cubes.length < 1) {
    // create a random starting position
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    let z = Math.floor(Math.random() * depth);
    // create a new cube
    let cube = new Cube(
      x,
      y,
      z,
      keyArray[Math.floor(Math.random() * keyArray.length)]
    );
    cubes.push(cube);
    camera.lookAt(cube.mesh.position)

  } else {
    let cube = cubes[Math.floor(Math.random() * cubes.length)];
 
    let neighbors = cube.getNeighbors(cubes);
    if (Object.keys(neighbors).length === 6) return;
    if (neighbors.length === 0) {
      // get random direction and object to put there based on if the keys match
      let randomKey = cube.getRandomKey();
      let blockName = randomKey[0];
      let direction = randomKey[1];

      let key;
      keyArray.forEach(k => {
        if(k.id === blockName) key = k;
      });

      switch (direction) {
        case "top":
          var newCube = new Cube(cube.x, cube.y + 1, cube.z, key);
          if(!checkPosition(newCube)) cubes.push(newCube);
          break;
        case "bottom":
          var newCube = new Cube(cube.x, cube.y - 1, cube.z, key);
          if(!checkPosition(newCube)) cubes.push(newCube);
          break;
        case "left":
          var newCube = new Cube(cube.x - 1, cube.y, cube.z, key);
          if(!checkPosition(newCube)) cubes.push(newCube);
          break;
        case "right":
          var newCube = new Cube(cube.x + 1, cube.y, cube.z, key);
          if(!checkPosition(newCube)) cubes.push(newCube);
          break;
        case "front":
          var newCube = new Cube(cube.x, cube.y, cube.z - 1, key);
          if(!checkPosition(newCube)) cubes.push(newCube);
          break;
        case "back":
          var newCube = new Cube(cube.x, cube.y, cube.z + 1, key);
          if(!checkPosition(newCube)) cubes.push(newCube);
          break;
      }
    }
  }
}
function checkPosition(cube) {
  if(cube.x > width || cube.x < 0 || cube.y > height || cube.y < 0 || cube.z > depth || cube.z < 0) return true;
  cubes.forEach(c => {
    if(c.x === cube.x && c.y === cube.y && c.z === cube.z) return true;
  })
  return false;
}

setInterval(step, 1);
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    step();
  }
});
function animate() {
  requestAnimationFrame(animate);
  cubes.forEach((c) => {
    c.update();
  });

  renderer.render(scene, camera);
}

animate();
