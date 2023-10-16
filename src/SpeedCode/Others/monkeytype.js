function getWords() {
  let wordListString = "";
  for (let i = 0; i < document.getElementsByClassName("word").length; i++) {
    document.getElementsByClassName("word")[i].classList.add("used");
    for (let j = 0; j < document.getElementsByClassName("word")[i].children.length; j++) {
      let wordSize = document.getElementsByClassName("word")[i].children.length;
      if (j + 1 == wordSize) {
        wordListString += document.getElementsByClassName('word')[i].children[j].innerHTML;
        wordListString += " ";
      } else {
        wordListString += document.getElementsByClassName('word')[i].children[j].innerHTML;
      }
    }
  }
  
  console.log(wordListString);
}
getWords();