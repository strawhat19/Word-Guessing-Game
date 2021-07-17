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
timer.innerHTML = timeRemaining;
var secondsRemaining = document.querySelector('.timer-text').children[1];
var isWin = false;

// Game Variables
var gameWords = ['javascript','python','csharp','css','sql','ruby','kotlin','html','json','java','cplusplus','sass','react.js','angular.js','node.js','jquery','azure','bootstrap','reactnative','swift','ionic','figma','adobe','website','mongodb','vue.js','less','wordpress','php','coredova','pwa','api','mariadb','hosting','vscode','inspector'];
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

// Hint Definitions
var javascript = 'The most wideley used scripting language for the web to manipulate the DOM.';
var python = 'The most popular programming language in the world, can be used to make anything. NAMED AFTER A REPTILE.';
var csharp = 'A very popular programming language in the C family, the main language used in Unity to make video games.';
var css = 'Cascading Style Sheets, how we style the html we put on a page.';
var sql = 'A domain-specific language used in programming and designed for managing data held in a relational database management system, or for stream processing in a relational data stream management system.';
var ruby = 'Designed and developed in the mid-1990s by Yukihiro "Matz" Matsumoto in Japan. Dynamically typed and uses garbage collection and just-in-time compilation.';
var kotlin =  'A cross-platform, statically typed, general-purpose programming language with type inference.';
var html = 'The most widely used language for websites, every website has this as the basic skeleton for their content.';
var json = 'An open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays.';
var java = 'Commonly mistaken for another popular web scripting language, this is a backend language used to manipulate data.';
var cplusplus = 'A very powerful programming language in the C family used to make the more advanced applications as well as some of the most popular console games.';
var sass = 'A CSS Preprocessor, makes writing CSS much more modular.';
var reactjs = 'Front-end JavaScript library for building user interfaces or UI components. Owned & Maintained by Facebook.';
var angularjs = 'A JavaScript-based open-source front-end web framework for developing single-page applications. It is maintained mainly by Google and a community of individuals and corporations.';
var nodejs = 'An open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.';
var jquery = 'A JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax. It is free, open-source software using the permissive MIT License. As of May 2019, this is used by 73% of the 10 million most popular websites.';
var azure =  'A cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.';
var bootstrap = 'A free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.';
var reactnative = 'Javascript Framework for making mobile apps. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by enabling developers to use Reacts framework along with native platform capabilities.';
var swift = 'A general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. and the open-source community to create iOS apps.';
var ionic = 'A complete open-source SDK for hybrid mobile app development. The original version was released in 2013 and built on top of AngularJS and Apache Cordova. Lets developers to ship apps to the app stores and as a PWA with a single code base, usually written in javascript as a progressive web application.';
var figma =  'A vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows. The Mirror companion apps for Android and iOS allow viewing prototypes in real-time on mobile devices.';
var adobe = 'A computer software company focused on making software for content design and creation. Includes apps such as Photoshop, Illustrator, After Effects, Premiere, XD, etc.';
var website = 'A set of related web pages located under a single domain name, typically produced by a single person or organization. Typically written in HTML, styled and made responsive with CSS or SASS, and made interactive with Javascript or jQuery.';
var mongodb = 'A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, this uses JSON-like documents with optional schemas.';
var vuejs = 'An open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members.';
var less = 'A CSS Preprocessor, LESSer known than its alternative.';
var wordpress = 'A free and open-source content management system written in PHP and paired with a MySQL or MariaDB database.';
var php = 'A general-purpose scripting language especially suited to web development. It was originally created by Danish-Canadian programmer Rasmus Lerdorf in 1994.';
var coredova = 'The open-source version of PhoneGap, the leading tool for cross-platform app development. Its a write-once, run-anywhere solution specifically designed for mobile.';
var pwa = 'A Progressive Web Application // A mobile friendly web application.';
var api = 'An Application Programming Interface.';
var mariadb = 'A community-developed, commercially supported fork of the MySQL relational database management system, intended to remain free and open-source software.';
var hosting = 'Service that allows individuals and organizations to make their website accessible via the World Wide Web. Popular companies in this industry include: Godaddy, Squarespace, Shopify, etc.';
var vscode = 'A free text editor by Microsoft to edit and write code. This program comes with many handy keyboard shortcuts to make the development process much simpler and streamlined.';
var inspector = 'Sometimes called Developer Tools or just DevTools. This is a feature available in most modern web browsers that allows a user to inspect the individual elements and sources of a website. Many developers teach themselves code by just messing with this.';

