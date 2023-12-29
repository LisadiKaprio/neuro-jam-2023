function wobble(wobble: boolean, mode: p5.IMAGE_MODE, imageToWobble: p5.Image, positionX: number, positionY: number, width: number, height: number, speed: number, wobbleSize: number, translateX: number, translateY: number) {
    push();
    imageMode(mode);
    translate(translateX, translateY);
    if (wobble) rotate(sin(frameCount * speed) * wobbleSize);
    image(imageToWobble, 0, 0, width, height)
    pop();
}

function wobbleAnchoredOnCorner(wobble: boolean, mode: p5.IMAGE_MODE, imageToWobble: p5.Image, positionX: number, positionY: number, width: number, height: number, speed: number, wobbleSize: number) {
    push();
    imageMode(mode);
    translate(positionX, positionY);
    if (wobble) rotate(sin(frameCount * speed) * wobbleSize);
    image(imageToWobble, 0, 0, width, height)
    pop();
}