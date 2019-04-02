const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// 编译less
gulp.task('css', function () {
    gulp.src('../src/css/index.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('cmp-basic.css'))
        .pipe(gulp.dest('../dist/css'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp.src('../src/fonts/*.*')
        .pipe(gulp.dest('../dist/fonts'));
});

gulp.task('default', ['css', 'fonts']);
