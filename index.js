'use strict';

// Required modules
var colors      = require('colors'),
    deepAssign  = require('deep-assign'),
    fs          = require('fs'),
    md5         = require('md5'),
    path        = require('path'),
    performance = require('performance-now'),
    q           = require('q');

// Default Options
var defaultOptions = {
  basePaths: [],
  hashLength: 8
};

var options,
    start;

module.exports = function(opts) {

  start = performance();

  options = deepAssign(defaultOptions, opts);
  getFiles(options.basePaths)
    .then(generateHashes)
    .then(renameFiles)
    .then(output)
    .catch(output);

};

function getFiles(folders) {

  var deferred = q.defer();
  var folderCount = folders.length;
  var listOfFiles = [];
  if(!folderCount) {
    deferred.reject('No folders specified.');
  }

  folders.forEach(function(folder) {

    fs.readdir(folder, function(error, files) {

      if(error) {
        deferred.reject(error);
      }

      files.map(function(file) {
        return path.join(folder, file);
      }).filter(function(file) {
        return fs.statSync(file).isFile();
      }).filter(function(file) {
        var fileDetails = path.parse(file);
        return (fileDetails.ext != '.css' && fileDetails.ext != '.js') ? false : true;
      }).forEach(function(file) {
        listOfFiles.push(file);
      });

      folderCount--;

      if(folderCount === 0) {
        deferred.resolve(listOfFiles);
      }

    });

  });

  return deferred.promise;

}

function generateHashes(files) {

  var deferred = q.defer();
  var fileCount = files.length;
  var fileArray = [];

  files.forEach(function(file) {

    fs.readFile(file, function(error, contents) {

      if(error) {
        deferred.reject(error);
      }

      var fileDetails = path.parse(file);

      fileArray.push({
        dir: fileDetails.dir,
        ext: fileDetails.ext,
        hash: md5(contents.toString()),
        name: fileDetails.name,
        path: file
      });

      fileCount--;

      if(fileCount === 0) {
        deferred.resolve(fileArray);
      }

    });

  });

  return deferred.promise;

}

function renameFiles(files) {

  var deferred = q.defer();
  var fileCount = files.length;

  files.forEach(function(file) {

    var newFilename = file.dir + '/' + file.name + '.' + (file.hash).substring(0, options.hashLength) + file.ext;

    fs.rename(file.path, newFilename, function(error) {

      if(error) {
        deferred.reject(error);
      }

      fileCount--;

      if(fileCount === 0) {
        deferred.resolve();
      }

    });

  });

  return deferred.promise;

}

function output(error) {

  var totalTime = (performance() - start).toFixed(2);
  var introString = 'AssetInjector - took ' + totalTime + 'ms';

  if(error) {
    console.log(introString.red.underline);
    console.log('Error:'.red, error);
  } else {
    console.log(introString.green.underline);
    console.log('All files successfully hashbusted!'.green);
  }

}
