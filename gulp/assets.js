import gulp from 'gulp'
import path from 'path'
import { Path } from './config'

(function () {
    'use strict'

    gulp.task('fonts', () => {
        return gulp.src(path.join(Path.source, '/fonts/**/*.*'))
            .pipe(gulp.dest(path.join('..', Path.theme, Path.source, '/fonts')))
    })

    gulp.task('languages', () => {
        return gulp.src(path.join(Path.languages, '/*.yml'))
            .pipe(gulp.dest(path.join('..', Path.theme, Path.languages)))
    })

    gulp.task('img', () => {
        return gulp.src(path.join(Path.source, '/images/**/*.*'))
            .pipe(gulp.dest(path.join('..', Path.theme, Path.source, '/images')))
    })

    gulp.task('music', () => {
        return gulp.src(path.join(Path.source, '/music/**/*.*'))
            .pipe(gulp.dest(path.join('..', Path.theme, Path.source, '/music')))
    })

    gulp.task('lrc', () => {
        return gulp.src(path.join(Path.source, '/lrc/**/*.*'))
            .pipe(gulp.dest(path.join('..', Path.theme, Path.source, '/lrc')))
    })

    gulp.task('assets', ['fonts', 'languages', 'img', 'music', 'lrc'], () => {

    })

})()