'use strict';
// Players current scores
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');

//Player active or not
const players = [...document.querySelectorAll('.player')];
// Dice html place holder
const diceEl = document.querySelector('.dice');

// Buttons const's - html place holder
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Scores array // Current score //Active player //State of the game
let scores, currentScore, activePlayer, playing;

//Init function
const init = function() {
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    scores = [0, 0];
    diceEl.classList.add('hidden');
    scores.forEach(
        (x, i) => (document.querySelector(`#score--${i}`).textContent = x)
    );
};
init();

//Switching player - used twice for buttons: btnRollDice and btnHold
const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    for (let i = 0; i < players.length; i++) {
        players[i].classList.toggle('player--active');
    }
    activePlayer = activePlayer === 0 ? 1 : 0;
};

// Rolling dice functionality
btnRollDice.addEventListener('click', function() {
    if (playing) {
        // 1. Random dice roll.

        let dice = Math.floor(Math.random() * 6 + 1);
        console.log(dice);
        // 2.Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // 3. Check for rolled

        if (dice !== 1) {
            //Add to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    // 1. Add current score to active player's score
    if (playing) {
        if (!currentScore) {
            alert('Press "Roll dice!!!" Please 😋');
        } else {
            scores[activePlayer] += currentScore;
            document.getElementById(`score--${activePlayer}`).textContent =
                scores[activePlayer];
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            //2. Check if player's score is >=100
            if (scores[activePlayer] >= 100) {
                playing = false;
                currentScore = 0;
                diceEl.classList.add('hidden');
                //Finish the game
                document
                    .querySelector(`.player--${activePlayer}`)
                    .classList.add('player--winner');
                document
                    .querySelector(`.player--${activePlayer}`)
                    .classList.remove('player--active');
                document.getElementById(`current--${activePlayer}`).textContent =
                    currentScore;
                alert(`Player ${activePlayer + 1} won 🥇🏆🧿`);
            } else {
                //Switch player
                switchPlayer();
            }
        }
    }
});

btnNewGame.addEventListener('click', function() {
    scores.forEach((x, i) => {
        scores[i] = 0;
        x = scores[i];
        document.querySelector(`.player--${i}`).classList.remove('player--winner');
    });
    init();
    players[1].classList.remove('player--active');
    players[0].classList.add('player--active');
});