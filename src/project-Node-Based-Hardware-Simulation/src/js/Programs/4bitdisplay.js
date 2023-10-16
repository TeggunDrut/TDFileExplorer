let lights = [

];
for (let i = 0; i < 4; i++) {
  lights.push(new LightRGBA(i * 100 + 1300, 200, 100, 100, "Light", false, {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
  }));
}
lights.forEach((light) => {
  nodeElements.push(light);
});

let switchs = [];
for (let i = 0; i < 4; i++) {
  switchs.push(new Switch(i * 100, 0, 100, 100, "Switch", true));
}
switchs.forEach((switch1) => {
  nodeElements.push(switch1);
});

// let b = new Button(100, 100, 100, 100, "Button1", "Button1", () => { console.log("asdasd") });
// nodeElements.push(b);