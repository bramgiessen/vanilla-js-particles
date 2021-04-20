import { MicroOrganismsEffectManager } from './effect_managers/MicroOrganismsEffectManager.js'
import { WaveEffectManager } from './effect_managers/WaveEffectManager.js'
import { debounce } from './utils.js';

export class ParticleSystem {
  canvas = null;
  ctx = null;
  paused = false;
  
  constructor(containerElementId) {
    // Find containerElement
    this.containerEl = document.getElementById(containerElementId);
    if (!this.containerEl) return;
    
    // Setup our canvas
    this.initCanvas();
    
    // Decide what our initial particle behaviour is
    // this.selectedParticleEffectManager = new MicroOrganismsEffectManager(this.ctx);
    this.selectedParticleEffectManager = new WaveEffectManager(this.ctx);
    this.update();
    
    // React to resize-events
    this.resizeHandlerDebounced = debounce(this.onResize.bind(this), 500);
    window.onresize = () => {
      this.paused = true;
      this.resizeHandlerDebounced();
    };
  }
  
  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.containerEl.getBoundingClientRect().width;
    this.canvas.height = this.containerEl.getBoundingClientRect().height;
    this.containerEl.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }
  
  /**
   * Re-init all particles and scale the canvas if the window resized
   */
  onResize() {
    this.canvas.width = this.containerEl.getBoundingClientRect().width;
    this.canvas.height = this.containerEl.getBoundingClientRect().height;
    this.ctx = this.canvas.getContext('2d');
    this.selectedParticleEffectManager.clearParticles();
    this.paused = false;
  }
  
  update() {
    if (!this.paused) {
      this.selectedParticleEffectManager.update();
    }
    
    // Keep updating our particles
    requestAnimationFrame(
      () => this.update()
    );
  }
}