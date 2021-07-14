// Welcome to Javascript Hangman!
console.log('Welcome to Javascript Hangman!');
console.log('You have 10 seconds to guess the word!');
console.log('Press the button when you are ready.');

// Declaring Variables
var titleText = document.querySelector('.large-font');
var startButton = document.querySelector('.start-button');
var wordBlanks = document.querySelector('.word-blanks');
var timer = document.querySelector('.timer-count');
var timeRemaining = timer.innerHTML;
var secondsRemaining = document.querySelector('.timer-text').children[1];

console.log(titleText);
console.log(wordBlanks);

// Start Game on Button Click
startButton.addEventListener('click', function(event) {

    // Begin Game Function


    // Start Timer on Button Click
    var countDownTimer = setInterval(function() {

        // Decrement the timer to countdownwards
        timeRemaining--;

        // If the timer is above 0
        if (timeRemaining >= 0) {
            titleText.innerHTML = 'Guess The Word';
            timer.innerHTML = timeRemaining;
        }

        // If the timer hits 0
        if (timeRemaining === 0) {
            titleText.innerHTML = 'DEFEAT';
            timer.innerHTML = 'GGWP';
            secondsRemaining.innerHTML = 'Game Over!';
            clearInterval(countDownTimer);
        }

        // End Count Down Timer Function
    }, 1000); // Sets the function to run on a 1000 ms // 1 second delay

});