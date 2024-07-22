const gulp = require("gulp");
const minifyHTML = require("gulp-minify-html-2");
const minifyJS = require('gulp-uglify');
const minifyCSS = require("gulp-clean-css")
/* See https://github.com/sindresorhus/gulp-imagemin/issues/372 */
const minifyImages = require("gulp-imagemin"); /* Downgrade to version 7.1.0 */
// import imagemin from 'gulp-imagemin';
const logger = require('gulp-logger');
const log = require("fancy-log");
const liveServer = require("live-server");

const pathToDestination = "../pvzzombs_github_io/";
const ignorePaths = ["!./node_modules/**", "!./gulpfile.js", "!./tailwind.config.js", "!./package.json"];

const htmlOptions = {};
const serverParams = {
  port: 8000,
  root: ".",
  open: false,
  ignore: "node_modules",
  logLevel: 2
};

function buildHTML() {
  return gulp.src(["**/*.html", ...ignorePaths])
  .pipe(logger())
  .pipe(gulp.dest(pathToDestination));
}

function minHTML() {
  return gulp.src(["**/*.html", ...ignorePaths])
  .pipe(logger())
  .pipe(minifyHTML())
  .pipe(gulp.dest(pathToDestination));
}

function buildCSS() {
  return gulp.src(["**/*.css", ...ignorePaths])
  .pipe(logger())
  .pipe(gulp.dest(pathToDestination));
}

function minCSS() {
  return gulp.src(["**/*.css", ...ignorePaths])
  .pipe(logger())
  .pipe(minifyCSS())
  .pipe(gulp.dest(pathToDestination));
}

function buildJS() {
  return gulp.src(["**/*.js", ...ignorePaths])
  .pipe(logger())
  .pipe(gulp.dest(pathToDestination));
}

function minJS() {
  return gulp.src(["**/*.js", ...ignorePaths])
  .pipe(logger())
  .pipe(minifyJS())
  .pipe(gulp.dest(pathToDestination));
}

function buildJSON() {
  return gulp.src(["**/*.json", ...ignorePaths])
  .pipe(logger())
  .pipe(gulp.dest(pathToDestination));
}

function buildImages() {
  return gulp.src(["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", ...ignorePaths],
    { encoding: false }
  )
  .pipe(logger())
  .pipe(gulp.dest(pathToDestination));
}

function minImages() {
  return gulp.src(["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", ...ignorePaths],
    { encoding: false }
  )
  .pipe(logger())
  .pipe(minifyImages())
  .pipe(gulp.dest(pathToDestination));
}

function buildFonts() {
  return gulp.src(["**/*.woff2", "**/*.woff", "**/*.ttf", "**/*.otf", ...ignorePaths],
    { encoding: false }
  )
  .pipe(logger())
  .pipe(gulp.dest(pathToDestination));
}

function buildSounds() {
  return gulp.src(["**/*.mp3", "**/*.wav", "**/*.ogg", ...ignorePaths],
    { encoding: false }
  )
  .pipe(logger())
  .pipe(gulp.dest(pathToDestination));
}

function startMessage(done) {
  log.warn("Building distribution on the path: " + pathToDestination);
  done();
}

function endMessage(done) {
  log.warn("Building success!");
  done();
}

function startServer(done) {
  liveServer.start(serverParams);
  // gulp.watch(["**/*.html", "**/*.css", "**/*.js"], function(d) {
  //   log("watch");
  //   d(); 
  // }); 
  // log("server stop");
  done();
}

gulp.task("build-html", buildHTML);
gulp.task("minify-html", minHTML);
gulp.task("build-css", buildCSS);
gulp.task("minify-css", minCSS);
gulp.task("build-js", buildJS);
gulp.task("minify-js", minJS);
gulp.task("build-json", buildJSON);
gulp.task("build-images", buildImages);
gulp.task("minify-images", minImages);
gulp.task("build-fonts", buildFonts);
gulp.task("build-sounds", buildSounds);
gulp.task("other", gulp.parallel(buildJSON, buildImages, buildFonts, buildSounds));

gulp.task("default", gulp.series(startMessage, gulp.parallel(minHTML, minCSS, minJS, buildJSON,
  minImages, buildFonts, buildSounds), endMessage));

gulp.task("server", startServer);
