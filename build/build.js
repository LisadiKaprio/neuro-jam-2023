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
function formatTime(seconds) {
    let minutes = floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return nf(minutes, 2) + ':' + nf(remainingSeconds, 2);
}
const animFilePath = `./art/anim`;
const opponentFilePath = `./art/opponent`;
const evilFilePath = `./art/evil`;
const robotsFilePath = `./art/robots`;
let customFont;
let musicMenu;
let musicUrgency;
let musicAwkwardPiano;
let soundEvilHa;
let soundEvilHehe;
let soundEvilHehehe;
let soundEvilOhNyooo;
let soundEvilWhoops;
let soundNeuroErm;
let soundNeuroHeart;
let soundNeuroWuu;
let soundNeuroPog;
let soundNeuroOhDear;
let soundBloop;
let soundPow;
let soundClank;
let soundClankTap;
let soundToolbox;
let soundToolboxTwo;
let soundToolboxThree;
let buttonHelpIdle;
let buttonHelpHover;
let buttonMusicIdle;
let buttonMusicHover;
let buttonMusicDisabled;
let buttonMusicDisabledHover;
let buttonSoundIdle;
let buttonSoundHover;
let buttonSoundDisabled;
let buttonSoundDisabledHover;
let spriteProgressBase;
let spriteProgressEmpty;
let spriteProgressFull;
let spriteProgressFrenzy;
let defaultBackground;
let splashScreen;
let tutorialScreenshot;
let lostCaughtBG;
let lostTimeoutBG;
let idleEvilImages;
let idleEvilAnimation;
let evilWorkingImages;
let evilWorkingAnimation;
let evilWorkingFrenzyImage;
let evilWorkingArmLeftImage;
let evilWorkingArmRightImage;
let evilCaughtImages;
let evilCaughtAnimation;
let evilWonImages;
let evilWonAnimation;
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
let lostOpponentImages;
let lostOpponentAnimation;
let wonOpponentImages;
let wonOpponentAnimation;
let cloudEvilImages;
let cloudEvilAnimation;
let cloudNeuroImages;
let cloudNeuroAnimation;
let robotIngameOne;
let robotIngameTwo;
let robotIngameThree;
let robotLoseOne;
let robotLoseTwo;
let robotLoseThree;
let robotWinOne;
let robotWinTwo;
let robotWinThree;
let levelOneButtonActive;
let levelOneButtonHover;
let levelOneButtonDisabled;
let levelOneButtonComplete;
let levelOneButtonCompleteHover;
let levelTwoButtonActive;
let levelTwoButtonHover;
let levelTwoButtonDisabled;
let levelTwoButtonComplete;
let levelTwoButtonCompleteHover;
let levelThreeButtonActive;
let levelThreeButtonHover;
let levelThreeButtonDisabled;
let levelThreeButtonComplete;
let levelThreeButtonCompleteHover;
function preload() {
    soundFormats('mp3', 'wav');
    musicMenu = loadSound(`./audio/music-little-think.mp3`);
    musicUrgency = loadSound(`./audio/music-urgency.mp3`);
    musicAwkwardPiano = loadSound(`./audio/awkwardPiano.mp3`);
    soundEvilHa = loadSound(`./audio/evil-ha.mp3`);
    soundEvilHehe = loadSound(`./audio/evil-hehe.mp3`);
    soundEvilHehehe = loadSound(`./audio/evil-hehehe.mp3`);
    soundEvilOhNyooo = loadSound(`./audio/evil-oh-nyooo.mp3`);
    soundEvilWhoops = loadSound(`./audio/evil-whoops.mp3`);
    soundNeuroErm = loadSound(`./audio/neuro-erm.mp3`);
    soundNeuroHeart = loadSound(`./audio/neuro-heart.mp3`);
    soundNeuroWuu = loadSound(`./audio/neuro-wuu.mp3`);
    soundNeuroPog = loadSound(`./audio/neuro-pog.mp3`);
    soundNeuroOhDear = loadSound(`./audio/neuro-oh-dear.mp3`);
    soundBloop = loadSound(`./audio/sound-bloop.wav`);
    soundPow = loadSound(`./audio/sound-pow.wav`);
    soundClank = loadSound(`./audio/sound-clank.wav`);
    soundClankTap = loadSound(`./audio/sound-clanktap.wav`);
    soundToolbox = loadSound(`./audio/sound-toolbox.wav`);
    soundToolboxTwo = loadSound(`./audio/sound-toolbox-two.wav`);
    soundToolboxThree = loadSound(`./audio/sound-toolbox-three.wav`);
    customFont = loadFont('./fonts/CherryBombOne-Regular.ttf');
    buttonHelpIdle = loadImage(`./art/interface/button-help.png`);
    buttonHelpHover = loadImage(`./art/interface/button-help-hover.png`);
    buttonMusicIdle = loadImage(`./art/interface/button-music-idle.png`);
    buttonMusicHover = loadImage(`./art/interface/button-music-hover.png`);
    buttonMusicDisabled = loadImage(`./art/interface/button-music-disabled.png`);
    buttonMusicDisabledHover = loadImage(`./art/interface/button-music-disabled-hover.png`);
    buttonSoundIdle = loadImage(`./art/interface/button-sound-idle.png`);
    buttonSoundHover = loadImage(`./art/interface/button-sound-hover.png`);
    buttonSoundDisabled = loadImage(`./art/interface/button-sound-disabled.png`);
    buttonSoundDisabledHover = loadImage(`./art/interface/button-sound-disabled-hover.png`);
    spriteProgressBase = loadImage('./art/interface/progress-bar-base.png');
    spriteProgressEmpty = loadImage('./art/interface/progress-bar-empty.png');
    spriteProgressFull = loadImage('./art/interface/progress-bar-full.png');
    spriteProgressFrenzy = loadImage('./art/interface/progress-bar-frenzy.png');
    defaultBackground = loadImage('./art/bg/default.jpg');
    splashScreen = loadImage('./art/bg/splashscreen.png');
    tutorialScreenshot = loadImage('./art/interface/tutorial-screenshots.png');
    lostCaughtBG = loadImage('./art/bg/lost-caught-bg.png');
    lostTimeoutBG = loadImage('./art/bg/lost-timeout-bg.png');
    robotIngameOne = loadImage(`${robotsFilePath}/ingame-1.png`);
    robotIngameTwo = loadImage(`${robotsFilePath}/ingame-2.png`);
    robotIngameThree = loadImage(`${robotsFilePath}/ingame-3.png`);
    robotLoseOne = loadImage(`${robotsFilePath}/lose-1.png`);
    robotLoseTwo = loadImage(`${robotsFilePath}/lose-2.png`);
    robotLoseThree = loadImage(`${robotsFilePath}/lose-3.png`);
    robotWinOne = loadImage(`${robotsFilePath}/win-1.png`);
    robotWinTwo = loadImage(`${robotsFilePath}/win-2.png`);
    robotWinThree = loadImage(`${robotsFilePath}/win-3.png`);
    levelOneButtonActive = loadImage(`${robotsFilePath}/level-1-active.png`);
    levelOneButtonHover = loadImage(`${robotsFilePath}/level-1-hover.png`);
    levelOneButtonDisabled = loadImage(`${robotsFilePath}/level-1-disabled.png`);
    levelOneButtonComplete = loadImage(`${robotsFilePath}/level-1-complete.png`);
    levelOneButtonCompleteHover = loadImage(`${robotsFilePath}/level-1-complete-hover.png`);
    levelTwoButtonActive = loadImage(`${robotsFilePath}/level-2-active.png`);
    levelTwoButtonHover = loadImage(`${robotsFilePath}/level-2-hover.png`);
    levelTwoButtonDisabled = loadImage(`${robotsFilePath}/level-2-disabled.png`);
    levelTwoButtonComplete = loadImage(`${robotsFilePath}/level-2-complete.png`);
    levelTwoButtonCompleteHover = loadImage(`${robotsFilePath}/level-2-complete-hover.png`);
    levelThreeButtonActive = loadImage(`${robotsFilePath}/level-3-active.png`);
    levelThreeButtonHover = loadImage(`${robotsFilePath}/level-3-hover.png`);
    levelThreeButtonDisabled = loadImage(`${robotsFilePath}/level-3-disabled.png`);
    levelThreeButtonComplete = loadImage(`${robotsFilePath}/level-3-complete.png`);
    levelThreeButtonCompleteHover = loadImage(`${robotsFilePath}/level-3-complete-hover.png`);
    cloudEvilImages = Array.from({ length: 3 }, (_, i) => loadImage(`${robotsFilePath}/cloud-evil-${i}.png`));
    cloudEvilAnimation = [
        {
            image: cloudEvilImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: cloudEvilImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: cloudEvilImages[2],
            duration: SHORT_FRAME_DURATION
        },
    ];
    cloudNeuroImages = Array.from({ length: 3 }, (_, i) => loadImage(`${robotsFilePath}/cloud-neuro-${i}.png`));
    cloudNeuroAnimation = [
        {
            image: cloudNeuroImages[0],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: cloudNeuroImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: cloudNeuroImages[2],
            duration: SHORT_FRAME_DURATION
        },
    ];
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
    evilWorkingImages = Array.from({ length: 3 }, (_, i) => loadImage(`${evilFilePath}/working-body-${i}.png`));
    evilWorkingFrenzyImage = loadImage(`${evilFilePath}/working-body-frenzy.png`);
    evilWorkingArmLeftImage = loadImage(`${evilFilePath}/working-arm-left.png`);
    evilWorkingArmRightImage = loadImage(`${evilFilePath}/working-arm-right.png`);
    evilCaughtImages = Array.from({ length: 2 }, (_, i) => loadImage(`${evilFilePath}/caught-${i}.png`));
    evilCaughtAnimation = [
        {
            image: evilCaughtImages[0],
            duration: NORMAL_FRAME_DURATION
        },
        {
            image: evilCaughtImages[1],
            duration: NORMAL_FRAME_DURATION
        }
    ];
    evilWonImages = Array.from({ length: 2 }, (_, i) => loadImage(`${evilFilePath}/won-${i}.png`));
    evilWonAnimation = [
        {
            image: evilWonImages[0],
            duration: NORMAL_FRAME_DURATION
        },
        {
            image: evilWonImages[1],
            duration: NORMAL_FRAME_DURATION
        }
    ];
    evilWorkingAnimation = [
        {
            image: evilWorkingImages[0],
            duration: NORMAL_FRAME_DURATION * 7
        },
        {
            image: evilWorkingImages[1],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: evilWorkingImages[2],
            duration: SHORT_FRAME_DURATION
        },
        {
            image: evilWorkingImages[1],
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
    lostOpponentImages = Array.from({ length: 2 }, (_, i) => loadImage(`${opponentFilePath}/lost-${i}.png`));
    lostOpponentAnimation = [
        {
            image: lostOpponentImages[0],
            duration: NORMAL_FRAME_DURATION
        },
        {
            image: lostOpponentImages[1],
            duration: NORMAL_FRAME_DURATION
        }
    ];
    wonOpponentImages = Array.from({ length: 2 }, (_, i) => loadImage(`${opponentFilePath}/won-${i}.png`));
    wonOpponentAnimation = [
        {
            image: wonOpponentImages[0],
            duration: NORMAL_FRAME_DURATION
        },
        {
            image: wonOpponentImages[1],
            duration: NORMAL_FRAME_DURATION
        }
    ];
    mainMenu.preload();
}
function setup() {
    textFont(customFont);
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    background(COLOR_LIGHTER_MAIN_PINK);
    levelSelection.setup();
    volumeControl.setup();
    stateManager.setup();
    tutorial.setup();
}
function draw() {
    frameRate(FRAMERATE);
    background(COLOR_LIGHTER_MAIN_PINK);
    stateManager.update();
    volumeControl.draw();
    tutorial.draw();
}
function mousePressed() {
    stateManager.mousePressed();
    tutorial.mouseClicked();
}
class Button {
    constructor(buttonConfig) {
        this.mouseEntered = false;
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
        if (!this.mouseEntered && this.isMouseOver()) {
            this.mouseEntered = true;
            volumeControl.playSound(soundBloop);
        }
        else if (this.mouseEntered && !this.isMouseOver()) {
            this.mouseEntered = false;
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
    mouseClicked(whatHappens) {
        if (this.isMouseOver()) {
            image(this.spriteHover, this.positionX, this.positionY, this.width * this.size * this.sizeMultiplierOnPressed, this.height * this.size * this.sizeMultiplierOnPressed);
            whatHappens();
            volumeControl.playSound(soundPow);
        }
    }
}
class IntroSplashScreen {
    setup() {
    }
    draw() {
        push();
        image(splashScreen, -splashScreen.width / 2 - 150, -60, splashScreen.width * 1.5, splashScreen.height * 1.5);
        fill(COLOR_YELLOW);
        strokeWeight(5);
        stroke(COLOR_SATURATED_PINK);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Click anywhere to continue", CANVAS_WIDTH - 250, CANVAS_HEIGHT - textSize() - 25);
        pop();
    }
    mouseClicked() {
        stateManager.switchToMainMenu();
    }
}
const introSplashScreen = new IntroSplashScreen();
class VolumeControl {
    constructor() {
        this.musicVolume = 1;
        this.sfxVolume = 2;
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
        }, 100, 5, this.musicVolume);
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
        }, 100, 5, this.sfxVolume);
        this.sfxVolumeControl.setup();
        const savedMusicVolume = localStorage.getItem('musicVolume');
        const savedSfxVolume = localStorage.getItem('sfxVolume');
        if (savedMusicVolume) {
            this.musicVolumeControl.slider.value(parseFloat(savedMusicVolume));
            this.musicVolume = parseFloat(savedMusicVolume);
        }
        if (savedSfxVolume) {
            this.sfxVolumeControl.slider.value(parseFloat(savedSfxVolume));
            this.sfxVolume = parseFloat(savedSfxVolume);
        }
    }
    draw() {
        this.musicVolumeControl.draw();
        this.sfxVolumeControl.draw();
        if (this.musicVolume !== this.musicVolumeControl.currentValue) {
            this.musicVolume = this.musicVolumeControl.currentValue;
            this.changeMusicVolume(this.musicVolumeControl.currentValue);
        }
        if (this.sfxVolume !== this.sfxVolumeControl.currentValue) {
            this.changeSfxVolume(this.sfxVolumeControl.currentValue);
        }
    }
    changeSfxVolume(volume) {
        localStorage.setItem('sfxVolume', volume.toString());
        this.sfxVolume = volume;
    }
    changeMusicVolume(volume) {
        localStorage.setItem('musicVolume', volume.toString());
        this.musicVolume = volume;
        if (this.currentMusic) {
            this.currentMusic.setVolume(this.musicVolume);
        }
    }
    playMusic(music) {
        var _a;
        if (music === this.currentMusic)
            return;
        (_a = this.currentMusic) === null || _a === void 0 ? void 0 : _a.stop();
        this.currentMusic = music;
        this.currentMusic.setVolume(this.musicVolume);
        this.currentMusic.loop();
    }
    stopMusic() {
        if (this.currentMusic.isLooping()) {
            this.currentMusic.stop();
        }
    }
    playSound(sfx) {
        sfx.setVolume(this.sfxVolume);
        const shift = random(0.7, 1.3);
        sfx.rate(shift);
        sfx.play();
        sfx.rate(1);
    }
}
const volumeControl = new VolumeControl();
class TextButton {
    constructor(buttonConfig) {
        this.size = 20;
        this.positionX = buttonConfig.positionX || 0;
        this.positionY = buttonConfig.positionY || 0;
        this.text = buttonConfig.text;
        this.onClick = buttonConfig.onClick;
        this.size = buttonConfig.size || 20;
    }
    draw() {
        push();
        if (this.isMouseOver()) {
            strokeWeight(3);
            stroke(COLOR_WHITE);
            if (mousePressed)
                textSize(this.size * 1.1);
            else
                textSize(this.size);
            fill(COLOR_SATURATED_PINK);
        }
        else {
            strokeWeight(2);
            stroke(COLOR_MAIN_PINK);
            textSize(this.size);
            fill(COLOR_WHITE);
        }
        text(this.text, this.positionX, this.positionY);
        pop();
    }
    isMouseOver() {
        const x = this.positionX - textWidth(this.text) / 2;
        const y = this.positionY - this.size / 2;
        if (mouseX > x &&
            mouseX < x + textWidth(this.text) * 1.1 &&
            mouseY > y &&
            mouseY < y + this.size * 1.25) {
            return true;
        }
    }
    isMouseOut() {
        const x = this.positionX - textWidth(this.text) / 2;
        const y = this.positionY - this.size / 2;
        if (mouseX < x ||
            mouseX > x + textWidth(this.text) * 1.1 ||
            mouseY < y ||
            mouseY > y + this.size * 1.25) {
            return true;
        }
    }
    mouseClicked() {
        if (this.isMouseOver()) {
            this.onClick();
        }
    }
}
class MainMenu {
    constructor() {
        this.buttonX = 200;
        this.buttonY = 400;
        this.buttonWidth = 200;
        this.buttonHeight = 50;
        this.startGameButton = new TextButton({
            positionX: this.buttonX,
            positionY: this.buttonY,
            text: 'Start Game',
            onClick: () => {
                stateManager.switchToLevelSelection();
            },
            size: 50
        });
    }
    preload() {
    }
    setup() {
        volumeControl.playMusic(musicMenu);
    }
    draw() {
        wobble(true, CENTER, splashScreen, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, splashScreen.width * 1, splashScreen.height * 1, 0.1, 0.03, CANVAS_WIDTH - splashScreen.width * 0.9 / 2, CANVAS_HEIGHT - splashScreen.height * 0.9 / 3);
        this.startGameButton.draw();
    }
    mouseClicked() {
        this.startGameButton.mouseClicked();
    }
}
const mainMenu = new MainMenu();
class BaseLevel {
    constructor(level) {
        this.robotPositionY = CANVAS_WIDTH / 2 + 45;
        this.clickCooldownMeter = 0;
        this.enteredWinning = false;
        this.enteredLosing = false;
        this.progressBarPositionX = CANVAS_WIDTH / 2 - spriteProgressEmpty.width / 2;
        this.progressBarPositionY = 100;
        this.frenzyProgressAddition = 0.1;
        this.frenzyMeter = 0;
        this.frenzyMeterStep = 37;
        this.maxFrenzyMeter = CANVAS_WIDTH + 100;
        this.enteredFrenzyMode = false;
        this.frenzyProgressStepMultiplier = 2.25;
        this.currentFrame = 0;
        this.currentProgress = 0;
        this.level = level;
        this.progressBar = new ProgressBar();
        this.countdown = new Countdown();
        this.progressBar.startProgressStep = this.progressBar.currentProgressStep * this.level.progressStepMultiplier;
        this.progressBar.currentProgress = this.progressBar.startProgressStep;
        this.progressBar.progressReductionStepMultiplier = this.level.progressReductionStepMultiplier;
        this.opponent = new Opponent();
        this.evil = new Evil();
        this.cloud = new Cloud();
        this.robotIngameImage = this.level.robotIngameImage;
        this.robotLoseImage = this.level.robotLoseImage;
        this.robotWinImage = this.level.robotWinImage;
    }
    setup() {
    }
    draw() {
        this.maxFrenzyMeter = dist(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        image(defaultBackground, 0, 0);
        this.countdown.calculate();
        if (tutorial.isShown) {
            this.clickCooldownMeter = 0;
            return;
        }
        this.clickCooldownMeter++;
        this.drawRobot();
        const forbiddenToProgress = this.opponent.state === OpponentState.WORKING || this.opponent.state === OpponentState.THINKING;
        const playerInteractionConfirmed = (mouseIsPressed && mouseButton === LEFT || touches.length > 0)
            && !(volumeControl.musicVolumeControl.isMouseOver() || volumeControl.sfxVolumeControl.isMouseOver() || tutorial.isMouseOver());
        const validPlayerInteractionConfirmed = !forbiddenToProgress
            && this.opponent.state !== OpponentState.LOST
            && this.opponent.state !== OpponentState.WON
            && playerInteractionConfirmed;
        const losingPlayerInteractionConfirmed = forbiddenToProgress
            && playerInteractionConfirmed;
        this.drawFrenzyMeter();
        this.drawProgressBar();
        this.evil.draw();
        if (validPlayerInteractionConfirmed)
            this.cloud.draw(cloudEvilAnimation, CANVAS_WIDTH / 2, this.robotPositionY);
        this.opponent.draw();
        this.countdown.draw();
        if (this.clickCooldownMeter <= 5
            || this.opponent.state === OpponentState.SHOCKED
            || this.opponent.state === OpponentState.LOST
            || this.opponent.state === OpponentState.WON) {
            return;
        }
        if (this.currentProgress >= this.progressBar.maxStep && !this.enteredWinning) {
            this.enteredWinning = true;
            this.opponent.currentTimeBeforeGameEnd = this.opponent.timeBeforeGameEnd;
            volumeControl.stopMusic();
            this.resetFrenzyMode();
            const stringInLocalStorage = `${this.level.codename}-highscore`;
            this.level.bestTime = parseFloat(localStorage.getItem(stringInLocalStorage) || '0');
            if (this.level.bestTime >= this.countdown.elapsedTime) {
                localStorage.setItem(`${this.level.codename}-highscore`, this.countdown.elapsedTime.toString());
            }
            volumeControl.playSound(soundNeuroOhDear);
            this.evil.state = EvilState.WON;
            this.opponent.state = OpponentState.LOST;
            return;
        }
        if (this.countdown.remainingTime <= 0 && !this.enteredLosing) {
            this.enteredLosing = true;
            volumeControl.stopMusic();
            this.opponent.currentTimeBeforeGameEnd = this.opponent.timeBeforeGameEnd;
            this.resetFrenzyMode();
            volumeControl.playSound(soundNeuroPog);
            this.evil.state = EvilState.IDLE;
            this.opponent.state = OpponentState.WON;
            return;
        }
        if (this.opponent.state === OpponentState.WORKING) {
            this.cloud.draw(cloudNeuroAnimation, CANVAS_WIDTH / 2, this.robotPositionY);
            if (this.currentProgress >= this.progressBar.progressReductionStep * this.progressBar.progressReductionStepMultiplier)
                this.currentProgress -= this.progressBar.progressReductionStep * this.progressBar.progressReductionStepMultiplier;
        }
        if (validPlayerInteractionConfirmed) {
            this.beInteracted();
        }
        else if (losingPlayerInteractionConfirmed) {
            if (!this.enteredLosing) {
                this.enteredLosing = true;
                volumeControl.playSound(random([soundEvilOhNyooo, soundEvilWhoops]));
            }
            this.frenzyMeter = 0;
            volumeControl.stopMusic();
            this.opponent.state = OpponentState.SHOCKED;
            this.evil.state = EvilState.CAUGHT;
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
        push();
        noStroke();
        fill(0, 0, 0, 127);
        ellipse(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, this.frenzyMeter);
        pop();
    }
    drawRobot() {
        push();
        imageMode(CENTER);
        let imageToDraw = this.robotIngameImage;
        if (!imageToDraw) {
            console.log('no image to draw');
            pop();
            return;
        }
        if (this.opponent.state === OpponentState.LOST) {
            imageToDraw = this.robotWinImage;
        }
        else if (this.opponent.state === OpponentState.WON) {
            imageToDraw = this.robotLoseImage;
        }
        image(imageToDraw, CANVAS_WIDTH / 2, this.robotPositionY);
        pop();
    }
    beIdle() {
        volumeControl.playMusic(musicAwkwardPiano);
        if (this.evil.state !== EvilState.WON)
            this.evil.state = EvilState.IDLE;
        if (this.frenzyMeter > 0) {
            this.resetFrenzyMode();
        }
    }
    beInteracted() {
        this.evil.state = EvilState.DESTROYING;
        volumeControl.playMusic(musicUrgency);
        this.currentProgress += this.progressBar.currentProgressStep;
        if (this.frenzyMeter <= this.maxFrenzyMeter) {
            this.frenzyMeter += this.frenzyMeterStep;
        }
        else if (this.frenzyMeter >= this.maxFrenzyMeter && !this.enteredFrenzyMode) {
            this.initiateFrenzyMode();
        }
    }
    initiateFrenzyMode() {
        this.enteredFrenzyMode = true;
        this.progressBar.currentProgressStep = this.progressBar.startProgressStep * this.frenzyProgressStepMultiplier;
        this.evil.inFrenzy = true;
        this.progressBar.inFrenzy = true;
    }
    resetFrenzyMode() {
        this.enteredFrenzyMode = false;
        this.progressBar.currentProgressStep = this.progressBar.startProgressStep;
        this.frenzyMeter = 0;
        this.evil.inFrenzy = false;
        this.progressBar.inFrenzy = false;
    }
    mouseClicked() {
        if (this.evil.state === EvilState.IDLE
            && this.opponent.state !== OpponentState.WORKING
            && this.opponent.state !== OpponentState.THINKING
            && this.opponent.state !== OpponentState.LOST
            && this.opponent.state !== OpponentState.WON
            && !(volumeControl.musicVolumeControl.isMouseOver() || volumeControl.sfxVolumeControl.isMouseOver())
            && !tutorial.isMouseOver()) {
            volumeControl.playSound(random([soundEvilHa, soundEvilHehe, soundEvilHehehe]));
        }
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
    switchToLoseScreen(image, text) {
        volumeControl.playMusic(musicMenu);
        loseScreen.bg = image;
        loseScreen.text = text;
        this.currentScene = loseScreen;
        introSplashScreen.setup();
    }
    initiateLevel(level) {
        volumeControl.playMusic(musicAwkwardPiano);
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
class Tutorial {
    constructor() {
        this.isShown = false;
        this.openTime = 0;
    }
    setup() {
        this.button = new Button({
            spriteIdle: buttonHelpIdle,
            spriteHover: buttonHelpHover,
            positionX: 10,
            positionY: 10,
            sizeMultiplierOnPressed: 0.75,
            wobble: true
        });
    }
    draw() {
        this.button.draw();
        if (!this.isShown)
            return;
        push();
        strokeWeight(5);
        stroke(COLOR_WHITE);
        rectMode(CENTER);
        fill(0, 0, 0, 200);
        rect(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80, 20, 20, 20, 20);
        image(tutorialScreenshot, 0, 0);
        translate(0, sin(frameCount * 0.1) * 1.25);
        stroke(COLOR_DARK_PINK);
        fill(COLOR_YELLOW);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("How to play", CANVAS_WIDTH / 2, 75);
        noStroke();
        textSize(20);
        text("Neuro tends to lose her tools a lot while building her robots.", CANVAS_WIDTH / 2, 125);
        text("Ruin her career while she is distracted!", CANVAS_WIDTH / 2, 155);
        stroke(COLOR_DARK_PINK);
        text("Hold left mouse button to reassamble the robot.", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 190);
        text("Release the button before Neuro finds the right tool and turns around.", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 160);
        noStroke();
        text("Be careful, or you'll be thrown into Neuro's dungeon!", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 120);
        pop();
    }
    isMouseOver() {
        if (mouseX > this.button.positionX &&
            mouseX < this.button.positionX + this.button.width &&
            mouseY > this.button.positionY &&
            mouseY < this.button.positionY + this.button.height) {
            return true;
        }
    }
    isMouseOut() {
        if (mouseX < this.button.positionX ||
            mouseX > this.button.positionX + this.button.width ||
            mouseY < this.button.positionY ||
            mouseY > this.button.positionY + this.button.height) {
            return true;
        }
    }
    mouseClicked() {
        if (this.isShown) {
            console.log('isShown');
            this.isShown = false;
            return;
        }
        if (this.isMouseOver()) {
            this.openTime = millis();
            console.log(this.openTime);
            this.isShown = !this.isShown;
        }
    }
}
const tutorial = new Tutorial();
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
        this.slider = createSlider(0, this.maxValue, this.defaultValue, 0);
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
class Cloud {
    constructor() {
        this.defaultImage = cloudEvilImages[0];
        this.currentFrame = 0;
        this.size = 0.9;
    }
    draw(animation, x, y) {
        push();
        imageMode(CENTER);
        if (this.currentFrame >= animation.length) {
            this.currentFrame = 0;
        }
        const currentFrameImage = animation[this.currentFrame].image;
        image(currentFrameImage, x, y, this.defaultImage.width * this.size, this.defaultImage.height * this.size);
        if (frameCount % animation[this.currentFrame].duration === 0) {
            this.currentFrame = (this.currentFrame + 1) % animation.length;
        }
        pop();
    }
}
class Countdown {
    constructor() {
        this.initialMinutes = 1;
        this.initialSeconds = 30;
        this.startCountdownTime = this.initialMinutes * 60 + this.initialSeconds;
        this.countdownTime = this.startCountdownTime;
        this.startTime = 0;
        this.timeToAddBecauseOfPause = 0;
        this.criticalRemainingTime = 10;
        this.elapsedTime = 0;
        this.remainingTime = this.countdownTime;
        this.startTime = millis();
    }
    calculate() {
        if (tutorial.isShown) {
            this.timeToAddBecauseOfPause = (millis() - tutorial.openTime);
            return;
        }
        if (this.timeToAddBecauseOfPause > 0) {
            this.startTime += this.timeToAddBecauseOfPause;
            this.timeToAddBecauseOfPause = 0;
        }
        if (this.remainingTime <= 0)
            return;
        let elapsedTime = floor((millis() - this.startTime) / 1000);
        let remainingTime = this.countdownTime - elapsedTime;
        this.elapsedTime = elapsedTime;
        this.remainingTime = remainingTime;
    }
    draw() {
        push();
        if (this.remainingTime <= this.criticalRemainingTime) {
            strokeWeight(4);
            stroke(COLOR_DARK);
            textAlign(CENTER, CENTER);
            textSize(sin(frameCount * 0.3) * 8 + 32);
            fill(COLOR_BLUE);
        }
        else {
            strokeWeight(4);
            stroke(COLOR_DARK_PINK);
            textAlign(CENTER, CENTER);
            textSize(32);
            fill(COLOR_YELLOW);
        }
        text(formatTime(this.remainingTime), width / 2, spriteProgressBase.height);
        pop();
    }
}
var EvilState;
(function (EvilState) {
    EvilState["IDLE"] = "idle";
    EvilState["DESTROYING"] = "destroying";
    EvilState["CAUGHT"] = "caught";
    EvilState["WON"] = "won";
})(EvilState || (EvilState = {}));
class Evil {
    constructor() {
        this.state = EvilState.IDLE;
        this.currentFrame = 0;
        this.inFrenzy = false;
        this.characterSize = 0.9;
        this.characterWidth = idleEvilImages[0].width * this.characterSize;
        this.characterHeight = idleEvilImages[0].height * this.characterSize;
        this.y = CANVAS_HEIGHT - this.characterHeight;
    }
    draw() {
        switch (this.state) {
            case EvilState.IDLE:
                this.drawIdleEvil();
                break;
            case EvilState.DESTROYING:
                this.drawDestroyingEvil();
                break;
            case EvilState.CAUGHT:
                this.drawCaughtEvil();
                break;
            case EvilState.WON:
                this.drawWonEvil();
                break;
        }
    }
    drawIdleEvil() {
        this.animate(idleEvilAnimation, 0, this.y);
    }
    drawDestroyingEvil() {
        let strength = (sin(frameCount * 0.8) * 0.2);
        push();
        translate(260, 440);
        rotate(sin(frameCount * strength * 0.9) * 0.5 + 0.5);
        image(evilWorkingArmRightImage, -35, -100, evilWorkingArmRightImage.width, evilWorkingArmRightImage.height);
        pop();
        if (!this.inFrenzy)
            this.animate(evilWorkingAnimation, 0, this.y);
        else
            image(evilWorkingFrenzyImage, 0, this.y, this.characterWidth, this.characterHeight);
        push();
        translate(120, 402);
        rotate(sin(frameCount * strength) * 0.65);
        image(evilWorkingArmLeftImage, -25, -25, evilWorkingArmLeftImage.width, evilWorkingArmLeftImage.height);
        pop();
    }
    drawCaughtEvil() {
        this.animate(evilCaughtAnimation, 0, this.y);
    }
    drawWonEvil() {
        this.animate(evilWonAnimation, 0, this.y);
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
    OpponentState["LOST"] = "lost";
    OpponentState["WON"] = "won";
})(OpponentState || (OpponentState = {}));
class Opponent {
    constructor() {
        this.frameCountSinceAnimationStart = 0;
        this.state = OpponentState.WORKING;
        this.currentFrame = 0;
        this.characterSize = 0.9;
        this.timeBeforeGameEnd = FRAMERATE * 8;
        this.timeBeforeGameEndIfLost = FRAMERATE * 4;
        this.currentTimeBeforeGameEnd = this.timeBeforeGameEndIfLost;
        this.characterWidth = workingOpponentImages[0].width * this.characterSize;
        this.characterHeight = workingOpponentImages[0].height * this.characterSize;
        this.offsetX = 50;
        this.offsetY = 10;
        this.positionX = CANVAS_WIDTH - this.characterWidth + this.offsetX;
        this.positionY = CANVAS_HEIGHT - this.characterHeight + this.offsetY;
        this.minWorkingTime = 0.5;
        this.maxWorkingTime = 2;
        this.minDistractionTime = 0.75;
        this.maxDistractionTime = 4;
        this.minFoundTime = 1.1;
        this.maxFoundTime = 1.6;
        this.chanceToTrickThink = 0.3;
        this.chanceToTrickFound = 0.7;
        this.trickedThink = random(0, 1);
        this.trickedFound = random(0, 7);
        this.timeUntilStateChange = random(FRAMERATE * this.minWorkingTime, FRAMERATE * this.maxWorkingTime);
    }
    draw() {
        this.frameCountSinceAnimationStart++;
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
            case OpponentState.LOST:
                this.drawLost();
                break;
            case OpponentState.WON:
                this.drawWon();
                break;
        }
    }
    handleStateChange() {
        switch (this.state) {
            case OpponentState.WORKING:
                volumeControl.playSound(soundNeuroErm);
                this.changeToStateAfterAnimationEnd(thinkingOpponentAnimation, OpponentState.THINKING);
                break;
            case OpponentState.THINKING:
                let randomizerThinking = random(0, 1);
                if (randomizerThinking <= this.chanceToTrickThink && this.trickedThink > 0) {
                    this.trickedThink--;
                    this.changeToState(OpponentState.WORKING, FRAMERATE * this.minWorkingTime, FRAMERATE * this.maxWorkingTime);
                }
                else {
                    this.trickedThink = random(0, 2);
                    volumeControl.playSound(random([soundToolbox, soundToolboxTwo, soundToolboxThree]));
                    this.changeToState(OpponentState.DISTRACTED, FRAMERATE * this.minDistractionTime, FRAMERATE * this.maxDistractionTime);
                }
                break;
            case OpponentState.DISTRACTED:
                volumeControl.playSound(random([soundNeuroHeart, soundNeuroWuu]));
                this.changeToState(OpponentState.FOUND, FRAMERATE * this.minFoundTime, FRAMERATE * this.maxFoundTime);
                break;
            case OpponentState.FOUND:
                let randomizerFound = random(0, 1);
                if (randomizerFound <= this.chanceToTrickFound && this.trickedFound > 0) {
                    this.trickedFound--;
                    volumeControl.playSound(random([soundToolbox, soundToolboxTwo, soundToolboxThree]));
                    this.changeToState(OpponentState.DISTRACTED, FRAMERATE * this.minDistractionTime, FRAMERATE * this.maxDistractionTime);
                }
                else {
                    this.trickedFound = random(0, 3);
                    this.changeToState(OpponentState.WORKING, FRAMERATE * this.minWorkingTime, FRAMERATE * this.maxWorkingTime);
                }
                break;
            case OpponentState.SHOCKED:
                break;
            case OpponentState.LOST:
                break;
            case OpponentState.WON:
                break;
        }
    }
    changeToState(state, minTimeUntilNextChange, maxTimeUntilNextChange) {
        this.frameCountSinceAnimationStart = 0;
        this.state = state;
        this.timeUntilStateChange = random(minTimeUntilNextChange, maxTimeUntilNextChange);
        this.currentFrame = 0;
    }
    changeToStateAfterAnimationEnd(animation, state) {
        this.frameCountSinceAnimationStart = 0;
        this.state = state;
        for (const frame of animation) {
            this.timeUntilStateChange += frame.duration;
        }
        this.currentFrame = 0;
    }
    drawWorking() {
        push();
        translate(this.positionX + (this.characterWidth / 2) + 45, this.positionY + this.characterHeight / 2 + 31);
        let armRotation = sin(frameCount * 0.5) * 0.75;
        rotate(armRotation);
        image(workingArmImage, -workingArmImage.width, -workingArmImage.height / 2, workingArmImage.width, workingArmImage.height);
        pop();
        if (armRotation <= -0.7) {
        }
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
            stateManager.switchToLoseScreen(lostCaughtBG, 'You got caught!');
        }
        this.animate(shockedOpponentAnimation, this.positionX, this.positionY);
    }
    drawLost() {
        this.currentTimeBeforeGameEnd -= 1;
        if (this.currentTimeBeforeGameEnd <= 0) {
            this.currentTimeBeforeGameEnd = this.timeBeforeGameEnd;
            stateManager.switchToLevelSelection();
        }
        this.animate(lostOpponentAnimation, this.positionX, this.positionY);
    }
    drawWon() {
        this.currentTimeBeforeGameEnd -= 1;
        if (this.currentTimeBeforeGameEnd <= 0) {
            this.currentTimeBeforeGameEnd = this.timeBeforeGameEnd;
            stateManager.switchToLoseScreen(lostTimeoutBG, 'Time ran out!');
        }
        this.animate(wonOpponentAnimation, this.positionX, this.positionY);
    }
    animate(animation, x, y) {
        if (this.currentFrame >= animation.length) {
            this.currentFrame = 0;
        }
        const currentFrameImage = animation[this.currentFrame].image;
        image(currentFrameImage, x, y, this.characterWidth, this.characterHeight);
        if (this.frameCountSinceAnimationStart % animation[this.currentFrame].duration === 0 && this.frameCountSinceAnimationStart !== 0) {
            this.currentFrame = (this.currentFrame + 1) % animation.length;
        }
    }
}
class ProgressBar {
    constructor() {
        this.currentProgress = 0;
        this.maxStep = 1000;
        this.startProgressStep = 2;
        this.currentProgressStep = 2;
        this.progressReductionStep = 0.75;
        this.progressReductionStepMultiplier = 1;
        this.spriteBase = spriteProgressBase;
        this.spriteEmpty = spriteProgressEmpty;
        this.spriteFull = spriteProgressFull;
        this.spriteFrenzy = spriteProgressFrenzy;
        this.inFrenzy = false;
    }
    draw() {
        let fullPositionX = (CANVAS_WIDTH / 2) - (this.spriteFull.width / 2) + 3;
        let fullPositionY = this.spriteBase.height / 2 - 8;
        let spriteToShow = this.inFrenzy ? this.spriteFrenzy : this.spriteFull;
        image(this.spriteBase, CANVAS_WIDTH / 2 - this.spriteBase.width / 2, 0);
        let widthMultiplier = this.currentProgress / this.maxStep;
        if (widthMultiplier > 1)
            widthMultiplier = 1;
        const progressWidth = Math.floor(this.spriteEmpty.width * widthMultiplier);
        if (progressWidth > 1) {
            image(spriteToShow, fullPositionX, fullPositionY, progressWidth, this.spriteFull.height, 0, 0, progressWidth, this.spriteFull.height);
        }
    }
}
class LevelSelection {
    constructor() {
        this.buttonX = 100;
        this.buttonY = 50;
        this.buttonWidth = 200;
        this.buttonHeight = 50;
    }
    setup() {
        this.levelsArray = [
            {
                codename: 'level-one',
                isCompleted: false,
                canBePlayed: true,
                robotIngameImage: robotIngameOne,
                robotLoseImage: robotLoseOne,
                robotWinImage: robotWinOne,
                selectionButtonActive: levelOneButtonActive,
                selectionButtonHover: levelOneButtonHover,
                selectionButtonDisabled: levelOneButtonDisabled,
                selectionButtonComplete: levelOneButtonComplete,
                selectionButtonCompleteHover: levelOneButtonCompleteHover,
                progressStepMultiplier: 1,
                progressReductionStepMultiplier: 1,
            },
            {
                codename: 'level-two',
                isCompleted: false,
                canBePlayed: false,
                robotIngameImage: robotIngameTwo,
                robotLoseImage: robotLoseTwo,
                robotWinImage: robotWinTwo,
                selectionButtonActive: levelTwoButtonActive,
                selectionButtonHover: levelTwoButtonHover,
                selectionButtonDisabled: levelTwoButtonDisabled,
                selectionButtonComplete: levelTwoButtonComplete,
                selectionButtonCompleteHover: levelTwoButtonCompleteHover,
                progressStepMultiplier: 1,
                progressReductionStepMultiplier: 1,
            },
            {
                codename: 'level-three',
                isCompleted: false,
                canBePlayed: false,
                robotIngameImage: robotIngameThree,
                robotLoseImage: robotLoseThree,
                robotWinImage: robotWinThree,
                selectionButtonActive: levelThreeButtonActive,
                selectionButtonHover: levelThreeButtonHover,
                selectionButtonDisabled: levelThreeButtonDisabled,
                selectionButtonComplete: levelThreeButtonComplete,
                selectionButtonCompleteHover: levelThreeButtonCompleteHover,
                progressStepMultiplier: 1,
                progressReductionStepMultiplier: 1,
            }
        ];
        this.levelArrayButtons = [
            {
                level: this.levelsArray[0],
                button: new Button({
                    positionX: 150,
                    positionY: 100,
                    spriteIdle: levelOneButtonActive,
                    spriteHover: levelOneButtonHover,
                    spriteDisabled: levelOneButtonDisabled,
                    spriteDisabledHover: levelOneButtonDisabled,
                    wobble: true,
                }),
            },
            {
                level: this.levelsArray[1],
                button: new Button({
                    positionX: 145,
                    positionY: 375,
                    spriteIdle: levelTwoButtonActive,
                    spriteHover: levelTwoButtonHover,
                    spriteDisabled: levelTwoButtonDisabled,
                    spriteDisabledHover: levelTwoButtonDisabled,
                    wobble: true,
                }),
            },
            {
                level: this.levelsArray[2],
                button: new Button({
                    positionX: 450,
                    positionY: 105,
                    spriteIdle: levelThreeButtonActive,
                    spriteHover: levelThreeButtonHover,
                    spriteDisabled: levelThreeButtonDisabled,
                    spriteDisabledHover: levelThreeButtonDisabled,
                    wobble: true,
                }),
            },
        ];
    }
    draw() {
        for (const [index, button] of this.levelArrayButtons.entries()) {
            const stringInLocalStorage = `${button.level.codename}-highscore`;
            if (index > 0) {
                const stringPreviousLevelInLocalStorage = `${this.levelArrayButtons[index - 1].level.codename}-highscore`;
                button.level.canBePlayed = !!localStorage.getItem(stringPreviousLevelInLocalStorage);
            }
            button.level.isCompleted = !!localStorage.getItem(stringInLocalStorage);
            button.level.bestTime = parseFloat(localStorage.getItem(stringInLocalStorage) || '0');
            if (button.level.isCompleted) {
                button.button.spriteIdle = button.level.selectionButtonComplete;
                button.button.spriteHover = button.level.selectionButtonCompleteHover;
            }
            if (!button.level.canBePlayed) {
                button.button.spriteIdle = button.level.selectionButtonDisabled;
                button.button.spriteHover = button.level.selectionButtonDisabled;
                button.button.wobble = false;
            }
            button.button.draw();
            fill(COLOR_DARK);
            if (button.level.bestTime)
                text(`Best time: ${formatTime(button.level.bestTime)}`, button.button.positionX + 10, button.button.positionY + button.button.height + 25);
        }
    }
    mouseClicked() {
        for (const button of this.levelArrayButtons) {
            if (button.button.isMouseOver() && button.level.canBePlayed)
                stateManager.initiateLevel(button.level);
        }
    }
}
const levelSelection = new LevelSelection();
class LoseScreen {
    constructor() {
        this.backButton = new TextButton({
            positionX: 200,
            positionY: 100,
            text: 'Try again',
            onClick: () => { stateManager.switchToLevelSelection(); }
        });
    }
    draw() {
        push();
        image(this.bg, 0, 0);
        strokeWeight(5);
        stroke(COLOR_DARK);
        fill(COLOR_YELLOW);
        textSize(40);
        textAlign(CENTER);
        text(this.text, CANVAS_WIDTH / 4 * 3, CANVAS_HEIGHT / 4);
        this.backButton.draw();
        pop();
    }
    mouseClicked() {
        this.backButton.mouseClicked();
    }
}
const loseScreen = new LoseScreen();
//# sourceMappingURL=build.js.map