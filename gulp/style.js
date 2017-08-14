import gulp from 'gulp'
import Sass from 'gulp-sass'
import Inject from 'gulp-inject'
import { Path, Markdown } from './config'
import path from 'path'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cleanCss from 'gulp-clean-css'

(function () {
    'use strict'

    gulp.task('buildStyle', ['buildMarkdown'], buildStyle)

    gulp.task('buildMarkdown', buildMarkdown);

    function buildMarkdown() {
        const injectFiles = gulp.src(path.join(Path.source, 'sass/highlight', `${Markdown}.scss`),{
            read: false
        });

        const injectOptions = {
            transform(filePath) {
                filePath = filePath.replace(`${Path.source}/sass/`, '');
                return `@import "${filePath}";`
            },
            starttag: '// injector:markdown',
            endtag: '// endinjector:markdown',
            addRootSlash: false
        }

        return gulp.src(path.join(Path.source, '/sass/_markdown.scss'))
            .pipe(Inject(injectFiles, injectOptions))
            .pipe(gulp.dest(path.join(Path.source, '/sass')))
    }

    function buildStyle() {
        const injectFiles = gulp.src([
            path.join(Path.source, 'sass/*.scss'),
            '!' + path.join(Path.source, 'sass/highlight/*.scss'),
            '!' + path.join(Path.source, 'sass/lightgallery/*.scss'),
            '!' + path.join(Path.source, '/sass/style.scss')
        ], { read: false })

        const injectOptions = {
            transform(filePath) {
                filePath = filePath.replace(`${Path.source}/sass/`, '');
                filePath = filePath.replace('_', '');
                return `@import "${filePath}";`
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        }

        return gulp.src(path.join(Path.source, '/sass/style.scss'))
            .pipe(Inject(injectFiles, injectOptions))
            .pipe(Sass())
            .pipe(postcss([ autoprefixer() ]))
            .pipe(cleanCss({debug: true}))
            .pipe(gulp.dest(path.join(Path.theme, Path.source, '/css')))
    }

})()