let start = document.querySelector(".start");
const diffs = {
	easy: [
		"Hello",
		"Code",
		"Town",
		"Scala",
		"Funny",
		"Roles",
		"Test",
		"Rust",
		"Task",
		"when",
		"when",
		"during",
		"during",
		"along",
		"again",
	],
	normal: [
		"Country",
		"Testing",
		"Youtube",
		"Linkedin",
		"Twitter",
		"Github",
		"Leetcode",
		"Internet",
		"Python",
		"Coding",
		"Styling",
		"Cascade",
		"Runner",
		"Playing",
		"Working",
	],
	hard: [
		"Programming",
		"Javascript",
		"Destructuring",
		"Paradigm",
		"Documentation",
		"Configuration",
		"Dependencies",
		"Copyrightable",
		"bibliophile",
		"mellifluous",
		"mellifluous",
		"ephemeral",
		"Circumnavigate",
		"Deconstruction",
		"Insurmountable",
	],
};

// Setting Levels

const lvls = {
	easy: 5,
	normal: 3,
	hard: 2,
};

// difficulty & default level

let choosedLvl = document.querySelector("select");

let words = diffs[choosedLvl.value];

let defaultLevel = "normal";

let defaultLevSeconds = lvls[defaultLevel];

choosedLvl.onchange = function () {
	defaultLevel = this.value;
	words = diffs[choosedLvl.value];
	defaultLevSeconds = lvls[this.value];
	setting();
};

// catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let score = document.querySelector(".score");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let since = document.querySelector(".score .since");

// Saved Score

if (localStorage.length !== 0) {
	scoreGot.innerHTML = JSON.parse(localStorage.score).score;
	since.innerHTML = `Since ${JSON.parse(localStorage.score).date}`;
	score.classList.add("saved");
} else {
}

// Setting Level Name + seconds + score

function setting() {
	lvlNameSpan.innerHTML = defaultLevel;
	secondsSpan.innerHTML = defaultLevSeconds;
	timeLeftSpan.innerHTML = defaultLevSeconds;
	scoreTotal.innerHTML = words.length;
}
setting();

// Difficulty settings

// Start Game

startButton.onclick = function () {
	this.remove();
	input.focus();
	// Generate word function
	genWords();
	// Reset score
	scoreGot.innerHTML = "0";
	since.innerHTML = "";
};

function genWords() {
	let randomWord = words[Math.floor(Math.random() * words.length)];
	// get index of the random word
	let randomIndex = words.indexOf(randomWord);
	// Remove Word from array
	words.splice(randomIndex, 1);
	// show the random word
	theWord.innerHTML = randomWord;
	// Empty upcoming words
	upcomingWords.innerHTML = "";
	// Generate upcoming words
	for (let i = 0; i < words.length; i++) {
		// Create Div Element
		let div = document.createElement("div");
		let txt = document.createTextNode(words[i]);
		div.appendChild(txt);
		upcomingWords.appendChild(div);
	}
	// call Start play function
	startPlay();
}

function startPlay() {
	choosedLvl.setAttribute("hidden", "");

	timeLeftSpan.innerHTML = defaultLevSeconds;
	let start = setInterval(() => {
		timeLeftSpan.innerHTML--;
		if (timeLeftSpan.innerHTML === "0") {
			// Stop timer
			clearInterval(start);
			if (
				theWord.innerHTML.toLowerCase() ===
				input.value.toLowerCase()
			) {
				// Empty input
				input.value = "";
				// Increase Good
				scoreGot.innerHTML++;
				if (words.length > 0) {
					// Call generate word function
					genWords();
				} else {
					saveInfo();
					end("good", "congratulations");
				}
			} else {
				end("bad", "game over");
				saveInfo();
			}
		}
		// compare words
	}, 1000);
}

function end(className, message) {
	let span = document.createElement("span");
	span.className = className;
	let txt = document.createTextNode(message);
	span.appendChild(txt);
	finishMessage.appendChild(span);
	upcomingWords.remove();
}

function saveInfo() {
	localStorage.setItem(
		"score",
		JSON.stringify({
			score: scoreGot.innerHTML,
			date: new Date(Date.now())
				.toString()
				.split(" ")
				.reverse()
				.slice(7)
				.join(" "),
		}),
	);
}
