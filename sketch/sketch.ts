/// <reference path="./Types.ts" />
const animFilePath = `../art/anim`
const opponentFilePath = `../art/opponent`
const evilFilePath = `../art/evil`

let musicMenu: p5.SoundFile;

let buttonMusicIdle: p5.Image;
let buttonMusicHover: p5.Image;
let buttonMusicDisabled: p5.Image;
let buttonMusicDisabledHover: p5.Image;
let buttonSoundIdle: p5.Image;
let buttonSoundHover: p5.Image;
let buttonSoundDisabled: p5.Image;
let buttonSoundDisabledHover: p5.Image;

let spriteProgressBase: p5.Image;
let spriteProgressEmpty: p5.Image;
let spriteProgressFull: p5.Image;
let spriteProgressFrenzy: p5.Image;

let defaultBackground: p5.Image;

let idleEvilImages: p5.Image[];
let idleEvilAnimation: Frame[];

let evilWorkingImages: p5.Image[];
let evilWorkingAnimation: Frame[];

let evilWorkingFrenzyImage: p5.Image;
let evilWorkingArmLeftImage: p5.Image;
let evilWorkingArmRightImage: p5.Image;

let workingOpponentImages: p5.Image[];
let workingOpponentAnimation: Frame[];

let workingArmImage: p5.Image;

let thinkingOpponentImages: p5.Image[];
let thinkingOpponentAnimation: Frame[];

let distractedOpponentImages: p5.Image[];
let distractedOpponentAnimation: Frame[];

let foundOpponentImages: p5.Image[];
let foundOpponentAnimation: Frame[];

let foundArmImage: p5.Image;

let shockedOpponentImages: p5.Image[];
let shockedOpponentAnimation: Frame[];


function preload() {

  soundFormats('mp3');
  //@ts-ignore
  musicMenu = loadSound(`../audio/music-little-think.mp3`);
  buttonMusicIdle = loadImage(`../art/interface/button-music-idle.png`);
  buttonMusicHover = loadImage(`../art/interface/button-music-hover.png`);
  buttonMusicDisabled = loadImage(`../art/interface/button-music-disabled.png`);
  buttonMusicDisabledHover = loadImage(`../art/interface/button-music-disabled-hover.png`);
  buttonSoundIdle = loadImage(`../art/interface/button-sound-idle.png`);
  buttonSoundHover = loadImage(`../art/interface/button-sound-hover.png`);
  buttonSoundDisabled = loadImage(`../art/interface/button-sound-disabled.png`);
  buttonSoundDisabledHover = loadImage(`../art/interface/button-sound-disabled-hover.png`);
  spriteProgressBase = loadImage('../art/interface/progress-bar-base.png');
  spriteProgressEmpty = loadImage('../art/interface/progress-bar-empty.png');
  spriteProgressFull = loadImage('../art/interface/progress-bar-full.png');
  spriteProgressFrenzy = loadImage('../art/interface/progress-bar-frenzy.png');
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
  ] as Frame[];

  evilWorkingImages = Array.from({ length: 3 }, (_, i) => loadImage(`${evilFilePath}/working-body-${i}.png`));
  evilWorkingFrenzyImage = loadImage(`${evilFilePath}/working-body-frenzy.png`);
  evilWorkingArmLeftImage = loadImage(`${evilFilePath}/working-arm-left.png`);
  evilWorkingArmRightImage = loadImage(`${evilFilePath}/working-arm-right.png`);

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
  ] as Frame[];

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
  ] as Frame[];

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
  ] as Frame[];

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
  ] as Frame[];

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
  ]
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
  ]

  mainMenu.preload();
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(COLOR_LIGHTER_MAIN_PINK);
  volumeControl.setup();
  stateManager.setup();
}

function draw() {
  frameRate(FRAMERATE)
  background(COLOR_LIGHTER_MAIN_PINK);
  stateManager.update();
  volumeControl.draw();
}

function mousePressed() {
  stateManager.mousePressed();
}
