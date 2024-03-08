let selectedRange;
let guessNumber;
let maxGuesses;
let guessesLeft;

document.querySelectorAll('input[name="range"]').forEach(radio => {
  radio.addEventListener('change', enableStartButton);
});

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('checkBtn').addEventListener('click', checkGuess);

function enableStartButton() {
  document.getElementById('startBtn').disabled = false;
}

function startGame() {
  selectedRange = parseInt(document.querySelector('input[name="range"]:checked').value);
  guessNumber = Math.floor(Math.random() * selectedRange) + 1;
  maxGuesses = getMaxGuesses(selectedRange);
  guessesLeft = maxGuesses;

  document.getElementById('gameArea').style.display = 'block';
  document.getElementById('instruction').textContent = `Guess a number between 1 and ${selectedRange}:`;
  document.getElementById('guessesLeft').textContent = `Guesses left: ${guessesLeft}`;
  document.getElementById('guessList').innerHTML = '';
}

function getMaxGuesses(range) {
  if (range === 10) return 3;
  if (range === 100) return 7;
  if (range === 1000) return 10;
}

function checkGuess() {
  const guess = parseInt(document.getElementById('guessInput').value);

  if (isNaN(guess) || guess < 1 || guess > selectedRange) {
    alert('Please enter a valid number within the selected range.');
    return;
  }

  guessesLeft--;
  document.getElementById('guessesLeft').textContent = `Guesses left: ${guessesLeft}`;
  document.getElementById('guessList').innerHTML += `<li>${guess}</li>`;

  if (guess === guessNumber) {
    alert('Correct. Well done!');
    gameOver('Congratulations!');
  } else if (guessesLeft === 0) {
    gameOver('No more guesses left.');
  } else if (guess < guessNumber) {
    alert('Too low. Try again!');
  } else {
    alert('Too high. Try again!');
  }
}

function gameOver(message) {
  alert(message);
  const playAgain = confirm('Play again?');
  if (playAgain) {
    location.reload();
  }
}