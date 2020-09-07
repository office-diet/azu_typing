window.addEventListener("turbolinks:load", setTypings);

function setTypings(){

  if (location.pathname == "/typings/new") {
    return false;
  }

  // インプットボックへイベントの埋め込み
  const input = document.getElementById("input");
  const repeat = document.getElementById("repeat");
  const category = document.getElementById("category");
  let gameStarted = false;
  const typings = new Typings();

  input.addEventListener('keydown', function(e){
    if (e.keyCode === 13 && gameStarted == false){
      document.getElementById("mask").classList.add("show");
      input.placeholder = "";
      gameStarted = true;
      repeat.disabled = true;
      category.disabled = true;
      input.value = "";

      getTypings(input, typings, category.value, repeat.value);
      
    } else if ( e.keyCode === 13 ) {
      typings.check(input.value);
      input.value = "";
    }
  });
};

function getTypings (input, typings, category, repeat ) {
  // jsonの取得
  const XHR = new XMLHttpRequest();
  let array = "" ;
  XHR.open("GET", `/typings/${category}`, true);
  XHR.responseType = "json";
  XHR.send();
  XHR.onload = () => {
    array = XHR.response["typings"];
    document.getElementById("mask").classList.remove("show");
    typings.gameStart(input, array, category, repeat)
  };
}

function showCount( num , delay) {
  const repeatCount = document.getElementById("repeat-count");
  repeatCount.textContent = num;
  showAndHide(repeatCount, delay);
}

function showMessage(boolean) {
  const message = document.getElementById("message");
  if ( boolean === true ) {
    message.textContent = "OK";
    message.style.backgroundColor = "red";
  } else {
    message.textContent = "おしいよ！"
    message.style.backgroundColor = "blue";
  }
  showAndHide(message);
}

function showAndHide(elem) {
  if (elem.classList.contains("animate")){
    return false;
  } else {
    elem.classList.add("animate");
  }
  elem.animate({opacity: 1}, 101);
  setTimeout(() => {
    elem.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    elem.animate({opacity: 0}, 501 );
    setTimeout(() => {
      elem.style.opacity = "0";
      elem.classList.remove("animate")
    }, 500 );
  }, 400 );
}

function calcTyping(start, end, length) {
  return length / ( (end - start) / 1000 )
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
    return this.strLength;
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
    this.modal = new Modal();
    this.score = document.getElementById("score-text");
    this.repeated = 0;
  }

  gameStart(input, array, category, repeat) {
    this.input = input;
    this.category = category;
    this.repeat = repeat;
    this.typing.gameStart(array);
    this.afterTyping.gameStart(array);
    this.startTime = new Date();
  }
  check(str) {
    if ( this.typing.check(str) == true ) {
      this.repeated += 1;
      if (this.repeat != 1) {
        showCount(this.repeated);
      }
      if (this.repeat == this.repeated) {
        this.repeated = 0;
        this.typing.next();
        this.afterTyping.next();
      }
    }
    this.score.textContent = (this.typing.getScore()).toLocaleString();
    if ( this.typing.finished() == true ) {
      this.input.disabled = true;
      this.endTime = new Date();
      const sps = calcTyping(this.startTime, this.endTime, this.typing.getStrLength())
      document.getElementById("score_score").value = Math.round( sps * this.typing.getScore() );
      document.getElementById("score_sps").value = sps.toLocaleString();
      document.getElementById("score_category_id").value = this.category;
      const formData = new FormData(document.getElementById("score-form"));
      const XHR = new XMLHttpRequest();
      XHR.open("POST", "/typings/score", true);
      XHR.responseType = "json";
      XHR.send(formData);
      XHR.onload = () => {
        const rank = XHR.response["rank"]
        this.modal.setModal( sps, this.typing.getScore(), rank );
        this.modal.showModal();    
      }
    }
  }
}

class Modal {
  constructor() {
    this.mask = document.getElementById("mask");
    this.modal = document.getElementById("modal");
    this.sps = document.getElementById("modal-sps-text")
    this.score = document.getElementById("modal-score-text")
    this.ranking = document.getElementById("modal-ranking-text")
  }

  setModal (sps, score, rank) {
    this.sps.textContent = sps.toLocaleString();
    this.score.textContent = Math.round( sps * score ).toLocaleString();
    this.ranking.textContent = rank
    this.modal.insertAdjacentHTML('beforeend',
      `<a href="https://twitter.com/intent/tweet?hashtags=AzuTyping&text=${Math.round( sps * score ).toLocaleString()}azu-pts（${sps.toLocaleString()}文字/秒-全宇宙${rank}位！）&url=https://azu-typing.herokuapp.com/" 
        class="tweet" target="blank">
        ツイッターで報告する！
      </a>`
    )
  }

  showModal () {
    this.mask.classList.add("show");
    this.modal.classList.add("show");
    document.querySelector("html").style.overflow = "hidden"
    document.querySelector("body").style.overflow = "hidden"
  }
}