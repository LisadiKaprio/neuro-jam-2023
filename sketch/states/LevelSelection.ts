type Level = {
    codename: string;
    isCompleted: boolean;
    robotIngameImage: p5.Image;
    robotLoseImage: p5.Image;
    robotWinImage: p5.Image;
    progressStepMultiplier?: number;
    progressReductionStepMultiplier?: number;
    minWorkingTimeMultiplier?: number;
    maxWorkingTimeMultiplier?: number;
    minFoundTimeMultiplier?: number;
    bestTime?: number;
}

type LevelButton = {
    level: Level;
    positionX: number;
    positionY: number;
    height: number;
    width: number;
}

class LevelSelection {
    private buttonX: number;
    private buttonY: number;
    private buttonWidth: number;
    private buttonHeight: number;

    public levelsArray: Level[];
    public levelArrayButtons: LevelButton[];

    constructor() {
        this.buttonX = 100;
        this.buttonY = 50;
        this.buttonWidth = 200;
        this.buttonHeight = 50;
        this.levelsArray = [
            {
                codename: 'level-one',
                isCompleted: false,
                robotIngameImage: robotIngameOne,
                robotLoseImage: robotLoseOne,
                robotWinImage: robotWinOne,
                maxWorkingTimeMultiplier: 0.9,
            } as Level,
            {
                codename: 'level-two',
                isCompleted: false,
                robotIngameImage: robotIngameTwo,
                robotLoseImage: robotLoseTwo,
                robotWinImage: robotWinTwo,
                progressStepMultiplier: .97,
                progressReductionStepMultiplier: 1.05,
            } as Level,
            {
                codename: 'level-three',
                isCompleted: false,
                robotIngameImage: robotIngameThree,
                robotLoseImage: robotLoseThree,
                robotWinImage: robotWinThree,
                progressStepMultiplier: 2,
                progressReductionStepMultiplier: 0.25,
                minWorkingTimeMultiplier: 0.25,
                maxWorkingTimeMultiplier: 1.1,
                minFoundTimeMultiplier: 0.5,
            } as Level
        ]
        this.levelArrayButtons = [
            {
                level: this.levelsArray[0],
                positionX: 100,
                positionY: 50,
                height: 50,
                width: 200
            },
            {
                level: this.levelsArray[1],
                positionX: 375,
                positionY: 50,
                height: 50,
                width: 100
            },
            {
                level: this.levelsArray[2],
                positionX: 100,
                positionY: 150,
                height: 50,
                width: 200
            },
        ]
    }
    setup() {
    }

    draw() {
        for (const [index, button] of this.levelArrayButtons.entries()) {
            const stringInLocalStorage = `${button.level.codename}-highscore`;
            button.level.isCompleted = !!localStorage.getItem(stringInLocalStorage);
            button.level.bestTime = parseFloat(localStorage.getItem(stringInLocalStorage) || '0');

            if (button.level.isCompleted) fill(COLOR_WHITE);
            else fill(COLOR_LIGHT_PINK);

            rect(button.positionX, button.positionY, button.width, button.height);
            fill(COLOR_DARK_PINK);
            textSize(20);
            textAlign(CENTER, CENTER);
            text(`Level ${index + 1}`, button.positionX + button.width / 2, button.positionY + button.height / 2);
            fill(COLOR_SATURATED_PINK);
            textSize(14);
            if (button.level.bestTime) text(`Best time: ${nf(button.level.bestTime, 2)}`, button.positionX + button.width / 2, button.positionY + button.height / 2 + 40)
        }
    }

    mouseClicked() {
        for (const button of this.levelArrayButtons) {
            if (
                mouseX > button.positionX &&
                mouseX < button.positionX + button.width &&
                mouseY > button.positionY &&
                mouseY < button.positionY + button.height
            ) {
                stateManager.initiateLevel(button.level);
            }
        }
    }
}
const levelSelection = new LevelSelection();