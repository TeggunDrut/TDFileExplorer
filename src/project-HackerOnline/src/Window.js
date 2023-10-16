class Window {
  constructor(ele) {
    this.window = ele;
    if (this.window) this.init();

    this.window.addEventListener("click", this.click.bind(this));
    this.window.addEventListener("dblclick", this.dblclick.bind(this));
    this.window.addEventListener("mousedown", this.mousedown.bind(this));
    this.window.addEventListener("mouseup", this.mouseup.bind(this));
    this.window.addEventListener("mousemove", this.mousemove.bind(this));
    this.window.addEventListener("resize", this.resize.bind(this));

    this.apps = [];
  }
  init() {
    let styles = this.window.style;
    styles.position = "absolute";
    styles.left = "0px";
    styles.top = "0px";
    styles.width = "100%";
    styles.height = "100%";
    styles.backgroundSize = "cover";
    styles.backgroundPosition = "center";
    styles.backgroundRepeat = "no-repeat";
    styles.zIndex = "0";
  }
  click() {}
  dblclick() {}
  mousedown() {}
  mouseup() {}
  mousemove() {}
  resize() {
    let oldX = this.window.style.width;
    let oldY = this.window.style.height;
    this.window.style.width = window.innerWidth + "px";
    this.window.style.height = window.innerHeight + "px";
    this.apps.forEach((app) => {
      app.style.width =
        parseInt(app.style.width) * (window.innerWidth / oldX) + "px";
      app.style.height =
        parseInt(app.style.height) * (window.innerHeight / oldY) + "px";
    });
  }
  addApp(app) {
    this.apps.push(app);
  }
  refresh() {
    this.apps.forEach((app) => {
      // change z-indexs to make sure the focused app is on top
      if (app.focused) {
        app.html.style.zIndex = 1;
        app.html.classList.add("app-selected");
      } else {
        app.html.style.zIndex = 0;
        app.html.classList.remove("app-selected");
      }
    });
  }
  createDesktop() {
    let desktop = document.createElement("div");
    desktop.setAttribute("class", "desktop");
    desktop.setAttribute("id", "desktop");

    // get amount of possuble columns
    let columns = 3;
    let rows = Math.floor(window.innerHeight / 100);

    // create grid
    desktop.style.display = "grid";
    desktop.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
    desktop.style.gridTemplateRows = `repeat(${rows}, 100px)`;

    this.window.appendChild(desktop);

    this.desktop = new Desktop(desktop);

    return this.desktop;
  }
  removeApp(app) {
    this.apps.splice(this.apps.indexOf(app), 1);
    app.html.remove();
    this.refresh();
  }
}
