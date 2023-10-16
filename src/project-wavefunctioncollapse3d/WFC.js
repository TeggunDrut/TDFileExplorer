class WaveFunctionCollapse3D {
  constructor(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.grid = [];
    this.meshs = [];
    this.originalMesh = null;
  }
  reverseString(s) {
    let arr = s.split("");
    arr = arr.reverse();
    return arr.join("");
  }
  compareEdge(a, b) {
    return a === this.reverseString(b);
  }
  loadMesh(folderPath, faces) {
    let geom = new THREE.BoxGeometry(1, 1, 1);
    let materialArray = createMaterialArray(folderPath);
    let mesh = new THREE.Mesh(geom, materialArray);

    this.meshs.push({
      geom: geom,
      mat: materialArray,
      mesh: mesh,
      faces: faces,
    });
  }
  init() {
    // Choose random mesh and add it to grid
    let randomMesh = this.meshs[Math.floor(Math.random() * this.meshs.length)];
    let mesh = new THREE.Mesh(randomMesh.geom, randomMesh.mat);

    mesh.position.set(
      Math.floor(Math.random() * this.width),
      Math.floor(Math.random() * this.height),
      Math.floor(Math.random() * this.depth)
    );
    this.grid.push({
      mesh: mesh,
      faces: randomMesh.faces,
    });
    mesh.faces = randomMesh.faces;
    scene.add(mesh);
    this.originalMesh = mesh;
    // ------------- testing ------------------
    // let g = new THREE.BoxGeometry(1, 1, 1);
    // let mesh2 = new THREE.Mesh(g, randomMesh.mat);
    // mesh2.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
    // mesh2.position.y += 1;
    // scene.add(mesh2);
    // this.grid.push(mesh2);
    // console.log(this.getNeighbors(mesh));
    // ------------- testing ------------------
  }
  hasCollapsedFaces(mesh) {
    for (let face of Object.keys(mesh.faces)) {
      if (face.collapsed) {
        console.log("has collapsed faces", face);
        return true;
      }
    }
    return false;
  }
  step() {
    let newGrid = [];

    let availableMeshes = scene.children.filter(
      (mesh) => !this.hasCollapsedFaces(mesh)
    );
    let mesh =
      availableMeshes[Math.floor(Math.random() * availableMeshes.length)];

    let neighbors = this.getNeighbors(mesh);

    // Perform wave function collapse for each face of the mesh
    for (let face of Object.keys(mesh.faces)) {
      let collapsed = false;

      // Check if the face has already been collapsed
      if (!mesh.faces[face].collapsed) {
        console.log("face not collapsed", face);
        let possibleMeshs = this.getPossibleMeshs(mesh.faces[face]);
        // If there are no possible meshes for the face, mark it as collapsed
        if (possibleMeshs.length === 0) {
          mesh.faces[face].collapsed = true;
          console.log(mesh.faces[face]);
          continue;
        }

        // Choose a random mesh from the possible meshes
        let randomMesh =
          possibleMeshs[Math.floor(Math.random() * possibleMeshs.length)];
        let newMesh = new THREE.Mesh(randomMesh.geom, randomMesh.mat);

        // Set the position of the new mesh based on the face and its neighbors
        let newPos = this.setPosition(mesh, newMesh, face, neighbors);
        // Add the new mesh to the new grid
        newGrid.push({
          mesh: newPos,
          faces: randomMesh.faces,
        });
        newPos.faces = randomMesh.faces;
        scene.add(newPos);
        collapsed = true;
      }

      // If the face has been collapsed, copy the mesh from the old grid
      if (!collapsed) {
        let oldMesh = neighbors[face];
        // console.log(neighbors);
        let newMesh = new THREE.Mesh(
          oldMesh.mesh.geometry,
          oldMesh.mesh.material
        );
        newMesh.position.copy(oldMesh.mesh.position);
        newGrid.push({
          mesh: newMesh,
          faces: oldMesh.faces,
        });
        newMesh.faces = oldMesh.faces;
        scene.add(newMesh);
      }
    }
    this.grid = newGrid;
  }

  getNeighbors(mesh) {
    let neighbors = {};
    let pos = mesh.position;
    this.grid.forEach((m) => {
      if (m === null) return;
      let { x: x1, y: y1, z: z1 } = pos;
      let { x: x2, y: y2, z: z2 } = m.mesh.position;
      if (x1 === x2 && z1 === z2 && y1 === y2 - 1) {
        neighbors["top"] = m;
      } else if (x1 === x2 && z1 === z2 && y1 === y2 + 1) {
        neighbors["bottom"] = m;
      } else if (x1 === x2 - 1 && z1 === z2 && y1 === y2) {
        neighbors["right"] = m;
      } else if (x1 === x2 + 1 && z1 === z2 && y1 === y2) {
        neighbors["left"] = m;
      } else if (x1 === x2 && z1 === z2 + 1 && y1 === y2) {
        neighbors["back"] = m;
      } else if (x1 === x2 && z1 === z2 - 1 && y1 === y2) {
        neighbors["front"] = m;
      }
    });
    return neighbors;
  }

  getPossibleMeshs(faceValue) {
    let possibleMeshs = [];
    console.log(faceValue.id);
    for (let mesh of this.meshs) {
      for (let faceKey of Object.keys(mesh.faces)) {
        if (mesh.faces[faceKey] === faceValue) {
          possibleMeshs.push(mesh);
          break; // Stop checking other faces of the same mesh
        }
      }
    }

    return possibleMeshs;
  }

  setPosition(selected, newMesh, face, neighbors) {
    let pos = new THREE.Vector3();
    // Set the position based on the face and its neighbors
    if (face === "top") {
      if (neighbors["bottom"]) {
        pos.copy(neighbors["bottom"].mesh.position);
        pos.y += 1;
      } else {
        // Find a mesh in this.meshs with the same face
        let matchingMesh = this.findMatchingMesh(face);
        if (matchingMesh) {
          pos.copy(selected.position);
          pos.y += 1;
        } else {
          // Handle case when no matching mesh is found
          pos.y = 0; // Set the position at the bottom of the grid
        }
      }
    } else if (face === "bottom") {
      if (neighbors["top"]) {
        pos.copy(neighbors["top"].mesh.position);
        pos.y -= 1;
      } else {
        // Find a mesh in this.meshs with the same face
        let matchingMesh = this.findMatchingMesh(face);
        if (matchingMesh) {
          pos.copy(selected.position);
          pos.y -= 1;
        } else {
          // Handle case when no matching mesh is found
          pos.y = 0; // Set the position at the bottom of the grid
        }
      }
    } else if (face === "left") {
      if (neighbors["right"]) {
        pos.copy(neighbors["right"].mesh.position);
        pos.x -= 1;
      } else {
        // Find a mesh in this.meshs with the same face
        let matchingMesh = this.findMatchingMesh(face);
        if (matchingMesh) {
          pos.copy(selected.position);
          pos.x -= 1;
        } else {
          // Handle case when no matching mesh is found
          pos.x = 0; // Set the position at the left side of the grid
        }
      }
    } else if (face === "right") {
      if (neighbors["left"]) {
        pos.copy(neighbors["left"].mesh.position);
        pos.x += 1;
      } else {
        // Find a mesh in this.meshs with the same face
        let matchingMesh = this.findMatchingMesh(face);
        if (matchingMesh) {
          pos.copy(selected.position);
          pos.x += 1;
        } else {
          // Handle case when no matching mesh is found
          pos.x = 0; // Set the position at the left side of the grid
        }
      }
    } else if (face === "back") {
      if (neighbors["front"]) {
        pos.copy(neighbors["front"].mesh.position);
        pos.z -= 1;
      } else {
        // Find a mesh in this.meshs with the same face
        let matchingMesh = this.findMatchingMesh(face);
        if (matchingMesh) {
          pos.copy(selected.position);
          pos.z -= 1;
        } else {
          // Handle case when no matching mesh is found
          pos.z = 0; // Set the position at the back side of the grid
        }
      }
    } else if (face === "front") {
      if (neighbors["back"]) {
        pos.copy(neighbors["back"].mesh.position);
        pos.z += 1;
      } else {
        // Find a mesh in this.meshs with the same face
        let matchingMesh = this.findMatchingMesh(face);
        if (matchingMesh) {
          pos.copy(selected.position);
          pos.z += 1;
        } else {
          // Handle case when no matching mesh is found
          pos.z = 0; // Set the position at the back side of the grid
        }
      }
    }
    newMesh.position.copy(pos);
    return newMesh;
  }

  findMatchingMesh(face) {
    for (let mesh of this.meshs) {
      if (mesh.faces[face] !== undefined) {
        return mesh.mesh;
      }
    }
    return null; // Return null if no matching mesh is found
  }

  getNeighborConstraints(face, neighbors) {
    let neighborConstraints = {};

    for (let neighborFace of Object.keys(neighbors)) {
      let neighborMesh = neighbors[neighborFace];

      if (neighborMesh !== undefined) {
        let constraint = neighborMesh.faces[neighborFace].id;
        neighborConstraints[neighborFace] = constraint;
      }
    }

    return neighborConstraints;
  }
}
