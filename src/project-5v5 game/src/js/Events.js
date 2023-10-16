document.addEventListener("keydown", (e) => {
  keyState[e.key] = true;
  if (e.key == 1) {
    player.heldGun = player.primaryGun;
  } else if (e.key == 2) {
    player.heldGun = player.secondaryGun;
  }
  if (e.key == "Escape") {
    closeMenus();
  }
  if (e.key == "j") {
    currentMap.objects.forEach((e) => {
      if (e.name == "siteB") {
        Entities.push(
          new AIPlayer(
            currentMap.x + e.x + e.w / 2,
            currentMap.y + e.y + e.h / 2,
            30,
            "easy"
          )
        );
      }
    });
  }
});
document.addEventListener("keyup", (e) => {
  keyState[e.key] = false;
});
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.getElementById("options").onclick = () => {
  if (!menusOpen.options) {
    menusOpen.options = true;
    openMenu("options");
  } else {
    closeMenus();
    menusOpen.options = false;
  }
};
document.addEventListener("mousedown", (e) => {
  shoot();
});
document.addEventListener("mouseup", (e) => {
  mouseDown = false;
  clearInterval(fireloop);
  firing = false;
  firstShot = true;
});
