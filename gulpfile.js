"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    htmlmin = require("gulp-htmlmin"),
    less = require("gulp-less"),
    runSequence = require("run-sequence");

var srcPath = "./src/",
    targetPath = "./build/";

var paths = {
    html: srcPath + "*.html",
    js: srcPath + "js/**/*.js",
    css: srcPath + "css/**/*.css",
    less: srcPath + "less/**/*.less",
    img: srcPath + "img/**/*.+(jpg|png)",
    concatJsDest: targetPath + "js/index.js",
    concatCssDest: targetPath + "css/main.css",
    destHtml: targetPath + "*.html",
    destCss: targetPath + "css/",
    destJs: targetPath + "js/",
    destImg: targetPath + "img/"
};

// Clean
gulp.task("clean:build", function (cb) {
    rimraf(targetPath + "*", cb);
});

// Minify
gulp.task("min:js", function () {
    return gulp.src([paths.js])
        .pipe(uglify())
        .pipe(gulp.dest(paths.destJs));
});
gulp.task("min:css", function () {
    return gulp.src([paths.css, "!reset.css", paths.less])
        .pipe(less())
        .pipe(cssmin())
        .pipe(concat(paths.concatCssDest))
        .pipe(gulp.dest("."));
});
gulp.task("min:html", function () {
    return gulp.src([paths.html])
         .pipe(htmlmin({ collapseWhitespace: true }))
         .pipe(gulp.dest(targetPath));
});

// Deploy image
gulp.task('deploy:img', function () {
    return gulp.src(paths.img)
        .pipe(gulp.dest(paths.destImg));
});

gulp.task("clean", ["clean:build"]);
gulp.task("min", ["min:js", "min:css", "min:html"]);
gulp.task('watch', function () {
    gulp.watch(paths.less, ["build"]);
});
gulp.task("build", function (cb) {
    runSequence("clean", "min", "deploy:img", cb);
});
