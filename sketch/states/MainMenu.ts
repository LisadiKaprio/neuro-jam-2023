/// <reference path="../helpers/VolumeControl.ts" />
/// <reference path="../helpers/TextButton.ts" />
class MainMenu {
    private buttonWidth: number;
    private buttonHeight: number;

    private startGameButton: TextButton;
    private howToGameButton: TextButton;

    constructor() {
        this.buttonWidth = 200;
        this.buttonHeight = 50;
        this.startGameButton = new TextButton({
            positionX: 150,
            positionY: 500,
            text: 'Start Game',
            onClick: () => {
                stateManager.switchToLevelSelection();
            },
            outlineColor: COLOR_SATURATED_PINK
        });
        this.howToGameButton = new TextButton({
            positionX: 150,
            positionY: 550,
            text: 'How to play',
            onClick: () => {
                tutorial.isShown = true;
            },
            outlineColor: COLOR_SATURATED_PINK
        });
    }

    preload() {
    }

    setup() {
        volumeControl.playMusic(musicMenu);
    }

    draw() {
        image(stripesBackground, 0, 0);

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
        this.howToGameButton.draw();
    }

    mouseClicked() {
        this.startGameButton.mouseClicked();
        this.howToGameButton.mouseClicked();
    }
}
const mainMenu = new MainMenu();