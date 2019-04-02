const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

// 编译less
gulp.task('css', function () {
    gulp.src(['../src/css/index.css', '../dist/css/desktop.min.css'])
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(concat('desktop.min.css'))
        .pipe(gulp.dest('../dist/css'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp.src('../src/fonts/*.*')
        .pipe(gulp.dest('../dist/fonts'));
});

gulp.task('default', ['css', 'fonts']);
