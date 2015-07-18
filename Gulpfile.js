/**
 * Created by steve on 7/18/15.
 */
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function(){
   connect.server();
});

gulp.task('serve', ['connect']);