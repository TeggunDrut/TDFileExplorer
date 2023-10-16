class Vector2 {
  Vector2(x, y) {
    this.x = x;
    this.y = y;
  }
}
consoleLog = (text) => {

  let text2 = document.createElement('p');
  text2.innerHTML = text;
  document.body.appendChild(text2);

}

function wait(seconds) {
  let i = 0;
  setTimeout(()=>{
    i++;

    if(i == 1) {
      i = 0;
    }
    return true;
  }, 1000);
  i = 0;
} 