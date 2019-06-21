const
  gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  sourcemaps = require("gulp-sourcemaps"),
  rename = require("gulp-rename"),
  clean = require("gulp-clean"),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  gulpSequence = require('gulp-sequence');

gulp.task("scss", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("srv", ["scss", "uglify", 'img', 'clean'], function () {
  browserSync.init({
    server: "./"
  });

  gulp.watch("./src/scss/**/*.*", ["scss"]).on("change", browserSync.reload);
  gulp.watch("./src/img/*.*", ["img"]).on("change", browserSync.reload);
  gulp.watch("./src/js/*.*", ["uglify"]).on("change", browserSync.reload);
  gulp.watch("./index.html").on("change", browserSync.reload);
});

gulp.task("concat", function () {
  return gulp.src('./src/js/*.js')
    .pipe(concat('dist.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean', function () {
  return gulp.src('./dist/', {
    read: false
  })
    .pipe(clean());
});

gulp.task("uglify", ['concat'], function () {
  return gulp.src("./dist/js/dist.js")
    .pipe(uglify())
    .pipe(rename('dist.min.js'))
    .pipe(gulp.dest("./dist/js"));
});

gulp.task('img', function () {
  return gulp.src('./src/img/**/*.*')
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('dev', gulpSequence('clean', 'srv'));
gulp.task('dist', gulpSequence('clean', ["scss", "uglify", 'img']));
gulp.task("default", ["dev"]);
