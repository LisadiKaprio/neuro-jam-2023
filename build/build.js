const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 640;
let COLOR_YELLOW = `rgb(255, 238, 205)`;
let COLOR_SATURATED_PINK = `rgb(217, 74, 114)`;
let COLOR_DARK_PINK = `rgb(156, 62, 87)`;
let COLOR_DARK = `rgb(156, 62, 87)`;
let COLOR_LIGHTER_MAIN_PINK = `rgb(255, 185, 179)`;
let COLOR_MAIN_PINK = `rgb(254, 164, 174)`;
let COLOR_BLUE = `rgb(125, 222, 214)`;
let COLOR_WHITE = `rgb(254, 245, 247)`;
let COLOR_LIGHT_PINK = `rgb(251, 223, 225)`;
let animFilePath = `../art/anim`;
let musicMenu;
let buttonMusicIdle;
let buttonMusicHover;
let buttonMusicDisabled;
let buttonMusicDisabledHover;
let buttonSoundIdle;
let buttonSoundHover;
let buttonSoundDisabled;
let buttonSoundDisabledHover;
let spriteProgressEmpty;
let spriteProgressFull;
let idleCharacterImages;
let idleCharacterAnimation;
let interactedCharacterImages;
let interactedCharacterAnimation;
let distractedOpponentAnimation;
let shockedOpponentAnimation;
function preload() {
    soundFormats('mp3');
    musicMenu = loadSound(`../audio/music-little-think.mp3`);
    buttonMusicIdle = loadImage(`../art/interface/button-music-idle.png`);
    buttonMusicHover = loadImage(`../art/interface/button-music-hover.png`);
    buttonMusicDisabled = loadImage(`../art/interface/button-music-disabled.png`);
    buttonMusicDisabledHover = loadImage(`../art/interface/button-music-disabled-hover.png`);
    buttonSoundIdle = loadImage(`../art/interface/button-sound-idle.png`);
    buttonSoundHover = loadImage(`../art/interface/button-sound-hover.png`);
    buttonSoundDisabled = loadImage(`../art/interface/button-sound-disabled.png`);
    buttonSoundDisabledHover = loadImage(`../art/interface/button-sound-disabled-hover.png`);
    spriteProgressEmpty = loadImage('../art/interface/progressBar-empty.png');
    spriteProgressFull = loadImage('../art/interface//progressBar-full.png');
    idleCharacterImages = Array.from({ length: 3 }, (_, i) => loadImage(`${animFilePath}/idle-${i}.png`));
    idleCharacterAnimation = [
        {
            image: idleCharacterImages[0],
            duration: 10
        },
        {
            image: idleCharacterImages[1],
            duration: 1
        },
        {
            image: idleCharacterImages[2],
            duration: 1
        },
        {
            image: idleCharacterImages[1],
            duration: 1
        }
    ];
    interactedCharacterImages = Array.from({ length: 3 }, (_, i) => loadImage(`${animFilePath}/interacted-${i}.png`));
    interactedCharacterAnimation = [
        {
            image: idleCharacterImages[0],
            duration: 10
        },
        {
            image: interactedCharacterImages[0],
            duration: 1
        },
        {
            image: interactedCharacterImages[1],
            duration: 1
        },
        {
            image: interactedCharacterImages[2],
            duration: 1
        },
        {
            image: interactedCharacterImages[1],
            duration: 1
        }
    ];
    distractedOpponentAnimation = [
        {
            image: idleCharacterImages[1],
            duration: 2
        },
        {
            image: idleCharacterImages[2],
            duration: 2
        }
    ];
    shockedOpponentAnimation = [
        {
            image: interactedCharacterImages[2],
            duration: 100
        },
        {
            image: interactedCharacterImages[2],
            duration: 1
        }
    ];
    mainMenu.preload();
}
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    background(COLOR_LIGHTER_MAIN_PINK);
    volumeControl.setup();
    stateManager.setup();
}
function draw() {
    frameRate(16);
    background(COLOR_LIGHTER_MAIN_PINK);
    stateManager.update();
    volumeControl.draw();
}
function mousePressed() {
    stateManager.mousePressed();
}
class Button {
    constructor(buttonConfig) {
        this.positionX = buttonConfig.positionX || 0;
        this.positionY = buttonConfig.positionY || 0;
        this.size = buttonConfig.size || 1;
        this.spriteIdle = buttonConfig.spriteIdle;
        this.spriteHover = buttonConfig.spriteHover || buttonConfig.spriteIdle;
        this.spriteDisabled = buttonConfig.spriteDisabled || buttonConfig.spriteIdle;
        this.spriteDisabledHover = buttonConfig.spriteDisabledHover || buttonConfig.spriteDisabled;
        this.width = buttonConfig.spriteIdle.width * this.size;
        this.height = buttonConfig.spriteIdle.height * this.size;
        this.sizeMultiplierOnPressed = buttonConfig.sizeMultiplierOnPressed || 0.75;
        this.wobble = buttonConfig.wobble || false;
        this.wobbleRandomizer = random(0, 5);
    }
    draw() {
        fill(255);
        push();
        imageMode(CENTER);
        translate(this.positionX + this.width / 2, this.positionY + this.height / 2);
        if (this.isMouseOver()) {
            if (this.wobble)
                rotate(sin(frameCount * 0.5) * 0.1);
            image(this.spriteHover, 0, 0, this.width, this.height);
        }
        else {
            if (this.wobble)
                rotate(sin((frameCount * 0.1)) * 0.1);
            image(this.spriteIdle, 0, 0, this.width, this.height);
        }
        pop();
    }
    isMouseOver() {
        if (mouseX > this.positionX &&
            mouseX < this.positionX + this.width &&
            mouseY > this.positionY &&
            mouseY < this.positionY + this.height) {
            return true;
        }
    }
    isMouseOut() {
        if (mouseX < this.positionX ||
            mouseX > this.positionX + this.width ||
            mouseY < this.positionY ||
            mouseY > this.positionY + this.height) {
            return true;
        }
    }
    mousePressed(whatHappens) {
        if (this.isMouseOver()) {
            image(this.spriteHover, this.positionX, this.positionY, this.width * this.size * this.sizeMultiplierOnPressed, this.height * this.size * this.sizeMultiplierOnPressed);
        }
        if (this.isMouseOver()) {
            whatHappens();
        }
    }
}
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
class VolumeControl {
    constructor() {
        this.musicVolume = 0.1;
        this.buttonSize = 0.75;
    }
    setup() {
        const musicButtonX = CANVAS_WIDTH - buttonMusicIdle.width * this.buttonSize - 10;
        const musicButtonY = 10;
        this.musicVolumeControl = new VolumeControlElement({
            positionX: musicButtonX,
            positionY: musicButtonY,
            spriteIdle: buttonMusicIdle,
            spriteHover: buttonMusicHover,
            spriteDisabled: buttonMusicDisabled,
            spriteDisabledHover: buttonMusicDisabledHover,
            sizeMultiplierOnPressed: 0.75,
            size: this.buttonSize,
            wobble: true
        }, 100, 10, this.musicVolume);
        this.musicVolumeControl.setup();
        const sfxButtonX = CANVAS_WIDTH - buttonMusicIdle.width * this.buttonSize * 2 - 10 * 2;
        const sfxButtonY = 10;
        this.sfxVolumeControl = new VolumeControlElement({
            positionX: sfxButtonX,
            positionY: sfxButtonY,
            spriteIdle: buttonSoundIdle,
            spriteHover: buttonSoundHover,
            spriteDisabled: buttonSoundDisabled,
            spriteDisabledHover: buttonSoundDisabledHover,
            sizeMultiplierOnPressed: 0.75,
            size: 0.75,
            wobble: true
        }, 100, 10, 5);
        this.sfxVolumeControl.setup();
    }
    draw() {
        this.musicVolumeControl.draw();
        this.sfxVolumeControl.draw();
        if (this.musicVolume !== this.musicVolumeControl.currentValue) {
            this.musicVolume = this.musicVolumeControl.currentValue;
            console.log('changed music volume to ' + this.musicVolume);
            this.changeMusicVolume();
        }
        if (this.sfxVolume !== this.sfxVolumeControl.currentValue) {
            this.sfxVolume = this.sfxVolumeControl.currentValue;
        }
    }
    changeMusicVolume() {
        if (this.currentMusic) {
            this.currentMusic.setVolume(this.musicVolume);
        }
    }
    playMusic(music) {
        this.currentMusic = music;
        this.currentMusic.setVolume(this.musicVolume);
        this.currentMusic.play();
    }
}
const volumeControl = new VolumeControl();
class MainMenu {
    constructor() {
        this.buttonX = 100;
        this.buttonY = 200;
        this.buttonWidth = 200;
        this.buttonHeight = 50;
    }
    preload() {
    }
    setup() {
        console.log('setup main menu');
        volumeControl.playMusic(musicMenu);
    }
    draw() {
        fill(COLOR_WHITE);
        rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Start Game", this.buttonX + this.buttonWidth / 2, this.buttonY + this.buttonHeight / 2);
    }
    mouseClicked() {
        if (mouseX > this.buttonX &&
            mouseX < this.buttonX + this.buttonWidth &&
            mouseY > this.buttonY &&
            mouseY < this.buttonY + this.buttonHeight) {
            stateManager.switchToLevelSelection();
        }
    }
}
const mainMenu = new MainMenu();
class BaseLevel {
    constructor(level) {
        this.timePlayingThisLevel = 0;
        this.progressBarPositionX = CANVAS_WIDTH / 2 - spriteProgressEmpty.width / 2;
        this.progressBarPositionY = 100;
        this.currentFrame = 0;
        this.currentProgress = 0;
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
        this.drawProgressBar();
        this.opponent.draw();
        if (this.timePlayingThisLevel <= 5) {
            return;
        }
        if (mouseIsPressed && this.opponent.state === OpponentState.WORKING) {
            this.opponent.state = OpponentState.SHOCKED;
        }
        if (mouseIsPressed && this.opponent.state !== OpponentState.SHOCKED) {
            this.beInteracted();
        }
        else {
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
class HelperStateManager {
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
    switchToLoseScreen() {
        this.currentScene = introSplashScreen;
        introSplashScreen.setup();
    }
    initiateLevel(level) {
        this.currentScene = new BaseLevel(level);
    }
}
const stateManager = new HelperStateManager();
class VolumeControlElement {
    constructor(buttonConfig, sliderLength, maxValue, defaultValue) {
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
        this.slider = createSlider(0, this.maxValue, this.defaultValue);
        this.slider.size(this.sliderLength, 20);
        this.slider.position(this.button.positionX - this.sliderLength / 2 + this.button.width / 2, this.button.positionY + this.button.height + this.sliderLength / 2);
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
    isMouseOver() {
        if (mouseX > this.triggerRect.x &&
            mouseX < this.triggerRect.x + this.triggerRect.width &&
            mouseY > this.triggerRect.y &&
            mouseY < this.triggerRect.y + this.triggerRect.height) {
            return true;
        }
    }
    isMouseOut() {
        if (mouseX < this.triggerRect.x ||
            mouseX > this.triggerRect.x + this.triggerRect.width ||
            mouseY < this.triggerRect.y ||
            mouseY > this.triggerRect.y + this.triggerRect.height) {
            return true;
        }
    }
}
var OpponentState;
(function (OpponentState) {
    OpponentState["WORKING"] = "working";
    OpponentState["THINKING"] = "thinking";
    OpponentState["DISTRACTED"] = "distracted";
    OpponentState["ANGRY"] = "angry";
    OpponentState["SHOCKED"] = "shocked";
})(OpponentState || (OpponentState = {}));
class Opponent {
    constructor() {
        this.state = OpponentState.WORKING;
        this.currentFrame = 0;
        this.characterSize = 1;
        this.timeUntilStateChange = 10;
        this.minWorkingTime = 25;
        this.maxWorkingTime = 35;
        this.minDistractionTime = 25;
        this.maxDistractionTime = 45;
    }
    draw() {
        this.timeUntilStateChange--;
        if (this.timeUntilStateChange <= 0) {
            this.handleStateChange();
        }
        switch (this.state) {
            case OpponentState.WORKING:
                this.drawWorking();
                break;
            case OpponentState.THINKING:
                break;
            case OpponentState.DISTRACTED:
                this.drawDistracted();
                break;
            case OpponentState.ANGRY:
                break;
            case OpponentState.SHOCKED:
                this.drawShocked();
                break;
        }
    }
    handleStateChange() {
        switch (this.state) {
            case OpponentState.WORKING:
                this.changeToState(OpponentState.DISTRACTED, 10, 20);
                break;
            case OpponentState.DISTRACTED:
                this.changeToState(OpponentState.WORKING, this.minWorkingTime, this.maxWorkingTime);
                break;
        }
    }
    changeToState(state, minTimeUntilNextChange, maxTimeUntilNextChange) {
        this.state = state;
        this.timeUntilStateChange = random(minTimeUntilNextChange, maxTimeUntilNextChange);
    }
    drawWorking() {
        this.animate(idleCharacterAnimation, this.positionX, this.positionY);
    }
    drawDistracted() {
        this.animate(distractedOpponentAnimation, this.positionX, this.positionY);
    }
    drawShocked() {
        if (this.currentFrame >= (shockedOpponentAnimation.length - 1)) {
            stateManager.switchToLoseScreen();
        }
        this.animate(shockedOpponentAnimation, this.positionX, this.positionY);
    }
    animate(animation, x, y) {
        if (this.currentFrame >= animation.length) {
            this.currentFrame = 0;
        }
        const currentFrameImage = animation[this.currentFrame].image;
        image(currentFrameImage, 0, 0);
        if (frameCount % animation[this.currentFrame].duration === 0) {
            this.currentFrame = (this.currentFrame + 1) % animation.length;
        }
    }
}
class ProgressBar {
    constructor(x, y) {
        this.currentProgress = 0;
        this.maxStep = 1000;
        this.progressStep = 1;
        this.progressReductionStep = 0.5;
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
class LevelSelection {
    constructor() {
        this.buttonX = 100;
        this.buttonY = 50;
        this.buttonWidth = 200;
        this.buttonHeight = 50;
        this.levelsArray = [
            {
                codename: 'Fire',
                difficulty: 4
            },
            {
                codename: 'Water'
            },
            {
                codename: 'Earth'
            },
            {
                codename: 'Wind'
            },
        ];
        this.levelArrayButtons = [
            {
                level: this.levelsArray[0],
                positionX: 100,
                positionY: 50,
                height: 50,
                width: 200
            },
            {
                level: this.levelsArray[1],
                positionX: 375,
                positionY: 50,
                height: 50,
                width: 100
            },
            {
                level: this.levelsArray[2],
                positionX: 100,
                positionY: 150,
                height: 50,
                width: 200
            },
            {
                level: this.levelsArray[3],
                positionX: 450,
                positionY: 150,
                height: 50,
                width: 100
            },
        ];
    }
    setup() {
    }
    draw() {
        for (const button of this.levelArrayButtons) {
            fill(200);
            rect(button.positionX, button.positionY, button.width, button.height);
            fill(random(0, 75), random(0, 75), random(0, 75));
            textSize(20);
            textAlign(CENTER, CENTER);
            text(`${button.level.codename}`, button.positionX + button.width / 2, button.positionY + button.height / 2);
        }
    }
    mouseClicked() {
        for (const button of this.levelArrayButtons) {
            if (mouseX > button.positionX &&
                mouseX < button.positionX + button.width &&
                mouseY > button.positionY &&
                mouseY < button.positionY + button.height) {
                stateManager.initiateLevel(button.level);
            }
        }
    }
}
const levelSelection = new LevelSelection();
//# sourceMappingURL=build.js.map