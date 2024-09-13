const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord = "",
  wrongGuessCount = 0,
  correctLetter = [],
  clickedButton = [];
  
const maxGuess = 6;

function getRandomWord() {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").textContent = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class='letter'></li>`)
    .join("");
}

const gameOver = (isVictory) => {
  setTimeout(() => {
    keyboardDiv.classList.add("disabled");
    const modalText = isVictory
      ? "You found the word"
      : "The correct word was:";
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerHTML = `${
      isVictory ? "Congrats!" : "Game Over!"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetter.push(clickedLetter);
        wordDisplay.querySelectorAll("li")[index].textContent = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  guessesText.textContent = `${wrongGuessCount} / ${maxGuess}`;
  button.disabled = true;
  clickedButton.push(button);

  if (wrongGuessCount === maxGuess) return gameOver(false);
  if (correctLetter.length === currentWord.length) return gameOver(true);
};

// Creating Keyboard buttons
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.textContent = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) => {
    if (wrongGuessCount <= maxGuess) initGame(e.target, String.fromCharCode(i));
  });
}

const restartGame = () => {
  wrongGuessCount = 0;
  keyboardDiv.classList.remove("disabled");
  gameModal.classList.remove("show");
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.textContent = `${wrongGuessCount} / ${maxGuess}`;
  clickedButton.map((btn) => (btn.disabled = false));
  clickedButton = [];
  correctLetter = [];
  getRandomWord();
};

playAgainBtn.addEventListener("click", (e) => {
  restartGame();
});

getRandomWord();
