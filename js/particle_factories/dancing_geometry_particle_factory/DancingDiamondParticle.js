import { ParticleBase } from '../ParticleBase.js';
import { rotatePolygonAroundPoint } from '../../utils.js';

export class DancingDiamondParticle extends ParticleBase {
  constructor({ canvasContext, behaviouralProperties, initialX, initialY, size }) {
    super();
    this.ctx = canvasContext;
    this.behaviouralProperties = behaviouralProperties;
    this.x = initialX || 0;
    this.y = initialY || 0;
    this.size = size;
    this.rotation = 0;
  }
  
  isParticleAlive() {
    const isOutsideHorizontalViewport = (this.x < -this.getWidth() || this.x > this.ctx.canvas.width + this.getWidth());
    const isOutsideVerticalViewport = (this.y < -this.getHeight() || this.y > this.ctx.canvas.height + this.getHeight());
    
    return !(isOutsideHorizontalViewport || isOutsideVerticalViewport);
  }
  
  getWidth() {
    return this.size;
  }
  
  getHeight() {
    return this.size;
  }
  
  setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }
  
  getPosition() {
    return { x: this.x, y: this.y };
  }
  
  setRotation(rotation) {
    this.rotation = rotation;
  }
  
  /**
   * Generate a rotated diamond-shaped polygon
   * @param x
   * @param y
   * @param rotation
   * @return {*[]}
   * @private
   */
  _generatePolygon(x, y, rotation) {
    const polygonPoints = [
      // top
      { x: x + (this.size / 2), y: y - (this.size / 2) },
      // right
      { x: x + this.size, y: y },
      // bottom
      { x: x + (this.size / 2), y: y + (this.size / 2) },
      // left
      { x: x, y: y },
      // top
      { x: x + (this.size / 2), y: y - (this.size / 2) },
    ];
  
    // Apply rotation
    const center = { x: x + (this.size / 2), y: y + (this.size / 2) };
    return rotatePolygonAroundPoint(polygonPoints, center, rotation);
  }
  
  draw() {
    const polygonPoints = this._generatePolygon(this.x, this.y, this.rotation);
    
    this.ctx.beginPath();
    this.ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for (var i = 0; i < polygonPoints.length; i++) {
      this.ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    this.ctx.stroke()
    this.ctx.closePath();
  }
}