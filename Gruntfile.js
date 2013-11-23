
module.exports = function(grunt) {
  grunt.initConfig({
    clean: [ 'public/*', 'public/!.gitkeep' ],
    browserify: {
      js: {
        // A single entry point for our app
        src: 'app/js/app.js',
        // Compile to a single file to add a script tag for in your HTML
        dest: 'public/js/app.js',
      },
    },
    copy: {
      all: {
        // This copies all the html and css into the public/ folder
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', '**/*.css', 'img/*'],
        dest: 'public/',
      },
    },
    watch: {
      //files: ['app/**/*.js', 'shared/**/*.js', 'client/**/*.html', 'client/**/*.css'],
      files: ['app/**/*'],
      tasks: ['browserify', 'copy'],
      options: {
          livereload: true
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          watchedFolders: ['public', 'routes', 'views', 'app.js'],
          delayTime: 1
        }
      }
    },
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }    
  });

  // Load the npm installed tasks
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  // The default tasks to run when you type: grunt
  grunt.registerTask('default', ['clean', 'browserify', 'copy']);
};