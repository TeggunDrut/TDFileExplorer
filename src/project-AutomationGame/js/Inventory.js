
class Inventory {
  constructor(size, arr) {
    this.items = new Array(size);
    this.img = new Image();
    this.img.src = "sprites/inventory.png";
    arr !== undefined ? (this.items = arr) : null;
  }
  draw() {
    ctx.drawImage(
      this.img,
      width / 2 - SIZEX * 16,
      height - 100,
      SIZEX * 32,
      SIZEY * 2
    );
  }
  setItem(item, index) {
    this.items[index] = item;
  }
  getItem(index) {
    return this.items[index];
  }
  removeItem(index) {
    this.items[index] = null;
  }
}
