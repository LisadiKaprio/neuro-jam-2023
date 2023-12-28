class BaseLevel {
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
        textAlign(LEFT, TOP);
        text(`${this.level.codename}`, 34, 34);
        text(`Hold Left Mouse Button to interact ^_^`, 34, 74);
        // imageMode(CENTER);


        if (this.opponent.state === OpponentState.WORKING) {
            this.currentProgress -= this.progressBar.progressReductionStep;
            if (this.currentProgress < 0) {
                this.currentProgress = 0;
            }
        }
        if (mouseIsPressed) {
            this.beInteracted();
        } else {
            this.beIdle();
        }

        this.drawProgressBar();
        this.opponent.draw();
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