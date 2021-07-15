// Welcome to Javascript Hangman!
console.log('Welcome to Javascript Hangman!');
console.log('You have 10 seconds to guess the word!');
console.log('Press the button when you are ready.');

// Declaring Variables
var titleText = document.querySelector('.large-font');
var startButton = document.querySelector('.start-button');
var card = document.querySelector('.word-guess');
var wordBlanks = document.querySelector('.word-blanks');
var wins = document.querySelector('.win');
var userWins = 0;
var points = document.querySelector('.point-score');
var userPoints = 0;
var losses = document.querySelector('.lose');
var userLosses = 0;
var resetScoreButton = document.querySelector('.reset-button');
var timer = document.querySelector('.timer-count');
var timeRemaining = 10;
var secondsRemaining = document.querySelector('.timer-text').children[1];

// Game Variables
var gameWords = ['javascript','python','csharp','css','sql','ruby','kotlin','html','json','java','cplusplus','sass'];
var randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
var guessed = [];

// Page Load Functions
randomWordGenerator();
guessedWord();
renderUserLosses();
renderUserWins();

// Random Word Generation
function randomWordGenerator() {
    wordBlanks.innerHTML = randomWord;
}

// Guess Word Function
function guessedWord() {
    wordStatus = wordBlanks.innerHTML.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter: '<div class="guess">_</div>')).join('');
    console.log('The Randomly Generated Word is: ' + randomWord);
    wordBlanks.innerHTML = wordStatus;
}

// Handle Chosen Letter by the User
function handleChosenLetter(chosenLetter) {

    // Declaring Blanks as Variables in an Array
    var guessBlanks = document.querySelectorAll('.guess');

    // Main Game Letter Checker
    for (var i = 0; i < randomWord.length; i++) {

        if (chosenLetter === randomWord[i]) {
            guessed[i] = chosenLetter;
            guessBlanks[i].innerHTML = chosenLetter;
            // Toggle Class on Blank Fill
            guessBlanks[i].classList.add('filled');
        }

         // Check if Game is Won
        // Creating Array to Measure Length on Toggled Class
        var filledBlanks = document.querySelectorAll('.filled');
        var filledBlanksLength = filledBlanks.length;
        var randomWordLength = randomWord.split('').length;

        if (timeRemaining < 10 && timeRemaining > 0) {

            if (filledBlanksLength === randomWordLength) {

                console.log('Correct!');

                for (var k = 0; k < gameWords.length; k++) {
                    var newRandomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
                    randomWord = newRandomWord;
                    wordStatus = wordBlanks.innerHTML.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter:'<div class="guess">_</div>')).join('');
                    randomWordGenerator();
                    guessedWord();
                    handleChosenLetter(chosenLetter);
                }

                // Store Win Local Storage
                if (userPoints < gameWords.length) {
                    
                    userPoints++;
                    points.innerHTML = userPoints;

                    // Timer Increment
                    timeRemaining++;
                    timer.innerHTML = timeRemaining;
                    startButton.innerHTML = 'In Game ' + timeRemaining;

                    if (userPoints === gameWords.length) {
                        userWins++;
                        localStorage.setItem('User Wins', userWins);
                        wins.innerHTML = userWins;
                        userPoints = 0;
                        points.innerHTML = userPoints;
                        return;
                    }

                }

            }
        
        }
        // guessed.push(chosenLetter);
    }
    
}

// Render User Losses Function Definition
function renderUserLosses() {
    userLosses = localStorage.getItem('User Losses');
    if (userLosses > 0) {
    losses.innerHTML = userLosses;
    } else {
        losses.innerHTML = 0;
    }
}

// Render User Wins Function Definition
function renderUserWins() {
    userWins = localStorage.getItem('User Wins');
    if (userWins > 0) {
    wins.innerHTML = userWins;
    } else {
        wins.innerHTML = 0;
    }
}

// Reset Score Function
resetScoreButton.addEventListener('click', function resetScoreButtonClicked(event) {

    // Local Storage Reset
    // Reset Losses // Reset Wins
    userLosses = localStorage.getItem('User Losses');
    userWins = localStorage.getItem('User Wins');
    userWins = 0;
    userLosses = 0;
    localStorage.setItem('User Losses', userLosses);
    localStorage.setItem('User Wins', userWins);
    losses.innerHTML = 0;
    wins.innerHTML = 0;

    // Initiate Reset Score Button as Clear Everything Button
    resetScoreButton.setAttribute('href','/');
    resetScoreButton.innerHTML = 'Clear Everything';
    resetScoreButton.addEventListener('click', function(event) {
        // Hard Refreshes the Current Page
        location.reload(true);

        // Clear Local Storage
        localStorage.clear();
    })

})

// Start Game on Button Click
startButton.addEventListener('click', function(event) {

    // Begin Game Function
    // Declaring Chosen Letter Variable on Key Down Press
    var chosenLetter = document.addEventListener('keydown',function(event){
        chosenLetter = event.key;
        console.log(chosenLetter);
        handleChosenLetter(chosenLetter);
    });

    // Start Timer on Button Click
    var countDownTimer = setInterval(function(guessBlanks) {

        // Decrement the Timer to Count Downwards
        timeRemaining--;

        // If the Timer is Above 0
        if (timeRemaining >= 0) {
            titleText.innerHTML = 'Guess The Word';
            timer.innerHTML = timeRemaining;
            startButton.classList.add('activeGameButton');
            startButton.innerHTML = 'In Game ' + timeRemaining;
        }

        // If the Timer Hits 0
        if (timeRemaining === 0) {

            // Defeat Screen
            titleText.innerHTML = 'DEFEAT';
            timer.innerHTML = 'GGWP';
            secondsRemaining.innerHTML = 'Game Over!';
            clearInterval(countDownTimer);

            // Initiate Begin Game Button as Restart Game Button
            startButton.classList.remove('activeGameButton');
            startButton.setAttribute('href','/');
            startButton.innerHTML = 'Again?';
            startButton.addEventListener('click', function(event) {
                // Hard Refreshes the Current Page
                location.reload(true);
            })

            // Store Loss Local Storage
            userLosses++;
            localStorage.setItem('User Losses', userLosses);
            losses.innerHTML = userLosses;

        }

        // End Count Down Timer Interval Function
    }, 1000); // Sets the function to run on a 1000 ms // 1 second delay

});