// 'use strict';

var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var _ = require('lodash');
var del = require('del');
var webserver = require('gulp-webserver');
var path = require('path');
//var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
// var concatCss = require('gulp-concat-css');
var cssbeautify = require('gulp-cssbeautify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
// var karma = require('gulp-karma');
var rename = require("gulp-rename");
var bowerFiles = require('main-bower-files');
var order = require('gulp-order');

var conf = {
  dist: {
    dir:'dist'
  },
  dev: {
    dir: 'dev'
  },
  src: {
    scripts: [
      'app/app.js',
      '!app/**/*.spec.js'
      'app/**/*.js'
    ],
    html: [
      'app/index.html',
      'app/**/*.html'
    ],
    styles: [
      'app/common/*.{css,scss}',
      'app/**/*.{css,scss}'
    ],
    scssRoot: [
      'app/common/**/*.main.scss',
      'app/**/*.main.scss'
    ],
    fonts: [
      'app/common/fonts/**/*.{ttf,eot,svg,woff,woff2}'
      'app/**/*.{ttf,eot,svg,woff,woff2}'
    ],
    images: [
      'app/images/*.{png,jpg,gif}'
    ],
    libs: 'bower_components',
  },
  dest: {
    js: 'app.js',
    libs: 'libs.js',
    css: 'app.css',
    stylesDir: 'styles',
    imagesDir: 'images',
    fontsDir: 'fonts',
    htmlDir: 'views',
    scriptsDir: 'scripts'
  }
};

var autoprefixerBrowsers = [
//  'ie >= 10',
//  'ie_mob >= 10',
  'ff >= 35',
  'chrome >= 40',
//  'safari >= 7',
//  'opera >= 23',
  'ios >= 7.1',
  'android >= 4.4',
//  'bb >= 10'
];

var packagesOrder = [
  '*jquery*',
  '!*angular*',
  '*angular.js',
  '*angular*'
];

// var bowerPackages = _.sortBy(bowerFiles('**/*.js'), function(path) {
//   if (path.indexOf('jquery') >= 0)
//     return '0:' + path;
//   if (path.indexOf('angular.js') >= 0)
//     return '2:' + path;
//   if (path.indexOf('angular') >= 0)
//     return '3:' + path;
//   else
//     return '1:' + path;
// });

gulp.task('serve', function (callback) {
  runSequence('clean:dev', 'libs:dev', 'scripts:dev', 'html:dev', 'styles:dev', 'images:dev', 'fonts:dev', 'webserver', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'libs:dist', 'scripts:dist', 'html:dist', 'styles:dist', 'images:dist', 'fonts:dist', callback);
});

gulp.task('dist:serve', function (callback) {
  runSequence('build', 'webserver:dist', callback);
});

gulp.task('clean', ['clean:dev', 'clean:dist']);

gulp.task('clean:dev', function () {
  del.sync([conf.dev.dir + '/*']);
});

gulp.task('clean:dist', function () {
  del.sync([conf.dist.dir + '/*']);
});

gulp.task('html:dev', function () {
  gulp.watch(conf.src.html, ['html:dev']);

  return gulp.src(conf.src.html, {base:'app'})
    .pipe(gulp.dest(conf.dev.dir));
});

gulp.task('html:dist', function () {
  return gulp.src(conf.src.html, {base:'app'})
    .pipe(minifyHtml())
    .pipe(gulp.dest(conf.dist.dir));
});

gulp.task('scripts:dev', function () {
  gulp.watch(conf.src.scripts, ['scripts:dev']);
  return gulp.src([conf.src.scripts], { base: '../app/scripts' })
    .pipe(sourcemaps.init())
    .pipe(concat(conf.dest.js))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.dev.dir, conf.dest.scriptsDir)));
});

gulp.task('scripts:dist', function () {
  return gulp.src([conf.src.scripts])
    .pipe(concat(conf.dest.js))
    // .pipe(uglify())
    .pipe(gulp.dest(path.join(conf.dist.dir, conf.dest.scriptsDir)));
});

gulp.task('libs:dev', function () {
  gulp.watch(conf.src.libs, ['libs:dev']);
  bowerFiles('**/*.js')
  // return gulp.src(bowerPackages, {base: '../' + conf.src.libs})
  return gulp.src(bowerFiles('**/*.js'), {base: '../' + conf.src.libs})
    .pipe(order(packagesOrder))
    .pipe(sourcemaps.init())
    .pipe(concat(conf.dest.libs))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.dev.dir, conf.dest.scriptsDir)));
});

gulp.task('libs:dist', function () {
   return gulp.src(bowerPackages)
    .pipe(concat(conf.dest.libs))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(conf.dist.dir, conf.dest.scriptsDir)));
});

gulp.task('webserver', function() {
  return gulp.src([conf.dev.dir])
    .pipe(webserver({
      host: 'localhost', //change to 'localhost' to disable outside connections
      port: 3000,
      livereload: true,
      open: true
    }));
});

gulp.task('webserver:dist', function() {
  return gulp.src([conf.dist.dir])
    .pipe(webserver({
      host: 'localhost', //change to 'localhost' to disable outside connections
      port: 3001,
      livereload: true,
      open: true
    }));
});

gulp.task('styles:dev', function () {
  gulp.watch(conf.src.styles, ['styles:dev']);
  return  gulp.src(conf.src.scssRoot)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer(autoprefixerBrowsers))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(conf.dev.dir, conf.dest.stylesDir)));
});


gulp.task('styles:dist', function () {
  return gulp.src(conf.src.scssRoot)
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerBrowsers))
    .pipe(csso())
    .pipe(gulp.dest(path.join(conf.dist.dir, conf.dest.stylesDir)));
});


gulp.task('images:dev', function () {
  gulp.watch(conf.src.images, ['images:dev']);
  return gulp.src(conf.src.images)
    .pipe(imagemin({ optimizationLevel: 3, interlaced: true }))
    .pipe(gulp.dest(path.join(conf.dev.dir, conf.dest.imagesDir)));
});

gulp.task('images:dist', function () {
  return gulp.src(conf.src.images)
    .pipe(imagemin({ optimizationLevel: 3, interlaced: true }))
    .pipe(gulp.dest(path.join(conf.dist.dir, conf.dest.imagesDir)));
});


gulp.task('fonts:dev', function () {
  gulp.watch(conf.src.fonts, ['fonts:dev']);
  return gulp.src(conf.src.fonts, {basename: 'app/fonts'})
    // .pipe(rename({dirname:""}))
    .pipe(gulp.dest(path.join(conf.dev.dir, conf.dest.fontsDir)));
});

gulp.task('fonts:dist', function () {
  return gulp.src(conf.src.fonts, {basename: 'app/fonts'})
    // .pipe(rename({dirname:""}))
    .pipe(gulp.dest(path.join(conf.dist.dir, conf.dest.fontsDir)));
});
