function openMenu(menu) {
  menuOpen = true;
  if (menu == "options") {
    let container = document.createElement("div");
    container.setAttribute(
      "style",
      "position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:50%;height:500px;background-color:rgba(80, 80, 100, 0.8);border-radius:8px;"
    );
    container.setAttribute("id", "menu-div");

    let optcontainer = document.createElement("div");
    optcontainer.setAttribute("style", "width:40%; height:100%; ");

    let settings = document.createElement("div");
    settings.setAttribute(
      "style",
      "position: absolute; right:0; ;width: 60%; height: 100%; display: flex; "
    );

    let label1 = document.createElement("p");
    label1.setAttribute(
      "style",
      "width: 100%; height: 20px; font-size: larger; color: rgb(240, 240, 240); text-align: center; position: relative; top: 0; bottom: 0;margin: auto;"
    );
    label1.textContent = "Width";

    let crossHairWidth = document.createElement("input");
    crossHairWidth.type = "range";
    crossHairWidth.setAttribute(
      "style",
      "width: 100%; height: 20%; display: flex; align-items:center; justify-content: center; float:right;"
    );
    crossHairWidth.max = 3;
    crossHairWidth.min = 0;
    crossHairWidth.step = 1;
    // crossHairWidth.value = 5;

    crossHairWidth.addEventListener("change", (e) => {
      options.crosshair.width = crossHairWidth.value;
    });

    let label2 = document.createElement("p");
    label2.setAttribute(
      "style",
      "width: 100%; height: 20px; font-size: larger; color: rgb(240, 240, 240); text-align: center; position: relative; top: 0; bottom: 0;margin: auto;"
    );
    label2.textContent = "Offset";
    let crossHairOff = document.createElement("input");
    crossHairOff.type = "range";
    crossHairOff.max = 5;
    crossHairOff.min = 0;
    crossHairOff.step = 0.1;
    crossHairOff.value = 2;
    crossHairOff.setAttribute(
      "style",
      "width: 100%; height: 20%; display: flex; align-items:center; justify-content: center; float:right;"
    );

    crossHairOff.addEventListener("change", (e) => {
      options.crosshair.lineOffX = crossHairOff.value - 1;
      options.crosshair.lineOffY = crossHairOff.value;
    });

    let label3 = document.createElement("p");
    label3.setAttribute(
      "style",
      "width: 100%; height: 20px; font-size: larger; color: rgb(240, 240, 240); text-align: center; position: relative; top: 0; bottom: 0;margin: auto;"
    );
    label3.textContent = "Length";
    let crossHairLen = document.createElement("input");
    crossHairLen.type = "range";
    crossHairLen.max = 50;
    crossHairLen.min = 0;
    crossHairLen.step = 0.1;
    crossHairLen.value = 2;
    crossHairLen.setAttribute(
      "style",
      "width: 100%; height: 20%; display: flex; align-items:center; justify-content: center; float:right;"
    );

    crossHairLen.addEventListener("change", (e) => {
      options.crosshair.length = crossHairLen.value;
    });

    let setting1 = document.createElement("div");
    setting1.setAttribute(
      "style",
      "width: 100%; height: 20%; display: flex; position: absolute; top: 0; align-items: center; justify-content: center;"
    );
    setting1.appendChild(label1);
    setting1.appendChild(crossHairWidth);
    let setting2 = document.createElement("div");
    setting2.setAttribute(
      "style",
      "width: 100%; height: 20%; display: flex; position: absolute; top: 70px;align-items: center; justify-content: center;"
    );
    setting2.appendChild(label2);
    setting2.appendChild(crossHairOff);

    let setting3 = document.createElement("div");
    setting3.setAttribute(
      "style",
      "width: 100%; height: 20%; display: flex; position: absolute; top: 140px;align-items: center; justify-content: center;"
    );
    setting3.appendChild(label3);
    setting3.appendChild(crossHairLen);

    settings.appendChild(setting1);
    settings.appendChild(setting2);
    settings.appendChild(setting3);

    let opt1 = document.createElement("div");
    opt1.setAttribute(
      "style",
      "position: relative; width: 100%; height: 20%; font-size: larger; color: rgb(240, 240, 240); display: flex; justify-content: center; align-items: center;"
    );
    opt1.textContent = "Crosshair";

    opt1.onclick = () => {};

    container.appendChild(settings);
    optcontainer.appendChild(opt1);
    container.appendChild(optcontainer);
    document.body.appendChild(container);
  }
}
function closeMenus() {
  menuOpen = false;
  document.getElementById("menu-div").remove();
}
