const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");

const paths = {
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/css",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js",
  },
  images: {
    src: "src/img/*",
    dest: "dist/img",
  },
  html: {
    src: "src/*.html",
    dest: "dist",
  },
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(
      cleanCss({
        level: 2,
      }),
    )
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      }),
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      }),
    )
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.html.src, html);
}

function html() {
  return gulp
    .src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest));
}

const build = gulp.series(gulp.parallel(html, styles, scripts), watch);

exports.styles = styles;

exports.html = html;
exports.watch = watch;
exports.scripts = scripts;
exports.build = build;
exports.default = build;
