import gulp from 'gulp'
import requireDir from 'require-dir'
import del from 'del'
import path from 'path'
import childProcess from 'child_process'

(function () {
    'use strict'

    const tasks = requireDir('./gulp')

    gulp.task('build', ['inject', 'assets', 'config'], () => {
        gulp.start('package')
        return gulp.src('./cube/**/*.*')
            .pipe(gulp.dest('../cube'))
    })

    gulp.task('clean', () => {
        return del('./cube')
    })

    gulp.task('default', ['build'], () => {
        gulp.start('clean')
    })

    gulp.task('watch', ['default'], () => {
        gulp.watch([
            path.join('./layout/**/*.ejs'),
            path.join('./languages/*.yml'),
            path.join('./source/sass/**/*.scss'),
            path.join('./source/js/**/*.js'),
            path.join('./_config.yml')
        ], (event) => {
            gulp.start('default')
            childProcess.exec('cd ../.. & hexo clean & hexo g', (err) => {
                if (err) console.log('产生错误', err)
                console.log('请执行hexo s开启服务器查看效果')
            })
            // event.type === 'changed'
        })
    })

})()