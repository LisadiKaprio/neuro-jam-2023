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

type Frame = {
    image: p5.Image;
    duration: number;
}