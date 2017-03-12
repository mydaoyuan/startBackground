let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat')

/**
 * BrowserSync config
 */
let serveConfig = {
  files: [
    'src/**/*.html',
    'src/js/**/*.js',
    'src/api/**/*.json',
    'src/img/*.{png|gif}',
    'src/view/sass/*.scss',
    'src/font/iconfont.{svg|ttf}'
  ],
  server: {
    baseDir: './'
    // middleware: function (req, res, next) {
    //   console.log(req);
    //   console.log("Hi from middleware");
    //   next();
    // }
  },
  open: false,
  notify: false,
  logPrefix: 'moas'
};

gulp.task('css', function() {
  return gulp.src('src/view/**/*.scss', {base: 'sass' })
          .pipe(sourcemaps.init())
          .pipe(sass({outputStyle: 'expanded'}))
          .pipe(concat('app.css'))
          .pipe(gulp.dest('static'));
})

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
          .pipe(sourcemaps.init())
          .pipe(concat('app.js'))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('static'))
})

gulp.task('watch', function() {
  gulp.watch('src/view/**/*.scss', ['css']);
  gulp.watch('src/js/*.js', ['js']);
})

gulp.task('browser-sync', function () {
  browserSync(serveConfig);
});

gulp.task('default', ['css', 'js', 'watch', 'browser-sync']);
