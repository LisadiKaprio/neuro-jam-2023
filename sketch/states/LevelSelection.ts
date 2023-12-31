/// <reference path="../sketch.ts" />

type Level = {
    codename: string;
    isCompleted: boolean;
    canBePlayed: boolean;
    robotIngameImage: p5.Image;
    robotLoseImage: p5.Image;
    robotWinImage: p5.Image;
    selectionButtonActive: p5.Image;
    selectionButtonHover: p5.Image;
    selectionButtonDisabled: p5.Image;
    selectionButtonComplete: p5.Image;
    selectionButtonCompleteHover: p5.Image;
    progressStepMultiplier: number;
    progressReductionStepMultiplier: number;
    minWorkingTimeMultiplier?: number;
    maxWorkingTimeMultiplier?: number;
    minFoundTimeMultiplier?: number;
    chanceToTrickThink?: number;
    chanceToTrickFound?: number;
    bestTime?: number;
}

type LevelButton = {
    level: Level;
    button: Button;
}

class LevelSelection {
    private buttonX: number;
    private buttonY: number;
    private buttonWidth: number;
    private buttonHeight: number;

    public gameIsFinished = false;

    public levelsArray: Level[];
    public levelArrayButtons: LevelButton[];

    constructor() {
        this.buttonX = 100;
        this.buttonY = 50;
        this.buttonWidth = 200;
        this.buttonHeight = 50;
    }
    setup() {
        this.levelsArray = [
            {
                codename: 'level-one',
                isCompleted: false,
                canBePlayed: true,
                robotIngameImage: robotIngameOne,
                robotLoseImage: robotLoseOne,
                robotWinImage: robotWinOne,
                selectionButtonActive: levelOneButtonActive,
                selectionButtonHover: levelOneButtonHover,
                selectionButtonDisabled: levelOneButtonDisabled,
                selectionButtonComplete: levelOneButtonComplete,
                selectionButtonCompleteHover: levelOneButtonCompleteHover,
                progressStepMultiplier: 1.2,
                progressReductionStepMultiplier: 1,
            } as Level,
            {
                codename: 'level-two',
                isCompleted: false,
                canBePlayed: false,
                robotIngameImage: robotIngameTwo,
                robotLoseImage: robotLoseTwo,
                robotWinImage: robotWinTwo,
                selectionButtonActive: levelTwoButtonActive,
                selectionButtonHover: levelTwoButtonHover,
                selectionButtonDisabled: levelTwoButtonDisabled,
                selectionButtonComplete: levelTwoButtonComplete,
                selectionButtonCompleteHover: levelTwoButtonCompleteHover,
                progressStepMultiplier: 1,
                progressReductionStepMultiplier: 1,
            } as Level,
            {
                codename: 'level-three',
                isCompleted: false,
                canBePlayed: false,
                robotIngameImage: robotIngameThree,
                robotLoseImage: robotLoseThree,
                robotWinImage: robotWinThree,
                selectionButtonActive: levelThreeButtonActive,
                selectionButtonHover: levelThreeButtonHover,
                selectionButtonDisabled: levelThreeButtonDisabled,
                selectionButtonComplete: levelThreeButtonComplete,
                selectionButtonCompleteHover: levelThreeButtonCompleteHover,
                progressStepMultiplier: 1,
                progressReductionStepMultiplier: 1.15,
            } as Level
        ]
        this.levelArrayButtons = [
            {
                level: this.levelsArray[0],
                button: new Button({
                    positionX: 95,
                    positionY: 90,
                    spriteIdle: levelOneButtonActive,
                    spriteHover: levelOneButtonHover,
                    spriteDisabled: levelOneButtonDisabled,
                    spriteDisabledHover: levelOneButtonDisabled,
                    wobble: true,
                }),
            },
            {
                level: this.levelsArray[1],
                button: new Button({
                    positionX: 95,
                    positionY: 355,
                    spriteIdle: levelTwoButtonActive,
                    spriteHover: levelTwoButtonHover,
                    spriteDisabled: levelTwoButtonDisabled,
                    spriteDisabledHover: levelTwoButtonDisabled,
                    wobble: true,
                }),
            },
            {
                level: this.levelsArray[2],
                button: new Button({
                    positionX: 475,
                    positionY: 105,
                    spriteIdle: levelThreeButtonActive,
                    spriteHover: levelThreeButtonHover,
                    spriteDisabled: levelThreeButtonDisabled,
                    spriteDisabledHover: levelThreeButtonDisabled,
                    wobble: true,
                }),
            },
        ]
    }

    draw() {
        image(levelsScreen, 0, 0)
        if (this.gameIsFinished) {
            push()
            imageMode(CENTER)
            translate(478 + completeImage.width / 2, 350 + completeImage.height / 2)
            rotate(sin(frameCount * 0.03) * 0.07)
            image(completeImage, 0, 0);
            pop()
        }
        for (const [index, button] of this.levelArrayButtons.entries()) {

            const stringInLocalStorage = `${button.level.codename}-highscore`;
            if (index > 0) {
                const stringPreviousLevelInLocalStorage = `${this.levelArrayButtons[index - 1].level.codename}-highscore`;
                button.level.canBePlayed = !!localStorage.getItem(stringPreviousLevelInLocalStorage);
            }
            button.level.isCompleted = !!localStorage.getItem(stringInLocalStorage);
            button.level.bestTime = parseFloat(localStorage.getItem(stringInLocalStorage) || '0');
            if (button.level.isCompleted) {
                button.button.spriteIdle = button.level.selectionButtonComplete;
                button.button.spriteHover = button.level.selectionButtonCompleteHover;
            }
            if (!button.level.canBePlayed) {
                button.button.spriteIdle = button.level.selectionButtonDisabled;
                button.button.spriteHover = button.level.selectionButtonDisabled;
                button.button.wobble = false;
            }

            button.button.draw();

            fill(COLOR_DARK);
            if (button.level.bestTime) {
                push()
                strokeWeight(2);
                stroke(COLOR_DARK);
                fill(COLOR_WHITE)
                text(`Best time: ${formatTime(button.level.bestTime)}`, button.button.positionX + 10, button.button.positionY + button.button.height + 20)
                pop()
            }
        }
    }

    mouseClicked() {
        for (const button of this.levelArrayButtons) {
            if (button.button.isMouseOver() && button.level.canBePlayed) stateManager.initiateLevel(button.level);
        }
    }
}
const levelSelection = new LevelSelection();