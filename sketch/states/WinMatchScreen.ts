class WinMatchScreen {
    backButton: TextButton;
    newBestTime: boolean;

    robot: p5.Image;

    constructor(robot: p5.Image, newBestTime: boolean, finalLevel: boolean) {
        this.robot = robot;
        this.newBestTime = newBestTime;
        this.backButton = new TextButton({
            positionX: CANVAS_WIDTH / 2,
            positionY: CANVAS_HEIGHT / 2 + 225,
            text: 'Continue',
            onClick: () => { stateManager.switchToLevelSelection() },
            outlineColor: COLOR_DARK,
        })
        if (finalLevel) this.backButton.onClick = () => { stateManager.switchToWinEndScreen() }
    }

    draw() {

        push()
        image(stripesBackground, 0, 0)

        push()
        imageMode(CENTER)
        image(this.robot, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 55, this.robot.width * 1.25, this.robot.height * 1.25)


        translate(10, sin(frameCount * 0.2) * 2)
        rectMode(CENTER)
        noStroke()
        fill(255, 255, 255, 175)
        rect(CANVAS_WIDTH / 2, 225, 300, 75, 20, 20, 20, 20)

        strokeWeight(4);
        stroke(COLOR_DARK);
        fill(COLOR_YELLOW)
        textSize(50)
        textAlign(CENTER)
        text("Good job!", CANVAS_WIDTH / 2, 240)
        pop()
        if (this.newBestTime) {
            push()
            translate(10, sin(frameCount * 0.5) * 1)
            strokeWeight(2);
            stroke(COLOR_DARK);
            fill(COLOR_MAIN_PINK)
            textSize(30)
            textAlign(CENTER)
            text("New best time!", CANVAS_WIDTH / 2, 175)
            pop()
        }
        this.backButton.draw();
    }

    mouseClicked() {
        this.backButton.mouseClicked();
    }
}