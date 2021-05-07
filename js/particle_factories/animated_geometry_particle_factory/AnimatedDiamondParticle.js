import { ParticleBase } from '../ParticleBase.js';
import { rotatePolygonAroundPoint, sineBetween } from '../../utils.js';

export class AnimatedDiamondParticle extends ParticleBase {
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
    this.color = '#fff';
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
  
  setColor(color) {
    this.color = color;
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
    // define center
    const center = { x: x - this.getWidth() / 2, y: y - this.getHeight() / 2 };
  
    // Make the polygon 'wobble' by moving the left and right X positions inwards/outwards
    const leftXPosRange = { min: center.x - (this.size / 2), max: center.x - (this.size / 4) };
    const leftXPos = sineBetween(leftXPosRange.max, leftXPosRange.min, (this.getLifeTime() / this.randomContractionSpeed));
    const rightXPosRange = { min: center.x + (this.size / 4), max: center.x + (this.size / 2) };
    const rightXPos = sineBetween(rightXPosRange.min, rightXPosRange.max, (this.getLifeTime() / this.randomContractionSpeed));
    
    // Define polygon points
    const polygonPoints = [
      // top
      { x: center.x, y: center.y - (this.size / 2) },
      // right
      { x: rightXPos, y: center.y },
      // bottom
      { x: center.x, y: center.y + (this.size / 2) },
      // left
      { x: leftXPos, y: center.y },
      // top
      { x: center.x, y: center.y - (this.size / 2) },
    ];
    
    // Apply rotation
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
    for (let i = 0; i < polygonPoints.length; i++) {
      this.ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    this.ctx.strokeStyle = this.color;
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