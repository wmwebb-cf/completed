/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// declare game variables
let scores, roundScore, activePlayer, gamePlaying;

init();


//select elements from HTML -> changing the 'current' dice roll bt dynamically selecting the current id
//document.querySelector('#current-' + activePlayer).textContent = dice;
/*
change html method(setter):
    - document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

store html element into a variable(getter):
    - var x = document.querySelector('#score-0').textContent;
*/

document.querySelector('.btn-new').addEventListener('click', init);

/*
EVENT Listeners: Can use callback functions or anonymous functions.
-> Callback: declared & called and then used inside the event Listener
-> Anonymous: declared & called inside the event listener
*/

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1- Random number
        let dice = Math.floor(Math.random() * 6) + 1;
        //2- Display dice result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3- Update roundScore if number was not a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //Next player turn
            nextPlayer();
        }
    }

});

document. querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;
        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //Check if player has won
        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function init () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
//sets all score values to zero
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
//sets Player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
//Sets Player classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
