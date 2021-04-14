export class Particle {
  constructor(canvasContext, behaviour, startX, startY) {
    this.ctx = canvasContext;
    this.behaviour = new behaviour(this.ctx, this);
    this.isAlive = true;
    
    // Visual properties
    this.x = startX;
    this.y = startY;
    this.opacity = 1;
    this.size = 1;
  }
  
  /**
   * Set the behaviour for this particle
   * @param behaviour
   */
  setParticleBehaviour(behaviour) {
    this.behaviour = new behaviour(this.ctx, this);
  }
  
  /**
   * Update the properties of this particle by running the update function of the active behaviour
   */
  update() {
    this.behaviour.update(this);
    this.isAlive = this.behaviour.isParticleAlive(this);
  }
  
  /**
   * Draw this particle, by running the draw-function of the active behaviour
   */
  draw() {
    this.behaviour.draw(this);
  }
}