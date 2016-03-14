'use strict';

require('es6-promise').polyfill();

var fs = require('fs');
var md5 = require('md5');
var objectAssign = require('object-assign');

var rexMatchExtension = /(\.[\w\d_-]+)$/i;
var rexMatchInject = /(<!--inject:([a-z]+)-->)(\s?.*?)(<!--inject:stop-->)/gi;

var links;

function injectReplace(fullMatch, openingTag, tagType, indentation, closingTag) {
  if(tagType == 'js') {
    return '';
  }
  if(tagType == 'css') {
    return '';
  }
}

var defaultOptions = {
  attributes: {
    'css': {
      rel: 'stylesheet',
      type: 'text/css'
    },
    'js': null
  },
  basePaths: ['./public/_css', './public/_js'],
  fileTypes: ['css', 'js'],
  hash: true,
  omit: './public',
  source: './public/index.html'
};

module.exports = function(opts) {

  var options = objectAssign({}, defaultOptions, opts);
  // console.log(options);
  // console.log(generateReference('js', 'me.js', options));

  if(options.hash) {
    for (var i = options.basePaths.length - 1; i >= 0; i--) {
      hash(options.basePaths[i]);
    }
  }

}

function generateReference(type, path, options) {

  // Build extra attributes
  var attributesString = '';
  if(options.attributes[type]) {
    for(var opt in options.attributes[type]) {
      if(options.attributes[type][opt] === true) {
        attributesString = attributesString + ' ' + opt;
      } else {
        attributesString = attributesString + ' ' + opt + '="' + options.attributes[type][opt] + '"';
      }
    }
  }

  if(type == 'js') {
    return '<script src="'+path+'"' + attributesString + '></script>';
  }

  if(type == 'css') {
    return '<link href="'+path+'"' + attributesString + '>';
  }

}

function hash(basePath) {

  fs.readdir(basePath, function(error, files) {

    if(error) {
      return console.log('Error in reading directory', basePath);
    }

    for (var i = files.length - 1; i >= 0; i--) {

      var absolutePath = basePath + '/' + files[i];

      console.log(absolutePath);

      console.log(generateNewFilename(absolutePath));

      // fs.readFile(absolutePath, function (error, buffer) {

      //   if(error) {
      //     return console.log('Error in reading file', absolutePath);
      //   }

      //   var generatedHash = md5(buffer.toString());
      //   var newFilePath = absolutePath.replace(rexMatchExtension, '.' + generatedHash + '$1');

      //   console.log('will rename', newFilePath);

      //   // fs.rename(absolutePath, newFilePath, function(error) {
      //   //   if(error) {
      //   //     return console.info('Error in renaming:', error);
      //   //   }
      //   // });

      // });

    }

  });

}

function generateNewFilename(file) {

  fs.readFile(file, function(error, buffer) {

    if(error) {
      return console.log('Error in reading file', file);
    }

    // console.log(md5(buffer.toString());

  });

}

// function inject() {

//   fs.readFile(source, function(error, buffer) {

//     if(error) {
//       return console.log('Error in reading file', source);
//     }

//     var sourceString = buffer.toString();

//     fs.readdir(path, function(error, files) {

//       if(error) {
//         return console.log('Error in reading directory', path);
//       }

//       links = '';
//       for (var i = files.length - 1; i >= 0; i--) {
//         var absolutePath = path + '/' + files[i];
//         links = links + generateLink(absolutePath);
//         if(i == (files.length - 1)) {
//           links = links + '\n';
//         }
//       }

//       var newSource = sourceString.replace(rexMatchInject, injectReplace);
//       console.log(newSource);

//     });

//   });

// }
