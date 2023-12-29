class Particles {
    possibleParticles: p5.Image[];
    particles: Particle[];
    timeUntilNextParticle: number = FRAMERATE * 2;
    x: number;
    y: number;
    minVelX: number;
    maxVelX: number;
    minVelY: number;
    maxVelY: number;

    constructor(x: number, y: number, possibleParticles: p5.Image[], minVelX: number, maxVelX: number, minVelY: number, maxVelY: number) {
        this.possibleParticles = possibleParticles;
        this.particles = [];
        this.x = x;
        this.y = y;

        this.minVelX = minVelX;
        this.maxVelX = maxVelX;
        this.minVelY = minVelY;
        this.maxVelY = maxVelY;
    }

    draw() {// Display and update all particles
        this.timeUntilNextParticle--;
        if (this.timeUntilNextParticle <= 0) {
            let p = new Particle(this.x, this.y, random(this.possibleParticles), this.minVelX, this.maxVelX, this.minVelY, this.maxVelY);
            this.particles.push(p);
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

}



class Particle {
    private x: number;
    private y: number;
    private velX: number;
    private velY: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, image: p5.Image, minVelX: number, maxVelX: number, minVelY: number, maxVelY: number) {
        this.x = x;
        this.y = y;
        this.velX = random(minVelX, maxVelX);
        this.velY = random(minVelY, maxVelY);
        this.width = 10;
        this.height = 10;
    }

    update() {
        // Update position based on velocity
        this.x += this.velX;
        this.y += this.velY;
        // Apply gravity
        this.velY += 0.2;
    }

    display() {
        // Display the rectangle
        fill(0);
        rect(this.x, this.y, this.width, this.height);
    }

    isOffScreen() {
        // Check if the particle is off-screen
        return this.y > height;
    }
}
