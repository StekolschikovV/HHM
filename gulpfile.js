var gulp = require('gulp')
var server = require('gulp-server-livereload')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var watch = require('gulp-watch')
var minifyCSS = require('gulp-minify-css')
var prefix = require('gulp-autoprefixer')
var htmlmin = require('gulp-htmlmin')

var srcJs = [
    './dev/script.js'
]

var srcCss = [
    './dev/lib/bootstrap-4.0.0/css/bootstrap.min.css',
    './dev/style.css'
]

var srcHtml = [
    './dev/index.html'
]

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
})

gulp.task('html', function () {
    gulp.src(srcHtml)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'));
})

gulp.task('js', function () {
    gulp.src(srcJs)
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: [
                'es2015'
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./'))
})

gulp.task('styles', function () {
    gulp.src(srcCss)
        .pipe(prefix('last 2 versions'))
        .pipe(concat('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./'))
});

gulp.task('dev', function () {
    gulp.watch(srcJs, ['js'])
    gulp.watch(srcCss, ['styles'])
    gulp.watch(srcHtml, ['html'])
    gulp.run('webserver')
})