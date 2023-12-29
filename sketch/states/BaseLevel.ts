/// <reference path="../helpers/HelperStateManager.ts" />
class BaseLevel {
    private timePlayingThisLevel = 0;
    private progressBar: ProgressBar;
    private countdown: Countdown;
    private progressBarPositionX = CANVAS_WIDTH / 2 - spriteProgressEmpty.width / 2;
    private progressBarPositionY = 100;
    private level: Level;

    private frenzyProgressAddition = 0.1;
    private frenzyMeter = 0;
    private frenzyMeterStep = 40;
    private maxFrenzyMeter = CANVAS_WIDTH + 100;
    private enteredFrenzyMode = false;

    private opponent: Opponent;
    private evil: Evil;

    private currentFrame = 0;

    private currentProgress = 0;

    constructor(level: Level) {
        this.level = level;
        this.progressBar = new ProgressBar(this.progressBarPositionX, this.progressBarPositionY);
        this.countdown = new Countdown();
        this.progressBar.progressStep = 1;
        this.progressBar.progressReductionStep = 0.33;
        this.frenzyProgressAddition = this.progressBar.progressStep;
        this.opponent = new Opponent();
        this.evil = new Evil();
    }

    setup() {
    }

    draw() {
        image(defaultBackground, 0, 0)
        this.timePlayingThisLevel++;
        // imageMode(CENTER);

        this.drawFrenzyMeter();
        this.drawProgressBar();
        this.evil.draw();
        this.opponent.draw();
        this.countdown.draw();

        if (this.timePlayingThisLevel <= 5 || this.opponent.state === OpponentState.SHOCKED) { return }

        if (this.opponent.state === OpponentState.WORKING && this.currentProgress >= this.progressBar.progressReductionStep) {
            this.currentProgress -= this.progressBar.progressReductionStep;
        }

        const forbiddenToProgress = this.opponent.state === OpponentState.WORKING || this.opponent.state === OpponentState.THINKING
        if (mouseIsPressed && forbiddenToProgress) {
            this.frenzyMeter = 0;
            this.opponent.state = OpponentState.SHOCKED;
            return
        }

        if (mouseIsPressed) {
            this.beInteracted();
        } else {
            this.beIdle();
        }

    }

    drawProgressBar() {
        this.progressBar.currentProgress = this.currentProgress;
        this.progressBar.draw();
    }

    drawFrenzyMeter() {
        noStroke();
        fill(0, 0, 0, 127);
        ellipse(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, this.frenzyMeter);
    }

    beIdle() {
        if (this.frenzyMeter > 0) {
            this.frenzyMeter = 0;
        }
    }

    beInteracted() {
        this.currentProgress += this.progressBar.progressStep;
        if (this.frenzyMeter <= this.maxFrenzyMeter) {
            this.frenzyMeter += this.frenzyMeterStep;
        }
        else if (this.frenzyMeter >= this.maxFrenzyMeter && !this.enteredFrenzyMode) {
            this.enteredFrenzyMode = true;
        }
    }

    initiateFrenzyMode() {
        this.progressBar.progressStep += this.frenzyProgressAddition;
    }

    mouseClicked() {

    }
}