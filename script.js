'use strict';

const scoreEL0 = document.getElementById('score--0');
const scoreEL1 = document.getElementById('score--1');
const playerEL0 = document.querySelector('.player--0');
const playerEL1 = document.querySelector('.player--1');

const diceEL = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let isPlaying = true;

// Reset the game
diceEL.classList.add('hidden');
scoreEL0.textContent = scoreEL1.textContent = 0;

// Rolling dice
btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    const num = Math.trunc(Math.random() * 6) + 1;

    diceEL.classList.remove('hidden');
    diceEL.src = `img/dice-${num}.png`;

    if (num === 1) {
      switchPlayer();
      return;
    }

    currentScore += num;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
});

// Holding the score
btnHold.addEventListener('click', () => {
  scores[activePlayer] += currentScore;

  updateScore();

  // Win condition met?
  if (scores[activePlayer] >= 100) {
    isPlaying = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    diceEL.classList.add('hidden');

    resetCurrentScore();

    return;
  }

  switchPlayer();
});

// Reset game
btnNew.addEventListener('click', () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  scores[0] = 0;
  scores[1] = 0;
  updateScore();

  isPlaying = true;

  activePlayer = 0;
  playerEL0.classList.add('player--active');
  playerEL1.classList.remove('player--active');
});

// Resets the current score of the active player
function resetCurrentScore() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
}

// Switch active players
function switchPlayer() {
  resetCurrentScore();

  activePlayer = activePlayer === 0 ? 1 : 0;

  playerEL0.classList.toggle('player--active');
  playerEL1.classList.toggle('player--active');
}

// Update the texts for scores
function updateScore() {
  scoreEL0.textContent = scores[0];
  scoreEL1.textContent = scores[1];
}
