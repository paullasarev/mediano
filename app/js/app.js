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

// require('../../bower_components/angular-strap/dist/angular-strap.min');
// require('../../bower_components/angular-strap/dist/angular-strap.tpl.min');

//gapi
require('../../lib/gapi/client');
require('../../bower_components/ngGAPI/gapi');

// auth = require('./auth');

var controllers = require("./controllers");
var services = require("./services");
var directives = require("./directives");
var navbar = require('./navbar');


// Create your app module
var medianoApp = angular.module('medianoApp', [
  'ngRoute',
  // 'mgcrea.ngStrap',
  'ngSanitize',
  'monospaced.elastic',
  'gapi'
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

// Register controllers

medianoApp.controller('NavController', [
  '$scope',
  '$rootScope',
  'GAPI',
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
  '$location',
  'Drive',
  controllers.EditController
]);

// Register services

medianoApp.service('ArticleService', [
  '$rootScope',
  services.ArticleService
]);

// Register directives

medianoApp.directive('contentText', [
  '$rootScope',
   directives.ContentText
]);

medianoApp.directive('bsNavbar', [
  '$location',
   navbar.BsNavbar
]);

medianoApp.value('directives', directives);

//gapi config
medianoApp.value('GoogleApp', {
    apiKey: 'AIzaSyCRB5EGQxatIp2rvwbaczfgLO6yYmIyUDs',
    clientId: '694141446922-doq6g7ibrq3kpmgc0gejp28u1kaoa6dc.apps.googleusercontent.com',
    scopes: [
      // whatever scopes you need for your app, for example:
      'https://www.googleapis.com/auth/drive'
      // 'https://www.googleapis.com/auth/youtube',
      // 'https://www.googleapis.com/auth/userinfo.profile'
      // ...
    ],
    // false to show the user consent messare
    immediate: true
  });
