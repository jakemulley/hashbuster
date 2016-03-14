var fs = require('fs');
var md5 = require('md5');

var rexMatchExtension = /(\.[\w\d_-]+)$/i;
var rexMatchInject = /(<!--inject:([a-z]+)-->)(\s?.*?)(<!--inject:stop-->)/gi;

var path = 'public/_css';

function generateLink(path) {
  return '<link href="'+path+'" rel="stylesheet">';
}

function generateScript(path) {
  return '<script src="'+path+'"></script>';
}

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

        var generatedHash = md5(buffer.toString());
        var newFilePath = absolutePath.replace(rexMatchExtension, '.' + generatedHash + '$1');

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

var links;

function injectReplace(fullMatch, openingTag, tagType, indentation, closingTag) {
  if(tagType == 'js') {
    return '';
  }
  if(tagType == 'css') {
    return links;
  }
}

function inject() {

  fs.readFile(source, function(error, buffer) {

    if(error) {
      return console.log('Error in reading file', source);
    }

    var sourceString = buffer.toString();

    fs.readdir(path, function(error, files) {

      if(error) {
        return console.log('Error in reading directory', path);
      }

      links = '';
      for (var i = files.length - 1; i >= 0; i--) {
        var absolutePath = path + '/' + files[i];
        links = links + generateLink(absolutePath);
        if(i == (files.length - 1)) {
          links = links + '\n';
        }
      }

      var newSource = sourceString.replace(rexMatchInject, injectReplace);
      console.log(newSource);

    });

  });

}

// rename();
inject();
