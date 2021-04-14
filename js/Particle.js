export class Particle {
  constructor(strategy, startX, startY) {
    this.strategy = strategy;
    this.isAlive = true;
    this.progress = 0;
    
    // Visual properties
    this.x = startX;
    this.y = startY;
    this.opacity = 1;
    this.size = 1;
    
    // Initialize any strategy-specific properties on this particle
    this.strategy.initializeStrategyProperties(this);
  }
  
  /**
   * Set the strategy / behaviour for this particle
   * @param strategy
   */
  setParticleStrategy(strategy) {
    this.strategy = strategy;
    
    // Initialize any strategy-specific properties on this particle
    this.strategy.initializeStrategyProperties(this);
  }
  
  /**
   * Update the properties of this particle by running the update function of the active behaviour strategy
   */
  update() {
    this.strategy.update(this);
    this.progress++;
    this.isAlive = this.strategy.isParticleAlive(this);
  }
  
  /**
   * Draw this particle, by running the draw-function of the active behaviour strategy
   */
  draw() {
    this.strategy.draw(this);
  }
}