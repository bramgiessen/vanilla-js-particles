// Import particle systems
import { ParticleSystem } from './ParticleSystem.js';

// Import particle emitters
import { WaveEmitter } from './particle_emitters/WaveEmitter.js';
import { MicroOrganismEmitter } from './particle_emitters/MicroOrganismEmitter.js';
import { MicroOrganismMagnetEmitter } from './particle_emitters/MicroOrganismMagnetEmitter.js';

// Import particle factories
import { ImageParticleFactory } from './particle_factories/image_particle_factory/ImageParticleFactory.js';
import { MicroOrganismParticleFactory } from './particle_factories/micro_organism_particle_factory/MicroOrganismParticleFactory.js';
import { AnimatedGeometryParticleFactory } from './particle_factories/animated_geometry_particle_factory/AnimatedGeometryParticleFactory.js';

// Define ParticleEffects library
window.particleEffects = {
  ParticleSystem,
  
  // Define particle emitters
  emitters: {
    WaveEmitter,
    MicroOrganismEmitter,
    MicroOrganismMagnetEmitter
  },
  
  // Define particle factories
  particleFactories: {
    ImageParticleFactory,
    MicroOrganismParticleFactory,
    AnimatedGeometryParticleFactory
  }
};