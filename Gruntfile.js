module.exports = function(grunt) {

    'use strict';

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                outputStyle: 'compressed'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'node_dev/scss',
                    src: ['*.scss'],
                    dest: 'assets/css',
                    ext: '.css'
                }]
            }
        },
        cssbeautifier : {
            files : ['style.css']
        },
        processhtml: {
            dist: {
                options: {
                    process: true,
                },
                files: [{
                    expand: true,
                    cwd: 'node_dev/',
                    src: ['*.html'],
                    dest: '.',
                    ext: '.html'
                }]
            }
        },
        browserSync: {
            bsFiles: {
                src: ['assets/css/*.css', 'index.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        },
        watch: {
            css: {
                files: ['node_dev/scss/*.scss'],
                tasks: ['newer:sass:dist'],
                options: {
                    spawn: false
                }
            },
            processhtml: {
                files: ['node_dev/*.html', 'node_dev/template/*.html'],
                tasks: ['processhtml'],
                options: {
                    spawn: false
                }
            },
            cssbeautifier: {
                files: ['scss/style.scss'],
                tasks: ['cssbeautifier'],
                options: {
                    spawn: false
                }
            }
        }
    };

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cssbeautifier');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-sass');

    // Register tasks
    grunt.initConfig(config);

    grunt.registerTask('default', ['sass', 'cssbeautifier', 'browserSync', 'watch']);

};
