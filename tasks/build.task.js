'use strict';
const runSequence = require('run-sequence');
module.exports = gulp => {
    gulp.task('build', done => {
        runSequence(
            'clean', [
        'style',
        'javascript'
    ],
            'html',
            'copy',
            'browser-sync-reload',
            'lint',
            done
        );
    });
    gulp.task('build::prod', done => {
        runSequence(
            'clean', [
      'style:prod',
      'javascript:prod'
    ],
            'html:prod',
            'copy::prod',
            done
        );
    });
};
