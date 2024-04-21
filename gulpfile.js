const { src, dest, watch, series } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const typescript = require('gulp-typescript');

// Пути к исходным файлам и результатам сборки
const paths = {
    styles: {
        src: 'src/scss/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/*.js',
        dest: 'dist/js/'
    }
};

// Компиляция Sass
function compileSass() {
    return src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

// Компиляция JavaScript
function compileJavaScript() {
    return src('src/js/*.js')
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

// Запуск сервера и слежение за файлами
function serve() {
    browserSync.init({
        server: './'
    });

    watch(paths.styles.src, compileSass);
    watch(paths.scripts.src, compileJavaScript);
    watch('*.html').on('change', browserSync.reload);
}

exports.default = series(
    compileSass,
    compileJavaScript,
    serve
);