/// <reference path="./Types.ts" />
const animFilePath = `./art/anim`;
const opponentFilePath = `./art/opponent`;
const evilFilePath = `./art/evil`;
const robotsFilePath = `./art/robots`;

let customFont: p5.Font;

let musicMenu: p5.SoundFile;
let musicUrgency: p5.SoundFile;
let musicAwkwardPiano: p5.SoundFile;

let soundEvilHa: p5.SoundFile;
let soundEvilHehe: p5.SoundFile;
let soundEvilHehehe: p5.SoundFile;
let soundEvilOhNyooo: p5.SoundFile;
let soundEvilWhoops: p5.SoundFile;

let soundNeuroErm: p5.SoundFile;
let soundNeuroHeart: p5.SoundFile;
let soundNeuroWuu: p5.SoundFile;
let soundNeuroPog: p5.SoundFile;
let soundNeuroOhDear: p5.SoundFile;

let soundBloop: p5.SoundFile;
let soundPow: p5.SoundFile;
let soundClank: p5.SoundFile;
let soundClankTap: p5.SoundFile;
let soundToolbox: p5.SoundFile;

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

let splashScreen: p5.Image;

let lostCaughtBG: p5.Image;
let lostTimeoutBG: p5.Image;

let idleEvilImages: p5.Image[];
let idleEvilAnimation: Frame[];

let evilWorkingImages: p5.Image[];
let evilWorkingAnimation: Frame[];

let evilWorkingFrenzyImage: p5.Image;
let evilWorkingArmLeftImage: p5.Image;
let evilWorkingArmRightImage: p5.Image;

let evilCaughtImages: p5.Image[];
let evilCaughtAnimation: Frame[];

let evilWonImages: p5.Image[];
let evilWonAnimation: Frame[];

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

let lostOpponentImages: p5.Image[];
let lostOpponentAnimation: Frame[];

let wonOpponentImages: p5.Image[];
let wonOpponentAnimation: Frame[];

let cloudEvilImages: p5.Image[];
let cloudEvilAnimation: Frame[];

let cloudNeuroImages: p5.Image[];
let cloudNeuroAnimation: Frame[];

let robotIngameOne: p5.Image;
let robotIngameTwo: p5.Image;
let robotIngameThree: p5.Image;
let robotLoseOne: p5.Image;
let robotLoseTwo: p5.Image;
let robotLoseThree: p5.Image;
let robotWinOne: p5.Image;
let robotWinTwo: p5.Image;
let robotWinThree: p5.Image;

let levelOneButtonActive: p5.Image;
let levelOneButtonHover: p5.Image;
let levelOneButtonDisabled: p5.Image;
let levelOneButtonComplete: p5.Image;
let levelOneButtonCompleteHover: p5.Image;
let levelTwoButtonActive: p5.Image;
let levelTwoButtonHover: p5.Image;
let levelTwoButtonDisabled: p5.Image;
let levelTwoButtonComplete: p5.Image;
let levelTwoButtonCompleteHover: p5.Image;
let levelThreeButtonActive: p5.Image;
let levelThreeButtonHover: p5.Image;
let levelThreeButtonDisabled: p5.Image;
let levelThreeButtonComplete: p5.Image;
let levelThreeButtonCompleteHover: p5.Image;


function preload() {

  //@ts-ignore
  soundFormats('mp3', 'wav');
  //@ts-ignore
  musicMenu = loadSound(`./audio/music-little-think.mp3`);
  //@ts-ignore
  musicUrgency = loadSound(`./audio/music-urgency.mp3`);
  //@ts-ignore
  musicAwkwardPiano = loadSound(`./audio/awkwardPiano.mp3`);
  //@ts-ignore
  soundEvilHa = loadSound(`./audio/evil-ha.mp3`);
  //@ts-ignore
  soundEvilHehe = loadSound(`./audio/evil-hehe.mp3`);
  //@ts-ignore
  soundEvilHehehe = loadSound(`./audio/evil-hehehe.mp3`);
  //@ts-ignore
  soundEvilOhNyooo = loadSound(`./audio/evil-oh-nyooo.mp3`);
  //@ts-ignore
  soundEvilWhoops = loadSound(`./audio/evil-whoops.mp3`);
  //@ts-ignore
  soundNeuroErm = loadSound(`./audio/neuro-erm.mp3`);
  //@ts-ignore
  soundNeuroHeart = loadSound(`./audio/neuro-heart.mp3`);
  //@ts-ignore
  soundNeuroWuu = loadSound(`./audio/neuro-wuu.mp3`);
  //@ts-ignore
  soundNeuroPog = loadSound(`./audio/neuro-pog.mp3`);
  //@ts-ignore
  soundNeuroOhDear = loadSound(`./audio/neuro-oh-dear.mp3`);
  //@ts-ignore
  soundBloop = loadSound(`./audio/sound-bloop.wav`);
  //@ts-ignore
  soundPow = loadSound(`./audio/sound-pow.wav`);
  //@ts-ignore
  soundClank = loadSound(`./audio/sound-clank.wav`);
  //@ts-ignore
  soundClankTap = loadSound(`./audio/sound-clanktap.wav`);
  //@ts-ignore
  soundToolbox = loadSound(`./audio/sound-toolbox.wav`);
  customFont = loadFont('./fonts/CherryBombOne-Regular.ttf');
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
  ] as Frame[];

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
  ] as Frame[];

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
  ]

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
  ]

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
  ]

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
  ]

  mainMenu.preload();
}

function setup() {
  textFont(customFont);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(COLOR_LIGHTER_MAIN_PINK);
  levelSelection.setup();
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
