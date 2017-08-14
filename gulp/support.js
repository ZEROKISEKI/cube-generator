import gulp from 'gulp'
import { Path, Package } from './config'
import path from 'path'
import fs from 'fs'

(function () {
    'use strict'

    gulp.task('config', () => {
        return gulp.src('./_config.yml')
            .pipe(gulp.dest(Path.theme))
    })

    gulp.task('package', () => {
        try {
            fs.writeFileSync(path.join(Path.theme, 'package.json'), JSON.stringify(Package, null, 2))
        } catch(err) {
            throw err
        }
    })

})()