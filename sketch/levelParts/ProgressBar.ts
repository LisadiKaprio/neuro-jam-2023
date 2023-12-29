class ProgressBar {
    public currentProgress: number = 0;
    public maxStep = 1000;
    public progressStep: number = 1;
    public progressReductionStep: number = 0.5;

    private spriteBase = spriteProgressBase;
    private spriteEmpty = spriteProgressEmpty;
    private spriteFull = spriteProgressFull;
    private spriteFrenzy = spriteProgressFrenzy;

    public inFrenzy: boolean = false;

    private positionX: number;
    private positionY: number;
    constructor() {
    }

    draw() {

        let fullPositionX = (CANVAS_WIDTH / 2) - (this.spriteFull.width / 2) + 3;
        let fullPositionY = this.spriteBase.height / 2 - 8;

        let spriteToShow = this.inFrenzy ? this.spriteFrenzy : this.spriteFull;

        image(this.spriteBase, CANVAS_WIDTH / 2 - this.spriteBase.width / 2, 0);
        const progressWidth = Math.floor(this.spriteEmpty.width * (this.currentProgress / this.maxStep));
        if (progressWidth > 1) {
            image(spriteToShow, fullPositionX, fullPositionY, progressWidth, this.spriteFull.height, 0, 0, progressWidth, this.spriteFull.height);
        }
    }
}