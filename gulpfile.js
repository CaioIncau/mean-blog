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
    gulpSequence = require('gulp-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat');



gulp.task('move',['clean_all'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src('./**', { base: './' })
  .pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
  return gulp.src('.dist/public/partials/*.html')
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

gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare: true,
    empty: false,
    comments: false,
    quotes: false
  };
 
  return gulp.src('public/partials/*.html')
  .pipe(minifyHtml(opts))
  .pipe(gulp.dest('dist/public/partials'));
});

gulp.task('css', function(){
	gulp.src('public/css/*.css')
	    .pipe(minifyCss())
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
	    .pipe(concat('style.min.css'))
    	.pipe(gulp.dest('dist/public/css'));
});

return gulp.task('js', function () {
    gulp.src(['public/js/**/*.js','public/js/*.js'])
      .pipe(uglify().on('error', gutil.log))
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist/public/js'));
});

gulp.task('usemin', ['views','html','css','js'], function() {
  gulp.src('./app/views/index.ejs')
      .pipe(inject(gulp.src('../.tmp/js/templates.js', {read: false}),
        {
          relative: false,
          starttag: '<!-- inject:templates:js -->',
          ignorePath: 'app'
        }
      ))
      .pipe(usemin({
      	  assetsDir: './dist/',
      }))
      .pipe(gulp.dest('../dist/'));
});

gulp.task('build', gulpSequence('clean_all', 'usemin', 'clean_tmp'));