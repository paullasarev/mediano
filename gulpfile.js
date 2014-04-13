var gulp = require('gulp');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
//var uglify = require('gulp-uglify');
//var concat = require('gulp-concat');
//var rename = require("gulp-rename");
//var filter = require("gulp-filter");
//var footer = require("gulp-footer");
//var gulpif = require('gulp-if');
var less = require('gulp-less'); 
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');

var args = require('yargs').argv;

// gulp --prod 
var isDev = !args.prod;

gulp.task('clean', function() {
    return gulp.src('public/**/*', {read: false})
        .pipe(clean());
});

gulp.task('js', function() {
  return gulp.src('app/js/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : isDev
    }))
    .pipe(gulp.dest('public/js'));
});

gulp.task('html', function() {
 return gulp.src('app/**/*.html')
    .pipe(gulp.dest('public'));
});

gulp.task('components', function() {
 return gulp.src('bower_components/**/*')
    .pipe(gulp.dest('public/bower_components'));
});

gulp.task('css', function() {
  return gulp.src('app/css/app.less')
    .pipe(less({
      paths: [ "bower_components/bootstrap/less" ],
      cleancss: true,
    }))
    .pipe(gulp.dest('public/css'))
});

gulp.task('img', function() {
 return gulp.src('app/img/**/*')
    .pipe(gulp.dest('public/img'));
});

gulp.task('bootstrap-fonts', function() {
 return gulp.src('bower_components/bootstrap/fonts/**/*')
    .pipe(gulp.dest('public/img'));
});

var tasks = ['js', 'html', 'img', 'bootstrap-fonts', 'css'];

gulp.task('server', tasks, function() {
	require('./app');
});

gulp.task('build', tasks);

gulp.task('rebuild', function(callback) {
  runSequence('clean', tasks, callback);
});

gulp.task('all', function(callback) {
  runSequence('clean', 'default', callback);
});

gulp.task('default', ['server'], function(){
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('bower_components/bootstrap/fonts/**/*', ['bootstrap-fonts']);
  gulp.watch('app/css/**/*', ['css']);
  gulp.watch('app/js/**/*.js', ['js']);

  var lserv = livereload();
  gulp.watch('public/**').on('change', function(file) {
  	console.log('changed file: ' + file.path);
    lserv.changed(file.path);
  });

});
