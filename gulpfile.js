"use strict"

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
//var reactify = require('reactify');
//var source = require('vinyl-source-stream');
var less = require('gulp-less');
var path = require('path');
//var concat = require('gulp-concat');
var ts = require('gulp-typescript');




var config = {
    port: process.env.PORT || 9006,
    devBaseUrl: 'http:localhost',
    paths: {
        html : './src/*.html',
        js: './src/**/*.js',
        less: './src/less/*.less',
        dist: './dist', 
        mainJs: './src/fashion.js',
        img: './src/images/*'
    }
}

gulp.task('connect', function () {
    connect.server({
        root:['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
    .pipe(open({
        uri: config.devBaseUrl + ':' + config.port + '/'
    }));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('img', function() {
    gulp.src(config.paths.img)
    .pipe(gulp.dest(config.paths.dist + '/images'));
});

gulp.task('ts', function () {
    return gulp.src('src/tsd/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest(config.paths.dist + '/scripts'));
});
// gulp.task('js', function() {
//     browserify(config.paths.mainJs)
//         .transform(reactify)
//         .bundle()
//         .on('error', console.error.bind(console))
//         .pipe(source('fashion.js'))
//         .pipe(gulp.dest(config.paths.dist + '/scripts'))
//         .pipe(connect.reload());
// });

gulp.task('less', function () {
  return gulp.src(config.paths.less)
    .pipe(less({
        paths: [ path.join(__dirname,  'includes') ]
    }))
    .pipe(gulp.dest(config.paths.dist + '/styles'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.less, ['less']);
    gulp.watch(config.paths.img, ['img']);
});

gulp.task('default', ['html', 'ts', 'less', 'img', 'open', 'watch']);

