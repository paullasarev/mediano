
module.exports = function(grunt) {
  grunt.initConfig({
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
  });

  // Load the npm installed tasks
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // The default tasks to run when you type: grunt
  grunt.registerTask('default', ['browserify', 'copy']);
};