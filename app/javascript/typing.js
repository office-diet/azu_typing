window.addEventListener("turbolinks:load", setTypings);

function setTypings(){
  
  // 配列の取得
  const btn = document.getElementById("btn");
  const values = document.getElementById("values");
  const XHR = new XMLHttpRequest();
  let typings = "" ;

  XHR.open("GET", `/typings/テスト`, true);
  XHR.responseType = "json";
  XHR.send();
  XHR.onload = () => {
    typings = XHR.response["typings"];
  };
  // インプットボックへイベントの埋め込み
  const input = document.getElementById("input");
  const repeat = document.getElementById("repeat");
  const afterHiragana = document.getElementById("after-hiragana");
  const afterOriginal = document.getElementById("after-original");
  const hiragana = document.getElementById("hiragana");
  const original = document.getElementById("original");
  let gameStarted = false;
  const typing = new Typing(original, hiragana, false);
  const afterTyping = new Typing(afterOriginal, afterHiragana, true);

  input.addEventListener('keydown', function(e){
    if (e.keyCode === 13 && gameStarted == false){
      gameStarted = true;
      repeat.disabled = true;
      typing.gameStart(typings, repeat.value);
      afterTyping.gameStart(typings, repeat.value);
      input.value = "";
    } else if ( e.keyCode === 13 ) {
      typing.next(input.value);
      afterTyping.next(input.value);
      input.value = "";
    }
  });
};


class Typing {
  constructor(original, hiragana, after){
    this.original = original;
    this.hiragana = hiragana;
    this.progress = 0;
    this.after = after;
    if ( this.after == true){
      this.progress += 1;
    }
    this.hiragana.textContent = "げんざいのてーま";
    this.original.textContent = "現在のテーマ";  
  }

  gameStart(array, repeat) {
    this.repeat = repeat;
    this.clearCount = 0;
    this.array = array;
    this.length = this.array.length;
    this.hiragana.textContent = this.array[this.progress].hiragana;
    this.original.textContent = this.array[this.progress].original;
  }

  next(str) {
    if (this.progress <  this.length) {
      if ( str == this.array[this.progress - ( 1 * this.after )].hiragana || str == this.array[this.progress - ( 1 * this.after )].original) {
        this.clearCount += 1;
        if (this.clearCount == this.repeat) {
          this.clearCount = 0;
          this.progress += 1;    
          if (this.progress < this.length){
            this.hiragana.textContent = this.array[this.progress].hiragana;
            this.original.textContent = this.array[this.progress].original;    
          } else if ( this.progress >= this.length ) {
            this.hiragana.textContent = "タイピング終了";
            this.original.textContent = "たいぴんぐしゅうりょう";    
          }
        }
      }
    }
  }
}