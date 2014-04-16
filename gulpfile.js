var gulp = require('gulp');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var less = require('gulp-less'); 
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var karma = require('gulp-karma');

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

gulp.task('test-server', function() {
    return gulp.src('test/server/**/*.js')
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('test-server-watch', ['test-server'], function() {
  gulp.watch('test/server/**/*.js', ['test-server']);
});

var karmaFiles = [
      'public/js/*.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/**/*.js'
    ];

gulp.task('test-karma-watch', function() {
  return gulp.src(karmaFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('test', ['test-server-watch', 'test-karma-watch']);

gulp.task('test1', ['test-server', 'test-karma'], function() {
  gulp.watch('test/server/**/*.js', ['test-server']);
  gulp.watch(karmaFiles, ['test-karma']);
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
