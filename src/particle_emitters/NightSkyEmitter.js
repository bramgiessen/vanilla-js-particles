import { EmitterBase } from './EmitterBase.js';
import { biasedRandom, getBiasedRandom } from '../utils.js';

export class NightSkyEmitter extends EmitterBase {
  ctx = null;
  distributionStrategy = 'evenDistribution';
  particleFactory = null;
  particles = [];
  maxAmountOfParticles = 0;
  amountOfShootingStars = 0;
  maxAmountOfShootingStars = 2;
  static distributionStrategiesEnum = {
    // Evenly distribute stars over the canvas:
    'evenDistribution': 'evenDistribution',
    // Distribute stars from one point on the right side of the canvas:
    'pointDistribution': 'pointDistribution',
  };
  
  constructor({ backgroundColor, distributionStrategy }) {
    super();
    this.backgroundColor = backgroundColor;
    this.distributionStrategy = distributionStrategy || 'evenDistribution';
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
    if (this.backgroundColor) {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    } else {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }
  
  clearParticles() {
    this.amountOfShootingStars = 0;
    this.particles = [];
  }
  
  createShootingStarProperties() {
    return {
      waitTime: new Date().getTime() + (Math.random() * 5000) + 1500,
      active: false,
      length: (Math.random() * 80) + 10,
      speed: (Math.random() * 10) + 6
    }
  }
  
  getInitialStarPosition(isShootingStar) {
    if (isShootingStar) {
      return { x: (Math.random() * this.ctx.canvas.width * 2), y: 0 }
    }
    let x = 0;
    let y = 0;
    switch (this.distributionStrategy) {
      case 'evenDistribution':
      default:
        x = Math.random() * this.ctx.canvas.width;
        y = Math.random() * this.ctx.canvas.height;
        break;
      case 'pointDistribution':
        x = getBiasedRandom(0, this.ctx.canvas.width, this.ctx.canvas.width, 0.8);
        y = getBiasedRandom((this.ctx.canvas.height * 0.2), (this.ctx.canvas.height * 0.8), (this.ctx.canvas.height / 2), 1);
        break;
    }
    return { x, y };
  }
  
  /**
   * Create a new particle
   * @return {number}
   */
  createParticle() {
    let behaviouralProperties = {
      speed: Math.random() * .25,
      isShootingStar: this.amountOfShootingStars < this.maxAmountOfShootingStars,
    };
    if (behaviouralProperties.isShootingStar) {
      this.amountOfShootingStars++;
      behaviouralProperties.shootingStarProperties = this.createShootingStarProperties();
    }
    const initialPosition = this.getInitialStarPosition(behaviouralProperties.isShootingStar);
    this.particles.push(
      this.particleFactory.createParticle({
        canvasContext: this.ctx,
        behaviouralProperties,
        initialX: initialPosition.x,
        initialY: initialPosition.y
      })
    );
  }
  
  /**
   * For shooting star particles, we need to update them a bit differently
   * @param particle
   */
  updateShootingStarParticle(particle) {
    let x = particle.getPosition().x;
    let y = particle.getPosition().y;
    if (particle.behaviouralProperties.shootingStarProperties.active) {
      x = x - particle.behaviouralProperties.shootingStarProperties.speed;
      y = y + particle.behaviouralProperties.shootingStarProperties.speed;
      if (x + particle.behaviouralProperties.shootingStarProperties.length < 0 || y - particle.behaviouralProperties.shootingStarProperties.length >= this.ctx.canvas.height) {
        // Reset the shooting star
        x = (Math.random() * this.ctx.canvas.width * 2);
        y = 0;
        particle.behaviouralProperties.shootingStarProperties = this.createShootingStarProperties();
      }
    } else if (particle.behaviouralProperties.shootingStarProperties.waitTime < new Date().getTime()) {
      // Set particle active after the wait-time is over
      particle.behaviouralProperties.shootingStarProperties.active = true;
    }
    particle.setLifeTime(particle.getLifeTime() + 1);
    particle.setPosition({ x, y });
  }
  
  updateParticle(particle) {
    if (particle.behaviouralProperties.isShootingStar) {
      this.updateShootingStarParticle(particle)
    } else {
      const x = particle.getPosition().x - particle.behaviouralProperties.speed;
      const y = particle.getPosition().y;
      particle.setLifeTime(particle.getLifeTime() + 1);
      particle.setPosition({ x, y });
    }
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
      this.createParticle()
    }
  }
}