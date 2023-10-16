window.onload = init;
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mousedown", (e) => {
  mouse.down = true;
});
window.addEventListener("mouseup", (e) => {
  mouse.down = false;
});
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});
window.onresize = () => {
  onResize();
};