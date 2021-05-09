import { EmitterBase } from './EmitterBase.js';
import { calculateDistance } from '../utils.js';

/**
 * Particle emitter that initialises particles at random positions on the canvas,
 * and then attracts them to a single point (like a 'magnet').
 * We can give our magnet a radius, once a particle touches our magnet, the particle 'dies'
 */
export class MicroOrganismMagnetEmitter extends EmitterBase {
  ctx = null;
  particleFactory = null;
  particles = [];
  maxAmountOfParticles = 0;
  isCreatingParticle = false;
  
  constructor({ backgroundColor, magnetRadius }) {
    super();
    this.backgroundColor = backgroundColor || '#000E2E';
    this.magnetRadius = magnetRadius || 80;
  }
  
  init({ canvasContext, particleFactory, maxAmountOfParticles }) {
    // Store our canvas context
    this.ctx = canvasContext;
    // Store our particle factory
    this.particleFactory = particleFactory;
    // Store how many particles we are allowed to render
    this.maxAmountOfParticles = maxAmountOfParticles || 800;
    
    // Point of attraction
    this.pointOfAttraction = {
      x: this.ctx.canvas.width / 2,
      y: this.ctx.canvas.height / 2
    }
  }
  
  clearCanvas() {
    this.ctx.globalAlpha = 0.05;
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.globalAlpha = 1;
  }
  
  clearParticles() {
    this.particles = [];
    this.pointOfAttraction = {
      x: this.ctx.canvas.width / 2,
      y: this.ctx.canvas.height / 2
    }
  }
  
  /**
   * Create a new particle
   * @return {number}
   */
  createParticle() {
    this.isCreatingParticle = true;
    setTimeout(() => {
      const initialX = this.ctx.canvas.width * Math.random();
      const initialY = this.ctx.canvas.height * Math.random();
      const behaviouralProperties = {
        s: Math.random() * 2,
        a: 0
      };
      this.particles.push(
        this.particleFactory.createParticle({
          canvasContext: this.ctx,
          behaviouralProperties,
          initialX,
          initialY
        })
      );
      this.isCreatingParticle = false;
    }, 20)
  }
  
  /**
   * Decide if the given particle position is inside our 'particle magnet'
   * (magnet is located in our 'point of attraction' and has a radius)
   * @param currentParticlePos
   * @return {boolean}
   */
  particleIsInsideMagnet(currentParticlePos) {
    const distance = calculateDistance(currentParticlePos, this.pointOfAttraction);
    if (distance <= this.magnetRadius) {
      return true;
    }
    return false;
  }
  
  updateParticle(particle) {
    const currentParticlePos = particle.getPosition();
    const distance = calculateDistance(currentParticlePos, this.pointOfAttraction);
    const force = Math.max(100, (1 + distance));
    
    // If particle enters our 'magnet' -> move the particle outside of the canvas, so it 'dies' and gets reset
    if (this.particleIsInsideMagnet(currentParticlePos)) {
      particle.setLifeTime(particle.getLifeTime() + 1);
      particle.setPosition({ x: -100, y: -100 });
    } else {
      // Particle not yet reached our 'magnet' -> update the particles' position
      const attr_x = (this.pointOfAttraction.x - currentParticlePos.x) / force;
      const attr_y = (this.pointOfAttraction.y - currentParticlePos.y) / force;
      const newParticleXPos = currentParticlePos.x + (Math.cos(particle.behaviouralProperties.a) * (particle.behaviouralProperties.s)) + attr_x;
      const newParticleYPos = currentParticlePos.y + (Math.sin(particle.behaviouralProperties.a) * (particle.behaviouralProperties.s)) + attr_y;
      particle.behaviouralProperties.a += (Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2);
      
      particle.setLifeTime(particle.getLifeTime() + 1);
      particle.setPosition({ x: newParticleXPos, y: newParticleYPos });
    }
  }
  
  update() {
    // Clear our canvas
    this.clearCanvas();
    
    // Loop through particles, animate them and filter away any 'dead' particles
    this.particles = this.particles.filter((particle) => {
      this.updateParticle(particle);
      if (particle.isParticleAlive()) {
        particle.draw();
        return true;
      }
    });
    
    // If we have less particles than 'maxAmountOfParticles', create more particles
    if (this.particles.length < this.maxAmountOfParticles && !this.isCreatingParticle) {
      this.createParticle()
    }
  }
}