
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
    $scope.Changed();
  };

  $scope.insertText = function(text) {
    // $scope.content += text;
    $rootScope.$broadcast('insertContent', text);
    $scope.Changed();
  };

  $scope.toolH3 = function() {
    $scope.insertText('\n### (Header)');
  };

  $scope.toolH2 = function() {
    $scope.insertText('\n## (Header)');
  };

  $scope.toolUL = function() {
    $scope.insertText('\n* (item)');
  };

  $scope.toolOL = function() {
    $scope.insertText('\n1. (item)');
  };

  $scope.toolB = function() {
    $scope.insertText('**(bold)**');
  };

  $scope.toolI = function() {
    $scope.insertText('*(italic)*');
  };

  $scope.toolLNK = function() {
    $scope.insertText('[(text)]()');
  };

  $scope.toolHREF = function() {
    $scope.insertText('[(text)](http://example.com)');
  };

  $scope.toolIMG = function() {
    $scope.insertText('![(alt text)](img.png)');
  };

  $scope.toolCOD = function() {
    $scope.insertText('\n```\n(var sum = amount + 1;)\n```');
  };

  $scope.toolCIT = function() {
    $scope.insertText('\n> (Lorem ipsum dolor sit amet, consectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.)');

  };

  $scope.toolTBL = function() {
    $scope.insertText('\n\n'
        + '|(Left-Aligned  | Center Aligned  | Right Aligned|\n'
        + '| :------------ |:---------------:| -----:|\n'
        + '| col 3 is      | some wordy text | $1600 |\n'
        + '| col 2 is      | centered        |   $12 |\n'
        + '| zebra stripes | are neat        |    $1)|\n'
        + '~(|---|\n'
        + '|...|\n)'
    );    
  };

};
