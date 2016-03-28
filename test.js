var expect     = require('chai').expect(),
    hashbuster = require('./index');

hashbuster({
  basePaths: ['test/_css', 'test/_js'],
  hashLength: 6
});
