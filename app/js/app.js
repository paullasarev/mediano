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

//require('../../lib/expanding');

// Create your app module
var medianoApp = angular.module('medianoApp', ['ngRoute', 'mgcrea.ngStrap', 'ngSanitize', 'monospaced.elastic']);

medianoApp.config(['$routeProvider', function($routeProvider) {
  // Specify routes to load our partials upon the given URLs
  $routeProvider.when('/:articleId/view', {templateUrl: 'partials/view.html', controller: 'ViewController'});
  $routeProvider.when('/:articleId/edit', {templateUrl: 'partials/edit.html', controller: 'EditController'});
  $routeProvider.otherwise({redirectTo: '/main/view'});
}]);

medianoApp.controller('NavController', function($scope, $rootScope) {
  $scope.currentArticle = function() {
    return $rootScope.currentArticle;
  };
});

medianoApp.controller('ViewController', function($scope, ArticleService, $routeParams, $rootScope) {
  var article = ArticleService.getArticle($routeParams.articleId);
  $scope.content = article.content;
  $scope.html = article.html;
  $rootScope.currentArticle = $routeParams.articleId;

  $scope.newPage = function() {
    $scope.content = "new page";
    $scope.html = "<p>new page</p>";
  }
});

var editViewLoaded = function () {
//  $("#contentGroup").height($(document).height() - 100);
//	$("#contentGroup").expanding();
};

medianoApp.controller('EditController', function($scope, ArticleService, $routeParams, $rootScope) {

  var article = ArticleService.getArticle($routeParams.articleId);
  $scope.content = article.content;
  $scope.html = article.html;
  $rootScope.currentArticle = $routeParams.articleId;

  $scope.$on('$viewContentLoaded', editViewLoaded);

  $scope.SavePage = function() {
    //console.log("SavePage: id:" + $routeParams.articleId + " content: " + $scope.content);
    ArticleService.setArticle($routeParams.articleId, $scope.content);
  };

  $scope.CancelPage = function() {
    var article = ArticleService.getArticle($routeParams.articleId);
    $scope.content = article.content;
  };

});

var Articles={};

medianoApp.service('ArticleService', function() {
    this.getArticle = function(id) {
      //console.log("getArticle:Articles: " + JSON.stringify(Articles));
      return Articles[id];
    };

    this.md2html = function(content){
      return '<p>' + content + '</p>';
    };

    this.setArticle = function(id, content) {
      var article = {id:id, content:content, html:this.md2html(content)};
      //console.log("setArticle: " + JSON.stringify(article));
      Articles[id] = article;
      //console.log("setArticle:Articles: " + JSON.stringify(Articles));
    };

    this.setArticle('main', 'main page');
});

// $(document).ready(function(){
//     $(window).resize(editViewLoaded);
// });
