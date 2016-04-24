var expect     = require('chai').expect(),
    hashbuster = require('./index'),
    fs         = require('fs');

var testCss = {
  'folder': './test/_css',
  'files': ['screen.8c3532.css', 'screen.css.map']
};
var testJs = {
  'folder': './test/_js',
  'files': ['test1.6d7a72.js', 'test1.js.map', 'test2.5bb86a.js', 'test2.js.map']
};
var testingDirs = [testCss, testJs];

describe('Hashbuster', function() {

  before(function(done) {

    hashbuster({
      basePaths: ['./test/_css', './test/_js'],
      hashLength: 6
    });

    setTimeout(function() {
      done();
    }, 500);

  });

  it('should check the filenames have the correct hash', function() {

    var dirResults;
    for (var i = testingDirs.length - 1; i >= 0; i--) {

      for (var k = testingDirs[i].files.length - 1; k >= 0; k--) {

        var file = testingDirs[i].folder + '/' + testingDirs[i].files[k];
        fs.statSync(file);

      }

    }

  });

});
