var browserify  = require('browserify'),
gulp            = require('gulp'),
source          = require('vinyl-source-stream'),
watchify        = require('watchify'),
rename          = require('gulp-rename'),
handleErrors    = require('../utils/handleErrors'),
bundleLogger    = require('../utils/bundleLogger'),
config          = require(process.cwd() + '/gulp.config.js'),
babelify        = require('babelify');

gulp.task('browserify', bundle);

function bundle() {
  config.files.map(function(entry){
    var opts = {
      cache: {},
      packageCache: {},
      fullPaths: false,
      debug: true,
      entries: [entry]
    }

    if(global.isWatching) {
      var b = watchify(browserify(opts));
      b = watchify(b);
      b.on('update', bundle);
    }
    else {
      var b = browserify(opts);
    }

    var bundleit = function() {
      bundleLogger.start(config.paths.dest);
      return b
      .transform(babelify)
      .bundle()
      .on('error', handleErrors)
      .pipe(source(entry))
      .pipe(rename(function(path) {
        var dirs = path.dirname.split("/");
        path.basename = dirs[dirs.length - 1];
        path.dirname = '';
        path.extname = '.bundle.js'
      }))
      .pipe(gulp.dest(config.paths.dest));
    }
    bundleit();
  });
}
