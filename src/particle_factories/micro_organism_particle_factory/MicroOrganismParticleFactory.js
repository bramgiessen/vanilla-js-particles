import { MicroOrganismParticle } from './MicroOrganismParticle.js';

export class MicroOrganismParticleFactory {
  constructor({minRadius, maxRadius, particleColors}) {
    this.particleColors = particleColors || ['#F9314C', '#d8002c', '#7DFFF2'];
    this.sizeRange = {
      min: minRadius || Math.random(),
      max: maxRadius || Math.random() * 3
    };
  }
  
  createParticle({canvasContext, initialX, initialY, behaviouralProperties}) {
    let radius = Math.random() * (this.sizeRange.max - this.sizeRange.min) + this.sizeRange.min;
    let color = this.particleColors[Math.floor(Math.random() * this.particleColors.length)];
    
    return new MicroOrganismParticle({
      canvasContext: canvasContext,
      behaviouralProperties: behaviouralProperties,
      initialX: initialX,
      initialY: initialY,
      radius,
      color
    })
  }
}