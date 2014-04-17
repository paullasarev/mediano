// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.

require('../../bower_components/jquery/jquery.min');

require('../../bower_components/angular/angular.min');
require('../../bower_components/angular-route/angular-route.min');
require('../../bower_components/angular-animate/angular-animate.min');
require('../../bower_components/angular-sanitize/angular-sanitize');
require('../../bower_components/angular-elastic/elastic');

//bootstrap plugins
require('../../bower_components/bootstrap/js/dropdown');
require('../../bower_components/bootstrap/js/transition');
require('../../bower_components/bootstrap/js/collapse');

require('../../bower_components/angular-strap/dist/angular-strap.min');
require('../../bower_components/angular-strap/dist/angular-strap.tpl.min');

var controllers = require("./controllers");
var services = require("./services");

// Create your app module
var medianoApp = angular.module('medianoApp', [
  'ngRoute',
  'mgcrea.ngStrap',
  'ngSanitize',
  'monospaced.elastic'
]);

medianoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:articleId/view', {
    templateUrl: 'partials/view.html',
    controller: 'ViewController'
  });
  $routeProvider.when('/:articleId/edit', {
    templateUrl: 'partials/edit.html',
    controller: 'EditController'
  });
  $routeProvider.otherwise({
    redirectTo: '/main/view'
  });

}]);

medianoApp.controller('NavController', [
  '$scope',
  '$rootScope',
  controllers.NavController
]);

medianoApp.controller('ViewController', [
  '$scope',
  'ArticleService',
  '$routeParams',
  '$rootScope',
  controllers.ViewController
]);

medianoApp.controller('EditController', [
  '$scope',
  'ArticleService',
  '$routeParams',
  '$rootScope',
  controllers.EditController
]);

medianoApp.service('ArticleService', [
  '$rootScope',
  services.ArticleService
]);
