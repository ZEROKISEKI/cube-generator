import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import path from 'path'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import { Path } from './config'

(function () {
    'use strict'

    const opts = Object.assign({}, watchify.args, {
        cache: {},
        packageCache: {},
        entries: path.join('./source/js/app.js'),
        debug: true
    })

    // const b = watchify(browserify(opts))
    const b = browserify({
        cache: {},
        packageCache: {},
        entries: path.join('./source/js/app.js'),
        debug: true
    })

    // TODO polyfill 兼容不支持promise等属性
    b.transform(babelify, {
        presets: ['env', 'es2015', 'stage-2'],
        plugins: [['transform-runtime', {
            'polyfill': true,
            'regenerator': true
        }]]
    })

    gulp.task('buildScript', bundle)

    // b.on('update', bundle)

    function bundle() {
        return b.bundle()
            .on('error', err => console.log(err))
            .pipe(source('script.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(path.join(Path.theme, Path.source, '/js')))
    }

})()