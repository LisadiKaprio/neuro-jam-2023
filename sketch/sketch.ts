/// <reference path="./Types.ts" />
let animFilePath = `../art/anim`

let musicMenu: p5.SoundFile;

let buttonMusicIdle: p5.Image;
let buttonMusicHover: p5.Image;
let buttonMusicDisabled: p5.Image;
let buttonMusicDisabledHover: p5.Image;
let buttonSoundIdle: p5.Image;
let buttonSoundHover: p5.Image;
let buttonSoundDisabled: p5.Image;
let buttonSoundDisabledHover: p5.Image;

let spriteProgressEmpty: p5.Image;
let spriteProgressFull: p5.Image;

let idleCharacterImages: p5.Image[];
let idleCharacterAnimation: Frame[];

let interactedCharacterImages: p5.Image[];
let interactedCharacterAnimation: Frame[];

let distractedOpponentAnimation: Frame[];
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
  ] as Frame[];


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
  ] as Frame[];

  distractedOpponentAnimation = [
    {
      image: idleCharacterImages[1],
      duration: 2
    },
    {
      image: idleCharacterImages[2],
      duration: 2
    }
  ]

  shockedOpponentAnimation = [
    {
      image: interactedCharacterImages[2],
      duration: 100
    },
    {
      image: interactedCharacterImages[2],
      duration: 1
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
  frameRate(16)
  background(COLOR_LIGHTER_MAIN_PINK);
  stateManager.update();
  volumeControl.draw();
}

function mousePressed() {
  stateManager.mousePressed();
}
