class Desktop {
  constructor(html) {
    this.apps = [];
    this.html = html;
  }
  addApp(app) {
    this.apps.push(app);
    this.refresh();
  }
  setSize(cols = 3, rows = Math.floor(window.innerHeight / 100)) {
    this.html.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
    this.html.style.gridTemplateRows = `repeat(${rows}, 100px)`;
  }
  refresh() {
    this.html.innerHTML = "";
    // add icon tp desktop
    this.apps.forEach((app) => {
      let icon = document.createElement("div");
      icon.classList.add("icon");
      if (app.icon) icon.style.backgroundImage = `url(${app.icon})`;
      else icon.style.backgroundImage = `url(https://via.placeholder.com/100)`;
      icon.addEventListener("click", () => {
        app.open();
      });
      this.html.appendChild(icon);
    });
  }
}
