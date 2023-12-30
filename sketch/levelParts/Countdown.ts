/// <reference path="../helpers/Tutorial.ts" />


class Countdown {
    initialMinutes = 1;
    initialSeconds = 30;
    startCountdownTime = this.initialMinutes * 60 + this.initialSeconds;
    countdownTime = this.startCountdownTime;
    startTime = 0;

    timeToAddBecauseOfPause = 0;

    criticalRemainingTime = 10;
    public elapsedTime = 0;
    public remainingTime = this.countdownTime;

    constructor() {
        this.startTime = millis();
    }

    calculate() {
        if (tutorial.isShown) {
            this.timeToAddBecauseOfPause = (millis() - tutorial.openTime);
            return
        }
        if (this.timeToAddBecauseOfPause > 0) {
            this.startTime += this.timeToAddBecauseOfPause;
            this.timeToAddBecauseOfPause = 0;
        }

        if (this.remainingTime <= 0) return;
        // Calculate the elapsed time
        let elapsedTime = floor((millis() - this.startTime) / 1000);

        // Calculate the remaining time
        let remainingTime = this.countdownTime - elapsedTime;
        this.elapsedTime = elapsedTime;
        this.remainingTime = remainingTime;

    }

    draw() {
        // Display the remaining time
        push();
        if (this.remainingTime <= this.criticalRemainingTime) {
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
        text(formatTime(this.remainingTime), width / 2, spriteProgressBase.height);
        pop();
    }

}