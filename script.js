'use strict';
const scoreP1 = document.getElementById('score--0');
const scoreP2 = document.getElementById('score--1');
const currentScoreP1 = document.getElementById('current--0');
const currentScoreP2 = document.getElementById('current--1');
const diceRoll = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const activeBackgroundP1 = document.querySelector('.player--0');
const activeBackgroundP2 = document.querySelector('.player--1');

let currentScore = 0;
let activePayer = 0;
let scoreBoth = [0, 0];
let playing = true;

const init = function () {
  currentScore = 0;
  activePayer = 0;
  scoreBoth = [0, 0];
  playing = true;

  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;

  diceRoll.classList.add('hidden');
  activeBackgroundP1.classList.remove('player--winner');
  activeBackgroundP2.classList.remove('player--winner');
  activeBackgroundP1.classList.add('player--active');
  activeBackgroundP2.classList.remove('player--active');
};
init();

// starting condition

const switchPlayer = function () {
  document.getElementById(`current--${activePayer}`).textContent = 0;
  currentScore = 0;
  activePayer = activePayer === 0 ? 1 : 0;

  activeBackgroundP1.classList.toggle('player--active');
  activeBackgroundP2.classList.toggle('player--active');
};

// rolling dice functionlitice
btnroll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random number
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceRoll.classList.remove('hidden');
    diceRoll.src = 'dice-' + diceNumber + '.png';
    // 3. compare nimber is 1?
    if (diceNumber !== 1) {
      // add the number
      currentScore += diceNumber;
      // currentScoreP1.textContent = currentScore;
      document.getElementById(`current--${activePayer}`).textContent =
        currentScore;
    } else {
      // true then move to next player
      switchPlayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    // add current score
    scoreBoth[activePayer] += currentScore;
    // scoreBoth[1] = scoreBoth[1] + currentScore
    console.log(scoreBoth[activePayer]);
    document.getElementById(`score--${activePayer}`).textContent =
      scoreBoth[activePayer];
    // cheek score >= 100 if so
    if (scoreBoth[activePayer] >= 100) {
      document
        .querySelector(`.player--${activePayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePayer}`)
        .classList.remove('player--active');
      playing = false;
    }
    // finish the game
    else {
      switchPlayer();
    }
  }
  // switch to next player
});
btnNew.addEventListener('click', init);
