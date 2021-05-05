let wordlist = [
	"html",
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
	"color",
];

let wordlistJapanese = [
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"HTMLより",
	"CSSより",
];
let time_limit = 30;
let readytime = 3;
let score;
let correct;
let mistake;
let char_num = 0;
let word_char;
let random;

/* count down timer */
function ready() {
	readytime = 3;
	scoredis.innerHTML = "";
	start_button.style.visibility = "hidden";
	let readytimer = setInterval(function () {
		count.innerHTML = readytime;
		readytime--;
		if (readytime < 0) {
			clearInterval(readytimer);
			gameStart();
		}
	}, 1000);
}

/* game start score calculation */
function gameStart() {
	score = 0.0;
	mistake = 0;
	correct = 0;
	wordDisplay();
	/* time calculation */
	let time_remaining = time_limit;
	let gametimer = setInterval(function () {
		count.innerHTML = "残り時間：" + time_remaining;
		time_remaining--;
		if (time_remaining <= 0) {
			clearInterval(gametimer);
			finish();
		}
	}, 1000);
}

/* word display */
function wordDisplay() {
	/* random display */
	random = Math.floor(Math.random() * wordlist.length);
	/* words display */
	word.innerHTML = wordlist[random];
	japanese.innerHTML = wordlistJapanese[random];
	charInsort();
}
function charInsort() {
	word_char = wordlist[random].charAt(char_num);
}

/* game finished */
function finish() {
	/* score calculation */
	score = Math.floor(
		Math.pow(correct, 2) * Math.pow(correct / (correct + mistake), 5)
	);
	/* score display */
	scoredis.innerHTML =
		"スコア:" +
		score +
		"点" +
		"<hr>正タイプ数:" +
		correct +
		"<br>ミスタイプ数:" +
		mistake +
		"<br>正答率" +
		((correct / (correct + mistake)) * 100).toFixed(1) +
		"%";
	/* other hidden */
	count.innerHTML = "";
	word.innerHTML = "";
	japanese.innerHTML = "";
	/* start_button redisplay */
	start_button.style.visibility = "visible";
	/* variable reset */
	word_char = 0;
	random = 0;
	char_num = 0;
}

/* typing function */
document.onkeydown = function (e) {
	if (e.keyCode == 189) {
		keyStr = "-";
	} else if (e.keyCode == 188) {
		keyStr = ",";
	} else {
		var keyStr = String.fromCharCode(e.keyCode);
		keyStr = keyStr.toLowerCase();
	}
	if (keyStr == word_char) {
		/* correct typing */
		document.getElementById("missaudio").pause();
		document.getElementById("missaudio").currentTime = 0;
		document.getElementById("correctaudio").pause();
		document.getElementById("correctaudio").currentTime = 0;
		document.getElementById("correctaudio").play();
		/* input coloring */
		word.innerHTML =
			"<span style='color: red;'>" +
			wordlist[random].substr(0, char_num + 1) +
			"</span>" +
			wordlist[random].substr(char_num + 1, wordlist[random].length);
		char_num++;
		correct++;
		charInsort();
	} else {
		/* miss typing */
		document.getElementById("missaudio").pause();
		document.getElementById("missaudio").currentTime = 0;
		document.getElementById("correctaudio").pause();
		document.getElementById("correctaudio").currentTime = 0;
		mistake++;
		document.getElementById("missaudio").play();
	}
	if (char_num == wordlist[random].length) {
		char_num = 0;
		wordDisplay();
	}
};
