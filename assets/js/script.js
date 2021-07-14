var startButton = document.querySelector(".start-button");
var timer = document.querySelector(".timer-count");
var timeRemaining = timer.innerHTML;

// Start Game on Button Click
startButton.addEventListener("click", function(event) {
    // Start Timer on Button Click
    var countDownTimer = setInterval(function countDownFunction() {
        // If the timer hits or goes below 0
        if (timeRemaining <= 0) {
            clearInterval(countDownTimer);
        }
        // Decrement the timer to countdownwards
        timeRemaining -= 1;
    }, 1000);

})