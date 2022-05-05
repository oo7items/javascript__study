'use strict';
// Selecting Element 


const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new'); 
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;
// 切换到玩家0开始游戏
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
  
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
  
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // 切换当前选手
    activePlayer = activePlayer === 0 ? 1 : 0;
    console.log(activePlayer);
    // 切换样式
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

    currentScore = 0;
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate a random number
        const dice = Math.trunc(Math.random() * 6) + 1;
        
        // 2. Display dice  
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
       // 3. Check for rolled 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch player
            switchPlayer();
        }
    }
});


btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. 判断玩家获胜
        if (scores[activePlayer] >= 10) {
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
            // 3. 游戏结束
            playing = false;
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click',init);