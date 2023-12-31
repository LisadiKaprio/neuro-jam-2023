class Particles {
    possibleParticles: p5.Image[];
    particles: Particle[];
    timeUntilNextParticle: number = 0;
    x: number;
    y: number;
    minVelX: number;
    maxVelX: number;
    minVelY: number;
    maxVelY: number;
    gravity: number;
    constructor(x: number, y: number, minVelX: number, maxVelX: number, minVelY: number, maxVelY: number, gravity?: number) {
        this.possibleParticles = particleImages;
        this.particles = [];
        this.x = x;
        this.y = y;

        this.minVelX = minVelX;
        this.maxVelX = maxVelX;
        this.minVelY = minVelY;
        this.maxVelY = maxVelY;
        this.gravity = gravity || 0.2;
    }

    draw() {// Display and update all particles
        this.timeUntilNextParticle--;
        if (this.timeUntilNextParticle <= 0) {
            let p = new Particle(this.x, this.y, random(this.possibleParticles), this.minVelX, this.maxVelX, this.minVelY, this.maxVelY, this.gravity);
            this.particles.push(p);
            this.timeUntilNextParticle = random(3, 8);
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].display();

            // Remove particles that are off-screen
            if (this.particles[i].isOffScreen()) {
                this.particles.splice(i, 1);
            }
        }
    }

    clearParticles() {
        this.particles = [];
    }

}

class Particle {
    private x: number;
    private y: number;
    private velX: number;
    private velY: number;
    private width: number;
    private height: number;
    private gravity: number;
    image: p5.Image;
    initialRotation: number = random(0, 360);

    constructor(x: number, y: number, image: p5.Image, minVelX: number, maxVelX: number, minVelY: number, maxVelY: number, gravity: number) {
        this.x = x;
        this.y = y;
        this.velX = random(minVelX, maxVelX);
        this.velY = random(minVelY, maxVelY);
        this.gravity = gravity;
        this.image = image;
    }

    update() {
        // Update position based on velocity
        this.x += this.velX;
        this.y += this.velY;
        // Apply gravity
        this.velY += this.gravity;
    }

    display() {
        // Display the image with constant rotation
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        rotate(frameCount * 0.4 + this.initialRotation); // Adjust the rotation speed as desired
        image(this.image, 0, 0, this.image.width, this.image.height);
        pop();
    }

    isOffScreen() {
        // Check if the particle is off-screen
        return this.y > height;
    }
}
