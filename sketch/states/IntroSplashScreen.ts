class IntroSplashScreen {
    setup() {

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
        push()
        fill(255, 255, 255, 200)
        noStroke()
        rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        pop()
        push();
        fill(COLOR_YELLOW);
        strokeWeight(5)
        stroke(COLOR_SATURATED_PINK);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Click to start the game!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        pop()
    }

    mouseClicked() {
        if (mouseButton === LEFT || touches.length > 0) {
            stateManager.switchToMainMenu();
        }
    }
}

const introSplashScreen = new IntroSplashScreen();