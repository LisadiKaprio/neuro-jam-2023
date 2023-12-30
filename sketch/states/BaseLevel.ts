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
    private frenzyMeterStep = 30;
    private maxFrenzyMeter = CANVAS_WIDTH + 100;
    private enteredFrenzyMode = false;

    private opponent: Opponent;
    private evil: Evil;
    private robotIngameImage: p5.Image;
    private robotLoseImage: p5.Image;
    private robotWinImage: p5.Image;

    private currentFrame = 0;

    private currentProgress = 0;

    constructor(level: Level) {
        this.level = level;
        this.progressBar = new ProgressBar();
        this.countdown = new Countdown();
        this.progressBar.progressStep = 1;
        this.progressBar.progressReductionStep = 0.33;
        this.frenzyProgressAddition = this.progressBar.progressStep;
        this.opponent = new Opponent();
        this.evil = new Evil();
        this.robotIngameImage = robotIngameOne;
        this.robotLoseImage = robotLoseOne;
        this.robotWinImage = robotWinOne;
    }

    setup() {
    }

    draw() {
        image(defaultBackground, 0, 0)
        this.timePlayingThisLevel++;
        // imageMode(CENTER);

        push();
        imageMode(CENTER);
        image(this.robotIngameImage, CANVAS_WIDTH / 2, CANVAS_WIDTH / 2 + 45);
        pop()

        this.drawFrenzyMeter();
        this.drawProgressBar();
        this.evil.draw();
        this.opponent.draw();
        this.countdown.draw();

        if (this.currentProgress >= this.progressBar.maxStep) {
            localStorage.setItem(`${this.level.codename}-highscore`, this.countdown.elapsedTime.toString());
            stateManager.switchToLevelSelection();
        }

        if (this.countdown.remainingTime <= 0) {
            stateManager.switchToLoseScreen(lostTimeoutBG, 'You ran out of time!');
        }

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
        push();
        noStroke();
        fill(0, 0, 0, 127);
        ellipse(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, this.frenzyMeter);
        pop();
    }

    beIdle() {
        this.evil.state = EvilState.IDLE;
        if (this.frenzyMeter > 0) {
            this.resetFrenzyMode();
        }
    }

    beInteracted() {
        this.evil.state = EvilState.DESTROYING;
        this.currentProgress += this.progressBar.progressStep;
        if (this.frenzyMeter <= this.maxFrenzyMeter) {
            this.frenzyMeter += this.frenzyMeterStep;
        }
        else if (this.frenzyMeter >= this.maxFrenzyMeter && !this.enteredFrenzyMode) {
            this.initiateFrenzyMode()
        }
    }

    initiateFrenzyMode() {
        this.enteredFrenzyMode = true
        this.progressBar.progressStep += this.frenzyProgressAddition;
        this.evil.inFrenzy = true;
        this.progressBar.inFrenzy = true;
    }

    resetFrenzyMode() {
        this.enteredFrenzyMode = false;
        this.frenzyMeter = 0;
        this.evil.inFrenzy = false;
        this.progressBar.inFrenzy = false;
    }

    mouseClicked() {

    }
}