import {ParticleBase} from '../ParticleBase.js';
export class MicroOrganismParticle extends ParticleBase {
  constructor({ canvasContext, behaviouralProperties, initialX, initialY, radius, color}) {
    super();
    this.ctx = canvasContext;
    this.behaviouralProperties = behaviouralProperties;
    this.x = initialX || 0;
    this.y = initialY || 0;
    this.radius = radius;
    this.color = color;
  }
  
  isParticleAlive() {
    const isOutsideHorizontalViewport = (this.x < 0 || this.x > this.ctx.canvas.width + this.getWidth());
    const isOutsideVerticalViewport = (this.y < 0 || this.y > this.ctx.canvas.height + this.getHeight());
    
    return !(isOutsideHorizontalViewport || isOutsideVerticalViewport);
  }
  
  getWidth() {
    return this.radius * 2;
  }
  
  getHeight() {
    return this.radius * 2;
  }
  
  setPosition({x, y}){
    this.x = x;
    this.y = y;
  }
  
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}