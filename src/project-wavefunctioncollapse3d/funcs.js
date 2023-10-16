function createPathStrings(basePath) {
  const baseFilename = basePath;
  const fileType = ".png";
  const sides = ["front", "back", "top", "bottom", "right", "left"];
  const pathStings = sides.map((side) => {
    return baseFilename + "" + side + fileType;
  });

  return pathStings;
}
function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);

    return new THREE.MeshBasicMaterial({ map: texture });
  });
  return materialArray;
}
