// import { ParticleSystem } from './ParticleSystem.js';
// const particleSystem = new ParticleSystem('particles-container');

import { ParticleSystem } from './ParticleSystem.js';
import { WaveEmitter } from './particle_emitters/WaveEmitter.js';
import { MicroOrganismEmitter } from './particle_emitters/MicroOrganismEmitter.js';
import {ImageParticleFactory} from './particle_factories/image_particle_factory/ImageParticleFactory.js';
import {MicroOrganismParticleFactory} from './particle_factories/micro_organism_particle_factory/MicroOrganismParticleFactory.js';

const containerElement = document.getElementById('particles-container');

// initialize our particle system
const particleSystem = new ParticleSystem({
  containerElement: containerElement,
  particleEmitter: new WaveEmitter(),
  particleFactory: new ImageParticleFactory({}),
});