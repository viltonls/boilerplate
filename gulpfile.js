var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var base = './';
var source = base + 'sources/';
var compiled = base + 'public/';

var AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('styles', function() {
    return gulp.src(source + 'styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(csso())
    .pipe(gulp.dest(compiled + 'styles'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('vendor', function() {
    return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/grade-js/docs/dist/grade.js',
        source + 'scripts/vendor/*.js']
    ).pipe(concat('vendor.js')).pipe(gulp.dest(compiled + 'scripts'));
});

gulp.task('scripts', function() {
    return gulp.src([source + 'scripts/*.js', source + 'scripts/controllers/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(compiled + 'scripts'))
    .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('watch', ['styles', 'scripts'], function() {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(source + 'styles/**/*.scss', ['styles']);
    gulp.watch(source + 'scripts/**/*.js', ['scripts']);
    gulp.watch(base + 'views/*.html').on('change', browserSync.reload);
    gulp.watch(base + 'index.html').on('change', browserSync.reload);
});
