// Code for Rock, Paper, Scissors game

//Create variables
const roundNumberDisplay = document.getElementById('round-count');
const winnerDisplay = document.getElementById('winner');

const userMoveInput = document.getElementById('user-move');
const userScoreDisplay = document.getElementById('user-score');


const computerMoveDisplay = document.getElementById('computer-move');
const computerScoreDisplay = document.getElementById('computer-score');

const playButton = document.getElementById('play');
const nextRoundButton = document.getElementById('next-round');

const errorMessageDisplay = document.getElementById('error-message');


let userScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Add event listener to play button and function to play game and determine winner
playButton.addEventListener('click', 
function() {
    
    // Get user move and check validity of input - if valid, execute code block to run game; if not valid, display error message
    const userInput = userMoveInput.value.toLowerCase();
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb') {

        // Reset error message
        errorMessageDisplay.innerText = '';

        const currentUserMove = userInput;

        // Generate and display computer move
        function computerMoveChoice() {
            let number = Math.floor(Math.random() * 3);
            if (number === 0) {
                return 'rock';
            } else if (number === 1) {
                return 'paper';
            } else {
                return 'scissors';
            };
        };
        const computerMove = computerMoveChoice();

        computerMoveDisplay.innerText = computerMove;

        // Determine winner and update winner score
        const determineWinner = (currentUserMove, computerMove) => {
            if (currentUserMove === 'bomb') {
                return 'user-bomb';
            };
            if (currentUserMove === computerMove) {
                return 'tie';
            };

            if (currentUserMove === 'rock') {
                if (computerMove === 'paper') {
                return 'computer';
                } else {
                return 'user';
                }
            };
            if (currentUserMove === 'paper') {
                if (computerMove === 'scissors') {
                return 'computer';
                } else {
                return 'user';
                }
            };
            if (currentUserMove === 'scissors') {
                if (computerMove === 'rock') {
                return 'computer';
                } else {
                return 'user';
                }
            };
        
        }
        determineWinner(currentUserMove, computerMove);

        function updateScore(winner) {
            if (winner === 'user' || winner === 'user-bomb') {
                userScore += 1;
            } else if (winner === 'computer') {
                computerScore += 1;
            };
        };
        updateScore(determineWinner(currentUserMove, computerMove));

        userScoreDisplay.innerText = userScore;
        computerScoreDisplay.innerText = computerScore;

        
        // Display winner
        if (determineWinner(currentUserMove, computerMove) === 'user-bomb') {
            winnerDisplay.innerText = 'Congrats, you guessed the secret code word! You Win!!!!';
        } else if (determineWinner(currentUserMove, computerMove) === 'tie') {
            winnerDisplay.innerText = 'It\'s a tie, try again!';
        } else if (determineWinner(currentUserMove, computerMove) === 'user') {
            winnerDisplay.innerText = 'You Win!!!!';
        } else {
            winnerDisplay.innerText = 'Computer Wins';
        };

        // Disable play button and make the next round button active
        playButton.setAttribute('disabled', true);
        nextRoundButton.removeAttribute('disabled');

        userMoveInput.setAttribute('disabled', true);

    } else {
        errorMessageDisplay.innerText = 'Error, invalid input. Please input either rock, paper, or scissors!';
    };

}
);

// Add event listener to next round button to reset moves and play again in next round
nextRoundButton.addEventListener('click', () => {
    // Increase round number and display new round number
    function advanceRound() {
        currentRoundNumber += 1;
    };
    advanceRound();

    roundNumberDisplay.innerText = currentRoundNumber;

    // Switch diabled states
    playButton.removeAttribute('disabled');
    nextRoundButton.setAttribute('disabled', true);

    userMoveInput.removeAttribute('disabled');

    // Reset input box, computer move and winner displays
    userMoveInput.value = '';
    winnerDisplay.innerText = '?';
    computerMoveDisplay.innerText = '?';
    errorMessageDisplay.innerText = '';
    congratsForWinner.style.background = 'none';

}
);






