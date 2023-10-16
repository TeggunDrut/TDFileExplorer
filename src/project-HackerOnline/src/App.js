async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

class App {
  constructor(parentWindow, name, icon, programSrc) {
    this.parentWindow = parentWindow;
    this.app = name;
    this.programSrc = programSrc;

    if (icon) {
      this.icon = icon;
    }

    if (this.app) this.init();

    this.focused = false;
    this.closed = true;
    this.minimized = false;
    this.resizeDisabled = false;
  }
  createHTML() {
    this.newApp = document.createElement("div");
    this.newApp.setAttribute("class", "app");
    this.newApp.style.width = window.innerWidth / 2 + "px";
    this.newApp.style.height = window.innerHeight / 2 + "px";

    this.newApp.style.left = `${window.innerWidth / 4}px`;
    this.newApp.style.top = `${window.innerHeight / 4}px`;

    this.newAppTitle = document.createElement("div");
    this.newAppTitle.setAttribute("class", "titleBar");

    this.newAppTitleText = document.createElement("p");
    this.newAppTitleText.innerText = this.app;

    this.buttonList = document.createElement("div");
    this.buttonList.setAttribute("class", "appButtons");

    this.appClose = document.createElement("div");
    this.appClose.setAttribute("class", "appBtn"),
      (this.appClose.style.backgroundColor = "red");

    this.appMinimize = document.createElement("div");
    this.appMinimize.setAttribute("class", "appBtn"),
      (this.appMinimize.style.backgroundColor = "green");

    this.appMaximize = document.createElement("div");
    this.appMaximize.setAttribute("class", "appBtn"),
      (this.appMaximize.style.backgroundColor = "yellow");

    this.appBody = document.createElement("div");
    this.appBody.setAttribute("class", "appBody");
  }
  setupEventListeners() {
    let dragging = false;
    let offset = { x: 0, y: 0 };

    this.appBody.addEventListener("mousedown", (e) => {
      this.focused = true;
      this.parentWindow.refresh();
      this.parentWindow.apps.forEach((app) => {
        if (app !== this) {
          app.focused = false;
        }
      });
    });

    this.newAppTitle.addEventListener("mousedown", (e) => {
      dragging = true;
      offset.x = e.clientX - this.newApp.offsetLeft;
      offset.y = e.clientY - this.newApp.offsetTop;

      this.focused = true;
      this.parentWindow.refresh();
      this.parentWindow.apps.forEach((app) => {
        if (app !== this) {
          app.focused = false;
        }
      });
    });

    document.addEventListener("mouseup", (e) => {
      dragging = false;
      if(this.newApp.offsetTop < 0) {
        this.newApp.style.top = "0px";
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (!dragging) {
        return;
      }
      this.newApp.style.left = `${e.clientX - offset.x}px`;
      this.newApp.style.top = `${e.clientY - offset.y}px`;
    });

    this.appClose.addEventListener("click", () => {
      this.setX = this.newApp.offsetLeft;
      this.setY = this.newApp.offsetTop;
      this.setWidth = this.newApp.offsetWidth;
      this.setHeight = this.newApp.offsetHeight;
      this.close();
    });

    this.appMinimize.addEventListener("click", () => {
      this.minimize();
    });

    this.appMaximize.addEventListener("click", () => {
      this.maximize();
    });

    // focus on click
    this.newApp.addEventListener("mousedown", () => {
      this.focused = true;
      this.parentWindow.refresh();
      this.parentWindow.apps.forEach((app) => {
        if (app !== this) {
          app.focused = false;
        }
      });
    });
  }
  appendToWindow() {
    this.buttonList.appendChild(this.appMinimize);
    this.buttonList.appendChild(this.appMaximize);
    this.buttonList.appendChild(this.appClose);

    this.newAppTitle.style.width = `calc(100% - ${this.buttonList.style.width})`;
    this.newApp.appendChild(this.newAppTitle);
    this.newAppTitle.appendChild(this.newAppTitleText);
    this.newApp.appendChild(this.buttonList);

    this.body = this.appBody;
    this.newApp.appendChild(this.appBody);

    this.html = this.newApp;
    this.parentWindow.window.appendChild(this.newApp);
    this.parentWindow.addApp(this);

    return true;
  }
  setPosition(x, y) {
    this.setX = x;
    this.setY = y;
    this.newApp.style.left = `${x}px`;
    this.newApp.style.top = `${y}px`;
  }
  getPosition() {
    return { x: this.newApp.offsetLeft, y: this.newApp.offsetTop };
  }
  setSize(width, height) {
    this.setWidth = width;
    this.setHeight = height;
    this.newApp.style.width = `${width}px`;
    this.newApp.style.height = `${height}px`;
  }
  disableResize() {
    this.resizeDisabled = true;
    this.newApp.style.resize = "none";
  }
  getSize() {
    return { width: this.newApp.offsetWidth, height: this.newApp.offsetHeight };
  }
  minimize() {
    this.minimized = true;
    this.newApp.style.display = "none";
  }
  maximize() {
    this.maximized = !this.maximized;

    if (this.maximized) {
      this.oldWidth = this.newApp.style.width;
      this.oldHeight = this.newApp.style.height;
      this.oldLeft = this.newApp.style.left;
      this.oldTop = this.newApp.style.top;

      this.newApp.style.width = "100%";
      this.newApp.style.height = "100%";
      this.newApp.style.left = "0px";
      this.newApp.style.top = "0px";
    } else {
      this.newApp.style.width = this.oldWidth;
      this.newApp.style.height = this.oldHeight;
      this.newApp.style.left = this.oldLeft;
      this.newApp.style.top = this.oldTop;
    }
  }
  close() {
    this.closed = true;
    this.parentWindow.removeApp(this);
  }
  open() {
    if (this.minimized) {
      this.newApp.style.display = "block";
      this.focused = true;
      this.parentWindow.refresh();
      this.parentWindow.apps.forEach((app) => {
        if (app !== this) {
          app.focused = false;
        }
      });
      this.minimized = false;
    } else if (this.closed) {
      this.init();
      this.appendToWindow();

      this.setPosition(this.setX, this.setY);
      this.setSize(this.setWidth, this.setHeight);

      this.closed = false;
    }
    if(this.resizeDisabled) {
      this.disableResize();
    }
  }
  async init() {
    this.createHTML();
    this.setupEventListeners();
    this.setProgram(this.programSrc);
    if (this.setWidth && this.setHeight) {
      this.setSize(this.setWidth, this.setHeight);
    }
    if (this.setX && this.setY) {
      this.setPosition(this.setX, this.setY);
    }
  }
  setProgram(programSrc) {
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", programSrc);
    iframe.setAttribute("class", "appFrame");
    this.appBody.appendChild(iframe);
  }
}
