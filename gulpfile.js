const path = require('path')
const gulp = require('gulp')
const browserSync = require('browser-sync').create()

gulp.task('browsersync', () => {
  browserSync.init({
    // 不打开浏览器
    open: false,
    server: {
      baseDir: './examples'
    }
  })
})

gulp.task('watch', () => {
  gulp.watch('./examples/**/*.?(html|js|css)', browserSync.reload)
})

gulp.task('dev', ['browsersync', 'watch'])