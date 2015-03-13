var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    templateCache = require('gulp-angular-templatecache'),
    minifyCss = require('gulp-minify-css'),
    ngmin = require('gulp-ngmin'),
    inject = require('gulp-inject'),
    rev = require('gulp-rev'),
    clean = require('gulp-clean'),
    gulpSequence = require('gulp-sequence');

gulp.task('views', function() {
  return gulp.src('./public/partials/*.html')
      .pipe(templateCache({
         module: 'myblog'
      }))
      .pipe(gulp.dest('./.tmp/js'));
});

gulp.task('clean_all', function () {
  return gulp.src(['.tmp/','dist/'], {read: false})
             .pipe(clean());
});
 
gulp.task('clean_tmp', function () {
  return gulp.src('./.tmp/', {read: false})
             .pipe(clean());
});

gulp.task('usemin', ['views'], function() {
  gulp.src('./app/views/index.ejs')
      .pipe(inject(gulp.src('../.tmp/js/templates.js', {read: false}),
        {
          relative: false,
          starttag: '<!-- inject:templates:js -->',
          ignorePath: 'app'
        }
      ))
      .pipe(usemin({
      	  assetsDir: './public/',
          css:     [minifyCss(), rev()],
          html:    [minifyHtml({ empty: true })],
          js:      [ngmin(), uglify(), rev()],
          js_lib:  [uglify(), rev()]
      }))
      .pipe(gulp.dest('../dist/'));
});

gulp.task('build', gulpSequence('clean_all', 'usemin', 'clean_tmp'));