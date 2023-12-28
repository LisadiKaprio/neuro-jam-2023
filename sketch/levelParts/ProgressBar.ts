class ProgressBar {
    public currentProgress: number = 0;
    public maxStep = 1000;
    public progressStep: number = 1;
    public progressReductionStep: number = 0.5;

    private spriteEmpty: p5.Image;
    private spriteFull: p5.Image;
    private positionX: number;
    private positionY: number;
    constructor(x: number, y: number) {
        this.positionX = x;
        this.positionY = y;
        this.spriteEmpty = spriteProgressEmpty;
        this.spriteFull = spriteProgressFull;
    }

    draw() {
        image(this.spriteEmpty, this.positionX, this.positionY);
        const progressWidth = Math.floor(this.spriteEmpty.width * (this.currentProgress / this.maxStep));
        if (progressWidth > 1) {
            image(this.spriteFull, this.positionX, this.positionY, progressWidth, this.spriteEmpty.height, 0, 0, progressWidth, this.spriteEmpty.height);
        }
    }
}