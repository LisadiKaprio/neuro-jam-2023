class IntroSplashScreen {
    setup() {

    }
    draw() {
        fill(COLOR_WHITE);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Press any button to continue", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }

    mouseClicked() {
        stateManager.switchToMainMenu();
    }
}

const introSplashScreen = new IntroSplashScreen();