const $ = require('gulp-load-plugins')();
const config = require('./config');
const runSequence = require('run-sequence');
const fs = require("fs");
const path = require('path');
var reporter = require('eslint-html-reporter');
module.exports = gulp => {
    gulp.task("javascript-lint", () => {
        return gulp.src(config.concatOrder.js)
            .pipe($.eslint())
            .pipe($.eslint.format(reporter, function (results) {
                fs.writeFileSync(path.join(__dirname, '../raports/report-results.html'), results);
            }))
    })
    gulp.task("sass-lint", () => {
        return gulp.src(config.glob.scss)
            .pipe($.sassLint())
            .pipe($.sassLint.format())
            .pipe($.sassLint.failOnError())
    })
    gulp.task("lint", done => {
        runSequence(
            "javascript-lint",
            "sass-lint",
            done
        )
    })
}
