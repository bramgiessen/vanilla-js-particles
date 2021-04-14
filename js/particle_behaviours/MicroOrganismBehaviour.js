export class MicroOrganismBehaviour {
  // Define the maximum amount of particles that can exist in the canvas when this behaviour/effect is used
  static maxAmountOfParticles = 1000;
  
  /**
   * Define how we should clear the canvas in between key-frames for this particle-behaviour
   * Note: this method is called from the update functionality of the ParticleManager itself
   * @param ctx
   */
  static clearCanvasStrategy(ctx) {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#000E2E';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalAlpha = 1;
  }
  
  /**
   * Particle behaviour constructor
   * @param canvasContext
   * @param particle
   */
  constructor(canvasContext, particle) {
    this.ctx = canvasContext;
    let random = Math.random()
    particle.progress = 0;
  
    particle.variantx1 = Math.random() * 300;
    particle.variantx2 = Math.random() * 400;
    particle.varianty1 = Math.random() * 100;
    particle.varianty2 = Math.random() * 120;
  
    particle.radius = random > .2 ? Math.random() : Math.random() * 3;
    particle.color = random > .2 ? "#d8002c" : "#F9314C";
    particle.radius = random > .8 ? Math.random() * 2 : particle.radius;
    particle.color = random > .8 ? "#7DFFF2" : particle.color;
  }
  
  /**
   * When using this particle-behaviour, a particle is "dead" once it moves outside the canvas
   * @param particle
   * @return {boolean}
   */
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
    particle.progress++;
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