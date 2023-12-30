/// <reference path="../helpers/HelperStateManager.ts" />
/// <reference path="../Types.ts" />
/// <reference path="../sketch.ts" />

enum OpponentState {
    WORKING = 'working',
    THINKING = 'thinking',
    DISTRACTED = 'distracted',
    FOUND = 'found',
    SHOCKED = 'shocked',
    LOST = 'lost',
    WON = 'won'
}

class Opponent {
    private frameCountSinceAnimationStart = 0;

    public state: OpponentState = OpponentState.WORKING;
    public currentFrame: number = 0;
    private characterSize = 0.9;

    public timeBeforeGameEnd = FRAMERATE * 8;
    private timeBeforeGameEndIfLost = FRAMERATE * 4;
    // if lost not by misclick, the time is set from BaseLevel
    public currentTimeBeforeGameEnd = this.timeBeforeGameEndIfLost;

    private characterWidth = workingOpponentImages[0].width * this.characterSize;
    private characterHeight = workingOpponentImages[0].height * this.characterSize;
    private offsetX = 50;
    private offsetY = 10;

    private positionX = CANVAS_WIDTH - this.characterWidth + this.offsetX;
    private positionY = CANVAS_HEIGHT - this.characterHeight + this.offsetY;

    public minWorkingTime = 0.5;
    public maxWorkingTime = 2;

    public minDistractionTime = 0.75;
    public maxDistractionTime = 4;

    public minFoundTime = 1.1;
    public maxFoundTime = 1.6;

    public chanceToTrickThink = 0.3;
    public chanceToTrickFound = 0.7;

    public trickedThink = random(0, 1);
    public trickedFound = random(0, 7);

    private timeUntilStateChange = random(FRAMERATE * this.minWorkingTime, FRAMERATE * this.maxWorkingTime);

    constructor() {
    }

    draw() {
        this.frameCountSinceAnimationStart++;
        this.timeUntilStateChange--;
        if (this.timeUntilStateChange <= 0) {
            this.handleStateChange();
        }

        switch (this.state) {
            case OpponentState.WORKING:
                this.drawWorking();
                break;
            case OpponentState.THINKING:
                this.drawThinking();
                break;
            case OpponentState.DISTRACTED:
                this.drawDistracted();
                break;
            case OpponentState.FOUND:
                this.drawFound();
                break;
            case OpponentState.SHOCKED:
                this.drawShocked();
                break;
            case OpponentState.LOST:
                this.drawLost();
                break;
            case OpponentState.WON:
                this.drawWon();
                break;
        }
    }

    handleStateChange() {
        switch (this.state) {
            case OpponentState.WORKING:
                volumeControl.playSound(soundNeuroErm);
                this.changeToStateAfterAnimationEnd(thinkingOpponentAnimation, OpponentState.THINKING);
                break;
            case OpponentState.THINKING:
                let randomizerThinking = random(0, 1);
                if (randomizerThinking <= this.chanceToTrickThink && this.trickedThink > 0) {
                    this.trickedThink--;
                    this.changeToState(OpponentState.WORKING, FRAMERATE * this.minWorkingTime, FRAMERATE * this.maxWorkingTime);
                } else {
                    this.trickedThink = random(0, 2);
                    volumeControl.playSound(random([soundToolbox, soundToolboxTwo, soundToolboxThree]));
                    this.changeToState(OpponentState.DISTRACTED, FRAMERATE * this.minDistractionTime, FRAMERATE * this.maxDistractionTime);
                }
                break;
            case OpponentState.DISTRACTED:
                volumeControl.playSound(random([soundNeuroHeart, soundNeuroWuu]));
                this.changeToState(OpponentState.FOUND, FRAMERATE * this.minFoundTime, FRAMERATE * this.maxFoundTime);
                break;
            case OpponentState.FOUND:
                let randomizerFound = random(0, 1);
                if (randomizerFound <= this.chanceToTrickFound && this.trickedFound > 0) {
                    this.trickedFound--;
                    volumeControl.playSound(random([soundToolbox, soundToolboxTwo, soundToolboxThree]));
                    this.changeToState(OpponentState.DISTRACTED, FRAMERATE * this.minDistractionTime, FRAMERATE * this.maxDistractionTime);
                } else {
                    this.trickedFound = random(0, 3);
                    this.changeToState(OpponentState.WORKING, FRAMERATE * this.minWorkingTime, FRAMERATE * this.maxWorkingTime);
                }
                break;
            case OpponentState.SHOCKED:
                break;
            case OpponentState.LOST:
                break;
            case OpponentState.WON:
                break;
        }
    }

