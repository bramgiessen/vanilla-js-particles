const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'particle_effects.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};