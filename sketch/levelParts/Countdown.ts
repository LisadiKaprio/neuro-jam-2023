class Countdown {
    initialMinutes = 1;
    initialSeconds = 30;
    startCountdownTime = this.initialMinutes * 60 + this.initialSeconds;
    countdownTime = this.startCountdownTime;
    startTime = 0;

    criticalRemainingTime = 10;
    public elapsedTime = 0;
    public remainingTime = this.countdownTime;

    constructor() {
        this.startTime = millis();
    }

    draw() {
        if (this.remainingTime <= 0) return;
        // Calculate the elapsed time
        let elapsedTime = floor((millis() - this.startTime) / 1000);

        // Calculate the remaining time
        let remainingTime = this.countdownTime - elapsedTime;
        this.elapsedTime = elapsedTime;
        this.remainingTime = remainingTime;

        // Display the remaining time
        push();
        if (remainingTime <= this.criticalRemainingTime) {
            strokeWeight(4);
            stroke(COLOR_DARK);
            textAlign(CENTER, CENTER);
            textSize(sin(frameCount * 0.3) * 8 + 32);
            fill(COLOR_BLUE)
        } else {
            strokeWeight(4);
            stroke(COLOR_DARK_PINK);
            textAlign(CENTER, CENTER);
            textSize(32);
            fill(COLOR_YELLOW)
        }
        text(formatTime(remainingTime), width / 2, spriteProgressBase.height);
        pop();
    }

}