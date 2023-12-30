/// <reference path="./Button.ts" />
class VolumeControlElement {
    private sliderLength: number;
    public slider: p5.Element;
    private button: Button;
    private triggerRect: { x: number, y: number, width: number, height: number };
    private maxValue: number;

    private defaultValue: number;
    public currentValue: number;
    constructor(buttonConfig: ButtonConfig, sliderLength: number, maxValue: number, defaultValue: number) {
        this.button = new Button(buttonConfig);
        this.sliderLength = sliderLength || 100;
        this.maxValue = maxValue || 100;
        this.defaultValue = defaultValue || 50;

        this.currentValue = defaultValue;
    }

    setup() {
        this.triggerRect = {
            x: this.button.positionX,
            y: this.button.positionY,
            width: this.button.width,
            height: this.button.height
        };

        this.slider = createSlider(0, this.maxValue, this.defaultValue, 0);
        this.slider.position(this.button.positionX - this.sliderLength / 2 + this.button.width / 2, this.button.positionY + this.button.height + this.sliderLength / 2);
        // make slider appear underneath the button 
        this.slider.style('width', `${this.sliderLength}px`);
        this.slider.style('height', '20px');

        this.slider.style('transform', 'rotate(270deg)');
        this.slider.hide();
        this.slider.mouseOver(() => {
            this.slider.show();
        });
        this.slider.mouseOut(() => {
            this.slider.hide();
        });
    }

    draw() {
        this.button.draw();
        if (this.isMouseOver()) {
            this.triggerRect.height = this.button.height + this.sliderLength;
            this.slider.show();
        }
        if (this.isMouseOut()) {
            this.triggerRect.height = this.button.height;
            this.slider.hide();
        }
        this.currentValue = Number(this.slider.value());
    }


    public isMouseOver() {
        if (
            mouseX > this.triggerRect.x &&
            mouseX < this.triggerRect.x + this.triggerRect.width &&
            mouseY > this.triggerRect.y &&
            mouseY < this.triggerRect.y + this.triggerRect.height
        ) {
            return true;
        }
    }

    public isMouseOut() {
        if (
            mouseX < this.triggerRect.x ||
            mouseX > this.triggerRect.x + this.triggerRect.width ||
            mouseY < this.triggerRect.y ||
            mouseY > this.triggerRect.y + this.triggerRect.height
        ) {
            return true;
        }
    }

}