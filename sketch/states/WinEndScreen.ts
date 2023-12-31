class WinEndScreen {
    public bg: p5.Image;

    backButton: TextButton;

    constructor() {
        this.backButton = new TextButton({
            positionX: CANVAS_WIDTH - 135,
            positionY: CANVAS_HEIGHT - 100,
            text: 'Back to menu',
            onClick: () => { stateManager.switchToLevelSelection() }
        })
    }

    setup() {
        this.bg = winScreen
    }

    draw() {
        levelSelection.gameIsFinished = true;
        push()
        image(this.bg, 0, 0)

        translate(10, sin(frameCount * 0.2) * 2)
        rectMode(CENTER)
        push()
        noStroke()
        fill(0, 0, 0, 175)
        rect(555, 145, 410, 135, 20, 20, 20, 20)
        pop()

        strokeWeight(5);
        stroke(COLOR_DARK);
        fill(COLOR_YELLOW)
        textSize(40)
        textAlign(CENTER)
        text("Congratulations!", CANVAS_WIDTH / 4 * 2.75, 110)
        strokeWeight(3);
        textSize(25)
        text("You've ruined your sister's career!", CANVAS_WIDTH / 4 * 2.75, 120 + 35)
        text("Now you both rule the world!", CANVAS_WIDTH / 4 * 2.75, 120 + 85)
        pop()
        this.backButton.draw();
    }

    mouseClicked() {
        this.backButton.mouseClicked()
    }
}

const winEndScreen = new WinEndScreen()