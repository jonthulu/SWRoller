var gulp = require('gulp');
var webserver = require('gulp-webserver');

var buildFrontEndDir = './frontend/build';

var port = process.env.PORT || 8080;

var serveApp = function serveAppTask() {
  console.log('Starting front end.');

  gulp.src(buildFrontEndDir)
    .pipe(webserver({
      livereload:       false,
      directoryListing: false,
      open:             false,
      port:             port
    }));
};

// Starts the production workflow
gulp.task('default', function () {
  serveApp();
});
