export class MicroOrganismStrategy {
  constructor(canvasContext) {
    this.ctx = canvasContext;
  }
  
  /**
   * Initialize properties needed for this strategy on the particle
   * @param particle
   */
  initializeStrategyProperties(particle) {
    let random = Math.random()
    
    particle.variantx1 = Math.random() * 300
    particle.variantx2 = Math.random() * 400
    particle.varianty1 = Math.random() * 100
    particle.varianty2 = Math.random() * 120
    
    particle.radius = random > .2 ? Math.random() : Math.random() * 3
    particle.color = random > .2 ? "#d8002c" : "#F9314C"
    particle.radius = random > .8 ? Math.random() * 2 : particle.radius
    particle.color = random > .8 ? "#7DFFF2" : particle.color
  }
  
  isParticleAlive(particle) {
    if (particle.x < 0 || particle.x > this.ctx.canvas.width - particle.size) {
      return false
    }
    
    if (particle.y < 0 || particle.y > this.ctx.canvas.height - particle.size) {
      return false
    }
    
    return true;
  }
  
  update(particle) {
    particle.x += (Math.sin(particle.progress / particle.variantx1) * Math.cos(particle.progress / particle.variantx2));
    particle.y += (Math.cos(particle.progress / particle.varianty2));
  }
  
  draw(particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = particle.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}