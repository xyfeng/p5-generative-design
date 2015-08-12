var gulp = require('gulp');
var data = require('gulp-data');
var rename = require("gulp-rename");
var util = require('gulp-util');
var browserSync = require('browser-sync');
var del = require('del');
var fs = require('fs');
var path = require('path');

gulp.task('default', ['generate']);

/* WATCH */
gulp.task('watch', ['default'], function() {
    gulp.watch(['src/**/*.*'], ['generate']);
});

/* SYNC */
gulp.task('sync', ['default'], function() {
    browserSync({
        server: {
            baseDir: 'dist/',
            directory: true
        },
        notify: false,
        reloadDebounce: 2000
    });
    gulp.watch(['src/**/*.*'], ['generate', browserSync.reload]);
});

var copyright = '//\n// Generative Gestaltung, ISBN: 978-3-87439-759-9\n// First Edition, Hermann Schmidt, Mainz, 2009\n// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni\n// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni\n//\n// http://www.generative-gestaltung.de\n//\n// Licensed under the Apache License, Version 2.0 (the "License");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an "AS IS" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n';

gulp.task('clean', function() {
    var deletedFiles = del.sync(['dist/**/*.*']);
    return util.log('Files deleted:', deletedFiles);
});

gulp.task('generate', ['clean'], function() {
    return gulp.src(['src/**/*.js', '!src/libraries/**/*.*'])
    .pipe(data(function(file){
        var content = String(file.contents);
        content = copyright + content;
        content = '// ' + path.basename(file.path, '.js') + '\n' + content;
        file.contents = new Buffer(content);
    }))
    .pipe(rename(function(filepath) {
        filepath.dirname += "/" + filepath.basename;
        filepath.basename = "sketch";

        // copy index
        gulp.src(['src/index.html'])
            .pipe(data(function(file){
                var content = String(file.contents);
                content = content.replace('Untitled', filepath.dirname.split('/')[1]);
                file.contents = new Buffer(content);
            }))
            .pipe(gulp.dest('dist/' + filepath.dirname))
        // copy libraries
        gulp.src(['src/libraries/**/*.*'])
            .pipe(gulp.dest('dist/' + filepath.dirname + '/libraries'))
    }))
    .pipe(gulp.dest('dist/'));
});
