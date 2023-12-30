class Cloud {
    defaultImage = cloudEvilImages[0];
    currentFrame = 0;
    size = 0.9;

    draw(animation: Frame[], x: number, y: number) {
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
        pop()
    }
}