var moreInfoLinks = [
    'https://www.w3schools.com/jsref/default.asp', // Javascript
    'https://www.w3schools.com/python/python_reference.asp', // Python
    'https://www.w3schools.com/cs/cs_examples.php', // C#
    'https://www.w3schools.com/cssref/', // CSS
    'https://www.w3schools.com/sql/sql_quickref.asp', // SQL
    'https://www.ruby-lang.org/en/documentation/', // Ruby
    'https://www.w3schools.com/kotlin/kotlin_examples.php', // Kotlin
    'https://www.w3schools.com/TAGS/default.ASP', // HTML
    'https://www.w3schools.com/jsref/jsref_obj_json.asp', // JSON
    'https://www.w3schools.com/java/java_ref_keywords.asp', // JAVA
    'https://www.w3schools.com/cpp/cpp_references.asp', // C++
    'https://www.w3schools.com/sass/', // SASS
    'https://www.w3schools.com/react/', // React.js
    'https://www.w3schools.com/angular/angular_intro.asp', // Angular.js
    'https://www.w3schools.com/nodejs/nodejs_intro.asp', // Node.js
    'https://www.w3schools.com/jquery/jquery_ref_overview.asp', // jQuery
    'https://searchcloudcomputing.techtarget.com/definition/Windows-Azure', // Azure
    'https://www.w3schools.com/bootstrap/', // Bootstrap
    'https://www.tutorialspoint.com/react_native/index.htm', // React Native
    'https://www.w3schools.in/swift-tutorial/', // Swift
    'https://ionicframework.com/', // Ionic
    'https://www.figma.com/', // Figma
    'https://www.adobe.com/', // Adobe
    'https://en.wikipedia.org/wiki/Website', // Website
    'https://www.mongodb.com/', // MongoDB
    'https://vuejs.org/', // Vue.js
    'https://lesscss.org/', // LESS
    'https://wordpress.com/', // Wordpress
    'https://www.php.net/', // php
    'https://cordova.apache.org/', // Coredova
    'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps', // PWA
    "https://www.mulesoft.com/resources/api/what-is-an-api#:~:text=API%20is%20the%20acronym%20for,you're%20using%20an%20API.", // API
    'https://mariadb.org/', // MariaDB
    'https://www.namecheap.com/hosting/what-is-web-hosting-definition/', // Hosting
    'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf', // VS Code
    'https://developer.chrome.com/docs/devtools/' // Inspector
]

