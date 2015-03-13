var gulp = require('gulp'); 
var concat = require('gulp-concat');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
 
// include plug-ins
var changed = require('gulp-changed');
var minifyHTML = require('gulp-minify-html');
 
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
var cssPath = {cssSrc:['./public/css/*.css', '!*.min.css', '!/**/*.min.css'], cssDest:'./build/public/css/'};
 
  return gulp.src(cssPath.cssSrc)
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(cssPath.cssDest));
});