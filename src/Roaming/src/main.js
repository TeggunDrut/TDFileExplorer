gcanv.width = window.innerWidth;
gcanv.height = window.innerHeight;
window.onresize = () => {
  gcanv.width = window.innerWidth;
  gcanv.height = window.innerHeight;

  game.width = window.innerWidth;
  game.height = window.innerHeight;

  console.log(game.width, game.height);
};
// startGame();
mainmenuBtnPlay.onclick = () => {
  document.body.style.cursor = "none";
  startGame();
  // if (fadeOut(1)) {
  //   let title = document.createElement("h2");
  //   let subtitle = document.createElement("h5");

  //   title.setAttribute(
  //     "style",
  //     "width: 300px; height: 100px; color: white; position: absolute; top:0; left:0; right:0; bottom:0; margin:auto; text-align:center;"
  //   );
  //   title.innerHTML = "Get Ready...";
  //   alert(title.style.width, title.style.height);
  //   setTimeout(() => {

  //     document.body.appendChild(title);
  //     setTimeout(()=>{
  //       title.style.display = "none";
  //       fadeIn(2);
  //       startGame();
  //     }, 2000)

  //   }, 1500);
  // }
};
setInterval(loop, 10);
