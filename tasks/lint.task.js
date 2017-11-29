'use strict';
const $ = require('gulp-load-plugins')();
const config = require('./config');
const runSequence = require('run-sequence');
module.exports = gulp => {
    gulp.task("javascript-lint", () => {
        return gulp.src(config.concatOrder.js)
            .pipe($.eslint())
            .pipe($.eslint.format())
    })
    gulp.task("html-lint", () => {
        return gulp.src('./src/*.html')
            .pipe($.htmllint({}, htmllintReporter));
    });

    function htmllintReporter(filepath, issues) {
        if (issues.length > 0) {
            issues.forEach(function (issue) {
                $.util.log($.util.colors.cyan('[gulp-htmllint] ') + $.util.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + $.util.colors.red('(' + issue.code + ') ' + issue.msg));
            });
            process.exitCode = 1;
        }
    }
    gulp.task("sass-lint", () => {
        return gulp.src(config.glob.scss)
            .pipe($.sassLint())
            .pipe($.sassLint.format())
            .pipe($.sassLint.failOnError())
    })
    gulp.task("lint", done => {
        runSequence(
            "javascript-lint",
            "html-lint",
            "sass-lint",
            done
        )
    })
}
