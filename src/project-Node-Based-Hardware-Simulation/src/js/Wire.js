class Wire {
  constructor(startparent, endParent, color) {
    this.startParent = startparent;
    this.endParent = endParent;
    this.color = color;
  }
  update() {
    if(this.startParent.powered) {
      this.endParent.powered = true;
    } else if(this.startParent.powered == false) {
      this.endParent.powered = false;
    }
    
  }
  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    if (this.startParent.x == this.startParent.parent.x) {
      ctx.moveTo(this.startParent.x - this.startParent.r, this.startParent.y);
      
    } else { //
      ctx.moveTo(this.startParent.x + this.startParent.r, this.startParent.y);
    }
    // if()
    if (this.endParent.x == this.endParent.parent.x) {
      ctx.lineTo(this.endParent.x - this.endParent.r, this.endParent.y);
      
    } else {
      ctx.lineTo(this.endParent.x + this.endParent.r, this.endParent.y);
    }
    ctx.stroke();

  }
}