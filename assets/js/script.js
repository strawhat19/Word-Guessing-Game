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
var isWin = false;

// Game Variables
var gameWords = ['javascript','python','csharp','css','sql','ruby','kotlin','html','json','java','cplusplus','sass','react.js','angular.js','node.js','jquery','azure','bootstrap','reactnative','swift','ionic','figma','adobe','website','mongodb','vue.js','less','wordpress','php','coredova','pwa','api'];
var randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
var guessed = [];
var possibleWords = document.getElementById('possibleWords');
var hints = document.getElementById('hints');

// Page Load Functions
randomWordGenerator();
guessedWord();
renderUserLosses();
renderUserWins();
renderUserPoints();

// Random Word Generation
function randomWordGenerator() {
    wordBlanks.innerHTML = randomWord;
    // Possible Words
    possibleWords.innerHTML = gameWords.join(' | ');
    // Hints
    if (randomWord === 'javascript') hints.innerHTML = 'The most wideley used scripting language for the web to manipulate theDOM.';
    if (randomWord === 'python') hints.innerHTML = 'The most popular programming language in the world, can be used to make anything.';
    if (randomWord === 'css') hints.innerHTML = 'Cascading Style Sheets, how we style the html we put on a page.';
    if (randomWord === 'less') hints.innerHTML = 'A CSS Preprocessor, LESSer known than its alternative.';
    if (randomWord === 'sass') hints.innerHTML = 'A CSS Preprocessor, makes writing CSS much more modular.';
    if (randomWord === 'react.js') hints.innerHTML = 'Front-end JavaScript library for building user interfaces or UI components. Owned & Maintained by Facebook.';
    if (randomWord === 'reactnative') hints.innerHTML = 'Javascript Framework for making mobile apps. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by enabling developers to use Reacts framework along with native platform capabilities.';
    if (randomWord === 'csharp') hints.innerHTML = 'A very popular programming language in the C family, the main language used in Unity to make video games.';
    if (randomWord === 'html') hints.innerHTML = 'The most widely used language for websites, every website has this as the basic skeleton for their content.';
    if (randomWord === 'java') hints.innerHTML = 'Commonly mistaken for another popular web scripting language, this is a backend language used to manipulate data.';
    if (randomWord === 'cplusplus') hints.innerHTML = 'A very powerful programming language in the C family used to make the more advanced applications as well as some of the most popular console games.';
    if (randomWord === 'kotlin') hints.innerHTML = 'A cross-platform, statically typed, general-purpose programming language with type inference.';
    if (randomWord === 'sql') hints.innerHTML = 'A domain-specific language used in programming and designed for managing data held in a relational database management system, or for stream processing in a relational data stream management system.';
    if (randomWord === 'ruby') hints.innerHTML = 'Designed and developed in the mid-1990s by Yukihiro "Matz" Matsumoto in Japan. Dynamically typed and uses garbage collection and just-in-time compilation.';
    if (randomWord === 'json') hints.innerHTML = 'An open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays.';
    if (randomWord === 'node.js') hints.innerHTML = 'An open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.';
    if (randomWord === 'vue.js') hints.innerHTML = 'An open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members.';
    if (randomWord === 'php') hints.innerHTML = 'A general-purpose scripting language especially suited to web development. It was originally created by Danish-Canadian programmer Rasmus Lerdorf in 1994.';
    if (randomWord === 'bootstrap') hints.innerHTML = 'A free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.';
    if (randomWord === 'azure') hints.innerHTML = 'A cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.';
    if (randomWord === 'swift') hints.innerHTML = 'A general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. and the open-source community to create iOS apps.';
    if (randomWord === 'ionic') hints.innerHTML = 'A complete open-source SDK for hybrid mobile app development. The original version was released in 2013 and built on top of AngularJS and Apache Cordova. Lets developers to ship apps to the app stores and as a PWA with a single code base, usually written in javascript as a progressive web application.';
    if (randomWord === 'jquery') hints.innerHTML = '';
    if (randomWord === 'figma') hints.innerHTML = '';
    if (randomWord === 'adobe') hints.innerHTML = '';
    if (randomWord === 'website') hints.innerHTML = '';
    if (randomWord === 'mongodb') hints.innerHTML = '';
    if (randomWord === 'wordpress') hints.innerHTML = '';
    if (randomWord === 'coredova') hints.innerHTML = '';
    if (randomWord === 'pwa') hints.innerHTML = 'A Progressive Web Application // A mobile friendly web application.';
    if (randomWord === 'api') hints.innerHTML = 'An Application Programming Interface.';
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

                // Store Win Local Storage
                if (userPoints < 10) {
                    
                    userPoints++;
                    points.innerHTML = userPoints;
                    localStorage.setItem('User Points', userPoints);
                    isWin = true;

                    // Timer Increment
                    timeRemaining++;
                    timer.innerHTML = timeRemaining;
                    startButton.innerHTML = 'In Game ' + timeRemaining;

                    if (userPoints >= 10) {
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
        guessed.push(chosenLetter);
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

function renderUserPoints() {
    userPoints = localStorage.getItem('User Points');
    if (userPoints > 0 && userPoints < 10) {
        
        setTimeout(function startGame() {
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

        // If User Wins
        if (isWin) {
            wordBlanks.innerHTML = randomWord;
            clearInterval(countDownTimer);
            titleText.innerHTML = 'You Guessed It!';
            timer.innerHTML = timeRemaining;
            startButton.innerHTML = 'Time Left: ' + timeRemaining;
            startButton.style.background = '#00cc80';
            var hintsSection = document.getElementById('hintsSection');
            hintsSection.style.background = '#00cc80';
            var hintsSection = document.getElementById('possibleWordsSection');
            possibleWordsSection.style.background = '#00cc80';
            var yellowBG1 = document.getElementById('card');
            var yellowBG2 = document.getElementById('score');
            var startButtonAddClass = document.getElementById('startButton');
            yellowBG1.classList.add('victory');
            yellowBG2.classList.add('victory');
            startButtonAddClass.classList.add('victory');
            gameWords = gameWords - randomWord;
            possibleWords.innerHTML = gameWords.join(' | ');
            setTimeout(function reloadGame() {
                location.reload(true);
            }, 1500);
            return;
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
            startButton.addEventListener('click', function reloadGame(event) {
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
        }, 100);
        
    points.innerHTML = userPoints;
    } else if (localStorage.getItem('User Points') >= 10) {
        // Reset Points
        var userPointScore = localStorage.getItem('User Points');
        userPointScore = 0;
        points.innerHTML = userPointScore;
        localStorage.setItem('User Points', userPointScore);
        var yellowBG1 = document.getElementById('card');
        var yellowBG2 = document.getElementById('score');
        var startButtonAddClass = document.getElementById('startButton');
        yellowBG1.classList.add('victory');
        yellowBG2.classList.add('victory');
        startButtonAddClass.classList.add('victory');
        titleText.innerHTML = 'VICTORY!';
        secondsRemaining.innerHTML = 'Congratulations!';
        wordBlanks.innerHTML = 'You Win! Reloading Game...';
        startButton.innerHTML = 'Reinitializing...';
        setTimeout(function reloadGame() {
            location.reload(true);
        }, 3000);
    } else {
        return;
    }
}

// Reset Score Function
resetScoreButton.addEventListener('click', function resetScoreButtonClicked(event) {

    // Local Storage Reset
    // Reset Losses
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
startButton.addEventListener('click', function startGame(event) {

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

        // If User Wins
        if (isWin) {
            wordBlanks.innerHTML = randomWord;
            clearInterval(countDownTimer);
            titleText.innerHTML = 'You Guessed It!';
            timer.innerHTML = timeRemaining;
            startButton.innerHTML = 'Time Left: ' + timeRemaining;
            startButton.style.background = '#00cc80';
            var hintsSection = document.getElementById('hintsSection');
            hintsSection.style.background = '#00cc80';
            var hintsSection = document.getElementById('possibleWordsSection');
            possibleWordsSection.style.background = '#00cc80';
            var yellowBG1 = document.getElementById('card');
            var yellowBG2 = document.getElementById('score');
            var startButtonAddClass = document.getElementById('startButton');
            yellowBG1.classList.add('victory');
            yellowBG2.classList.add('victory');
            startButtonAddClass.classList.add('victory');
            gameWords = gameWords - randomWord;
            possibleWords.innerHTML = gameWords.join(' | ');
            setTimeout(function reloadGame() {
                location.reload(true);
            }, 1500);
            return;
        }
    

        // If the Timer Hits 0
        if (timeRemaining === 0) {

            // Defeat Screen
            titleText.innerHTML = 'DEFEAT';
            timer.innerHTML = 'GGWP';
            secondsRemaining.innerHTML = 'Game Over!';
            wordBlanks.innerHTML = randomWord;
            clearInterval(countDownTimer);

            // Initiate Begin Game Button as Restart Game Button
            startButton.classList.remove('activeGameButton');
            startButton.setAttribute('href','/');
            startButton.innerHTML = 'Again?';
            startButton.addEventListener('click', function reloadGame(event) {
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