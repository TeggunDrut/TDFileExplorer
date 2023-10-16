class Machine {
  constructor(options) {
    for (const key in options) {
      this[key] = options[key];
    }

    this.path === undefined
      ? (this.path = "sprites/Template-16x16.png")
      : (this.path = options.path);
    this.img = new Image();
    this.img.src = this.path;
    this.realX = this.x * SIZEX;
    this.realY = this.y * SIZEY;
  }
  draw() {
    ctx.drawImage(this.img, this.x * SIZEX, this.y * SIZEY, SIZEX, SIZEY);
  }
  update() {
    
  }
}
