enum EvilState {
    IDLE = 'idle',
    DESTROYING = 'destroying',
    SPOTTED = 'spotted',
}

class Evil {
    public state: EvilState = EvilState.IDLE;
    public currentFrame: number = 0;
    private characterSize = 0.9;
    private characterWidth = idleEvilImages[0].width * this.characterSize;
    private characterHeight = idleEvilImages[0].height * this.characterSize;

    constructor() {
    }

    draw() {
        switch (this.state) {
            case EvilState.IDLE:
                this.drawIdleEvil();
                break;
            case EvilState.DESTROYING:
                // this.drawDestroyingEvil();
                break;
            case EvilState.SPOTTED:
                // this.drawSpottedEvil();
                break;
        }
    }

    drawIdleEvil() {
        this.animate(idleEvilAnimation, 0, 0 + (CANVAS_HEIGHT - this.characterHeight));
    }

    animate(animation: Frame[], x: number, y: number) {
        if (this.currentFrame >= animation.length) {
            this.currentFrame = 0;
        }
        const currentFrameImage = animation[this.currentFrame].image;
        image(currentFrameImage, x, y, this.characterWidth, this.characterHeight);
        if (frameCount % animation[this.currentFrame].duration === 0) {
            this.currentFrame = (this.currentFrame + 1) % animation.length;
        }
    }
}