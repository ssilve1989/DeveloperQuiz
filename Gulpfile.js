/**
 * Created by steve on 7/18/15.
 */
'use strict';

var config = {
	dest : 'dist'
};

var gzip_config = {
    src : config.dest + '/**/*.{html, css, js, json}',
    dest : config.dest,
    options : {}
};

var gulp = require('gulp');
var usemin = require('gulp-usemin');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('del');
var ngAnnotate = require('gulp-ng-annotate');
var gzip = require('gulp-gzip');

gulp.task('connect', function(){
	connect.server({
		root: ".",
		livereload : true
	});
});

gulp.task('gzip', ['usemin'], function(){
   return gulp.src(gzip_config.src)
       .pipe(gzip(gzip_config.options))
       .pipe(gulp.dest(gzip_config.dest));
});

gulp.task('connect:dist', function(){
	connect.server({
		root : './dist',
		livereload : false
	});
});

gulp.task('clean', function(){
	clean([
		config.dest + '**/*'
	]);
});

gulp.task('usemin', ['clean'], function(){
	return gulp.src('./index.html')
		.pipe(usemin({
			css : [minifyCss(), 'concat'],
			html : [minifyHtml({empty:true})],
			js : [uglify(), rev()],
			inlinejs : [uglify()],
			inlinecss : [minifyCss(), 'concat']
		})).pipe(gulp.dest(config.dest));
});

gulp.task('sass', ['clean'], function(){
	return gulp.src('./styles/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.dest + '/styles'));
});

gulp.task('copy', ['clean'], function(){
	//gulp.src('./form*.html').pipe(gulp.dest(config.dest));
	gulp.src('./bower_components/bootstrap/fonts/*.*').pipe(gulp.dest(config.dest + '/fonts'));
    gulp.src('./bower_components/fontawesome/fonts/*.*').pipe(gulp.dest(config.dest + '/fonts'));
	gulp.src('./data/**.*').pipe(gulp.dest(config.dest + '/data'));
    gulp.src('./views/**/*').pipe(gulp.dest(config.dest + '/views'));
	return gulp.src('./scripts/*.js').pipe(ngAnnotate()).pipe(uglify()).pipe(gulp.dest(config.dest + '/scripts'));
});


gulp.task('serve', ['connect']);

gulp.task('build', ['clean', 'copy', 'usemin', 'sass', 'gzip', 'connect:dist']);
gulp.task('heroku-build', ['clean', 'copy', 'usemin', 'sass']);