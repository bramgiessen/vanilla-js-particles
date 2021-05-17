import { StarParticle } from './StarParticle.js';
import { ShootingStarParticle } from './ShootingStarParticle.js';

export class SimpleStarParticleFactory {
  constructor({ minRadius, maxRadius, particleColors }) {
    this.particleColors = particleColors || ['#FFF'];
    this.sizeRange = {
      min: minRadius || Math.random(),
      max: maxRadius || Math.random() * 2
    };
  }
  
  createParticle({ canvasContext, initialX, initialY, behaviouralProperties }) {
    const radius = Math.random() * (this.sizeRange.max - this.sizeRange.min) + this.sizeRange.min;
    const color = this.particleColors[Math.floor(Math.random() * this.particleColors.length)];
    const Particle = behaviouralProperties.isShootingStar ? ShootingStarParticle : StarParticle;
    
    return new Particle({
      canvasContext: canvasContext,
      behaviouralProperties: behaviouralProperties,
      initialX: initialX,
      initialY: initialY,
      radius,
      color
    })
    
  }
}