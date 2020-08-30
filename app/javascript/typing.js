window.addEventListener("turbolinks:load", setTypings);

function setTypings(){
  
  // 配列の取得
  const XHR = new XMLHttpRequest();
  let array = "" ;

  XHR.open("GET", `/typings/テスト`, true);
  XHR.responseType = "json";
  XHR.send();
  XHR.onload = () => {
    array = XHR.response["typings"];
  };

  // インプットボックへイベントの埋め込み
  const input = document.getElementById("input");
  const repeat = document.getElementById("repeat");
  let gameStarted = false;
  const typings = new Typings();

  input.addEventListener('keydown', function(e){
    if (e.keyCode === 13 && gameStarted == false){
      gameStarted = true;
      repeat.disabled = true;
      typings.gameStart(array, repeat.value)
      input.value = "";
    } else if ( e.keyCode === 13 ) {
      typings.check(input.value);
      input.value = "";
    }
  });
};


function showMessage(boolean) {
  const message = document.getElementById("message");
  if (message.classList.contains("animate")){
    return false;
  } else {
    message.classList.add("animate");
  }
  if ( boolean === true ) {
    message.textContent = "OK";
    message.style.backgroundColor = "red";
  } else {
    message.textContent = "おしいよ！"
    message.style.backgroundColor = "blue";
  }
  message.animate({opacity: 1}, 101);
  setTimeout(() => {
    message.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    message.animate({opacity: 0}, 501);
    setTimeout(() => {
      message.style.opacity = "0";
      message.classList.remove("animate")
    }, 500);
  }, 400);
}


class TextControll {
  constructor(original, hiragana, after){
    this.original = original;
    this.hiragana = hiragana;
    this.progress = 0;
    this.score = 0;
    this.strLength = 0;
    this.after = after;
    this.hiragana.textContent = "げんざいのてーま";
    this.original.textContent = "現在のテーマ";  
    if ( this.after == true){
      this.progress += 1;
      this.hiragana.textContent = "つぎのてーま";
      this.original.textContent = "次のテーマ";  
    }
  }

  gameStart(array) {
    this.array = array;
    this.length = this.array.length;    
    this.hiragana.textContent = this.array[this.progress].hiragana;
    this.original.textContent = this.array[this.progress].original;
  }

  next() {
    if ( this.progress > this.length ) {
      return false;
    }
    this.progress += 1;
    if (this.progress < this.length){
      this.hiragana.textContent = this.array[this.progress].hiragana;
      this.original.textContent = this.array[this.progress].original;    
    } else if ( this.progress == this.length ) {
      this.hiragana.textContent = "タイピング終了";
      this.original.textContent = "たいぴんぐしゅうりょう";
    }
  }

  check(str) {
    console.log(this.progress);
    if (str == "" || this.progress >= this.length) {
      return false;
    }
    let cleared = false;
    if ( str == this.array[this.progress].hiragana ){
      cleared = true;
      this.strLength += this.array[this.progress].hiragana.length 
      this.score += this.array[this.progress].hiragana.length * 100;
    } 
    if ( str == this.array[this.progress].original ) {
      cleared = true;
      this.strLength += this.array[this.progress].hiragana.length 
      this.score += this.array[this.progress].hiragana.length * 150;
    }
    if ( cleared == false) {
      this.score -= this.array[this.progress].hiragana.length * 50;
    } 
    showMessage(cleared);
    return cleared;
  }
  finished() {
    return (this.progress >= this.length);
  }
  getScore() {
    return this.score;
  }
  getStrLength() {
    return this.strlength;
  }
}

class Typings {
  constructor () {
    const afterHiragana = document.getElementById("after-hiragana");
    const afterOriginal = document.getElementById("after-original");
    const hiragana = document.getElementById("hiragana");
    const original = document.getElementById("original");
    
    this.typing = new TextControll(original, hiragana, false);
    this.afterTyping = new TextControll(afterOriginal, afterHiragana, true);
    this.score = document.getElementById("score-text");
    this.repeated = 0;
  }

  gameStart(array, repeat) {
    this.repeat = repeat;
    this.typing.gameStart(array);
    this.afterTyping.gameStart(array);
  }
  check(str) {
    if ( this.typing.check(str) == true ) {
      this.repeated += 1;
      if (this.repeat == this.repeated) {
        this.repeated = 0;
        this.typing.next();
        this.afterTyping.next();
      }
    }
    this.score.textContent = (this.typing.getScore() * 10000).toLocaleString();
  }

}