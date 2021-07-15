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
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Game Variables
var gameWords = ['javascript','python','csharp','css','sql','ruby','kotlin','html','json','java','cplusplus','sass'];
var randomWord = '';
var wordStatus = null;
var guessed = [];
var chosenLetter = document.addEventListener('keydown',function(event){
    chosenLetter = event.key;
    console.log(chosenLetter);
});

// Page Load Functions
renderUserLosses();
randomWordGenerator();
guessedWord();
handleChosenLetter(chosenLetter);

// Random Word Generation
function randomWordGenerator() {
    randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    wordBlanks.innerHTML = randomWord;
}

// Guess Word Function
function guessedWord() {
    wordStatus = wordBlanks.innerHTML.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter: ' _ ')).join(' ');
    console.log('The Randomly Generated Word is: ' + randomWord);
    console.log('The blanks are as follows: ' + wordStatus);
    wordBlanks.innerHTML = wordStatus;
}

// Handle Chosen Letter by the User
function handleChosenLetter(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

    if (wordBlanks.innerHTML.split('').indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (wordBlanks.innerHTML.split('').indexOf(chosenLetter) === -1) {
        console.log('Guessed Wrong!');
    }
}

// Check if Game is Won
function checkIfGameWon() {
    console.log(randomWord);
    console.log(wordStatus);
    if (wordStatus === randomWord) {
      console.log('You Won!');
      resetScoreButtonClicked();
    }
  }

// Render User Losses Function Definition
function renderUserLosses() {
    userLosses = localStorage.getItem('User Losses');
    losses.innerHTML = userLosses;
  }

// Reset Score Function
resetScoreButton.addEventListener('click', function resetScoreButtonClicked(event) {

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
            startButton.addEventListener('click', function(event) {
                // Hard Refreshes the Current Page
                location.reload(true);
            })

            // Store Loss Local Storage
            userLosses++;
            losses.innerHTML = userLosses;
            localStorage.setItem('User Losses', userLosses);
            losses.innerHTML = userLosses;

        }

        // End Count Down Timer Interval Function
    }, 1000); // Sets the function to run on a 1000 ms // 1 second delay

});