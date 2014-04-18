
module.exports.NavController = function($scope, $rootScope) {
  $scope.currentArticle = function() {
    return $rootScope.currentArticle;
  };
};

module.exports.ViewController = function($scope, ArticleService, $routeParams, $rootScope) {

  $scope.fillPage = function(article) {
    $scope.content = article.content;
    $scope.html = article.html;
    $rootScope.currentArticle = $routeParams.articleId;
  }

  $scope.newPage = function() {
    //var art = {content : "new page", html : "<p>new page</p>"};
    var art = ArticleService.newPage($routeParams.articleId);
    $scope.fillPage(art);
    //$scope.content = "new page";
    //$scope.html = "<p>new page</p>";
  }

  var article = ArticleService.getArticle($routeParams.articleId);
  $scope.fillPage(article);
};


module.exports.EditController = function($scope, ArticleService, $routeParams, $rootScope) {

  var article = ArticleService.getArticle($routeParams.articleId);
  $scope.content = article.content;
  $scope.html = article.html;
  $rootScope.currentArticle = $routeParams.articleId;

//  $scope.$on('$viewContentLoaded', editViewLoaded);
  $scope.Changed = function() {
    $scope.html = ArticleService.md2html($scope.content);
};

  $scope.SavePage = function() {
    //console.log("SavePage: id:" + $routeParams.articleId + " content: " + $scope.content);
    ArticleService.setArticle($routeParams.articleId, $scope.content);
  };

  $scope.CancelPage = function() {
    var article = ArticleService.getArticle($routeParams.articleId);
    $scope.content = article.content;
  };

};
