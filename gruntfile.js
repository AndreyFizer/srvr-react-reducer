/*eslint indent:0, camelcase:0*/
module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dev: {
                options: {
                    browserifyOptions: {
                        paths: [
                            './public/src/js',
                            './public/src'
                        ],
                        debug: true
                    },
                    transform        : [
                        ['babelify', {'presets': ['es2015', 'react']}]
                    ]
                },
                files  : {
                    'public/build/js/bundle.js': ['public/src/js/index.js']
                }
            }
        },
        
        notify: {
            n_bfy: {
                options: {
                    title  : 'Browserify',
                    message: 'Bundle.js was successfully generated...',
                }
            }
        },
        
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files  : {
                    'public/build/css/main.css': 'public/src/scss/materialize.scss'
                }
            }
        }
        
    });
    
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-notify');
    
    grunt.registerTask('build', ['browserify:dev', 'notify:n_bfy'])
    
};
