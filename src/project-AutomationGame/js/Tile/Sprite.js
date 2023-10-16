class Sprite {
  constructor(path, width, height) {
    this.path = path;
    this.width = width;
    this.height = height;
    this.img = null;
    this.createImage();
  }
  createImage() {
    const img = new Image();
    img.src = this.path;
    img.width = this.width;
    img.height = this.height;
    this.img = img;
  }
}