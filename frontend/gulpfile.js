var argv = require('yargs').argv;
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var del = require('del');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gulpNext = require('gulp-next');
var jspm = require('gulp-jspm');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');

var isDev = !(argv.production);
var appSource = './app/main.js';
var appFiles = './app/**/*.js';
var sassFiles = './app/styles/sass/**/*.scss';
var indexFiles = './app/index.html';
var resourceFiles = ['./app/styles/**/*.png', './app/styles/**/*.otf'];
var buildDir = isDev ? './build' : './dist';

var timeLogger = function timeLogger(name, start) {
  if (!start) {
    start = Date.now();
    console.log('Building ' + name);
  }
  return function logTime() {
    console.log(name + ' built in ' + (Date.now() - start) + 'ms');
  }
};

var buildApp = function buildAppTask(done) {
  var logTime = timeLogger('APP');

  gulp.src(appSource)
    .pipe(sourcemaps.init())
    .pipe(jspm({ selfExecutingBundle: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildDir))
    .pipe(gulpNext(logTime))
    .pipe(gulpNext(done));
};

var buildCss = function buildCssTask(done) {
  var logTime = timeLogger('CSS');

  gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulpIf(!isDev, cssmin()))
    .pipe(gulp.dest(buildDir))
    .pipe(gulpNext(logTime))
    .pipe(gulpNext(done));
};

var buildResources = function buildResourcesTask(done) {
  var logTime = timeLogger('RESOURCES');

  gulp.src(resourceFiles)
    .pipe(gulp.dest(buildDir))
    .pipe(gulpNext(logTime))
    .pipe(gulpNext(done));
};

var buildIndex = function buildIndexTask(done) {
  var logTime = timeLogger('INDEX');

  //todo: Upgrade to gulp-inject for css and js files.

  gulp.src(indexFiles)
    .pipe(gulp.dest(buildDir))
    .pipe(gulpNext(logTime))
    .pipe(gulpNext(done));
};

var watchApp = function watchAppTask() {
  console.log("Watching app files.");
  gulp.watch(appFiles, [ 'build:app' ]);
};

var watchCss = function watchCssTask() {
  console.log("Watching css files.");
  gulp.watch(sassFiles, [ 'build:css' ]);
};

var watchIndex = function watchIndexTask() {
  console.log("Watching index files.");
  gulp.watch(indexFiles, [ 'build:index' ]);
};

var watchResources = function watchResourcesTask() {
  console.log("Watching resource files.");
  gulp.watch(resourceFiles, [ 'build:resources' ]);
};

var cleanBuild = function cleanBuildTask(done) {
  del([
    buildDir + '/*'
  ]).then(function () {
    console.log('Build Path has been cleaned.');
    done();
  });
};

var serveApp = function serveAppTask() {
  console.log('Starting web server.');

  gulp.src(buildDir)
    .pipe(webserver({
      livereload:       true,
      directoryListing: false,
      open:             true
    }));
};

gulp.task('build:app', function () {
  buildApp();
});

gulp.task('build:css', function () {
  buildCss();
});

gulp.task('build:index', function () {
  buildIndex();
});

gulp.task('build:resources', function () {
  buildResources();
});

gulp.task('build:all', [ 'clean:build' ], function (done) {
  var tasks = [
    buildApp,
    buildCss,
    buildResources,
    buildIndex
  ];
  var callCount = tasks.length;
  var finishCall = function finishCall() {
    callCount -= 1;
    if (callCount <= 0) {
      done();
    }
  };

  var i;
  for (i = 0; i < tasks.length; i++) {
    tasks[ i ](finishCall);
  }
});

gulp.task('watch:app', function () {
  watchApp();
});

gulp.task('watch:css', function () {
  watchCss();
});

gulp.task('watch:index', function () {
  watchIndex();
});

gulp.task('watch:resources', function () {
  watchResources();
});

gulp.task('watch:all', function () {
  watchApp();
  watchCss();
});

gulp.task('clean:build', function (done) {
  cleanBuild(done);
});

// Starts our development workflow
gulp.task('default', [ 'build:all' ], function () {
  watchApp();
  watchCss();
  watchResources();
  watchIndex();
  serveApp();
});
