import { MicroOrganismParticle } from '../particles/MicroOrganismParticle.js';

export class MicroOrganismsEffectManager {
  ctx = null;
  maxAmountOfParticles = 1000;
  
  constructor(canvasContext) {
    // Store our canvas context
    this.ctx = canvasContext;
    // Create a list to store out particles in
    this.particles = [];
  
    // Create our initial particles
    this.createParticles(this.maxAmountOfParticles);
  }
  
  /**
   * Create given amount of particles
   * @param amountOfParticles
   * @return {number}
   */
  createParticles(amountOfParticles) {
    for (let i = 1; i < amountOfParticles + 1; i++) {
      const initialParticlePos = {
        x: (this.ctx.canvas.width / 2) + (Math.random() * 200 - Math.random() * 200),
        y: (this.ctx.canvas.height / 2) + (Math.random() * 200 - Math.random() * 200)
      };
      setTimeout(() => {
        this.particles.push(
          new MicroOrganismParticle(
            this.ctx,
            initialParticlePos.x,
            initialParticlePos.y
          )
        );
      }, i * 20)
    }
    return this.particles.length;
  }
  
  clearParticles() {
    this.particles = [];
  }
  
  clearCanvas() {
    this.ctx.globalAlpha = 0.05;
    this.ctx.fillStyle = '#000E2E';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.globalAlpha = 1;
  }
  
  update() {
    // Clear our canvas
    this.clearCanvas();
    
    // Loop through particles, animate them and filter away any 'dead' particles
    this.particles = this.particles.filter((particle) => {
      particle.update();
      particle.draw();
      return particle.isParticleAlive();
    });
    
    // If we have less particles than 'maxAmountOfParticles', create more particles
    if (this.particles.length < this.maxAmountOfParticles) {
      this.createParticles(1)
    }
  }
}