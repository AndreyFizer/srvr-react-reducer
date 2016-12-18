/*eslint indent:0*/
module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      options: {
        browserifyOptions: {
          paths: [
            './public/src/js',
            './public/src'
          ],
          debug: true
        }
      },
      dist   : {
        options: {
          transform: [
            ['babelify', {'presets': ['es2015', 'react']}]
          ]
        },
        files  : {
          'public/build/js/bundle.js': ['public/src/js/index.js']
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
  
};
