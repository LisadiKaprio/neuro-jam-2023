const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 640;
const FRAMERATE = 14;
const NORMAL_FRAME_DURATION = 8;
const SHORT_FRAME_DURATION = 2;
const COLOR_YELLOW = `rgb(255, 238, 205)`;
const COLOR_SATURATED_PINK = `rgb(217, 74, 114)`;
const COLOR_DARK_PINK = `rgb(156, 62, 87)`;
const COLOR_DARK = `rgb(156, 62, 87)`;
const COLOR_LIGHTER_MAIN_PINK = `rgb(255, 185, 179)`;
const COLOR_MAIN_PINK = `rgb(254, 164, 174)`;
const COLOR_BLUE = `rgb(125, 222, 214)`;
const COLOR_WHITE = `rgb(254, 245, 247)`;
const COLOR_LIGHT_PINK = `rgb(251, 223, 225)`;
function wobble(wobble, mode, imageToWobble, positionX, positionY, width, height, speed, wobbleSize, translateX, translateY) {
    push();
    imageMode(mode);
    translate(translateX, translateY);
    if (wobble)
        rotate(sin(frameCount * speed) * wobbleSize);
    image(imageToWobble, 0, 0, width, height);
    pop();
}
function wobbleAnchoredOnCorner(wobble, mode, imageToWobble, positionX, positionY, width, height, speed, wobbleSize) {
    push();
    imageMode(mode);
    translate(positionX, positionY);
    if (wobble)
        rotate(sin(frameCount * speed) * wobbleSize);
    image(imageToWobble, 0, 0, width, height);
    pop();
}
const animFilePath = `../art/anim`;
const opponentFilePath = `../art/opponent`;
const evilFilePath = `../art/evil`;
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
let defaultBackground;
let idleEvilImages;
let idleEvilAnimation;
let workingOpponentImages;
let workingOpponentAnimation;
let workingArmImage;
let thinkingOpponentImages;
let thinkingOpponentAnimation;
let distractedOpponentImages;
let distractedOpponentAnimation;
let foundOpponentImages;
let foundOpponentAnimation;
let foundArmImage;
let shockedOpponentImages;
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
    spriteProgressFull = loadImage('../art/interface/progressBar-full.png');
    defaultBackground = loadImage('../art/bg/default.jpg');
    idleEvilImages = Array.from({ length: 5 }, (_, i) => loadImage(`${evilFilePath}/idle-${i}.png`));
    idleEvilAnimation = [
        {
            image: idleEvilImages[0],
            duration: NORMAL_FRAME_DURATION * 7
        },
        {
            image: idleEvilImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: idleEvilImages[2],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: idleEvilImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: idleEvilImages[0],
            duration: NORMAL_FRAME_DURATION * 7
        },
        {
            image: idleEvilImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: idleEvilImages[2],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: idleEvilImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: idleEvilImages[0],
            duration: NORMAL_FRAME_DURATION * 7
        },
        {
            image: idleEvilImages[3],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: idleEvilImages[4],
            duration: NORMAL_FRAME_DURATION * 9
        },
        {
            image: idleEvilImages[3],
            duration: SHORT_FRAME_DURATION
        },
    ];
    workingOpponentImages = Array.from({ length: 2 }, (_, i) => loadImage(`${opponentFilePath}/working-body-${i}.png`));
    workingOpponentAnimation = [
        {
            image: workingOpponentImages[0],
            duration: NORMAL_FRAME_DURATION
        },
        {
            image: workingOpponentImages[1],
            duration: NORMAL_FRAME_DURATION
        },
    ];
    workingArmImage = loadImage(`${opponentFilePath}/working-arm-0.png`);
    thinkingOpponentImages = Array.from({ length: 4 }, (_, i) => loadImage(`${opponentFilePath}/thinking-${i}.png`));
    thinkingOpponentAnimation = [
        {
            image: thinkingOpponentImages[0],
            duration: NORMAL_FRAME_DURATION * 2
        },
        {
            image: thinkingOpponentImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: thinkingOpponentImages[2],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: thinkingOpponentImages[3],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: thinkingOpponentImages[3],
            duration: 0
        },
    ];
    distractedOpponentImages = Array.from({ length: 6 }, (_, i) => loadImage(`${opponentFilePath}/distracted-${i}.png`));
    distractedOpponentAnimation = [
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[4],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[5],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[4],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[2],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: distractedOpponentImages[3],
            duration: SHORT_FRAME_DURATION
        },
    ];
    foundOpponentImages = Array.from({ length: 2 }, (_, i) => loadImage(`${opponentFilePath}/found-body-${i}.png`));
    foundOpponentAnimation = [
        {
            image: foundOpponentImages[0],
            duration: NORMAL_FRAME_DURATION
        },
        {
            image: foundOpponentImages[1],
            duration: NORMAL_FRAME_DURATION
        }
    ];
    foundArmImage = loadImage(`${opponentFilePath}/found-arm-0.png`);
    shockedOpponentImages = Array.from({ length: 2 }, (_, i) => loadImage(`${opponentFilePath}/shocked-${i}.png`));
    shockedOpponentAnimation = [
        {
            image: shockedOpponentImages[0],
            duration: NORMAL_FRAME_DURATION
        },
        {
            image: shockedOpponentImages[1],
            duration: NORMAL_FRAME_DURATION
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
    frameRate(FRAMERATE);
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
        if (this.isMouseOver()) {
            wobble(this.wobble, CENTER, this.spriteHover, this.positionX, this.positionY, this.width, this.height, 0.5, 0.1, this.positionX + this.width / 2, this.positionY + this.height / 2);
        }
        else {
            wobble(this.wobble, CENTER, this.spriteIdle, this.positionX, this.positionY, this.width, this.height, 0.1, 0.1, this.positionX + this.width / 2, this.positionY + this.height / 2);
        }
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
        this.frenzyProgressAddition = 0.1;
        this.frenzyMeter = 0;
        this.frenzyMeterStep = 40;
        this.maxFrenzyMeter = CANVAS_WIDTH + 100;
        this.enteredFrenzyMode = false;
        this.currentFrame = 0;
        this.currentProgress = 0;
        this.level = level;
        this.progressBar = new ProgressBar(this.progressBarPositionX, this.progressBarPositionY);
        this.countdown = new Countdown();
        this.progressBar.progressStep = 1;
        this.progressBar.progressReductionStep = 0.33;
        this.frenzyProgressAddition = this.progressBar.progressStep;
        this.opponent = new Opponent();
        this.evil = new Evil();
    }
    setup() {
    }
    draw() {
        image(defaultBackground, 0, 0);
        this.timePlayingThisLevel++;
        this.drawFrenzyMeter();
        this.drawProgressBar();
        this.evil.draw();
        this.opponent.draw();
        this.countdown.draw();
        if (this.timePlayingThisLevel <= 5 || this.opponent.state === OpponentState.SHOCKED) {
            return;
        }
        if (this.opponent.state === OpponentState.WORKING && this.currentProgress >= this.progressBar.progressReductionStep) {
            this.currentProgress -= this.progressBar.progressReductionStep;
        }
        const forbiddenToProgress = this.opponent.state === OpponentState.WORKING || this.opponent.state === OpponentState.THINKING;
        if (mouseIsPressed && forbiddenToProgress) {
            this.frenzyMeter = 0;
            this.opponent.state = OpponentState.SHOCKED;
            return;
        }
        if (mouseIsPressed) {
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
    drawFrenzyMeter() {
        noStroke();
        fill(0, 0, 0, 127);
        ellipse(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, this.frenzyMeter);
    }
    beIdle() {
        if (this.frenzyMeter > 0) {
            this.frenzyMeter = 0;
        }
    }
    beInteracted() {
        this.currentProgress += this.progressBar.progressStep;
        if (this.frenzyMeter <= this.maxFrenzyMeter) {
            this.frenzyMeter += this.frenzyMeterStep;
        }
        else if (this.frenzyMeter >= this.maxFrenzyMeter && !this.enteredFrenzyMode) {
            this.enteredFrenzyMode = true;
        }
    }
    initiateFrenzyMode() {
        this.progressBar.progressStep += this.frenzyProgressAddition;
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
class Particles {
    constructor(x, y, possibleParticles, minVelX, maxVelX, minVelY, maxVelY) {
        this.timeUntilNextParticle = FRAMERATE * 2;
        this.possibleParticles = possibleParticles;
        this.particles = [];
        this.x = x;
        this.y = y;
        this.minVelX = minVelX;
        this.maxVelX = maxVelX;
        this.minVelY = minVelY;
        this.maxVelY = maxVelY;
    }
    draw() {
        this.timeUntilNextParticle--;
        if (this.timeUntilNextParticle <= 0) {
            let p = new Particle(this.x, this.y, random(this.possibleParticles), this.minVelX, this.maxVelX, this.minVelY, this.maxVelY);
            this.particles.push(p);
        }
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].display();
            if (this.particles[i].isOffScreen()) {
                this.particles.splice(i, 1);
            }
        }
    }
}
class Particle {
    constructor(x, y, image, minVelX, maxVelX, minVelY, maxVelY) {
        this.x = x;
        this.y = y;
        this.velX = random(minVelX, maxVelX);
        this.velY = random(minVelY, maxVelY);
        this.width = 10;
        this.height = 10;
    }
    update() {
        this.x += this.velX;
        this.y += this.velY;
        this.velY += 0.2;
    }
    display() {
        fill(0);
        rect(this.x, this.y, this.width, this.height);
    }
    isOffScreen() {
        return this.y > height;
    }
}
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
class Countdown {
    constructor() {
        this.initialMinutes = 1;
        this.initialSeconds = 30;
        this.startCountdownTime = this.initialMinutes * 60 + this.initialSeconds;
        this.countdownTime = this.startCountdownTime;
        this.startTime = 0;
        this.startTime = millis();
    }
    draw() {
        let elapsedTime = floor((millis() - this.startTime) / 1000);
        let remainingTime = this.countdownTime - elapsedTime;
        textAlign(CENTER, CENTER);
        textSize(32);
        text(this.formatTime(remainingTime), width / 2, height / 2);
    }
    formatTime(seconds) {
        let minutes = floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return nf(minutes, 2) + ':' + nf(remainingSeconds, 2);
    }
}
var EvilState;
(function (EvilState) {
    EvilState["IDLE"] = "idle";
    EvilState["DESTROYING"] = "destroying";
    EvilState["SPOTTED"] = "spotted";
})(EvilState || (EvilState = {}));
class Evil {
    constructor() {
        this.state = EvilState.IDLE;
        this.currentFrame = 0;
        this.characterSize = 0.9;
        this.characterWidth = idleEvilImages[0].width * this.characterSize;
        this.characterHeight = idleEvilImages[0].height * this.characterSize;
    }
    draw() {
        switch (this.state) {
            case EvilState.IDLE:
                this.drawIdleEvil();
                break;
            case EvilState.DESTROYING:
                break;
            case EvilState.SPOTTED:
                break;
        }
    }
    drawIdleEvil() {
        this.animate(idleEvilAnimation, 0, 0 + (CANVAS_HEIGHT - this.characterHeight));
    }
    animate(animation, x, y) {
        if (this.currentFrame >= animation.length) {
            this.currentFrame = 0;
        }
        const currentFrameImage = animation[this.currentFrame].image;
        image(currentFrameImage, x, y, this.characterWidth, this.characterHeight);
        if (frameCount % animation[this.currentFrame].duration === 0) {
            this.currentFrame = (this.currentFrame + 1) % animation.length;
        }
    }
}
var OpponentState;
(function (OpponentState) {
    OpponentState["WORKING"] = "working";
    OpponentState["THINKING"] = "thinking";
    OpponentState["DISTRACTED"] = "distracted";
    OpponentState["FOUND"] = "found";
    OpponentState["SHOCKED"] = "shocked";
})(OpponentState || (OpponentState = {}));
class Opponent {
    constructor() {
        this.state = OpponentState.WORKING;
        this.currentFrame = 0;
        this.characterSize = 0.9;
        this.timeBeforeGameEnd = FRAMERATE * 4;
        this.currentTimeBeforeGameEnd = this.timeBeforeGameEnd;
        this.characterWidth = workingOpponentImages[0].width * this.characterSize;
        this.characterHeight = workingOpponentImages[0].height * this.characterSize;
        this.offsetX = 50;
        this.offsetY = 10;
        this.positionX = CANVAS_WIDTH - this.characterWidth + this.offsetX;
        this.positionY = CANVAS_HEIGHT - this.characterHeight + this.offsetY;
        this.minWorkingTime = 5;
        this.maxWorkingTime = 7;
        this.minDistractionTime = 8;
        this.maxDistractionTime = 12;
        this.minFoundTime = 1.75;
        this.maxFoundTime = 1.75;
        this.timeUntilStateChange = random(FRAMERATE * this.minWorkingTime, FRAMERATE * this.maxWorkingTime);
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
                this.drawThinking();
                break;
            case OpponentState.DISTRACTED:
                this.drawDistracted();
                break;
            case OpponentState.FOUND:
                this.drawFound();
                break;
            case OpponentState.SHOCKED:
                this.drawShocked();
                break;
        }
    }
    handleStateChange() {
        switch (this.state) {
            case OpponentState.WORKING:
                this.changeToStateAfterAnimationEnd(thinkingOpponentAnimation, OpponentState.THINKING);
                break;
            case OpponentState.THINKING:
                this.changeToState(OpponentState.DISTRACTED, FRAMERATE * this.minDistractionTime, FRAMERATE * this.maxDistractionTime);
                break;
            case OpponentState.DISTRACTED:
                this.changeToState(OpponentState.FOUND, FRAMERATE * this.minFoundTime, FRAMERATE * this.maxFoundTime);
                break;
            case OpponentState.FOUND:
                this.changeToState(OpponentState.WORKING, FRAMERATE * this.minWorkingTime, FRAMERATE * this.maxWorkingTime);
                break;
            case OpponentState.SHOCKED:
                break;
        }
    }
    changeToState(state, minTimeUntilNextChange, maxTimeUntilNextChange) {
        this.state = state;
        this.timeUntilStateChange = random(minTimeUntilNextChange, maxTimeUntilNextChange);
        this.currentFrame = 0;
    }
    changeToStateAfterAnimationEnd(animation, state) {
        this.state = state;
        for (const frame of animation) {
            this.timeUntilStateChange += frame.duration;
        }
    }
    drawWorking() {
        push();
        translate(this.positionX + (this.characterWidth / 2) + 45, this.positionY + this.characterHeight / 2 + 31);
        rotate(sin(frameCount * 0.5) * 0.75);
        image(workingArmImage, -workingArmImage.width, -workingArmImage.height / 2, workingArmImage.width, workingArmImage.height);
        pop();
        this.animate(workingOpponentAnimation, this.positionX, this.positionY);
    }
    drawThinking() {
        this.animate(thinkingOpponentAnimation, this.positionX, this.positionY);
    }
    drawDistracted() {
        this.animate(distractedOpponentAnimation, this.positionX, this.positionY);
    }
    drawFound() {
        push();
        imageMode(CENTER);
        translate(0, sin(frameCount * 0.2) * 8);
        image(foundArmImage, this.positionX + this.characterWidth - foundArmImage.width, this.positionY + (this.characterHeight / 2) - 20);
        pop();
        this.animate(foundOpponentAnimation, this.positionX, this.positionY);
    }
    drawShocked() {
        this.currentTimeBeforeGameEnd -= 1;
        if (this.currentTimeBeforeGameEnd <= 0) {
            this.currentTimeBeforeGameEnd = this.timeBeforeGameEnd;
            stateManager.switchToLoseScreen();
        }
        this.animate(shockedOpponentAnimation, this.positionX, this.positionY);
    }
    animate(animation, x, y) {
        if (this.currentFrame >= animation.length) {
            this.currentFrame = 0;
        }
        const currentFrameImage = animation[this.currentFrame].image;
        image(currentFrameImage, x, y, this.characterWidth, this.characterHeight);
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