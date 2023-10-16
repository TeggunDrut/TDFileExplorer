class NodeElement {
  constructor(x, y, w, h, name) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.focused = false;
    this.dragging = false;

    this.setRel = false;
    this.relativeX;
    this.relativeY;

    this.draggable = true;

    this.mouseDownAndNotOver = false;

    this.name = name;

    this.nodes = [];

  }
  getMouseOver(mouse) {
    return (
      mouse.x > this.x &&
      mouse.x < this.x + this.w &&
      mouse.y > this.y &&
      mouse.y < this.y + this.h
    );
  }
  updateNodes() { }
  drawNodes(ctx) {
    
    this.nodes.forEach(node => {
      node.draw(ctx);
    });
  }
  drag(x, y) {
    // apply zoom
    this.x = x - this.relativeX;
    this.y = y - this.relativeY;
  }
  draw(ctx) {
    // this.drawNodes(ctx);
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.font = '12px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.name, this.x + this.w / 2, this.y + this.h / 2);
    // draw line around the edge to show if it is focused
    if (this.focused) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
    // draw name centered on the box
    
    
  }
  remove() {
    this.nodes.forEach(node => {
      nodes.splice(nodes.indexOf(node), 1);
    });
    nodeElements.splice(nodeElements.indexOf(this), 1);
  }
  update(mouse, nodeList) {
    if (mouse.down && !this.getMouseOver(mouse) && !this.dragging) {
      this.draggable = false;
    }
    if (this.dragging && this.draggable) {
      if (mouse.down && this.focused) {
        this.drag(mouse.x, mouse.y);
        this.dragging = true;
        // show the grid box around the element
        ctx.beginPath();
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 3;
        // draw a rect at the grid box location where the box is being dragged
        for(let i = 0; i < canvas.width; i += gridSize) {
          // check if x is in the range of the grid
          for(let j = 0; j < canvas.height; j += gridSize) {
            // check if y is in the range of the grid
            if (this.x >= i && this.x < i + gridSize && this.y >= j && this.y < j + gridSize) {
              ctx.rect(i, j, gridSize, gridSize);
            }
          }
        }
        ctx.stroke();
        ctx.closePath();

      }
    }
    if (this.getMouseOver(mouse)) {
      if (mouse.down && this.draggable) {
        if (!this.setRel) {
          this.relativeX = mouse.x - this.x;
          this.relativeY = mouse.y - this.y;
        }
        nodeList.forEach((node) => {
          if(nodeList.length == 1) {
            if(node == this) {
              this.focused = true;
            }
          }
          if (node != this && node.focused != true) {
            node.focused = false;
            this.focused = true;
          }
          else if (node != this && node.focused == true) {
            // node.focused = false;
            this.focused = false;
          }
        });
        this.setRel = true;
        
        if (this.focused && this.draggable) {
          this.drag(mouse.x, mouse.y);
          this.dragging = true;
        }
        

      }
    }
    if (mouse.down == false) {
      nodeElements.forEach(ne => {
        if(this.dragging && !mouse.down)
          if(this != ne && this.x == ne.x && this.y == ne.y) {
            ne.x+= 100;
            
          }
      })
      this.setRel = false;
      this.mouseDragging = false;
      this.relativeX = 0;
      this.relativeY = 0;
      this.setPos = false;
      this.dragging = false;
      this.draggable = true;
      this.focused = false;
      this.mouseDownAndNotOver = false;
    }
    this.updateNodes();

  }
}
