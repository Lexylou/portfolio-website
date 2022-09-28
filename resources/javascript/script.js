// Collapsible nav
const head = document.querySelector('.header');
const body = document.querySelector('body');
const main = document.querySelector('main');

let navBarX = document.querySelector('.menu-icon');
const navBar = document.getElementById('nav-bar');
let lineOne = document.querySelector('.line-one');
let lineTwo = document.querySelector('.line-two');
let lineThree = document.querySelector('.line-three');
const navBarList = document.getElementById('small-screen-nav');

const headerDecor = document.querySelector('.header-decor');


document.addEventListener('scroll', 
function() {
    if (window.scrollY > 0) {
        body.classList.remove('no-body-scroll');
        head.classList.remove('blur');
        main.classList.remove('blur');
        headerDecor.classList.remove('header-decor-blur');
    }
});

function navTransition() {
    lineOne.style.transform = 'translateY(0.7rem) rotate(45deg)';
    lineOne.style.transition = 'all 800ms ease-out 200ms';
    lineTwo.style.opacity = '0';
    lineTwo.style.transition = 'opacity 600ms';
    lineThree.style.transform = 'translateY(-0.7rem) rotate(-45deg)';
    lineThree.style.transition = 'transform 800ms ease-out 200ms';


    navBarList.classList.add('menu-display-open');

    body.classList.add('no-body-scroll');

    head.classList.add('blur');
    main.classList.add('blur');
    head.classList.remove('blur-removal');
    main.classList.remove('blur-removal'); 
    
    if (headerDecor) {
        headerDecor.classList.add('header-decor-blur');
        headerDecor.classList.remove('header-decor-blur-removal');
    }
    
}

function navCloseTransition() {
    lineOne.style.transform = 'translateY(0rem) rotate(0deg)';
    lineOne.style.transition = 'all 800ms ease-out 200ms';
    lineTwo.style.opacity = '1';
    lineTwo.style.transition = 'opacity 0.5s 0.4s ';
    lineThree.style.transform = 'translateY(0rem) rotate(0deg)';
    lineThree.style.transition = 'transform 800ms ease-out 200ms';


    navBarList.classList.remove('menu-display-open');

    body.classList.remove('no-body-scroll');

    head.classList.add('blur-removal');
    main.classList.add('blur-removal');
    
    head.classList.remove('blur');
    main.classList.remove('blur');
    

    if (headerDecor) {
        headerDecor.classList.add('header-decor-blur-removal');
        headerDecor.classList.remove('header-decor-blur');
    }
}


let isClicked = false;
navBarX.addEventListener('click', 
function() {

    const toggle = () => {
        if (!isClicked) {
            isClicked = true;
            console.log('true');
        } else {
            isClicked = false;
            console.log('false');
        }
    }
    toggle();

    if (isClicked === true) {
        navTransition();
    } else {
        navCloseTransition();
    }

});


// Slide in
const sliders = document.querySelectorAll('.slide-in');
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });

},     
appearOptions);

sliders.forEach( slider => {
    appearOnScroll.observe(slider);

});


// Code for Rock, Paper, Scissors game
// Create variables
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






