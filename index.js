var fs = require('fs');
var path = require('path');
var md5 = require('md5');

var path = 'public/_css';

function rename() {

  fs.readdir(path, function(error, files) {

    if(error) {
      return console.log('Error in reading directory', path);
    }

    for (var i = files.length - 1; i >= 0; i--) {

      var absolutePath = path + '/' + files[i];

      fs.readFile(absolutePath, function (error, buffer) {

        if(error) {
          return console.log('Error in reading file', absolutePath);
        }

        var reg = new RegExp(/(\.[\w\d_-]+)$/i);
        var generatedHash = md5(buffer.toString());
        var newFilePath = absolutePath.replace(reg, '.' + generatedHash + '$1');

        fs.rename(absolutePath, newFilePath, function(error) {
          if(error) {
            return console.info('Error in renaming:', error);
          }
        });

      });

    }

  });

}

var source = 'public/index.html';

function inject() {

  fs.readFile(source, function(error, buffer) {

    if(error) {
      return console.log('Error in reading file', source);
    }

    var sourceString = buffer.toString();
    var reg = new RegExp(/(<!--inject:([a-z]+)-->)(\s?.*?)(<!--inject-->)/);

    var newSource = sourceString.replace(reg, '$1'+'$3$3$4');
    console.log(newSource);

  });

  // fs.readdir(path, function(error, files) {

  //   if(error) {
  //     return console.log('Error in reading directory', error);
  //   }

  //   console.log(files);

  // });

}

inject();
