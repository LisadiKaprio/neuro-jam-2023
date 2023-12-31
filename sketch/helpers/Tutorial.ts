/// <reference path="./Button.ts" />

class Tutorial {
    public isShown: boolean = false;
    private button: Button;
    public openTime: number = 0;

    constructor() {
    }

    setup() {

        this.button = new Button({
            spriteIdle: buttonHelpIdle,
            spriteHover: buttonHelpHover,
            positionX: 10,
            positionY: 10,
            sizeMultiplierOnPressed: 0.75,
            wobble: true
        });
    }
    draw() {
        this.button.draw();

        if (!this.isShown) return
        push();
        strokeWeight(5);
        stroke(COLOR_WHITE);
        rectMode(CENTER);
        fill(0, 0, 0, 200)
        rect(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80, 20, 20, 20, 20);

        image(tutorialScreenshot, 0, 0)

        translate(0, sin(frameCount * 0.1) * 1.25)
        stroke(COLOR_DARK_PINK);
        fill(COLOR_YELLOW);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("How to play", CANVAS_WIDTH / 2, 75);
        noStroke();
        textSize(20);
        text("Neuro tends to lose her tools a lot while building her robots.", CANVAS_WIDTH / 2, 125);
        text("Ruin her career while she is distracted!", CANVAS_WIDTH / 2, 155);
        stroke(COLOR_DARK_PINK);
        text("Hold left mouse button to reassemble the robot.", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 190);
        text("Release the button before Neuro finds the right tool and turns around.", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 160);
        noStroke();
        text("Be careful, or you'll be thrown into Neuro's dungeon!", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 120);
        pop();
    }

    public isMouseOver() {
        if (
            mouseX > this.button.positionX &&
            mouseX < this.button.positionX + this.button.width &&
            mouseY > this.button.positionY &&
            mouseY < this.button.positionY + this.button.height
        ) {
            return true;
        }
    }

    public isMouseOut() {
        if (
            mouseX < this.button.positionX ||
            mouseX > this.button.positionX + this.button.width ||
            mouseY < this.button.positionY ||
            mouseY > this.button.positionY + this.button.height
        ) {
            return true;
        }
    }

    public mouseClicked() {
        if (this.isMouseOver()) {
            this.openTime = millis();
            console.log(this.openTime)
            this.isShown = !this.isShown;
        }
    }
}

const tutorial = new Tutorial();