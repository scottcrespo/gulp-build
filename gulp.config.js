var root = './app';
var dest = root + '/build';
var src  = root + '/src';

module.exports = {
  paths: {
    cssSrc: src + '/css/*.css',
    jsSrc: src + '/js/*.js',
    dest: dest
  },
  files: [
    './app/src/test.js',
    ]
};