// Hints
function displayHints() {
    if (randomWord === 'javascript') hints.innerHTML = javascript;
    if (randomWord === 'python') hints.innerHTML = python;
    if (randomWord === 'css') hints.innerHTML = css;
    if (randomWord === 'less') hints.innerHTML = less;
    if (randomWord === 'sass') hints.innerHTML = sass;
    if (randomWord === 'react.js') hints.innerHTML = reactjs;
    if (randomWord === 'reactnative') hints.innerHTML = reactnative;
    if (randomWord === 'csharp') hints.innerHTML = csharp;
    if (randomWord === 'html') hints.innerHTML = html;
    if (randomWord === 'java') hints.innerHTML = java;
    if (randomWord === 'cplusplus') hints.innerHTML = cplusplus;
    if (randomWord === 'kotlin') hints.innerHTML = kotlin;
    if (randomWord === 'sql') hints.innerHTML = sql;
    if (randomWord === 'ruby') hints.innerHTML = ruby;
    if (randomWord === 'json') hints.innerHTML = json;
    if (randomWord === 'node.js') hints.innerHTML = nodejs;
    if (randomWord === 'vue.js') hints.innerHTML = vuejs;
    if (randomWord === 'php') hints.innerHTML = php;
    if (randomWord === 'bootstrap') hints.innerHTML = bootstrap;
    if (randomWord === 'azure') hints.innerHTML = azure;
    if (randomWord === 'swift') hints.innerHTML = swift;
    if (randomWord === 'ionic') hints.innerHTML = ionic;
    if (randomWord === 'jquery') hints.innerHTML = jquery;
    if (randomWord === 'figma') hints.innerHTML = figma;
    if (randomWord === 'adobe') hints.innerHTML = adobe;
    if (randomWord === 'website') hints.innerHTML = website;
    if (randomWord === 'mongodb') hints.innerHTML = mongodb;
    if (randomWord === 'wordpress') hints.innerHTML = wordpress;
    if (randomWord === 'coredova') hints.innerHTML = coredova;
    if (randomWord === 'pwa') hints.innerHTML = pwa;
    if (randomWord === 'api') hints.innerHTML = api;
    if (randomWord === 'hosting') hints.innerHTML = hosting;
    if (randomWord === 'mariadb') hints.innerHTML = mariadb;
    if (randomWord === 'angular.js') hints.innerHTML = angularjs;
    if (randomWord === 'vscode') hints.innerHTML = vscode;
    if (randomWord === 'inspector') hints.innerHTML = inspector;
}

// Possible Words
for (var j = 0; j < gameWords.length; j++) {
    var possibleWordDiv = document.createElement('a');
    possibleWordDiv.classList.add('word');
    possibleWordDiv.classList.add(gameWords[j]);
    possibleWordDiv.innerHTML = ' | - ' + gameWords[j] + ' - | ';
    possibleWords.appendChild(possibleWordDiv);

    var definitions = [javascript,python,csharp,css,sql,ruby,kotlin,html,json,java,cplusplus,sass,reactjs,angularjs,nodejs,jquery,azure,bootstrap,reactnative,swift,ionic,figma,adobe,website,mongodb,vuejs,less,wordpress,php,coredova,pwa,api,mariadb,hosting,vscode,inspector];

    var words = document.querySelectorAll('.word');
    words.forEach(word => {
        words[j].setAttribute('target','_blank');
        words[j].setAttribute('href',moreInfoLinks[j]);
        words[j].setAttribute('data-definition',definitions[j]);
        words[j].setAttribute('alt',gameWords[j]);
    });
}

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

    // When the user presses any key on the keyboard, run the function
    document.addEventListener("keyup", function(event) {
        // If "caps lock" is pressed, display the warning text
            if (event.getModifierState("CapsLock")) {
              alert('CAPS LOCK will interfere with gameplay, turn off CAPS LOCK.');
            }
        });

    // Declaring Chosen Letter Variable on Key Down Press

    var chosenLetter = document.addEventListener('keydown',function(event){
        chosenLetter = event.key;
        console.log(chosenLetter);
        handleChosenLetter(chosenLetter);
    });

    // Hints
    displayHints();

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
            setTimeout(function reloadGame() {
                location.reload(true);
            }, 1500);
            return;
        }
    

        // If the Timer Hits 0
        if (timeRemaining === 0) {

            // Defeat Screen
            wordBlanks.innerHTML = randomWord;
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

    // When the user presses any key on the keyboard, run the function
    document.addEventListener("keyup", function(event) {
    // If "caps lock" is pressed, display the warning text
        if (event.getModifierState("CapsLock")) {
          alert('CAPS LOCK will interfere with gameplay, turn off CAPS LOCK for best results.');
        }
    });

    // Hints
    displayHints();

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