enum EvilState {
    IDLE = 'idle',
    DESTROYING = 'destroying',
    SPOTTED = 'spotted',
}

class Evil {
    public state: EvilState = EvilState.IDLE;
    public currentFrame: number = 0;
    public inFrenzy = false;

    private characterSize = 0.9;
    private characterWidth = idleEvilImages[0].width * this.characterSize;
    private characterHeight = idleEvilImages[0].height * this.characterSize;
    private y = CANVAS_HEIGHT - this.characterHeight;

    constructor() {
    }

    draw() {
        switch (this.state) {
            case EvilState.IDLE:
                this.drawIdleEvil();
                break;
            case EvilState.DESTROYING:
                this.drawDestroyingEvil();
                break;
            case EvilState.SPOTTED:
                // this.drawSpottedEvil();
                break;
        }
    }

    drawIdleEvil() {
        this.animate(idleEvilAnimation, 0, 0 + (CANVAS_HEIGHT - this.characterHeight));
    }

    drawDestroyingEvil() {
        let strength = (sin(frameCount * 0.8) * 0.2)

        push();
        translate(260, 440);
        rotate(sin(frameCount * strength * 0.9) * 0.5 + 0.5)
        image(evilWorkingArmRightImage, -35, -100, evilWorkingArmRightImage.width, evilWorkingArmRightImage.height)
        pop();

        if (!this.inFrenzy) this.animate(evilWorkingAnimation, 0, this.y);
        else image(evilWorkingFrenzyImage, 0, this.y, this.characterWidth, this.characterHeight);

        push();
        translate(120, 402);
        rotate(sin(frameCount * strength) * 0.65);
        image(evilWorkingArmLeftImage, -25, -25, evilWorkingArmLeftImage.width, evilWorkingArmLeftImage.height)
        pop();
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