let gulp = require('gulp');
let sourceMap = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let autoPrefix = require('gulp-autoprefixer');
let concat = require('gulp-concat');
let cleanCss = require('gulp-clean-css');
let prodOrDev = require('gulp-if');
let browserSync = require('browser-sync').create();


let config = {
    path: {
        scss: './src/scss/**/*.scss',
        html: './public/index.html',
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public',
    },
    isDevelop: true,
};

gulp.task('scss', function () {
    return gulp.src(config.path.scss)
        .pipe(prodOrDev(config.isDevelop, sourceMap.init()))
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoPrefix('last 2 versions'))
        .pipe(prodOrDev(!config.isDevelop, cleanCss()))
        .pipe(prodOrDev(config.isDevelop, sourceMap.write()))
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream())
        ;
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });
    gulp.watch(config.path.scss, gulp.series('scss'));
    gulp.watch(config.path.html).on('change', browserSync.reload);
});
gulp.task('default', gulp.series('scss', 'server'));