import gulp from 'gulp'
import Inject from 'gulp-inject'
import { Path } from './config'
import path from 'path'

(function () {
    'use strict'

    gulp.task('injectStyle', ['buildStyle'], () => {
        const injectStyle = gulp.src(path.join(Path.theme, Path.source,'/css/style.css'), {
            read: false
        })

        const injectOptions = {
            starttag: '<!-- inject:style -->',
            addRootSlash: false,
            transform(filePath) {
                return `<link href="<%- url_for('css/${filePath}') %>" rel="stylesheet" type="text/css">`
            },
            ignorePath: path.join(Path.theme, Path.source, 'css')
        }

        return gulp.src(path.join(Path.layout, '/_partial/head.ejs'))
            .pipe(Inject(injectStyle, injectOptions))
            .pipe(gulp.dest(path.join(Path.theme, Path.layout, '/_partial')))
    })

    gulp.task('injectScript', ['buildScript'], () => {
        const injectScript = gulp.src(path.join(Path.theme, Path.source, '/js/script.js'), {
            read: false
        })

        const injectOptions = {
            starttag: '<!-- inject:script -->',
            addRootSlash: false,
            transform(filePath) {
                return `<script src="<%- url_for('js/${filePath}') %>"></script>`
            },
            ignorePath: path.join(Path.theme, Path.source, 'js')
        }

        return gulp.src(path.join(Path.layout, '/layout.ejs'))
            .pipe(Inject(injectScript, injectOptions))
            .pipe(gulp.dest(path.join(Path.theme, Path.layout)))
    })

    gulp.task('inject', ['injectStyle', 'injectScript'], () => {
        return gulp.src([
            '!' + path.join(Path.layout, '/layout.ejs'),
            '!' + path.join(Path.layout, '/_partial/head.ejs'),
            path.join(Path.layout, '/**/*.ejs')
        ]).pipe(gulp.dest(path.join(Path.theme, Path.layout)))
    })

})()