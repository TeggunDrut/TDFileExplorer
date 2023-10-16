class Button extends NodeElement {
  constructor(x, y, width, height, name, text, onClick) {
    super(x, y, width, height, name);
    this.text = text;
    this.onClick = onClick;
    this.nodes = [
      new Node(this, this.w, this.h / 2, 7, false),
    ];
    this.pressed = false;
    this.count = 0;
  }
  draw() {
    if (this.pressed)
      ctx.fillStyle = "rgb(0, 255, 0)";
    else
      ctx.fillStyle = "rgb(0, 0, 0)";
    
    // ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(this.text, this.x + this.w / 2 - ctx.measureText(this.text).width / 2, this.y + this.h / 2 + 5);

  }
  updateNodes(mouse) {
    if(mouse)
      if (mouse.down && this.getMouseOver(mouse)) {
        this.pressed = true;
        mouse.down = false;
      }
    this.count++;
    if (this.count >= 20) {
      this.pressed = false;
      this.count = 0;
    }

    let count = 0;
    if (mouse) {
      nodes.forEach(node => {
        if (!node.mouseOver(mouse.x, mouse.y) && mouse.down && !this.startedDraggingWire) {
          count++;
          if (count == nodes.length) {
            this.mouseDownAndNotOver = true;
            return;
          }
        }
      })

      if (!mouse.down && this.startedDraggingWire) {
        this.startedDraggingWire = false;
        this.wireEnd = {
          x: mouse.x,
          y: mouse.y,
        };
        nodeElements.forEach((ne) => {
          this.nodes.forEach((node) => {
            if (
              node.x == this.wireStart.x - node.r &&
              node.y == this.wireStart.y
            ) {
              this.selectedNode = node;
            }
          });
          ne.nodes.forEach((node) => {
            if (
              node.x == this.wireStart.x - node.r &&
              node.y == this.wireStart.y
            ) {
              this.selectedNode = node;
            }
            this.nodes.forEach((parentNode) => {
              if (
                node != this &&
                node != parentNode &&
                node.mouseOver(this.wireEnd.x, this.wireEnd.y)
              ) {
                let count = 0;
                if (!this.createdWire) {
                  this.wireEnd.node = node;
                  this.createdWire = true;
                  let wire = new Wire(this.wireStart.node, node, 'yellow');
                  node.hasWire = true;
                  node.connectedWire = wire;
                  if (wires.length <= 0) {
                    wires.push(wire);
                    
                  } else {
                    wires.forEach(w => {
                      count++;
                      if ((wire.startParent == w.startParent &&
                        wire.endParent == w.endParent)
                        || 
                        (wire.startParent == w.endParent &&
                        wire.endParent == w.startParent)
                      ) {
                        wires.splice(wires.indexOf(w), 1);
                      } 
                      if (count == wires.length) {
                        wires.push(wire);
                      }
                    })

                  }
                }
              }
            });
          });
        });
      }
    }
    if (this.startedDraggingWire && mouse && this.mouseDownAndNotOver == false) {
      this.wireEnd.x = mouse.x;
      this.wireEnd.y = mouse.y;
      // draw wire
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'yellow';
      ctx.moveTo(this.wireStart.x, this.wireStart.y);
      ctx.lineTo(this.wireEnd.x, this.wireEnd.y);
      ctx.stroke();
      ctx.closePath();
    }
    if (mouse)
      if (!mouse.down) {
        this.startedDraggingWire = false;
        this.createdWire = false;
      }
    this.nodes.forEach((n) => {
      if (mouse && this.mouseDownAndNotOver == false)
      if (
          mouseOver(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2, mouse.x, mouse.y) &&
          mouse.down &&
          !this.startedDraggingWire &&
          !n.parent.dragging
      ) {
          this.startedDraggingWire = true;
          n.parent.draggable = false;
          if (n.x == n.parent.x) {
            this.wireStart = {
              node: n,
              x: n.x - n.r,
              y: n.y,
            };
          } else {
            this.wireStart = {
              node: n,
              x: n.x + n.r,
              y: n.y,
            };
          }
        }
    });

    this.nodes.forEach((node) => {
      node.update();
    });
  }
}