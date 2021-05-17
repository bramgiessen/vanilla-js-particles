import { debounce } from './utils.js';

export class ParticleSystem {
  canvas = null;
  ctx = null;
  
  constructor({ containerElement, maxAmountOfParticles, particleEmitter, particleFactory }) {
    // Find containerElement
    if (!containerElement) return;
  
    // Polyfill window.requestAnimationFrame if needed
    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
    
    // Store our initial container element size
    this.containerSize = {
      width: containerElement.getBoundingClientRect().width,
      height: containerElement.getBoundingClientRect().height
    };
    
    // Setup our canvas
    this.ctx = this.initCanvas(containerElement);
    
    // Register our particle emitter
    this.particleEmitter = particleEmitter;
    this.particleEmitter.init({ canvasContext: this.ctx, particleFactory, maxAmountOfParticles });
    this.update();
    
    // React to resize-events
    this.resizeHandlerDebounced = debounce(() => this.onResize(containerElement), 500);
    window.onresize = () => {
      this.resizeHandlerDebounced();
    };
  }
  
  initCanvas(containerElement) {
    const canvas = document.createElement('canvas');
    canvas.width = this.containerSize.width;
    canvas.height = this.containerSize.height;
    containerElement.appendChild(canvas);
    return canvas.getContext('2d');
  }
  
  /**
   * Re-init all particles and scale the canvas if the window resized
   */
  onResize(containerElement) {
    const newContainerSize = {
      width: containerElement.getBoundingClientRect().width,
      height: containerElement.getBoundingClientRect().height
    };
    // Only reset our canvas if the container has actually resized more than a couple of pixels
    const hasPassedResizeThreshold = (Math.abs(this.containerSize.width - newContainerSize.width) > 10)
      || (Math.abs(this.containerSize.height - newContainerSize.height) > 10);
    if (hasPassedResizeThreshold) {
      this.containerSize = newContainerSize;
      this.ctx.canvas.width = this.containerSize.width;
      this.ctx.canvas.height = this.containerSize.height;
      this.particleEmitter.clearParticles();
    }
  }
  
  update() {
    this.particleEmitter.update();
    
    // Keep updating our particles
    requestAnimationFrame(
      () => this.update()
    );
  }
}