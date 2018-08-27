var gulp = require('gulp'),
    babel = require("gulp-babel");

gulp.task("config", function () {
  return gulp.src("config/*.es6")
    .pipe(babel())
    .pipe(gulp.dest("config/"));
});
gulp.task("controller", function () {
  return gulp.src("controller/*.es6")
    .pipe(babel())
    .pipe(gulp.dest("controller/"));
});
gulp.task("model", function () {
  return gulp.src("model/*.es6")
    .pipe(babel())
    .pipe(gulp.dest("model/"));
});
gulp.task("public", function () {
  return gulp.src("public/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/dist/"));
});
gulp.task("app", function () {
  return gulp.src("app.es6")
    .pipe(babel())
    .pipe(gulp.dest(""));
});
gulp.task('babeljs',['config','controller','model','public','app']);


gulp.task('default',['babeljs']);
