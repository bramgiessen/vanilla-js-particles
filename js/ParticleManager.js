import { Particle } from './Particle.js';

import { MicroOrganismBehaviour } from './particle_behaviours/MicroOrganismBehaviour.js'
import { WaveBehaviour } from './particle_behaviours/WaveBehaviour.js'
import { debounce } from './utils.js';

export class ParticleManager {
  canvas = null;
  ctx = null;
  
  constructor(containerElementId) {
    // Find containerElement
    this.containerEl = document.getElementById(containerElementId);
    if (!this.containerEl) return;
  
    // React to resize-events
    this.resizeHandlerDebounced = debounce(this.onResize.bind(this), 300);
    window.onresize = this.resizeHandlerDebounced;
    
    // Setup our canvas
    this.initCanvas();
    
    // Decide what our initial particle behaviour is
    // this.selectedParticleBehaviour = MicroOrganismBehaviour;
    this.selectedParticleBehaviour = WaveBehaviour;
    
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
   * Re-init all particles and scale the canvas if the window resized
   */
  onResize() {
    this.particles = [];
    this.canvas.width = this.containerEl.getBoundingClientRect().width;
    this.canvas.height = this.containerEl.getBoundingClientRect().height;
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
            this.ctx,
            this.selectedParticleBehaviour,
            initialParticlePos.x,
            initialParticlePos.y
          )
        );
      }, i * 20)
    }
    return this.particles.length;
  }
  
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  update() {
    // Clear our canvas
    this.selectedParticleBehaviour.clearCanvasStrategy(this.ctx);
    
    // Loop through particles, animate them and filter away any 'dead' particles
    this.particles = this.particles.filter((particle) => {
      particle.update();
      particle.draw();
      return particle.isAlive;
    });
    
    // If we have less particles than 'maxAmountOfParticles', create more particles
    if (this.particles.length < this.selectedParticleBehaviour.maxAmountOfParticles) {
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