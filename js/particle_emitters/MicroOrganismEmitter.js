export class MicroOrganismEmitter {
  ctx = null;
  particleFactory = null;
  particles = [];
  maxAmountOfParticles = 1000;
  
  constructor() {
  
  }
  
  init({ canvasContext, particleFactory }) {
    // Store our canvas context
    this.ctx = canvasContext;
    // Store our particle factory
    this.particleFactory = particleFactory;
  }
  
  clearCanvas() {
    this.ctx.globalAlpha = 0.05;
    this.ctx.fillStyle = '#000E2E';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.globalAlpha = 1;
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
        const initialX = (this.ctx.canvas.width / 2) + (Math.random() * 200 - Math.random() * 200);
        const initialY = (this.ctx.canvas.height / 2) + (Math.random() * 200 - Math.random() * 200);
        const behaviouralProperties = {
          progress: 0,
          variantx1: Math.random() * 300,
          variantx2: Math.random() * 400,
          varianty1: Math.random() * 100,
          varianty2: Math.random() * 120,
        };
        this.particles.push(
          this.particleFactory.createParticle({
            canvasContext: this.ctx,
            behaviouralProperties,
            initialX,
            initialY
          })
        );
      }, i * 20)
    }
    return this.particles.length;
  }
  
  updateParticle(particle) {
    const x = particle.x + (Math.sin(particle.behaviouralProperties.progress / particle.behaviouralProperties.variantx1) * Math.cos(particle.behaviouralProperties.progress / particle.behaviouralProperties.variantx2));
    const y = particle.y + (Math.cos(particle.behaviouralProperties.progress / particle.behaviouralProperties.varianty2));
    particle.behaviouralProperties.progress++;
    particle.setPosition({ x, y });
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