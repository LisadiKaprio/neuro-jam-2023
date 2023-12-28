/// <reference path="../helpers/VolumeControl.ts" />
class MainMenu {
    private buttonX: number;
    private buttonY: number;
    private buttonWidth: number;
    private buttonHeight: number;

    constructor() {
        this.buttonX = 100;
        this.buttonY = 200;
        this.buttonWidth = 200;
        this.buttonHeight = 50;
    }

    preload() {
    }

    setup() {
        console.log('setup main menu')
        volumeControl.playMusic(musicMenu);
    }

    draw() {
        fill(COLOR_WHITE);
        rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);

        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Start Game", this.buttonX + this.buttonWidth / 2, this.buttonY + this.buttonHeight / 2);
    }

    mouseClicked() {
        if (
            mouseX > this.buttonX &&
            mouseX < this.buttonX + this.buttonWidth &&
            mouseY > this.buttonY &&
            mouseY < this.buttonY + this.buttonHeight
        ) {
            stateManager.switchToLevelSelection();
        }
    }
}
const mainMenu = new MainMenu();