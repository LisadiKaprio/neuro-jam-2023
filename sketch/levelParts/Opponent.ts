/// <reference path="../helpers/HelperStateManager.ts" />

enum OpponentState {
    WORKING = 'working',
    THINKING = 'thinking',
    DISTRACTED = 'distracted',
    SHOCKED = 'shocked',
}

class Opponent {
    public state: OpponentState = OpponentState.WORKING;
    public currentFrame: number = 0;
    private characterSize = 1;
    private positionX: 10;
    private positionY: 10;

    private timeUntilStateChange = 10;

    public minWorkingTime = 25;
    public maxWorkingTime = 35;

    public minDistractionTime = 25;
    public maxDistractionTime = 45;

    constructor() {
    }

    draw() {
        this.timeUntilStateChange--;
        if (this.timeUntilStateChange <= 0) {
            this.handleStateChange();
        }

        switch (this.state) {
            case OpponentState.WORKING:
                this.drawWorking();
                break;
            case OpponentState.THINKING:
                // this.drawThinking();
                break;
            case OpponentState.DISTRACTED:
                this.drawDistracted();
                break;
            case OpponentState.SHOCKED:
                this.drawShocked();
                break;
        }
    }

    handleStateChange() {
        switch (this.state) {
            case OpponentState.WORKING:
                this.changeToState(OpponentState.DISTRACTED, 10, 20);
                break;
            case OpponentState.DISTRACTED:
                this.changeToState(OpponentState.WORKING, this.minWorkingTime, this.maxWorkingTime);
                break;
        }
    }

    changeToState(state: OpponentState, minTimeUntilNextChange: number, maxTimeUntilNextChange: number) {
        this.state = state;
        this.timeUntilStateChange = random(minTimeUntilNextChange, maxTimeUntilNextChange)
    }

    drawWorking() {
        this.animate(idleCharacterAnimation, this.positionX, this.positionY)
    }

    drawDistracted() {
        this.animate(distractedOpponentAnimation, this.positionX, this.positionY)
    }

    drawShocked() {
        if (this.currentFrame >= (shockedOpponentAnimation.length - 1)) {
            stateManager.switchToLoseScreen();
        }
        this.animate(shockedOpponentAnimation, this.positionX, this.positionY)
    }

    animate(animation: Frame[], x: number, y: number) {
        if (this.currentFrame >= animation.length) {
            this.currentFrame = 0;
        }
        const currentFrameImage = animation[this.currentFrame].image;
        image(currentFrameImage, 0, 0,);
        if (frameCount % animation[this.currentFrame].duration === 0) {
            this.currentFrame = (this.currentFrame + 1) % animation.length;
        }
    }


}