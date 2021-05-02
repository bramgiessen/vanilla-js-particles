import { debounce } from './utils.js';

export class ParticleSystem {
  canvas = null;
  ctx = null;
  paused = false;
  
  constructor({containerElement, particleEmitter, particleFactory}) {
    // Find containerElement
    if (!containerElement) return;
    
    // Setup our canvas
    this.ctx = this.initCanvas(containerElement);
    
    // Register our particle emitter
    this.particleEmitter = particleEmitter;
    this.particleEmitter.init({canvasContext: this.ctx, particleFactory: particleFactory});
    this.update();
    
    // React to resize-events
    this.resizeHandlerDebounced = debounce(() => this.onResize(containerElement), 500);
    window.onresize = () => {
      this.paused = true;
      this.resizeHandlerDebounced();
    };
  }
  
  initCanvas(containerElement) {
    const canvas = document.createElement('canvas');
    canvas.width = containerElement.getBoundingClientRect().width;
    canvas.height = containerElement.getBoundingClientRect().height;
    containerElement.appendChild(canvas);
    return canvas.getContext('2d');
  }
  
  /**
   * Re-init all particles and scale the canvas if the window resized
   */
  onResize(containerElement) {
    this.ctx.canvas.width = containerElement.getBoundingClientRect().width;
    this.ctx.canvas.height = containerElement.getBoundingClientRect().height;
    this.particleEmitter.clearParticles();
    this.paused = false;
  }
  
  update() {
    if (!this.paused) {
      this.particleEmitter.update();
    }
    
    // Keep updating our particles
    requestAnimationFrame(
      () => this.update()
    );
  }
}