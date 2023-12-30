/// <reference path="../states/IntroSplashScreen.ts" />
/// <reference path="../states/MainMenu.ts" />
/// <reference path="../states/BaseLevel.ts" />

class HelperStateManager {
    private currentScene: any;

    constructor() {
        this.currentScene = introSplashScreen;
    }

    setup() {
        this.currentScene.setup();
    }

    update() {
        this.currentScene.draw();
    }

    mousePressed() {
        this.currentScene.mouseClicked();
    }

    switchToMainMenu() {
        this.currentScene = mainMenu;
        mainMenu.setup();
    }

    switchToLevelSelection() {
        this.currentScene = levelSelection;
        levelSelection.setup();
    }

    switchToLoseScreen(image: p5.Image, text: string) {
        volumeControl.playMusic(musicMenu)

        loseScreen.bg = image;
        loseScreen.text = text;
        this.currentScene = loseScreen;

        introSplashScreen.setup();
    }

    initiateLevel(level: Level) {
        volumeControl.playMusic(musicAwkwardPiano)
        this.currentScene = new BaseLevel(level);
    }
}

const stateManager = new HelperStateManager();