export class ParticleBase {
  ctx = null;
  behaviouralProperties = null;
  constructor(props) {
    // Override this method in the extended particle class
  }
  
  isParticleAlive() {
    // Override this method in the extended particle class
    return false;
  }
  
  setLifeTime(lifetime) {
    // Override this method in the extended particle class
  }
  
  getLifeTime() {
    // Override this method in the extended particle class
  }
  
  getWidth() {
    // Override this method in the extended particle class
  }
  
  getHeight() {
    // Override this method in the extended particle class
  }
  
  setPosition({x, y}){
    // Override this method in the extended particle class
  }
  
  getPosition() {
    // Override this method in the extended particle class
  }
  
  setRotation(rotation) {
    // Override this method in the extended particle class
  }
  
  setColor(color) {
    // Override this method in the extended particle class
  }
  
  draw() {
    // Override this method in the extended particle class
  }
  
}