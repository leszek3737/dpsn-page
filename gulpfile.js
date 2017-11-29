'use strict';
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
$.loadSubtasks('tasks/**/*.task.js', $);
gulp.task('default', done => {
    runSequence(
        "build",
        'browser-sync',
        'watch',
        done
    )
});
