class IntroSplashScreen {
    setup() {

    }
    draw() {
        image(stripesBackground, 0, 0);
        push();
        image(splashScreen, -splashScreen.width / 2 - 150, -60, splashScreen.width * 1.5, splashScreen.height * 1.5)
        fill(COLOR_YELLOW);
        strokeWeight(5)
        stroke(COLOR_SATURATED_PINK);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Click anywhere to continue", CANVAS_WIDTH - 250, CANVAS_HEIGHT - textSize() - 25);
        pop()
    }

    mouseClicked() {
        stateManager.switchToMainMenu();
    }
}

const introSplashScreen = new IntroSplashScreen();