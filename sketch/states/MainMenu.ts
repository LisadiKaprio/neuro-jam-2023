/// <reference path="../helpers/VolumeControl.ts" />
/// <reference path="../helpers/TextButton.ts" />
class MainMenu {
    private buttonX: number;
    private buttonY: number;
    private buttonWidth: number;
    private buttonHeight: number;

    private startGameButton: TextButton;

    constructor() {
        this.buttonX = 100;
        this.buttonY = 200;
        this.buttonWidth = 200;
        this.buttonHeight = 50;
        this.startGameButton = new TextButton({
            positionX: this.buttonX,
            positionY: this.buttonY,
            text: 'Start Game',
            onClick: () => {
                stateManager.switchToLevelSelection();
            }
        });
    }

    preload() {
    }

    setup() {
        console.log('setup main menu')
        volumeControl.playMusic(musicMenu);
    }

    draw() {
        this.startGameButton.draw();
    }

    mouseClicked() {
        this.startGameButton.mouseClicked();
    }
}
const mainMenu = new MainMenu();