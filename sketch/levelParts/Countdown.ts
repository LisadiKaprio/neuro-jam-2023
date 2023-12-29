class Countdown {
    // Set the initial countdown time in seconds (01:30)
    initialMinutes = 1;
    initialSeconds = 30;
    startCountdownTime = this.initialMinutes * 60 + this.initialSeconds;
    countdownTime = this.startCountdownTime;
    startTime = 0;

    constructor() {

        this.startTime = millis();
    }

    draw() {

        // Calculate the elapsed time
        let elapsedTime = floor((millis() - this.startTime) / 1000);

        // Calculate the remaining time
        let remainingTime = this.countdownTime - elapsedTime;

        // Display the remaining time
        textAlign(CENTER, CENTER);
        textSize(32);
        text(this.formatTime(remainingTime), width / 2, height / 2);
    }

    formatTime(seconds: number): string {
        let minutes = floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return nf(minutes, 2) + ':' + nf(remainingSeconds, 2);
    }

}