import { EmitterBase } from './EmitterBase.js';

export class MicroOrganismEmitter extends EmitterBase {
  ctx = null;
  particleFactory = null;
  particles = [];
  maxAmountOfParticles = 0;
  isCreatingParticle = false;
  
  constructor({ backgroundColor }) {
    super();
    this.backgroundColor = backgroundColor || '#000E2E';
  }
  
  init({ canvasContext, particleFactory, maxAmountOfParticles }) {
    // Store our canvas context
    this.ctx = canvasContext;
    // Store our particle factory
    this.particleFactory = particleFactory;
    // Store how many particles we are allowed to render
    this.maxAmountOfParticles = maxAmountOfParticles || 800;
  }
  
  clearCanvas() {
    this.ctx.globalAlpha = 0.05;
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.globalAlpha = 1;
  }
  
  clearParticles() {
    this.particles = [];
  }
  
  /**
   * Create a new particle
   * @return {number}
   */
  createParticle() {
    this.isCreatingParticle = true;
    setTimeout(() => {
      const initialX = (this.ctx.canvas.width / 2) + (Math.random() * 200 - Math.random() * 200);
      const initialY = (this.ctx.canvas.height / 2) + (Math.random() * 200 - Math.random() * 200);
      const behaviouralProperties = {
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
      this.isCreatingParticle = false;
    }, 20)
  }
  
  updateParticle(particle) {
    const x = particle.x + (Math.sin(particle.getLifeTime() / particle.behaviouralProperties.variantx1) * Math.cos(
      particle.getLifeTime() / particle.behaviouralProperties.variantx2));
    const y = particle.y + (Math.cos(particle.getLifeTime() / particle.behaviouralProperties.varianty2));
    particle.setLifeTime(particle.getLifeTime() + 1);
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
    if (this.particles.length < this.maxAmountOfParticles && !this.isCreatingParticle) {
      this.createParticle()
    }
  }
}