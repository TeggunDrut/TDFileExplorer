class OreCollector extends Machine {
  constructor(options) {
    super(options);

    this.defaults = {
      interval: 5,
      max: 10,
      ore: "iron",
      speed: 4,
      count: 1,
      path: "sprites/Template-16x16.png",
    };
    for (const key in this.defaults) {
      if (this[key] === undefined) {
        this[key] = this.defaults[key];
      }
    }

    this.tick = 0;
    this.items = [];
    this.produced = 0;
  }
  makeItem(count = 1) {
    for (let i = 0; i < count; i++) {
      let item = new Item({
        x: this.x,
        y: this.y,
        vx: rand(-this.speed, this.speed),
        vy: rand(-this.speed, this.speed),
        parent: this,
        machines: machines,
      });
      items.push(item);
    }
    this.produced += count;
  }
  update() {
    // console.log(this.items);
    if (this.tick >= this.interval) {
      this.tick = 0;
      if (this.items.length < this.max && this.produced < this.max) {
        this.makeItem(this.count);
      }
    }
    this.tick++;
  }
}
