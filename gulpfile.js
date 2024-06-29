const gulp = require("gulp");
const minifyHTML = require('gulp-htmlmin');
const minifyJS = require('gulp-uglify');
const minifyCSS = require("gulp-clean-css")
// const minifyImages = require("gulp-imagemin");
// import imagemin from 'gulp-imagemin';
const logger = require('gulp-logger');
const log = require("fancy-log");

const pathToDestination = "../pvzzombs_github_io/";
const ignorePaths = ["!./node_modules/**", "!./gulpfile.js", "!./package.json"];

function buildHTML() {
  return gulp.src(["**/*.html", ...ignorePaths])
  .pipe(logger())
  .pipe(gulp.dest(pathToDestination));
}

function minHTML() {
  return gulp.src(["**/*.html", ...ignorePaths])
  .pipe(logger())
  .pipe(minifyHTML({ collapseWhitespace: true, removeComments: true }))
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

// function minImages() {
//   return gulp.src(["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", ...ignorePaths])
//   .pipe(imagemin())
//   .pipe(gulp.dest(pathToDestination));
// }

function buildFonts() {
  return gulp.src(["**/*.woff2", "**/*.woff", "**/*.ttf", "**/*.otf", ...ignorePaths],
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

gulp.task("build-html", buildHTML);
gulp.task("minify-html", minHTML);
gulp.task("build-css", buildCSS);
gulp.task("minify-css", minCSS);
gulp.task("build-js", buildJS);
gulp.task("minify-js", minJS);
gulp.task("build-json", buildJSON);
gulp.task("build-images", buildImages);
// gulp.task("minify-images", minImages);
gulp.task("build-fonts", buildFonts);

gulp.task("other", gulp.series(buildJSON, buildImages, buildFonts));

gulp.task("default", gulp.series(startMessage, buildHTML, minCSS, minJS, buildJSON,
  buildImages, buildFonts, endMessage));