    changeToState(state: OpponentState, minTimeUntilNextChange: number, maxTimeUntilNextChange: number) {
        this.frameCountSinceAnimationStart = 0;
        this.state = state;
        this.timeUntilStateChange = random(minTimeUntilNextChange, maxTimeUntilNextChange)
        this.currentFrame = 0;
    }

    changeToStateAfterAnimationEnd(animation: Frame[], state: OpponentState) {
        this.frameCountSinceAnimationStart = 0;
        this.state = state;
        for (const frame of animation) {
            this.timeUntilStateChange += frame.duration;
        }
        this.currentFrame = 0;
    }

    drawWorking() {
        push();
        translate(this.positionX + (this.characterWidth / 2) + 45, this.positionY + this.characterHeight / 2 + 31);
        let armRotation = sin(frameCount * 0.5) * 0.75;
        rotate(armRotation);
        image(workingArmImage, -workingArmImage.width, -workingArmImage.height / 2, workingArmImage.width, workingArmImage.height)
        pop();
        if (armRotation <= -0.7) {
            // volumeControl.playSound(random([soundClankTap, soundClank]));
        }
        this.animate(workingOpponentAnimation, this.positionX, this.positionY)
    }

    drawThinking() {
        this.animate(thinkingOpponentAnimation, this.positionX, this.positionY)
    }

    drawDistracted() {
        this.animate(distractedOpponentAnimation, this.positionX, this.positionY)
    }

    drawFound() {
        push();
        imageMode(CENTER);
        translate(0, sin(frameCount * 0.2) * 8);
        image(foundArmImage, this.positionX + this.characterWidth - foundArmImage.width, this.positionY + (this.characterHeight / 2) - 20)
        pop();
        this.animate(foundOpponentAnimation, this.positionX, this.positionY)
    }

    drawShocked() {
        this.currentTimeBeforeGameEnd -= 1;
        if (this.currentTimeBeforeGameEnd <= 0) {
            this.currentTimeBeforeGameEnd = this.timeBeforeGameEnd
            stateManager.switchToLoseScreen(lostCaughtBG, 'You got caught!');
        }
        this.animate(shockedOpponentAnimation, this.positionX, this.positionY)
    }

    drawLost() {
        this.currentTimeBeforeGameEnd -= 1;
        if (this.currentTimeBeforeGameEnd <= 0) {
            this.currentTimeBeforeGameEnd = this.timeBeforeGameEnd
            stateManager.switchToLevelSelection();
        }
        this.animate(lostOpponentAnimation, this.positionX, this.positionY)
    }

    drawWon() {
        this.currentTimeBeforeGameEnd -= 1;
        if (this.currentTimeBeforeGameEnd <= 0) {
            this.currentTimeBeforeGameEnd = this.timeBeforeGameEnd
            stateManager.switchToLoseScreen(lostTimeoutBG, 'Time ran out!');
        }
        this.animate(wonOpponentAnimation, this.positionX, this.positionY)
    }

    animate(animation: Frame[], x: number, y: number) {
        if (this.currentFrame >= animation.length) {
            this.currentFrame = 0;
        }
        const currentFrameImage = animation[this.currentFrame].image;
        image(currentFrameImage, x, y, this.characterWidth, this.characterHeight);
        if (this.frameCountSinceAnimationStart % animation[this.currentFrame].duration === 0 && this.frameCountSinceAnimationStart !== 0) {
            this.currentFrame = (this.currentFrame + 1) % animation.length;
        }
    }


}