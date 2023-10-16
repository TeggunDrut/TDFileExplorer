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

camera.position.set(5, 15, 15);
camera.rotation.x = -0.6;

const grassFace = {
  front: { id: "AAC" },
  back: { id: "AAC" },
  left: { id: "AAC" },
  top: { id: "AAA" },
  right: { id: "AAC" },
  bottom: { id: "ABA" },
};
const dirtFace = {
  front: { id: "ABA" },
  back: { id: "ABA" },
  left: { id: "ABA" },
  right: { id: "ABA" },
  top: { id: "ABA" },
  bottom: { id: "ABA" },
};
const oakFace = {
  front: { id: "BAA" },
  back: { id: "BAA" },
  left: { id: "BAA" },
  right: { id: "BAA" },
  top: { id: "CAA" },
  bottom: { id: "AAA" },
};

const dimensions = { width: 10, height: 10, depth: 10 };
const wfc = new WaveFunctionCollapse3D(
  dimensions.width,
  dimensions.height,
  dimensions.depth
);
wfc.loadMesh("./grass/", grassFace);
wfc.loadMesh("./dirt/", grassFace);
wfc.loadMesh("./oak/", oakFace);

wfc.init();
const original = wfc.originalMesh;
function animate() {
  requestAnimationFrame(animate);

  // rotate camera around the scene
  camera.position.x = Math.cos(Date.now() * 0.001) * 15;
  camera.position.z = Math.sin(Date.now() * 0.001) * 15;
  camera.lookAt(original.position);

  renderer.render(scene, camera);
}
animate();

setInterval(() => {wfc.step()}, 500)