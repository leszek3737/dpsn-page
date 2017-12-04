const config = require('./config');
const runSequence = require('run-sequence');
module.exports = gulp => {
    gulp.task('copyImg', () => {
        return gulp.src(config.glob.img)
            .pipe(gulp.dest(config.path.img));
    });
    gulp.task('copyFonts', () => {
        return gulp.src(config.glob.fonts)
            .pipe(gulp.dest(config.path.fonts));
    });

    gulp.task('copy', done => {
        runSequence(
            'copyImg',
            'copyFonts',
            done
        );
    });
    gulp.task('copy::prod', done => {
        runSequence(
            'copyMinImg::prod',
            'copyFonts',
            done
        );
    });
}
