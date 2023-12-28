enum OpponentState {
    WORKING = 'working',
    THINKING = 'thinking',
    DISTRACTED = 'distracted',
    ANGRY = 'angry',
    SHOCKED = 'shocked'
}

class Opponent {
    public state: OpponentState = OpponentState.WORKING;
    public currentFrame: number = 0;
    private characterSize = 1;
    private positionX: 10;
    private positionY: 10;

    constructor() {
    }

    draw() {
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
            case OpponentState.ANGRY:
                // this.drawAngry();
                break;
            case OpponentState.SHOCKED:
                // this.drawShocked();
                break;
        }
    }

    drawWorking() {
        this.animate(idleCharacterAnimation, idleCharacterFrameDurations, this.positionX, this.positionY)
    }

    drawDistracted() {
        this.animate(interactedCharacterAnimation, interactedCharacterFrameDurations, this.positionX, this.positionY)
    }

    animate(animation: p5.Image[], animationFrameDurations: number[], x: number, y: number) {
        if (this.currentFrame >= animation.length) {
            this.currentFrame = 0;
        }
        const currentFrameImage = animation[this.currentFrame];
        image(currentFrameImage, 0, 0,);
        if (frameCount % animationFrameDurations[this.currentFrame] === 0) {
            this.currentFrame = (this.currentFrame + 1) % animation.length;
        }
    }


}