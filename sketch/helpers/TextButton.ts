type TextButtonConfig = {
    positionX: number;
    positionY: number;
    text: string;
    onClick: () => void;
}

class TextButton {
    private currentTextSize = 20;

    public positionX: number;
    public positionY: number;
    public text: string;
    public onClick: () => void;

    constructor(buttonConfig: TextButtonConfig) {
        this.positionX = buttonConfig.positionX || 0;
        this.positionY = buttonConfig.positionY || 0;
        this.text = buttonConfig.text;
        this.onClick = buttonConfig.onClick;
    }

    draw() {
        push();
        if (this.isMouseOver()) {
            strokeWeight(3);
            stroke(COLOR_WHITE);
            if (mousePressed) textSize(20 * 1.1)
            else textSize(20)
            fill(COLOR_SATURATED_PINK);
        } else {
            strokeWeight(2);
            stroke(COLOR_MAIN_PINK);
            textSize(20)
            fill(COLOR_WHITE);
        }
        text(this.text, this.positionX, this.positionY);
        pop();
    }

    public isMouseOver() {
        const x = this.positionX - textWidth(this.text) / 2;
        const y = this.positionY - this.currentTextSize / 2;
        if (
            mouseX > x &&
            mouseX < x + textWidth(this.text) * 1.1 &&
            mouseY > y &&
            mouseY < y + this.currentTextSize * 1.25
        ) {
            return true;
        }
    }

    public isMouseOut() {
        const x = this.positionX - textWidth(this.text) / 2;
        const y = this.positionY - this.currentTextSize / 2;
        if (
            mouseX < x ||
            mouseX > x + textWidth(this.text) * 1.1 ||
            mouseY < y ||
            mouseY > y + this.currentTextSize * 1.25
        ) {
            return true;
        }
    }

    mouseClicked() {
        if (this.isMouseOver()) {
            this.onClick();
        }
    }

}