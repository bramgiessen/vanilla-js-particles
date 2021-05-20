import { EmitterBase } from './EmitterBase.js';
import { getBiasedRandom } from '../utils.js';

export class FromImageEmitter extends EmitterBase {
  ctx = null;
  pixels = [];
  imageLoaded = false;
  particleFactory = null;
  particles = [];
  maxAmountOfParticles = 0;
  
  constructor({ backgroundColor, imgSource, hideOriginalImage }) {
    super();
    this.backgroundColor = backgroundColor;
    this.imgSource = imgSource;
    this.hideOriginalImage = hideOriginalImage;
  }
  
  init({ canvasContext, particleFactory, maxAmountOfParticles }) {
    // Store our canvas context
    this.ctx = canvasContext;
    this.ctx.imageSmoothingEnabled = false;
    // Store our particle factory
    this.particleFactory = particleFactory;
    // Store how many particles we are allowed to render
    this.maxAmountOfParticles = maxAmountOfParticles || 800;
  
    // Load image
    this.originalImage = new Image();
    this.originalImage.onload = () => this.onImageLoaded();
    this.originalImage.src = this.imgSource;
    this.leftPos = (this.ctx.canvas.width / 2) - ( this.originalImage.width / 2 ) ;
  }
  
  clearCanvas() {
    if (this.backgroundColor) {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    } else {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    
    if(!this.hideOriginalImage){
      this.drawImage();
    }
  }
  
  clearParticles() {
    this.particles = [];
  }
  
  onImageLoaded() {
    this.imageLoaded = true;
    this.drawImage();
    const imageData = this.ctx.getImageData(this.leftPos, 0, this.originalImage.width,this.originalImage.height);
    this.pixels = [];
    // Create list of pixel positions from our image
    for (let y = 0, y2 = imageData.height; y < y2; y++) {
      for (let x = 0, x2 = imageData.width; x < x2; x++) {
        // We only want to use non-transparent pixels
        if (imageData.data[(x * 4 + y * 4 * imageData.width) + 3] > 128) {
          const pixel = {
            x: this.leftPos + x,
            y: y
          };
          this.pixels.push(pixel);
        }
      }
    }
  }
  
  drawImage() {
    if(this.imageLoaded){
      this.ctx.drawImage(this.originalImage, this.leftPos, 0);
    }
  }
  
  /**
   * Create a new particle
   * @return {number}
   */
  createParticle() {
    let behaviouralProperties = {
      speed: Math.random() * .25,
    };
    const initialPosition = this.pixels[Math.floor(Math.random() * this.pixels.length)];
    if (initialPosition) {
      const particle = this.particleFactory.createParticle({
        canvasContext: this.ctx,
        behaviouralProperties,
        initialX: initialPosition.x,
        initialY: initialPosition.y
      });
      
      // Override the isParticleAlive() method for this effect
      particle.isParticleAlive = () => {
        const maxDistance = Math.random() * (100 - 80) + 80;
        return Math.abs(initialPosition.x - particle.getPosition().x) < maxDistance;
      };
      
      this.particles.push(
        particle
      );
    }
  }
  
  updateParticle(particle) {
      const x = particle.getPosition().x - particle.behaviouralProperties.speed;
      const y = particle.getPosition().y;
      particle.setLifeTime(particle.getLifeTime() + 1);
      particle.setPosition({ x, y });
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
    if (this.particles.length < this.maxAmountOfParticles && this.imageLoaded) {
      this.createParticle()
    }
  }
}