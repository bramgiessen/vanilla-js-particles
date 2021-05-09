import { ParticleSystem } from './ParticleSystem.js';
import { WaveEmitter } from './particle_emitters/WaveEmitter.js';
import { MicroOrganismEmitter } from './particle_emitters/MicroOrganismEmitter.js';
import {MicroOrganismMagnetEmitter} from './particle_emitters/MicroOrganismMagnetEmitter.js';
import { ImageParticleFactory } from './particle_factories/image_particle_factory/ImageParticleFactory.js';
import { MicroOrganismParticleFactory } from './particle_factories/micro_organism_particle_factory/MicroOrganismParticleFactory.js';
import {AnimatedGeometryParticleFactory} from './particle_factories/animated_geometry_particle_factory/AnimatedGeometryParticleFactory.js';

const containerElement = document.getElementById('particles-container');

// initialize our particle system
const particleSystem = new ParticleSystem({
  containerElement: containerElement,
  maxAmountOfParticles: 300,
  // particleEmitter: new WaveEmitter({
  //   backgroundColor: '#000',
  //   minSpeed: 1,
  //   maxSpeed: 5,
  //   alternateColors: true
  // }),
  // particleFactory: new ImageParticleFactory({
  //   minScale: 0.1,
  //   maxScale: 0.5,
  // }),
  // particleEmitter: new MicroOrganismEmitter({
  //   backgroundColor: '#000E2E'
  // }),
  particleEmitter: new MicroOrganismMagnetEmitter({
    backgroundColor: '#000E2E',
    magnetRadius: 80
  }),
  particleFactory: new MicroOrganismParticleFactory({
    minRadius: 0.2,
    maxRadius: 3,
    particleColors: ['#F9314C', '#d8002c', '#7DFFF2']
  }),
  // particleFactory: new AnimatedGeometryParticleFactory({
  //   minWidth: 15,
  //   maxWidth: 25,
  // }),
});