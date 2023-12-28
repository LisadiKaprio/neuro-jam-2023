type ButtonConfig = {
    positionX: number;
    positionY: number;
    spriteIdle: p5.Image;
    spriteHover?: p5.Image;
    spriteDisabled?: p5.Image;
    spriteDisabledHover?: p5.Image;
    size?: number;
    width?: number;
    height?: number;
    sizeMultiplierOnPressed?: number;
    wobble?: boolean
}

class Button {
    public positionX: number;
    public positionY: number;
    public width: number;
    public height: number;
    private spriteIdle: p5.Image;
    private spriteHover: p5.Image;
    private spriteDisabled: p5.Image;
    private spriteDisabledHover: p5.Image;
    private sizeMultiplierOnPressed: number;
    private size: number;
    public wobble: boolean;
    private wobbleRandomizer: number;

    constructor(buttonConfig: ButtonConfig) {
        this.positionX = buttonConfig.positionX || 0;
        this.positionY = buttonConfig.positionY || 0;
        this.size = buttonConfig.size || 1;
        this.spriteIdle = buttonConfig.spriteIdle;
        this.spriteHover = buttonConfig.spriteHover || buttonConfig.spriteIdle;
        this.spriteDisabled = buttonConfig.spriteDisabled || buttonConfig.spriteIdle;
        this.spriteDisabledHover = buttonConfig.spriteDisabledHover || buttonConfig.spriteDisabled;
        this.width = buttonConfig.spriteIdle.width * this.size;
        this.height = buttonConfig.spriteIdle.height * this.size;
        this.sizeMultiplierOnPressed = buttonConfig.sizeMultiplierOnPressed || 0.75;
        this.wobble = buttonConfig.wobble || false;
        this.wobbleRandomizer = random(0, 5);
    }

    draw() {
        fill(255); // Button color
        push();
        imageMode(CENTER);
        translate(this.positionX + this.width / 2, this.positionY + this.height / 2);
        if (this.isMouseOver()) {
            if (this.wobble) rotate(sin(frameCount * 0.5) * 0.1);
            image(this.spriteHover, 0, 0, this.width, this.height)
        } else {
            if (this.wobble) rotate(sin((frameCount * 0.1)) * 0.1);
            image(this.spriteIdle, 0, 0, this.width, this.height)
        }
        pop();
    }

    public isMouseOver() {
        if (
            mouseX > this.positionX &&
            mouseX < this.positionX + this.width &&
            mouseY > this.positionY &&
            mouseY < this.positionY + this.height
        ) {
            return true;
        }
    }

    public isMouseOut() {
        if (
            mouseX < this.positionX ||
            mouseX > this.positionX + this.width ||
            mouseY < this.positionY ||
            mouseY > this.positionY + this.height
        ) {
            return true;
        }
    }

    mousePressed(whatHappens: () => void) {
        if (this.isMouseOver()) {
            image(this.spriteHover, this.positionX, this.positionY, this.width * this.size * this.sizeMultiplierOnPressed, this.height * this.size * this.sizeMultiplierOnPressed)
        }
        if (this.isMouseOver()) {
            whatHappens();
        }
    }
}
