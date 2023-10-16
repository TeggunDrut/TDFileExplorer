class Not extends NodeElement {
  constructor(x, y, w, h, name) {
    super(x, y, w, h, name);
    this.nodes = [
      new Node(this, 0, this.h / 2, 7, true),
      new Node(this, this.w, this.h / 2, 7, true),
    ];
    this.wireStart = {};
    this.wireEnd = {};
    this.startedDraggingWire = false;
    this.wireDraggable = false;
    this.selectedNode = null;
    this.createdWire = false;
    this.mouseDownAndNotOver = false;

    nodes.push(this.nodes[0], this.nodes[1]);
  }

  updateNodes(mouse) {
    if (this.nodes[0].powered) {
      this.nodes[1].powered = true;
    } else if(this.nodes[0].powered == false) {
      this.nodes[1].powered = true;
    }

    let count = 0;
    if (mouse) {
      nodes.forEach((node) => {
        if (
          !node.mouseOver(mouse.x, mouse.y) &&
          mouse.down &&
          !this.startedDraggingWire
        ) {
          count++;
          if (count == nodes.length) {
            this.mouseDownAndNotOver = true;
            return;
          }
        }
      });

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
                  let wire = new Wire(this.wireStart.node, node, "yellow");
                  node.hasWire = true;
                  node.connectedWire = wire;
                  if (wires.length <= 0) {
                    wires.push(wire);
                  } else {
                    wires.forEach((w) => {
                      count++;
                      if (
                        (wire.startParent == w.startParent &&
                          wire.endParent == w.endParent) ||
                        (wire.startParent == w.endParent &&
                          wire.endParent == w.startParent)
                      ) {
                        wires.splice(wires.indexOf(w), 1);
                      }
                      if (count == wires.length) {
                        wires.push(wire);
                      }
                    });
                  }
                }
              }
            });
          });
        });
      }
    }
    if (
      this.startedDraggingWire &&
      mouse &&
      this.mouseDownAndNotOver == false
    ) {
      this.wireEnd.x = mouse.x;
      this.wireEnd.y = mouse.y;
      // draw wire
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "yellow";
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