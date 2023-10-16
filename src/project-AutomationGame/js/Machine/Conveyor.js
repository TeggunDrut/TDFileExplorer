class Conveyor extends Machine {
  constructor(options) {
    super(options);
    this.defaults = {
      interval: 5,
      max: 1,
      speed: 4,
      direction: "right",
      map: null,
      path: "sprites/Template-16x16.png",
      radius: 50,
      moveCount: 1,
    };

    for (const key in this.defaults) {
      if (this[key] === undefined) {
        this[key] = this.defaults[key];
      }
    }
    this.img = new Image();
    this.img.src = this.path;

    // this.neighbors = [];
    // if (this.map !== null) {
    //   // if (this.map.map[this.y - 1][this.x] !== undefined)
    //   //   this.neighbors.push(this.map.map[this.y - 1][this.x]);
    //   // if (this.map.map[this.y + 1][this.x] !== undefined)
    //   //   this.neighbors.push(this.map.map[this.y + 1][this.x]);
    //   // if (this.map.map[this.y][this.x - 1] !== undefined)
    //   //   this.neighbors.push(this.map.map[this.y][this.x - 1]);
    //   // if (this.map.map[this.y][this.x + 1] !== undefined)
    //   //   this.neighbors.push(this.map.map[this.y][this.x + 1]);
    //   // for (let i = 0; i < this.neighbors.length; i++) {
    //   //   if (this.neighbors[i] instanceof Conveyor) {
    //   //     if (this.neighbors[i].direction === this.direction) {
    //   //       console.log(true, this.neighbors[i]);
    //   //     } else {
    //   //       console.log(false, this.neighbors[i]);
    //   //     }
    //   //   } else {
    //   //     console.log(false, this.neighbors[i]);
    //   //   }
    //   // }
    // }

    this.tick = 0;

    this.items = [];
  }
  moveItem(itemCount) {
    let machineNeighbor = null;
    machines.forEach((machine) => {
      if (machine === this) return;
      switch (this.direction) {
        case "up":
          if (machine.x === this.x && machine.y === this.y - 1)
            machineNeighbor = machine;
          break;
        case "right":
          if (machine.x === this.x + 1 && machine.y === this.y)
            machineNeighbor = machine;
          break;
        case "down":
          if (machine.x === this.x && machine.y === this.y + 1)
            machineNeighbor = machine;
          break;
        case "left":
          if (machine.x === this.x - 1 && machine.y === this.y)
            machineNeighbor = machine;
          break;
      }
    });
    for (let count = 0; count < itemCount; count++)
      if (this.items.length > 0) {
        let randomItem =
          this.items[Math.floor(Math.random() * this.items.length)];

        switch (this.direction) {
          case "up":
            randomItem.move(this.direction, { x: this.x, y: this.y - 1 });
            if (machineNeighbor !== null)
              machineNeighbor.items.push(randomItem);
            this.items.splice(this.items.indexOf(randomItem), 1);
            break;
          case "right":
            randomItem.move(this.direction, { x: this.x + 1, y: this.y });
            if (machineNeighbor !== null)
              machineNeighbor.items.push(randomItem);
            this.items.splice(this.items.indexOf(randomItem), 1);
            break;
          case "down":
            randomItem.move(this.direction, { x: this.x, y: this.y + 1 });
            if (machineNeighbor !== null)
              machineNeighbor.items.push(randomItem);
            this.items.splice(this.items.indexOf(randomItem), 1);
            break;
          case "left":
            randomItem.move(this.direction, { x: this.x - 1, y: this.y });
            if (machineNeighbor !== null)
              machineNeighbor.items.push(randomItem);
            this.items.splice(this.items.indexOf(randomItem), 1);
            break;
        }
      }
  }
  update() {
    // this.neighbors = [];
    // machines.forEach((machine) => {
    //   if (machine === this) return;
    //   if (machine.x === this.x && machine.y === this.y - 1)
    //     this.neighbors.push(machine);
    //   if (machine.x === this.x && machine.y === this.y + 1)
    //     this.neighbors.push(machine);
    //   if (machine.x === this.x - 1 && machine.y === this.y)
    //     this.neighbors.push(machine);
    //   if (machine.x === this.x + 1 && machine.y === this.y)
    //     this.neighbors.push(machine);
    // });

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].draw();
      this.items[i].update();
    }
    if (this.tick >= this.interval) {
      this.tick = 0;
    }
    this.tick++;
  }
}
