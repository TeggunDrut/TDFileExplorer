class LightRGBA extends Light {
  constructor(x, y, width, height, name, powered, color) {
    super(x, y, width, height, name, powered, color);
    this.color = color;
    
  }
  draw() {
    if (this.powered) ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
    else if (!this.powered) ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);

    // draw line around the edge to show if it is focused
    if (this.focused) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
  }
}