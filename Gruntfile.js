
module.exports = function(grunt) {
  grunt.initConfig({
    clean: [ 'public/*', 'public/!.gitkeep' ],
    browserify: {
      js: {
        // A single entry point for our app
        src: 'app/js/app.js',
        // Compile to a single file to add a script tag for in your HTML
        dest: 'public/js/app.js',
      	options: {
          sourceMaps: true,
          bundleOptions: {
              debug: true, //generate source map
            }
      	 //transform: ['debowerify'],
      	},
      },
    },
    less: {
      dev: {
        options: {
          paths: ["bower_components/bootstrap/less"],
          //compress: true,
          //yuicompress: true,
          cleancss: true,
          //sourceMap: true,
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
      bootstrap: {
        files: [
          {expand: true, cwd: 'bower_components/bootstrap/fonts/', src: ['**'], dest: 'public/img/'}
        ]
      }
    },
    watch: {
      //files: ['app/**/*.js', 'shared/**/*.js', 'client/**/*.html', 'client/**/*.css'],
      files: ['app/**/*', 'app/partials/*.html', 'routes/*', 'views/*', 'app.js', 'Gruntfile.js'],
      tasks: ['browserify', 'copy', 'less:dev'],
      options: {
          livereload: true
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        // options: {
        //   watchedFolders: ['public', 'routes', 'views', 'app.js'],
        //   delayTime: 1
        // }
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
  //grunt.registerTask('default', ['browserify', 'copy', 'less:dev', 'nodemon']);
  grunt.registerTask('default', ['browserify', 'copy', 'less:dev', 'concurrent']);
};
