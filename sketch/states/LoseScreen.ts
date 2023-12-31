class LoseScreen {
    public bg: p5.Image;
    public text: string;

    backButton: TextButton;

    constructor() {
        this.backButton = new TextButton({
            positionX: CANVAS_WIDTH / 4 * 3,
            positionY: CANVAS_HEIGHT / 4 + 75,
            text: 'Try again',
            onClick: () => { stateManager.switchToLevelSelection() }
        })
    }

    draw() {
        push()
        image(this.bg, 0, 0)

        strokeWeight(5);
        stroke(COLOR_DARK);
        fill(COLOR_YELLOW)
        textSize(40)
        textAlign(CENTER)
        text(this.text, CANVAS_WIDTH / 4 * 3, CANVAS_HEIGHT / 4)
        this.backButton.draw();
        pop()
    }

    mouseClicked() {
        this.backButton.mouseClicked()
    }
}

const loseScreen = new LoseScreen()