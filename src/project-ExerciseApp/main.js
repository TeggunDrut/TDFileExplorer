const hamborgorMenu = document.getElementById("ham-menu");
const menu = document.getElementById("menu");

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

hamborgorMenu.onclick = async function () {
  let classList = menu.classList;
  if (classList.contains("show")) {
    menu.classList.remove("show");
    menu.classList.add("hide");
    menu.style.width = "0%";
  } else {
    menu.classList.add("show");
    menu.classList.remove("hide");
    menu.style.width = "25%";
  }
};

const hamborgorBody = document.getElementById("ham-body");

hamborgorBody.onclick = async function () {
  let classList = menu.classList;
  if (classList.contains("show")) {
    menu.classList.add("hide");
    menu.classList.remove("show");
    menu.style.width = "0%";
  } else {
    menu.classList.add("show");
    await wait(100);
    menu.style.width = "25%";
    await wait(250);

    menu.classList.remove("hide");
  }
};
