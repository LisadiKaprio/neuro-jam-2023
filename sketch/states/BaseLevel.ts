/// <reference path="../helpers/HelperStateManager.ts" />
/// <reference path="../Types.ts" />
class BaseLevel {
    private robotPositionY = CANVAS_WIDTH / 2 + 37;
    private cloud: Cloud;

    public clickCooldownMeter = 0;
    private enteredWinning = false;
    private enteredLosing = false;
    private progressBar: ProgressBar;
    private countdown: Countdown;
    private progressBarPositionX = CANVAS_WIDTH / 2 - spriteProgressEmpty.width / 2;
    private progressBarPositionY = 100;
    private level: Level;

    private frenzyProgressAddition = 0.1;
    private frenzyMeter = 0;
    private frenzyMeterStep = 37
    private maxFrenzyMeter = CANVAS_WIDTH + 100;
    private enteredFrenzyMode = false;
    private frenzyProgressStepMultiplier = 2.25;

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
        this.progressBar.startProgressStep = this.progressBar.currentProgressStep * this.level.progressStepMultiplier;
        this.progressBar.currentProgress = this.progressBar.startProgressStep
        this.progressBar.progressReductionStepMultiplier = this.level.progressReductionStepMultiplier;
        this.opponent = new Opponent();
        this.evil = new Evil();
        this.cloud = new Cloud();
        this.robotIngameImage = this.level.robotIngameImage;
        this.robotLoseImage = this.level.robotLoseImage;
        this.robotWinImage = this.level.robotWinImage;
    }

    setup() {
    }

    draw() {
        this.maxFrenzyMeter = dist(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        image(defaultBackground, 0, 0)
        this.countdown.calculate();

        if (tutorial.isShown) {
            this.clickCooldownMeter = 0;
            return
        }
        this.clickCooldownMeter++;

        // handle winning scene        
        if (this.opponent.currentTimeBeforeGameEnd <= 0) {
            stateManager.switchToWinMatchScreen(this.level.robotWinImage, this.level.codename === 'level-three');
        }

        this.drawRobot();

        const forbiddenToProgress = this.opponent.state === OpponentState.WORKING || this.opponent.state === OpponentState.THINKING

        // awkward touch screen compatibility attempt
        const playerInteractionConfirmed = (mouseIsPressed && mouseButton === LEFT || touches.length > 0)
            && !(volumeControl.musicVolumeControl.isMouseOver() || volumeControl.sfxVolumeControl.isMouseOver() || tutorial.isMouseOver())

        const validPlayerInteractionConfirmed = !forbiddenToProgress
            && this.opponent.state !== OpponentState.LOST
            && this.opponent.state !== OpponentState.WON
            && playerInteractionConfirmed
        const losingPlayerInteractionConfirmed = forbiddenToProgress
            && playerInteractionConfirmed

        this.drawFrenzyMeter();
        this.drawProgressBar();
        this.evil.draw();

        if (validPlayerInteractionConfirmed) this.cloud.draw(cloudEvilAnimation, CANVAS_WIDTH / 2, this.robotPositionY);
        this.opponent.draw();
        this.countdown.draw();

        if (this.clickCooldownMeter <= 5
            || this.opponent.state === OpponentState.SHOCKED
            || this.opponent.state === OpponentState.LOST
            || this.opponent.state === OpponentState.WON
        ) { return }

        if (this.currentProgress >= this.progressBar.maxStep && !this.enteredWinning) {
            this.enteredWinning = true;
            this.opponent.currentTimeBeforeGameEnd = this.opponent.timeBeforeGameEnd
            volumeControl.stopMusic();
            this.resetFrenzyMode();

            const stringInLocalStorage = `${this.level.codename}-highscore`;
            this.level.bestTime = parseFloat(localStorage.getItem(stringInLocalStorage) || '0');
            if (this.countdown.elapsedTime >= this.level.bestTime) {
                localStorage.setItem(`${this.level.codename}-highscore`, this.countdown.elapsedTime.toString());
            }
            volumeControl.playSound(soundNeuroOhDear);
            this.evil.state = EvilState.WON;
            this.opponent.state = OpponentState.LOST;
            return
        }

        if (this.countdown.remainingTime <= 0 && !this.enteredLosing) {
            this.enteredLosing = true;
            volumeControl.stopMusic();
            this.opponent.currentTimeBeforeGameEnd = this.opponent.timeBeforeGameEnd
            this.resetFrenzyMode();
            volumeControl.playSound(soundNeuroPog);
            this.evil.state = EvilState.IDLE;
            this.opponent.state = OpponentState.WON;
            return
        }

        if (this.opponent.state === OpponentState.WORKING) {
            this.cloud.draw(cloudNeuroAnimation, CANVAS_WIDTH / 2, this.robotPositionY);
            if (this.currentProgress >= this.progressBar.progressReductionStep * this.progressBar.progressReductionStepMultiplier) this.currentProgress -= this.progressBar.progressReductionStep * this.progressBar.progressReductionStepMultiplier;
        }



        if (validPlayerInteractionConfirmed) {
            this.beInteracted();
        } else if (losingPlayerInteractionConfirmed) {
            if (!this.enteredLosing) {
                this.enteredLosing = true;
                volumeControl.playSound(random([soundEvilOhNyooo, soundEvilWhoops]))
            }
            this.frenzyMeter = 0;
            volumeControl.stopMusic();
            this.opponent.state = OpponentState.SHOCKED;
            this.evil.state = EvilState.CAUGHT;
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

    drawRobot() {
        push();
        imageMode(CENTER);
        let imageToDraw = this.robotIngameImage;
        if (!imageToDraw) {
            console.log('no image to draw');
            pop();
            return;
        }
        if (this.opponent.state === OpponentState.LOST) {
            imageToDraw = this.robotWinImage;
        } else if (this.opponent.state === OpponentState.WON) {
            imageToDraw = this.robotLoseImage;
        }
        image(imageToDraw, CANVAS_WIDTH / 2, this.robotPositionY);
        pop();
    }

    beIdle() {
        volumeControl.playMusic(musicAwkwardPiano);
        if (this.evil.state !== EvilState.WON) this.evil.state = EvilState.IDLE;
        if (this.frenzyMeter > 0) {
            this.resetFrenzyMode();
        }
    }

    beInteracted() {
        this.evil.state = EvilState.DESTROYING;
        volumeControl.playMusic(musicUrgency);
        this.currentProgress += this.progressBar.currentProgressStep;
        if (this.frenzyMeter <= this.maxFrenzyMeter) {
            this.frenzyMeter += this.frenzyMeterStep;
        }
        else if (this.frenzyMeter >= this.maxFrenzyMeter && !this.enteredFrenzyMode) {
            this.initiateFrenzyMode()
        }
    }

    initiateFrenzyMode() {
        this.enteredFrenzyMode = true
        this.progressBar.currentProgressStep = this.progressBar.startProgressStep * this.frenzyProgressStepMultiplier;
        this.evil.inFrenzy = true;
        this.progressBar.inFrenzy = true;
    }

    resetFrenzyMode() {
        this.enteredFrenzyMode = false;
        this.progressBar.currentProgressStep = this.progressBar.startProgressStep;
        this.frenzyMeter = 0;
        this.evil.inFrenzy = false;
        this.progressBar.inFrenzy = false;
    }

    mouseClicked() {
        if (
            this.evil.state === EvilState.IDLE
            && this.opponent.state !== OpponentState.WORKING
            && this.opponent.state !== OpponentState.THINKING
            && this.opponent.state !== OpponentState.LOST
            && this.opponent.state !== OpponentState.WON
            && !(volumeControl.musicVolumeControl.isMouseOver() || volumeControl.sfxVolumeControl.isMouseOver())
            && !tutorial.isMouseOver()) {
            volumeControl.playSound(random([soundEvilHa, soundEvilHehe, soundEvilHehehe]))
        }
    }
}