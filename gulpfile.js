const gulp = require("gulp");
const minifyHTML = require('gulp-htmlmin');
const minifyJS = require('gulp-uglify');
const minifyCSS = require("gulp-clean-css")

const pathToDestination = "../pvzzombs_github_io/";

function buildHTML() {
  return gulp.src("**/*.html")
  .pipe(gulp.dest(pathToDestination));
}

function minHTML() {
  return gulp.src("**/*.html")
  .pipe(minifyHTML({ collapseWhitespace: true, removeComments: true }))
  .pipe(gulp.dest(pathToDestination));
}

function buildCSS() {
  return gulp.src("**/*.css")
  .pipe(gulp.dest(pathToDestination));
}

function minCSS() {
  return gulp.src("**/*.css")
  .pipe(minifyCSS())
  .pipe(gulp.dest(pathToDestination));
}

function buildJS() {
  return gulp.src("**/*.js")
  .pipe(gulp.dest(pathToDestination));
}

function minJS() {
  return gulp.src("**/*.js")
  .pipe(minifyJS())
  .pipe(gulp.dest(pathToDestination));
}

function buildJSON() {
  return gulp.src("**/*.json")
  .pipe(gulp.dest(pathToDestination));
}

function buildImages() {
  return gulp.src(["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"])
  .pipe(gulp.dest(pathToDestination));
}

function buildFonts() {
  return gulp.src(["**/*.woff2", "**/*.woff", "**/*.ttf", "**/*.otf"])
  .pipe(gulp.dest(pathToDestination));
}

gulp.task("build-html", buildHTML);
gulp.task("minify-html", minHTML);
gulp.task("build-css", buildCSS);
gulp.task("minify-css", minCSS);
gulp.task("build-js", buildJS);
gulp.task("minify-js", minJS);
gulp.task("build-json", buildJSON);
gulp.task("build-images", buildImages);
gulp.task("build-fonts", buildFonts);

gulp.task("other", gulp.series(buildJSON, buildImages, buildFonts));

gulp.task("default", gulp.series(buildHTML, minCSS, minJS, buildJSON, buildImages, buildFonts));