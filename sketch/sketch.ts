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

let idleCharacterFrames: p5.Image[];
let idleCharacterAnimation: p5.Image[];
let idleCharacterFrameDurations: number[];

let interactedCharacterFrames: p5.Image[];
let interactedCharacterAnimation: p5.Image[];
let interactedCharacterFrameDurations: number[];


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


  idleCharacterFrames = Array.from({ length: 3 }, (_, i) => loadImage(`${animFilePath}/idle-${i}.png`));
  idleCharacterAnimation = [
    idleCharacterFrames[0],
    idleCharacterFrames[1],
    idleCharacterFrames[2],
    idleCharacterFrames[1]
  ]
  idleCharacterFrameDurations = [10, 1, 1, 1];


  interactedCharacterFrames = Array.from({ length: 3 }, (_, i) => loadImage(`${animFilePath}/interacted-${i}.png`));
  interactedCharacterAnimation = [
    idleCharacterFrames[0],
    interactedCharacterFrames[0],
    interactedCharacterFrames[1],
    interactedCharacterFrames[2],
    interactedCharacterFrames[1]
  ]
  interactedCharacterFrameDurations = [3, 1, 1, 1, 1];
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
