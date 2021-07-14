var startButton = document.querySelector(".start-button");
var timer = document.querySelector(".timer-count");
var timeRemaining = timer.innerHTML;

// Start Game on Button Click
startButton.addEventListener("click", function(event) {

    // Start Timer on Button Click // Run it in a loop
    // for (var i = 0; timeRemaining > 0; i++) {
        setInterval(timerCountDown,1000);
        
        function timerCountDown() {
            var countDown = timeRemaining--;
            timeRemaining.innerHTML = countDown;
       }

    // }
    // return;
})