var gulp = require('gulp'); 
var concat = require('gulp-concat');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var minifyHTML = require('gulp-minify-html');
var ngmin = require('gulp-ngmin');
var gutil = require('gulp-util');
var lib    = require('bower-files')();

// minify new or changed HTML pages
gulp.task('minify-html', function() {
 var opts = {empty:true, quotes:true};
 var htmlPath = {htmlSrc:'public/partials/*.html', htmlDest:'build/public/partials/'};
 
  return gulp.src(htmlPath.htmlSrc)
    .pipe(changed(htmlPath.htmlDest))
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(htmlPath.htmlDest));
});

gulp.task('minify-css', function() {
var cssPath = {cssSrc:['./public/css/*.css', '!*.min.css', '!/**/*.min.css'], cssDest:'public'};
 
  return gulp.src(cssPath.cssSrc)
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(cssPath.cssDest));
});

gulp.task('js', function() {
var jsPath = {jsSrc:['./public/js/main.js','./public/js/**/*.js'], jsDest:'public'};
  gulp.src(jsPath.jsSrc)
    .pipe(concat('ngscripts.js'))
    .pipe(stripDebug())
    .pipe(uglify({mangle: false}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(jsPath.jsDest));
});

gulp.task('bower', function () {
	gulp.src('./public/vendor/**/*.min.js')
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['minify-html', 'minify-css', 'js'], function() {
  // watch for HTML changes
  gulp.watch('.public/js/partials/*.html', ['minify-html']);
  // watch for JS changes
  gulp.watch('.public/js/**/*.js', ['bundle-scripts']);
  // watch for CSS changes
  gulp.watch('./public/css/*.css', ['minify-css']);
});