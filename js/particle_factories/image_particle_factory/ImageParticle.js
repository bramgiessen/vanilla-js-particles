import {ParticleBase} from '../../ParticleBase.js';
export class ImageParticle extends ParticleBase {
  constructor({ canvasContext, behaviouralProperties, initialX, initialY, image, scale, initialRotation }) {
    super();
    this.ctx = canvasContext;
    this.behaviouralProperties = behaviouralProperties;
    this.image = image;
    this.imageWidth = this.image.width * scale;
    this.imageHeight = this.image.height * scale;
    this.x = initialX || 0;
    this.y = initialY || 0;
    this.rotation = initialRotation || 0;
  }
  
  isParticleAlive() {
    const isOutsideHorizontalViewport = (this.x < 0 || this.x > this.ctx.canvas.width + this.getWidth());
    const isOutsideVerticalViewport = (this.y < 0 || this.y > this.ctx.canvas.height + this.getHeight());
    
    return !(isOutsideHorizontalViewport || isOutsideVerticalViewport);
  }
  
  getWidth() {
    return this.imageWidth;
  }
  
  getHeight() {
    return this.imageHeight;
  }
  
  setPosition({x, y}){
    this.x = x;
    this.y = y;
  }
  
  setRotation(rotation) {
    this.rotation = rotation;
  }
  
  draw() {
    if(this.image.imageLoaded){
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);
      this.ctx.drawImage(this.image, -this.getWidth() / 2 , -this.getHeight() / 2, this.getWidth(), this.getHeight());
      this.ctx.rotate(-this.rotation);
      this.ctx.translate(-this.x, -this.y);
    }
  }
}