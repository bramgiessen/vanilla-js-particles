// Import particle systems
import { ParticleSystem } from './ParticleSystem.js';

// Import particle emitters
import { WaveEmitter } from './particle_emitters/WaveEmitter.js';
import { MicroOrganismEmitter } from './particle_emitters/MicroOrganismEmitter.js';
import { MicroOrganismMagnetEmitter } from './particle_emitters/MicroOrganismMagnetEmitter.js';
import { NightSkyEmitter } from './particle_emitters/NightSkyEmitter.js';
import { FromImageEmitter } from './particle_emitters/FromImageEmitter.js';

// Import particle factories
import { ImageParticleFactory } from './particle_factories/image_particle_factory/ImageParticleFactory.js';
import { MicroOrganismParticleFactory } from './particle_factories/micro_organism_particle_factory/MicroOrganismParticleFactory.js';
import { AnimatedGeometryParticleFactory } from './particle_factories/animated_geometry_particle_factory/AnimatedGeometryParticleFactory.js';
import { SimpleStarParticleFactory } from './particle_factories/simple_star_particle_factory/SimpleStarParticleFactory.js';

// Define ParticleEffects library
window.particleEffects = {
  ParticleSystem,
  
  // Define particle emitters
  emitters: {
    WaveEmitter,
    MicroOrganismEmitter,
    MicroOrganismMagnetEmitter,
    NightSkyEmitter,
    FromImageEmitter
  },
  
  // Define particle factories
  particleFactories: {
    ImageParticleFactory,
    MicroOrganismParticleFactory,
    AnimatedGeometryParticleFactory,
    SimpleStarParticleFactory
  }
};