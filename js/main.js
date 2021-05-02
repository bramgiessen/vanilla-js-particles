import { ParticleSystem } from './ParticleSystem.js';
import { WaveEmitter } from './particle_emitters/WaveEmitter.js';
import { MicroOrganismEmitter } from './particle_emitters/MicroOrganismEmitter.js';
import { ImageParticleFactory } from './particle_factories/image_particle_factory/ImageParticleFactory.js';
import { MicroOrganismParticleFactory } from './particle_factories/micro_organism_particle_factory/MicroOrganismParticleFactory.js';

const containerElement = document.getElementById('particles-container');

// initialize our particle system
const particleSystem = new ParticleSystem({
  containerElement: containerElement,
  particleEmitter: new WaveEmitter({
    minSpeed: 1,
    maxSpeed: 5
  }),
  particleFactory: new ImageParticleFactory({
    minScale: 0.1,
    maxScale: 0.5,
  }),
  // particleEmitter: new MicroOrganismEmitter({
  //   backgroundColor: '#000E2E'
  // }),
  // particleFactory: new MicroOrganismParticleFactory({
  //   minRadius: 0.2,
  //   maxRadius: 3,
  //   particleColors: ['#F9314C', '#d8002c', '#7DFFF2']
  // }),
});