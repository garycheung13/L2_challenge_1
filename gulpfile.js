var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var bs = require("browser-sync").create();


gulp.task('serve', ['scss'], function() {

    bs.init({
        server: "./"
    });

    gulp.watch("src/scss/*/**", ['scss']);
    gulp.watch(["*.html", "dist/images/*", "scatterplot/*"]).on('change', bs.reload);
});


gulp.task("scss", function () {
    gulp.src("src/scss/main.scss")
        .pipe(sass({
            outputStyle: "compressed",
            errLogToConsole: true,
        }))
        .pipe(autoprefixer({
            browsers: ["last 20 versions"]
        }))
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest("dist/css/"))
        .pipe(bs.stream());
});

gulp.task("default", ["serve"]);