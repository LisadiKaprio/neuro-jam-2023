type Level = {
    codename: string;
    difficulty?: number;
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
                codename: 'Fire',
                difficulty: 4
            },
            {
                codename: 'Water'
            },
            {
                codename: 'Earth'
            },
            {
                codename: 'Wind'
            },
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
            {
                level: this.levelsArray[3],
                positionX: 450,
                positionY: 150,
                height: 50,
                width: 100
            },
        ]
    }
    setup() {
    }

    draw() {
        for (const button of this.levelArrayButtons) {
            // Draw a button
            fill(200); // Button color
            rect(button.positionX, button.positionY, button.width, button.height);

            // Draw text on the button
            fill(random(0, 75), random(0, 75), random(0, 75)); // Text color
            textSize(20);
            textAlign(CENTER, CENTER);
            text(`${button.level.codename}`, button.positionX + button.width / 2, button.positionY + button.height / 2);
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