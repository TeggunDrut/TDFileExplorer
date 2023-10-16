class Map {
  constructor(map) {
    this.grid = map;
    this.width = this.grid[0].length;
    this.height = this.grid.length;
  }
  draw() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].x = j * SIZEX;
        this.grid[i][j].y = i * SIZEY;
        this.grid[i][j].width = SIZEX;
        this.grid[i][j].height = SIZEY;
        this.grid[i][j].draw();
      }
    }
  }
}
