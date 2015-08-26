var gulp      = require('gulp');
var concat    = require('gulp-concat');
var config    = require('../config').paths;
var minifyCSS = require('gulp-minify-css');
var size      = require('gulp-filesize');

gulp.task('minifyCss', function() {
    return gulp.src(config.cssSrc)
    .pipe(concat('bundle.css'))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
