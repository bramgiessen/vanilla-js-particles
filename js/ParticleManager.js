import { Particle } from './Particle.js';

import { MicroOrganismStrategy } from './strategies/MicroOrganismStrategy.js'

export class ParticleManager {
  canvas = null;
  ctx = null;
  maxAmountOfParticles = 1000;
  
  constructor(containerElementId) {
    // Find containerElement
    this.containerEl = document.getElementById(containerElementId);
    if (!this.containerEl) return;
    
    // Setup our canvas
    this.initCanvas();
    
    // Initialise our strategies (effects)
    this.microOrganismStrategy = new MicroOrganismStrategy(this.ctx);
    
    // Decide what our initial selected strategy is
    this.selectedStrategy = this.microOrganismStrategy;
    
    // Create a list to store out particles in
    this.particles = [];
  }
  
  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.containerEl.getBoundingClientRect().width;
    this.canvas.height = this.containerEl.getBoundingClientRect().height;
    this.containerEl.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }
  
  /**
   * Create given amount of particles
   * @param amountOfParticles
   * @return {number}
   */
  createParticles(amountOfParticles) {
    for (let i = 1; i < amountOfParticles + 1; i++) {
      const initialParticlePos = {
        x: (this.canvas.width / 2) + (Math.random() * 200 - Math.random() * 200),
        y: (this.canvas.height / 2) + (Math.random() * 200 - Math.random() * 200)
      };
      setTimeout(() => {
        this.particles.push(
          new Particle(
            this.selectedStrategy,
            initialParticlePos.x,
            initialParticlePos.y
          )
        );
      }, i * 20)
    }
    return this.particles.length;
  }
  
  clearCanvas() {
    this.ctx.globalAlpha = 0.05;
    this.ctx.fillStyle = '#000E2E';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalAlpha = 1;
  }
  
  update() {
    // Clear our canvas
    this.clearCanvas();
    
    // Loop through particles, animate them and filter away any 'dead' particles
    this.particles = this.particles.filter((particle) => {
      particle.update();
      particle.draw();
      return particle.isAlive;
    });
    
    // If we have less particles than 'maxAmountOfParticles', create more particles
    if (this.particles.length < this.initialisedParticleAmount) {
      this.createParticles(1)
    }
    
    // Keep updating our particles
    requestAnimationFrame(
      () => this.update()
    );
  }
  
  /**
   * Start creating new particles and updating existing ones
   */
  startParticles() {
    // Start creating / updating our particles
    this.initialisedParticleAmount = this.createParticles(this.maxAmountOfParticles);
    this.update();
  }
}