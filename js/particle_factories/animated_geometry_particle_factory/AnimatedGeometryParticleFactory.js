import { AnimatedDiamondParticle } from './AnimatedDiamondParticle.js';

export class AnimatedGeometryParticleFactory {
  constructor({minWidth, maxWidth, shapes}) {
    this.particleColors = shapes || ['diamond'];
    this.sizeRange = {
      min: minWidth || 10,
      max: maxWidth || 20
    };
  }
  
  createParticle({canvasContext, initialX, initialY, behaviouralProperties}) {
    let size = Math.random() * (this.sizeRange.max - this.sizeRange.min) + this.sizeRange.min;
    
    return new AnimatedDiamondParticle({
      canvasContext: canvasContext,
      behaviouralProperties: behaviouralProperties,
      initialX: initialX,
      initialY: initialY,
      size,
    })
  }
}