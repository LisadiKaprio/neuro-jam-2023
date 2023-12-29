const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 640;
const FRAMERATE = 14

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

type Frame = {
    image: p5.Image;
    duration: number;
}