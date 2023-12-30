/// <reference path="../helpers/VolumeControl.ts" />
/// <reference path="../helpers/TextButton.ts" />
class MainMenu {
    private buttonX: number;
    private buttonY: number;
    private buttonWidth: number;
    private buttonHeight: number;

    private startGameButton: TextButton;

    constructor() {
        this.buttonX = 200;
        this.buttonY = 400;
        this.buttonWidth = 200;
        this.buttonHeight = 50;
        this.startGameButton = new TextButton({
            positionX: this.buttonX,
            positionY: this.buttonY,
            text: 'Start Game',
            onClick: () => {
                stateManager.switchToLevelSelection();
            },
            size: 50
        });
    }

    preload() {
    }

    setup() {
        volumeControl.playMusic(musicMenu);
    }

    draw() {

        wobble(
            true,
            CENTER,
            splashScreen,
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2,
            splashScreen.width * 1,
            splashScreen.height * 1,
            0.1,
            0.03,
            CANVAS_WIDTH - splashScreen.width * 0.9 / 2,
            CANVAS_HEIGHT - splashScreen.height * 0.9 / 3
        )
        this.startGameButton.draw();
    }

    mouseClicked() {
        this.startGameButton.mouseClicked();
    }
}
const mainMenu = new MainMenu();