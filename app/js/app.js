// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.

require('../../bower_components/jquery/jquery.min');

require('../../bower_components/angular/angular.min');
require('../../bower_components/angular-route/angular-route.min');
require('../../bower_components/angular-animate/angular-animate.min');

//bootstrap plugins
require('../../bower_components/bootstrap/js/dropdown');
require('../../bower_components/bootstrap/js/transition');
require('../../bower_components/bootstrap/js/collapse');

require('../../bower_components/angular-strap/dist/angular-strap.min');
require('../../bower_components/angular-strap/dist/angular-strap.tpl.min');

// Create your app
var medianoApp = angular.module('medianoApp', ['ngRoute', 'mgcrea.ngStrap']);

medianoApp.config(['$routeProvider', function($routeProvider) {
  // Specify routes to load our partials upon the given URLs
  $routeProvider.when('/view', {templateUrl: 'partials/view.html', controller: 'ViewController'});
  $routeProvider.when('/edit', {templateUrl: 'partials/edit.html', controller: 'EditController'});
  $routeProvider.otherwise({redirectTo: '/view'});
}]);

medianoApp.controller('ViewController', function($scope) {
  $scope.newPage = function() {
    $scope.content = "new page";
    $scope.html = "<p>new page</p>";
  }
});

medianoApp.controller('EditController', function($scope) {

});

