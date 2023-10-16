function start() {
  let gamecode = document.getElementById("gamecode");
  let all = "";
  for (let i = 0; i < gamecode.children.length; i++) {
    if (gamecode.children[i].innerHTML.indexOf("&lt;!--") !== -1 || gamecode.children[i].classList[0] == "comment")
      console.log("comment");
    else {
      if (gamecode.children[i].innerHTML == " ") {
        all += " ";
      } else {
        gamecode.children[i].classList.forEach((c) => {
          if (c == "return-char") {
            all += "$";
          }
        });
        if (gamecode.children[i].innerHTML == "&gt;") {
          all += ">";
        } else if (gamecode.children[i].innerHTML == "&lt;") {
          all += "<";
        }else {
          all += gamecode.children[i].innerHTML;
        }

      }
      console.log(all);
    }
  }
}
start();
