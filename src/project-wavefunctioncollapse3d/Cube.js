class Cube {
  constructor(x, y, z, keys) {
    this.x = x;
    this.y = y;
    this.z = z;
    // example:
    // {
    //    top: "oak",
    //    right: "grass",
    //    "left", "grass",
    //    "back": "grass",
    //    "front": "grass",
    //    "bottom": "grass"
    // }
    this.keys = keys;
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0 });
    if (this.keys === undefined) {
      // this.isAir = true;
      this.material.transparent = true;
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(this.x, this.y, this.z);
      scene.add(this.mesh);

      // return;
    } else {
      const materialArray = createMaterialArray(this.keys.dir);
      this.mesh = new THREE.Mesh(this.geometry, materialArray);
      this.mesh.position.set(this.x, this.y, this.z);
      scene.add(this.mesh);
    }
  }
  update() {
    if (!this.isAir) this.mesh.position.set(this.x, this.y, this.z);
  }
  getNeighbors(boxes) {
    let neighbors = [];
    boxes.forEach((box) => {
      let x1 = this.x,
        y1 = this.y,
        z1 = this.z,
        x2 = box.x,
        y2 = box.y,
        z2 = box.z;

      if (x1 === x2 && z1 === z2 && y1 === y2 - 1) neighbors["top"] = box;
      else if (x1 === x2 && z1 === z2 && y1 === y2 + 1)
        neighbors["bottom"] = box;
      else if (x1 === x2 - 1 && z1 === z2 && y1 === y2)
        neighbors["right"] = box;
      else if (x1 === x2 + 1 && z1 === z2 && y1 === y2 - 1)
        neighbors["left"] = box;
      else if (x1 === x2 && z1 === z2 + 1 && y1 === y2) neighbors["back"] = box;
      else if (x1 === x2 && z1 === z2 - 1 && y1 === y2)
        neighbors["front"] = box;
    });
    return neighbors;
  }
  getRandomKey() {
    if(this.keys === undefined) return [{}, null];
    let keys = Object.keys(this.keys);
    let randomKey;
    while (true) {
      randomKey = keys[Math.floor(Math.random() * 6) + 1];
      if(randomKey !== '') break;
      else console.log(randomKey)
    }
    return [this.keys[randomKey], randomKey];
  }
}
