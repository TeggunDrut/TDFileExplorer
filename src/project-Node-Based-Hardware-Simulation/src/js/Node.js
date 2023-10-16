class Node {
  constructor(parent, x, y, r, powered) {
    this.parent = parent;
    this.oX = x;
    this.oY = y;
    this.x = parent.x + x;
    this.y = parent.y + y;
    this.r = r;
    this.powered = powered;
    this.mouseDown = false;
    this.dragging = false;
    this.focused = false;

    this.hasWire = false;
    this.connectedWire = null;

    if (this.parent.nodes)
      if (this.parent.nodes.length == 0) {
        this.parent.nodes.push(this);
      } else {
        this.parent.nodes.forEach((node) => {
          if (node == this) {
            if (node.parent.nodes.length == 1) {
              return;
            }
          } else {
            node.parent.nodes.push(this);
          }
        });
      }
  }

  update(mouse, nodes, ctx) {
    this.x = this.parent.x + this.oX;
    this.y = this.parent.y + this.oY;
    let count = 0;
    if (wires.length == 0 && this.connectedWire != undefined) {
      this.connectedWire = null;
      this.hasWire = false;
    }
    wires.forEach((wire) => {
      if (this.connectedWire != wire) {
        count++;
        if (count == wires.length) {
          this.connectedWire = null;
          this.hasWire = false;
        }
      }
    });
    if (this.connectedWire != null) {
      if (this.connectedWire.startParent != this) {
        if (this.connectedWire.startParent.powered) {
          this.powered = true;
        } else {
          if (this.parent instanceof And) {
            if (this.parent.nodes[2] == this) {
              return;
            }
          }
          // this.powered = false;
        }
      } else if (this.connectedWire.startParent == this) {
        if (this.parent instanceof Switch) {
          if (this.parent.powered) {
            this.connectedWire.endParent.powered = true;
          } else {
            this.connectedWire.endParent.powered = false;
          }
        }
      }
    } else {
      if (!(this.parent instanceof Switch)) {
        if (this.parent instanceof And) {
          if (this.parent.nodes[2] == this) {
            // checks if both inputs are powered
            if (this.parent.nodes[0].powered && this.parent.nodes[1].powered) {
              return;
            }
          }
        }
        if (this.parent instanceof Or) {
          if (this.parent.nodes[2] == this) {
            // checks if both inputs are powered
            if (this.parent.nodes[0].powered || this.parent.nodes[1].powered) {
              return;
            }
          }
        }
        if (this.parent instanceof XOr) {
          if (this.parent.nodes[2] == this) {
            // checks if both inputs are powered
            if (this.parent.nodes[0].powered && this.parent.nodes[1].powered) {
              this.powered = false;
              return;
            }
            if (this.parent.nodes[0].powered || this.parent.nodes[1].powered) {
              return;
            }
          }
        }

        if (this.parent instanceof Not) {
          if (this.parent.nodes[1] == this) {
            if (this.parent.nodes[0].powered == true) {
              this.powered = false;
              return;
            }
            if (this.parent.nodes[0].powered == false) {
              return;
            }
          }
        }

        if (this.parent instanceof NAnd) {
          if (this.parent.nodes[2] == this) {
            if (
              this.parent.nodes[0].powered == false &&
              this.parent.nodes[1].powered == false
            ) {
              return;
            }

            if (
              (this.parent.nodes[0].powered == true &&
                this.parent.nodes[1].powered == false) ||
              (this.parent.nodes[0].powered == false &&
                this.parent.nodes[1].powered == true)
            ) {
              return;
            }

            if (this.parent.nodes[0].powered && this.parent.nodes[1].powered) {
              this.powered = false;
              return;
            }
          }
        }
        if (this.parent instanceof NOr) {
          if (this.parent.nodes[2] == this) {
            if (
              this.parent.nodes[0].powered == false &&
              this.parent.nodes[1].powered == false
            ) {
              return;
            }
            if (this.parent.nodes[0].powered || this.parent.nodes[1].powered) {
              this.powered = false;
              return;
            }
            if (this.parent.nodes[0].powered && this.parent.nodes[1].powered) {
              this.powered = false;
              return;
            }
          }
        }
        if (this.parent instanceof XNOr) {
          if (this.parent.nodes[2] == this) {
            if (
              this.parent.nodes[0].powered == false &&
              this.parent.nodes[1].powered == false
            ) {
              return;
            } else 
            if (this.parent.nodes[0].powered && this.parent.nodes[1].powered) {
              this.powered = true;
              return;
            }
            if (this.parent.nodes[0].powered || this.parent.nodes[1].powered) {
              this.powered = false;
              return;
            }

          }
        }
        //if the above returns, then the node stays powered
        this.powered = false;
      } else if (this.parent instanceof Switch) {
        if (this.parent.powered) {
          this.powered = true;
        } else if (this.parent.powered == false) {
          // if (wires.length != 0) {
          //   let count = 0;
          //   wires.forEach(wire => {
          //     if(wire)
          //   })

          // }
          this.powered = false;
        }
      }
    }
  }
  draw(ctx) {
    if (this.parent != undefined) {
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.strokeStyle = "lightgray";

      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.stroke();
      if (this.powered) {
        ctx.fillStyle = "green";
        ctx.fill();
      } else {
        if (
          this.parent instanceof Not &&
          this.parent.nodes[1] == this &&
          this.parent.nodes[0].powered == false
        ) {
          ctx.fillStyle = "green";
          ctx.fill();
        } else if (
          this.parent instanceof NAnd &&
          this.parent.nodes[2] == this &&
          this.parent.nodes[0].powered == false &&
          this.parent.nodes[1].powered == false
        ) {
          ctx.fillStyle = "green";
          ctx.fill();
        } else if (
          this.parent instanceof NOr &&
          this.parent.nodes[2] == this &&
          this.parent.nodes[0].powered == false &&
          this.parent.nodes[1].powered == false
        ) {
          ctx.fillStyle = "green";
          ctx.fill();
        } else if (
          (this.parent instanceof XNOr &&
            this.parent.nodes[2] == this &&
            this.parent.nodes[0].powered == false &&
            this.parent.nodes[1].powered == false) ||
          (this.parent.nodes[0].powered &&
            this.parent.nodes[1].powered)
        ) {
          ctx.fillStyle = "green";
          ctx.fill();
        } else {
          ctx.fillStyle = "red";
          ctx.fill();
        }
      }
    }
  }
  mouseOver(x, y) {
    return (
      x > this.x - this.r &&
      x < this.x + this.r &&
      y > this.y - this.r &&
      y < this.y + this.r
    );
  }
}
