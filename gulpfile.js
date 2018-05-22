// https://github.com/alignedleft/d3-book
const path = require('path')
const gulp = require('gulp')
const browserSync = require('browser-sync').create()


gulp.task('browsersync', () => {
  browserSync.init({
    open: false,
    server: {
      baseDir: './examples',
      directory: true
    }
  })
})

gulp.task('watch', () => {
  gulp.watch('./examples/**/*.?(html|js|css)', browserSync.reload)
})

gulp.task('dev', ['browsersync', 'watch'])