const buyMenu = {
  items: [1, 2, 3, 4, 5],
  open: false,
  update: function () {
    document.body.style.cursor = "default";
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, game.width, game.height);
    
  }
}