// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.
require('../../bower_components/angular/angular.min');
require('../../bower_components/angular-route/angular-route.min');

// Create your app
angular.module('myApp', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  // Specify routes to load our partials upon the given URLs
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
