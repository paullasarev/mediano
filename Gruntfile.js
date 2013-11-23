
module.exports = function(grunt) {
  grunt.initConfig({
    clean: [ 'public/*', 'public/!.gitkeep' ],
    browserify: {
      js: {
        // A single entry point for our app
        src: 'app/js/app.js',
        // Compile to a single file to add a script tag for in your HTML
        dest: 'public/js/app.js',
        //debug: true,
      },
    },
    less: {
      dev: {
        options: {
          paths: ["node_modules/twitter-bootstrap-3.0.0/less"],
          compress: false,
          yuicompress: false,
        },
        files: {
          "public/css/app.css": "app/css/app.less"
        }
      },
    },
    copy: {
      all: {
        // This copies all the html and css into the public/ folder
        expand: true,
        cwd: 'app/',
        //src: ['**/*.html', '**/*.css', 'img/*'],
        src: ['**/*.html', 'img/*'],
        dest: 'public/',
      },
    },
    watch: {
      //files: ['app/**/*.js', 'shared/**/*.js', 'client/**/*.html', 'client/**/*.css'],
      files: ['app/**/*', 'routes/*', 'views/*', 'app.js'],
      tasks: ['browserify', 'copy', 'less:dev'],
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
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  // The default tasks to run when you type: grunt
  //grunt.registerTask('default', ['clean', 'browserify', 'copy', 'less']);
  grunt.registerTask('default', ['clean', 'browserify', 'copy', 'less:dev', 'concurrent']);
};