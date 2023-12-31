type TextButtonConfig = {
    positionX: number;
    positionY: number;
    text: string;
    onClick: () => void;
    size?: number;
    outlineColor?: string;
}

class TextButton {
    public size = 20;

    a = 1.75

    public positionX: number;
    public positionY: number;
    public text: string;
    public onClick: () => void;
    public outlineColor: string;
    public mouseEntered = false;

    constructor(buttonConfig: TextButtonConfig) {
        this.positionX = buttonConfig.positionX || 0;
        this.positionY = buttonConfig.positionY || 0;
        this.text = buttonConfig.text;
        this.onClick = buttonConfig.onClick;
        this.size = buttonConfig.size || 30;
        this.outlineColor = buttonConfig.outlineColor || COLOR_MAIN_PINK;
    }

    draw() {
        push();
        textAlign(CENTER, CENTER);
        if (this.isMouseOver()) {
            strokeWeight(3);
            stroke(COLOR_WHITE);
            if (mousePressed) textSize(this.size * 1.1)
            else textSize(this.size)
            fill(COLOR_SATURATED_PINK);
        } else {
            strokeWeight(2);
            stroke(this.outlineColor);
            textSize(this.size)
            fill(COLOR_WHITE);
        }
        text(this.text, this.positionX, this.positionY);
        pop();

        if (!this.mouseEntered && this.isMouseOver()) {
            this.mouseEntered = true;
            volumeControl.playSound(soundBloop);
        } else if (this.mouseEntered && !this.isMouseOver()) {
            this.mouseEntered = false;
        }
    }

    public isMouseOver() {
        const x = this.positionX - textWidth(this.text) / 2;
        const y = this.positionY - this.size / 2;
        if (
            mouseX > x &&
            mouseX < x + textWidth(this.text) * this.a &&
            mouseY > y &&
            mouseY < y + this.size * this.a
        ) {
            return true;
        }
    }

    public isMouseOut() {
        const x = this.positionX - textWidth(this.text) / 2;
        const y = this.positionY - this.size / 2;
        if (
            mouseX < x ||
            mouseX > x + textWidth(this.text) * this.a ||
            mouseY < y ||
            mouseY > y + this.size * this.a
        ) {
            return true;
        }
    }

    mouseClicked() {
        if (this.isMouseOver()) {
            volumeControl.playSound(soundPow);
            this.onClick();
        }
    }

}