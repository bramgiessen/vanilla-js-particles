export class MicroOrganismParticle {
  /**
   * Particle constructor
   * @param canvasContext
   */
  constructor(canvasContext, startX, startY) {
    this.ctx = canvasContext;
    let random = Math.random()
    this.progress = 0;
    
    this.x = startX;
    this.y = startY;
    this.variantx1 = Math.random() * 300;
    this.variantx2 = Math.random() * 400;
    this.varianty1 = Math.random() * 100;
    this.varianty2 = Math.random() * 120;
    
    this.radius = random > .2 ? Math.random() : Math.random() * 3;
    this.color = random > .2 ? "#d8002c" : "#F9314C";
    this.radius = random > .8 ? Math.random() * 2 : this.radius;
    this.color = random > .8 ? "#7DFFF2" : this.color;
  }
  
  /**
   * This particle is "dead" once it moves outside the canvas
   * @return {boolean}
   */
  isParticleAlive() {
    if (this.x < 0 || this.x > this.ctx.canvas.width - this.size) {
      return false
    }
    
    if (this.y < 0 || this.y > this.ctx.canvas.height - this.size) {
      return false
    }
    
    return true;
  }
  
  update() {
    this.x += (Math.sin(this.progress / this.variantx1) * Math.cos(this.progress / this.variantx2));
    this.y += (Math.cos(this.progress / this.varianty2));
    this.progress++;
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