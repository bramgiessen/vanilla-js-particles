export class EmitterBase {
  ctx = null;
  particleFactory = null;
  particles = [];
  maxAmountOfParticles = 0;
  isCreatingParticle = false;
  
  constructor() {
    // Override this method in the extended emitter class
  }
  
  init({ canvasContext, particleFactory }) {
    // Override this method in the extended emitter class
  }
  
  clearCanvas() {
    // Override this method in the extended emitter class
  }
  
  clearParticles() {
    // Override this method in the extended emitter class
  }
  
  /**
   * Create a new particle
   * @return {number}
   */
  createParticle() {
    // Override this method in the extended emitter class
  }
  
  updateParticle(particle) {
    // Override this method in the extended emitter class
  }
  
  update() {
    // Override this method in the extended emitter class
  }
}