import {ParticleBase} from '../ParticleBase.js';
export class StarParticle extends ParticleBase {
  constructor({ canvasContext, behaviouralProperties, initialX, initialY, radius, color}) {
    super();
    this.ctx = canvasContext;
    this.behaviouralProperties = behaviouralProperties;
    this.x = initialX || 0;
    this.y = initialY || 0;
    this.radius = radius;
    this.color = color;
    this.lifetime = 0;
  }
  
  isParticleAlive() {
    const isOutsideHorizontalViewport = (this.x < -this.getWidth() || this.x > this.ctx.canvas.width + this.getWidth());
    const isOutsideVerticalViewport = (this.y < -this.getHeight() || this.y > this.ctx.canvas.height + this.getHeight());
    
    return !(isOutsideHorizontalViewport || isOutsideVerticalViewport);
  }
  
  setLifeTime(lifetime) {
    this.lifetime = lifetime;
  }
  
  getLifeTime() {
    return this.lifetime;
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
  
  getPosition() {
    return {x: this.x, y: this.y};
  }
  
  setColor(color) {
    this.color = color;
  }
  
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.getWidth(), 0, 2 * Math.PI);
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}