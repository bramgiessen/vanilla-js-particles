const radians = (degrees) => degrees * Math.PI / 180;
export class WaveImageParticle {
  /**
   * Particle constructor
   * @param canvasContext
   */
  constructor(canvasContext, image) {
    this.ctx = canvasContext;
    this.a = [0.5, 1, 2, 0.3, 3][Math.floor(Math.random() * 4)];
    this.steps = this.ctx.canvas.width / 8;
    this.siner = 100 * Math.random();
    this.rotationDirection = Math.random() > 0.5 ? "-" : "+";
    this.rotation = 0;
    this.progress = this.x || 0;
    this.scale = 0.5 * Math.random();
    this.speed = 1 + Math.random() * 5;
    this.radius = 1;
    this.image = image;
    this.imageWidth = this.image.width * this.scale;
    this.imageHeight = this.image.height * this.scale;
  }
  
  isParticleAlive() {
    if (this.x < 0 || this.x > this.ctx.canvas.width - this.radius) {
      return false
    }
    
    if (this.y < 0 || this.y > this.ctx.canvas.height - this.radius) {
      return false
    }
    
    return true;
  }
  
  update() {
    this.x = this.progress;
    this.y = this.ctx.canvas.height / 2 + this.siner + (this.a * Math.sin(this.progress / this.steps)) * 60;
    this.progress = this.progress + this.speed;
    this.rotation = this.rotationDirection + radians(this.progress)
  }
  
  draw() {
    if(this.image.imageLoaded){
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation)
      this.ctx.drawImage(this.image, -this.imageWidth / 2 , -this.imageHeight / 2, this.imageWidth, this.imageHeight);
      this.ctx.rotate(-this.rotation)
      this.ctx.translate(-this.x, -this.y);
    }
  }
}