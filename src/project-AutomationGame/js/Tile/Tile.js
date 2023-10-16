class Tile {
  constructor(path, width, height, parent) {
    this.path = path === null ? "sprites/Template-16x16.png" : path;
    this.parent = parent;

    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;

    const sprite = new Sprite(this.path, this.width, this.height);
    this.sprite = sprite;
  }
  draw(width, height) {
    ctx.drawImage(
      this.sprite.img,
      this.x,
      this.y,
      width !== undefined ? width : this.width,
      height !== undefined ? height : this.height
    );
  }
}
