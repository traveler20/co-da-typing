var wordlist = ["html",
                "head",
                "title",
                "meta",
                "link",
                "script",
                "audio",
                "body",
                "div",
                "input",
                "h1",
                "h2",
                "header",
                "footer",
                "style",
                "a",
                "address",
                "span",
                "img",
                "br",
                "p",
                "ul",
                "li",
                "nav",
                "aside",
                "section",
                "figure",
                "table",
                "th",
                "tr",
                "td",
                "meta charset",
                "link rel",
                "script src",
                "div id",
                "h1 id",
                "a href",
                "span class",
                "li id",
                "aside id",
                "img src",
                "p class",
                "color"
            ];
                
var wordlistJapanese = ["HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","HTMLより","CSSより"];
var time_limit = 90;
var readytime = 3;
var score;
var correct;
var mistake;
var char_num = 0;
var word_char;
var random;

function ready(){
    readytime = 3;
    scoredis.innerHTML="";
    start_button.style.visibility ="hidden";
    var readytimer = setInterval(function(){
        count.innerHTML=readytime;
        readytime--;
        if(readytime < 0){
            clearInterval(readytimer);
            gameStart();
            }
    },1000);
}

function gameStart(){
    score = 0.0;
    mistake = 0;
    correct = 0;
    wordDisplay();
    var time_remaining = time_limit;
    var gametimer = setInterval(function(){
        count.innerHTML="残り時間："+time_remaining;
        time_remaining--;
        if(time_remaining <= 0){
          clearInterval(gametimer);
            finish();
        }
    },1000);
}

function wordDisplay(){
    random = Math.floor( Math.random() * wordlist.length );
    word.innerHTML=wordlist[random];
    japanese.innerHTML=wordlistJapanese[random];
    charInsort();
}

function charInsort(){
    word_char = wordlist[random].charAt(char_num);
}

function finish(){
    score = Math.floor(Math.pow(correct,2) * Math.pow((correct/(correct+mistake)),5));
    scoredis.innerHTML="スコア:"+score+"点"
        +"<hr>正タイプ数:"+correct
        +"<br>ミスタイプ数:"+mistake
        +"<br>正答率"+(correct/(correct+mistake)*100).toFixed(1)+"%";
    count.innerHTML="";
    word.innerHTML="";
    japanese.innerHTML="";
    start_button.style.visibility ="visible";
    word_char=0;
    random = 0;
    char_num = 0;
}

document.onkeydown = function(e) {
    if(e.keyCode == 189){
        keyStr = "-";
    }else if(e.keyCode == 188){
        keyStr = ","
    }else{
        var keyStr = String.fromCharCode(e.keyCode);
        keyStr = keyStr.toLowerCase();
    }
    if(keyStr == word_char){
        document.getElementById('missaudio').pause();
        document.getElementById('missaudio').currentTime = 0;
        document.getElementById('correctaudio').pause();
        document.getElementById('correctaudio').currentTime = 0;
        document.getElementById('correctaudio').play();
        word.innerHTML="<span style='color: red;'>"
          +wordlist[random].substr(0,char_num+1)
          +"</span>"+wordlist[random].substr(char_num+1,wordlist[random].length);
        char_num++;
        correct++;
        charInsort();
    }else{
        document.getElementById('missaudio').pause();
        document.getElementById('missaudio').currentTime = 0;
        document.getElementById('correctaudio').pause();
        document.getElementById('correctaudio').currentTime = 0;
        mistake++;
        document.getElementById('missaudio').play();
    }
    if(char_num == wordlist[random].length){
        char_num=0;
        wordDisplay();
    }
};