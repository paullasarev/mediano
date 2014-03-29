
module.exports = function (broccoli) {
	var less = require('broccoli-less');
	var browserify = require('broccoli-browserify');

	var appCss = broccoli.makeTree('app/css');
	appCss = less(appCss, {
        paths: ["bower_components/bootstrap/less"],
          //compress: true,
          //yuicompress: true,
        cleancss: true,
          //sourceMap: true,
		filename: 'app/css/app.less',
  	});

	var appJs =  = broccoli.makeTree('app/js');
	appJs = browserify(appJs, options);
};
