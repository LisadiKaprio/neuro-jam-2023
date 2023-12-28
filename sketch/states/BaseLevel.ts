/// <reference path="../helpers/HelperStateManager.ts" />
class BaseLevel {
    private timePlayingThisLevel = 0;
    private progressBar: ProgressBar;
    private progressBarPositionX = CANVAS_WIDTH / 2 - spriteProgressEmpty.width / 2;
    private progressBarPositionY = 100;
    private level: Level;

    private opponent: Opponent;

    private currentFrame = 0;

    private currentProgress = 0;

    constructor(level: Level) {
        this.level = level;
        this.progressBar = new ProgressBar(this.progressBarPositionX, this.progressBarPositionY);
        this.progressBar.progressStep = 1;
        this.progressBar.progressReductionStep = 0.5;
        this.opponent = new Opponent();
    }

    setup() {
    }

    draw() {
        this.timePlayingThisLevel++;
        textAlign(LEFT, TOP);
        text(`${this.level.codename}`, 34, 34);
        text(`Hold Left Mouse Button to interact ^_^`, 34, 74);
        // imageMode(CENTER);

        this.drawProgressBar();
        this.opponent.draw();

        if (this.timePlayingThisLevel <= 5) { return }

        if (mouseIsPressed && this.opponent.state === OpponentState.WORKING) {
            this.opponent.state = OpponentState.SHOCKED;
        }

        if (mouseIsPressed && this.opponent.state !== OpponentState.SHOCKED) {
            this.beInteracted();
        } else {
            this.beIdle();
        }

    }

    drawProgressBar() {
        this.progressBar.currentProgress = this.currentProgress;
        this.progressBar.draw();
    }

    beIdle() {
    }

    beInteracted() {
        this.currentProgress += this.progressBar.progressStep;
    }

    mouseClicked() {

    }
}