'use strict';

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
var cssbeautify = require('gulp-cssbeautify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
// var karma = require('gulp-karma');
var rename = require("gulp-rename");
//var bowerFiles = require('main-bower-files');
var bowerResolve = require('bower-resolve');
var nodeResolve = require('resolve');
// var order = require('gulp-order');
var browserify  = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var exorcist = require('exorcist');
var transform = require('vinyl-transform');
var buffer = require('vinyl-buffer');

var conf = {
  dist: {
    dir:'dist'
  },
  dev: {
    dir: 'dev'
  },
  src: {
    scripts: [
      'app/app_start.js',
      '!app/**/*.spec.js',
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
      'app/common/fonts/**/*.{ttf,eot,svg,woff,woff2}',
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

function getBowerPackageIds() {
  var manifest = require('./bower.json');
  return _.keys(manifest.dependencies);
}

function getNPMPackageIds() {
  return [
    "react",
    "react-router",
    "reflux"
  ];
  // var manifest = require('./package.json');
  // return _.keys(manifest.dependencies)
  //   .concat(_.keys(manifest.devDependencies));
}

gulp.task('serve', function (callback) {
  runSequence('clean:dev', 'libs:dev', 'scripts:dev', 'html:dev', 'styles:dev', 'images:dev', 'fonts:dev', 'webserver', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'libs:dist', 'scripts:dist', 'html:dist', 'styles:dist', 'images:dist', 'fonts:dist', callback);
});

gulp.task('serve:dist', function (callback) {
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

   var bundler = browserify('./app/app_start.js', {
      extensions: ['.jsx'],
      debug: true
    });

  getBowerPackageIds().forEach(function (id) {
    bundler.external(id);
  });

   getNPMPackageIds().forEach(function (id) {
    bundler.external(id);
  });

  var outDir = path.join(conf.dev.dir, conf.dest.scriptsDir);
  return bundler
    .transform('reactify')
    .bundle()
    .pipe(source('app.js'))
    .pipe(transform( function () { return exorcist(path.join(outDir,"app.js.map")); }))
    .pipe(gulp.dest(outDir));
});

gulp.task('scripts:dist', function () {
  var bundler = browserify('./app/app_start.js', {
      extensions: ['.jsx'],
      debug: false
    });

  getBowerPackageIds().forEach(function (id) {
    bundler.external(id);
  });

   getNPMPackageIds().forEach(function (id) {
    bundler.external(id);
  });

  return bundler
    .transform('reactify')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.join(conf.dist.dir, conf.dest.scriptsDir)));
});

gulp.task('libs:dev', function () {
  gulp.watch(conf.src.libs, ['libs:dev']);

  var bundler = browserify({debug: true});

  getBowerPackageIds().forEach(function (id) {
    bundler.require(bowerResolve.fastReadSync(id), {expose: id});
  });

  getNPMPackageIds().forEach(function (id) {
    var file = nodeResolve.sync(id);
    bundler.require(file, { expose: id });
  });

  var outDir = path.join(conf.dev.dir, conf.dest.scriptsDir);
  return bundler
    .bundle()
    .pipe(source(conf.dest.libs))
    .pipe(transform( function(){return exorcist(path.join(outDir, conf.dest.libs + ".map"));}))
    .pipe(gulp.dest(outDir));
});

gulp.task('libs:dist', function () {
  var bundler = browserify({debug: false});

  getBowerPackageIds().forEach(function (id) {
    bundler.require(bowerResolve.fastReadSync(id), {expose: id});
  });

  getNPMPackageIds().forEach(function (id) {
    bundler.require(nodeResolve.sync(id), { expose: id });
  });

  return bundler
    .bundle()
    .pipe(source(conf.dest.libs))
    .pipe(buffer())
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
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer(autoprefixerBrowsers))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(conf.dev.dir, conf.dest.stylesDir)));
});


gulp.task('styles:dist', function () {
  return gulp.src(conf.src.scssRoot)
    .pipe(sass())
    .pipe(concat('app.css'))
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
