// Welcome to Javascript Hangman!
console.log('Welcome to Javascript Hangman!');
console.log('You have 10 seconds to guess the word!');
console.log('Press the button when you are ready.');

// Declaring Variables
var titleText = document.querySelector('.large-font');
var startButton = document.querySelector('.start-button');
var wordBlanks = document.querySelector('.word-blanks');
var wins = document.querySelector('.win');
var userWins = 0;
var losses = document.querySelector('.lose');
var userLosses = 0;
var resetScoreButton = document.querySelector('.reset-button');
var timer = document.querySelector('.timer-count');
var timeRemaining = 10;
var secondsRemaining = document.querySelector('.timer-text').children[1];

// Page Load Functions
// Render User Losses Function Invokation
renderUserLosses();

// Render User Losses Function Definition
function renderUserLosses() {
    userLosses = localStorage.getItem('User Losses');
    losses.innerHTML = userLosses;
  }

// Reset Score Function
resetScoreButton.addEventListener('click', function(event) {

    // Local Storage Reset
    // Reset Losses
    userLosses = localStorage.getItem('User Losses');
    userLosses = 0;
    localStorage.setItem('User Losses', userLosses);
    losses.innerHTML = 0;

    // Clear Local Storage
    // localStorage.clear();

})


// Start Game on Button Click
startButton.addEventListener('click', function(event) {

    // Begin Game Function
    startButton.innerHTML = 'In Game';

    // Start Timer on Button Click
    var countDownTimer = setInterval(function() {

        // Decrement the Timer to Count Downwards
        timeRemaining--;

        // If the Timer is Above 0
        if (timeRemaining >= 0) {
            titleText.innerHTML = 'Guess The Word';
            timer.innerHTML = timeRemaining;
        }

        // If the Timer Hits 0
        if (timeRemaining === 0) {

            // Defeat Screen
            titleText.innerHTML = 'DEFEAT';
            timer.innerHTML = 'GGWP';
            secondsRemaining.innerHTML = 'Game Over!';
            clearInterval(countDownTimer);

            // Initiate Begin Game Button as Restart Game Button
            startButton.setAttribute('href','/');
            startButton.innerHTML = 'Again?';
            startButton.addEventListener('click', function() {
                location.reload(true);
            })

            // Store Loss Local Storage
            userLosses++;
            losses.innerHTML = userLosses;
            localStorage.setItem('User Losses', userLosses);
           
            losses.innerHTML = userLosses;

        }



        // End Count Down Timer Function
    }, 1000); // Sets the function to run on a 1000 ms // 1 second delay

});