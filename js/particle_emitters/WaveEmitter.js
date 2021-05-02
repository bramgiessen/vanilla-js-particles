const radians = (degrees) => degrees * Math.PI / 180;

export class WaveEmitter {
  ctx = null;
  particleFactory = null;
  particles = [];
  maxAmountOfParticles = 200;
  
  constructor() {
  
  }
  
  init({ canvasContext, particleFactory }) {
    // Store our canvas context
    this.ctx = canvasContext;
    // Store our particle factory
    this.particleFactory = particleFactory;
  }
  
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  
  clearParticles() {
    this.particles = [];
  }
  
  /**
   * Create given amount of particles
   * @param amountOfParticles
   * @return {number}
   */
  createParticles(amountOfParticles) {
    for (let i = 1; i < amountOfParticles + 1; i++) {
      setTimeout(() => {
        const behaviouralProperties = {
          a: ([0.5, 1, 2, 0.3, 3][Math.floor(Math.random() * 4)]),
          steps: (this.ctx.canvas.width / 8),
          siner: 100 * Math.random(),
          rotationDirection: Math.random() > 0.5 ? "-" : "+",
          rotation: 0,
          progress: 0,
          speed: (1 + Math.random() * 5),
        };
        this.particles.push(
          this.particleFactory.createParticle({
            canvasContext: this.ctx,
            behaviouralProperties,
            initialX: 0,
            initialY: 0
          })
        );
      }, i * 20)
    }
    return this.particles.length;
  }
  
  updateParticle(particle) {
    const x = particle.behaviouralProperties.progress;
    const y = this.ctx.canvas.height / 2 + particle.behaviouralProperties.siner + (particle.behaviouralProperties.a * Math.sin(
      particle.behaviouralProperties.progress / particle.behaviouralProperties.steps)) * 60;
    const rotation = particle.behaviouralProperties.rotationDirection + radians(particle.behaviouralProperties.progress);
    particle.behaviouralProperties.progress = particle.behaviouralProperties.progress + particle.behaviouralProperties.speed;
    particle.setPosition({ x, y });
    particle.setRotation(rotation);
  }
  
  update() {
    // Clear our canvas
    this.clearCanvas();
    
    // Loop through particles, animate them and filter away any 'dead' particles
    this.particles = this.particles.filter((particle) => {
      this.updateParticle(particle);
      if (particle.isParticleAlive()) {
        particle.draw();
        return true;
      }
    });
    
    // If we have less particles than 'maxAmountOfParticles', create more particles
    if (this.particles.length < this.maxAmountOfParticles) {
      this.createParticles(1)
    }
  }
}