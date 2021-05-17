import { ParticleBase } from '../ParticleBase.js';

export class ShootingStarParticle extends ParticleBase {
  constructor({ canvasContext, behaviouralProperties, initialX, initialY, radius, color }) {
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
    // This particle never dies, instead it should be re-used when it moves out of the canvas
    return true;
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
  
  setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }
  
  getPosition() {
    return { x: this.x, y: this.y };
  }
  
  setColor(color) {
    this.color = color;
  }
  
  draw() {
    const lineLength = this.behaviouralProperties.shootingStarProperties.length || 10;
    this.ctx.lineWidth = this.getWidth();
    this.ctx.beginPath();
    this.ctx.moveTo(this.getPosition().x, this.getPosition().y);
    this.ctx.lineTo(this.getPosition().x + lineLength, this.getPosition().y - lineLength);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }
}