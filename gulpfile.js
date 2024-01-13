const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/css/',
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/',
    },
    images: {
        src: 'src/img/**/*.jpg',
        dest: 'dist/img/',
    },
}
function clean () {
    return del(['dist']);
}
function watch () {
    gulp.watch(paths.styles.src, makeStyles)
    gulp.watch(paths.scripts.src, makeScripts)
}
function makeStyles () {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest));
}
function makeScripts () {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scripts.dest));
}
function makeImages () {
   return gulp.src(paths.images.src)
       .pipe(imagemin())
       .pipe(gulp.dest(paths.images.dest));
}

const build = gulp.series(clean, gulp.parallel(makeImages, makeStyles, makeScripts), watch)

exports.clean = clean;
exports.styles = makeStyles;
exports.scripts = makeScripts;
exports.images = makeImages;
exports.watch = watch;
exports.build = build;
exports.default = build;


















