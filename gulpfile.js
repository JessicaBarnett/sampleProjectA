/*
  to set up in a new project:
    npm init
      //will run you through steps of creating a package.json

    npm install gulp --save-dev
      //will add gulp to said package.json

    npm install package-name package-name package-name --save-dev
      //add each of your required packages to package.json

*/

var gulp = require('gulp');

var sass = require('gulp-sass');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var express = require('express');


/**** Front-end Tasks ****/

gulp.task('sass', function () {
  gulp.src('./stylesheets/' + 'style.scss')
  .pipe(sass({errLogToConsole: true}))
  .pipe(gulp.dest('./stylesheets/'));
});


gulp.task('templates', function(){
  gulp.src('./templates/*.handlebars')
  .pipe(handlebars())
  .pipe(wrap('Handlebars.template(<%= contents %>)'))
  .pipe(declare({  //this gives the template a name I can access in the js
    namespace: 'App.templates',
    noRedeclare: true, // Avoid duplicate declarations
  }))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest('./scripts/'));
});


/**** Back-end tasks ****/

gulp.task('express', function() {
  var app = express();
  app.use(express.static(__dirname));
  app.listen(4000);
});

/**** Watch tasks ****/

// gulp.task('sassWatch', ['sass'], function() {
//   gulp.watch('stylesheets/*.scss', ['sass']);
// });
//
//
// gulp.task('templateWatch', ['templates'], function() {
//   gulp.watch('./templates/*.handlebars', ['templates']);
// });


/**** Default ****/


gulp.task('default', ['sass', 'templates', 'express'/*, 'sassWatch', 'templateWatch'*/], function() {

  // watch for Sass changes
  gulp.watch('./stylesheets/*.scss', function() {
    gulp.run('sass');
  });

  // watch for Template changes
  gulp.watch('./templates/*.handlebars', function() {
    gulp.run('templates');
  });


});
