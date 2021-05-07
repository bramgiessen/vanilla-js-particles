import {EmitterBase} from './EmitterBase.js';
import { sineBetween } from '../utils.js';

const radians = (degrees) => degrees * Math.PI / 180;

export class WaveEmitter extends EmitterBase{
  ctx = null;
  particleFactory = null;
  particles = [];
  maxAmountOfParticles = 0;
  
  constructor({backgroundColor, minSpeed, maxSpeed, alternateColors}) {
    super();
    this.speedRange = {min: (minSpeed || 1), max: (maxSpeed || 5)};
    this.backgroundColor = backgroundColor || '#000'
    this.alternateColors = alternateColors;
  }
  
  init({ canvasContext, particleFactory, maxAmountOfParticles }) {
    // Store our canvas context
    this.ctx = canvasContext;
    // Store our particle factory
    this.particleFactory = particleFactory;
    // Store how many particles we are allowed to render
    this.maxAmountOfParticles = maxAmountOfParticles || 200;
  }
  
  clearCanvas() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
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
        // Create a new particle
        const behaviouralProperties = {
          a: ([0.5, 1, 2, 0.3, 3][Math.floor(Math.random() * 4)]),
          steps: (this.ctx.canvas.width / 8),
          siner: 100 * Math.random(),
          rotationDirection: Math.random() > 0.5 ? "-" : "+",
          rotation: 0,
          speed: Math.random() * (this.speedRange.max - this.speedRange.min) + this.speedRange.min,
        };
        const particle =  this.particleFactory.createParticle({
          canvasContext: this.ctx,
          behaviouralProperties
        });
        particle.setPosition({ x: -particle.getWidth(), y: 0 });
        particle.setLifeTime(particle.getPosition().x);
        
        // Add particle to our particles list
        this.particles.push(particle);
      }, i * 20)
    }
  }
  
  updateParticle(particle) {
    const x = particle.getLifeTime();
    const y = this.ctx.canvas.height / 2 + particle.behaviouralProperties.siner + (particle.behaviouralProperties.a * Math.sin(
      particle.getLifeTime() / particle.behaviouralProperties.steps)) * 60;
    const rotation = particle.behaviouralProperties.rotationDirection + radians(particle.getLifeTime());
    particle.setLifeTime(particle.getLifeTime() + particle.behaviouralProperties.speed);
    particle.setPosition({ x, y });
    particle.setRotation(rotation);
    if (this.alternateColors) {
      particle.setColor(`hsla(${sineBetween(1, 100, particle.getLifeTime() / 100)},100%,50%,1)`);
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
      this.createParticles(1)
    }
  }
}