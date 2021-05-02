import { MicroOrganismParticle } from './MicroOrganismParticle.js';

export class MicroOrganismParticleFactory {
  constructor() {
  }
  
  createParticle({canvasContext, initialX, initialY, behaviouralProperties}) {
    const random = Math.random()
    let radius = random > .2 ? Math.random() : Math.random() * 3;
    let color = random > .2 ? "#d8002c" : "#F9314C";
    radius = random > .8 ? Math.random() * 2 : radius;
    color = random > .8 ? "#7DFFF2" : color;
    
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