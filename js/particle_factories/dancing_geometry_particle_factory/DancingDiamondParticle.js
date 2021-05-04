import { ParticleBase } from '../ParticleBase.js';
import { rotatePolygonAroundPoint, sineBetween } from '../../utils.js';

export class DancingDiamondParticle extends ParticleBase {
  constructor({ canvasContext, behaviouralProperties, initialX, initialY, size }) {
    super();
    this.ctx = canvasContext;
    this.behaviouralProperties = behaviouralProperties;
    this.x = initialX || 0;
    this.y = initialY || 0;
    this.size = size;
    this.rotation = 0;
    this.lifetime = 0;
    this.randomContractionSpeed = Math.random() * (60 - 10) + 10;
  }
  
  isParticleAlive() {
    const isOutsideHorizontalViewport = (this.x < -this.getWidth() || this.x > this.ctx.canvas.width + this.getWidth());
    const isOutsideVerticalViewport = (this.y < -this.getHeight() || this.y > this.ctx.canvas.height + this.getHeight());
    
    return !(isOutsideHorizontalViewport || isOutsideVerticalViewport);
  }
  
  setLifeTime(lifetime) {
    this.lifetime = lifetime;
  }
  
  getLifeTime() {
    return this.lifetime;
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
    const rightXPosRange = { min: (x + (this.size * 0.75)), max: x + this.size };
    const rightXPos = sineBetween(rightXPosRange.min, rightXPosRange.max, (this.getLifeTime() / this.randomContractionSpeed));
    const leftXPosRange = { min: x, max: x + (this.size / 4) };
    const leftXPos = sineBetween(leftXPosRange.max, leftXPosRange.min, (this.getLifeTime() / this.randomContractionSpeed));
    
    const polygonPoints = [
      // top
      { x: x + (this.size / 2), y: y - (this.size / 2) },
      // right
      { x: rightXPos, y: y },
      // bottom
      { x: x + (this.size / 2), y: y + (this.size / 2) },
      // left
      { x: leftXPos, y: y },
      // top
      { x: x + (this.size / 2), y: y - (this.size / 2) },
    ];
    
    // Apply rotation
    const center = { x: x + (this.size / 2), y: y + (this.size / 2) };
    return rotatePolygonAroundPoint(polygonPoints, center, rotation);
  }
  
  /**
   * Draw a diamond at given x & y position, rotated given degrees
   * @param x
   * @param y
   * @param rotation
   * @private
   */
  _drawDiamondPolygon(x, y, rotation) {
    const polygonPoints = this._generatePolygon(x, y, rotation);
    this.ctx.beginPath();
    this.ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for (var i = 0; i < polygonPoints.length; i++) {
      this.ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    this.ctx.strokeStyle = "#619ad7"
    this.ctx.stroke()
    this.ctx.closePath();
  }
  
  draw() {
    // Draw layer 1
    this._drawDiamondPolygon(this.x, this.y, this.rotation);
    // Draw layer 2 - just behind layer 1
    this._drawDiamondPolygon(this.x - ( this.size / 8), this.y - ( this.size / 8), this.rotation);
  }
}