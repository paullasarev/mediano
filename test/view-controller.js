describe('Unit: ViewController', function() {
  var FakeArticleService;
  var $provide;
  var scope;

  beforeEach(module('medianoApp'));

  beforeEach(function(){
    module('medianoApp', function(_$provide_){
      $provide = _$provide_;
    });
  });

  beforeEach(function(){
    inject(function($injector, _FakeArticleService_) {

      $provide.value('ArticleService', _FakeArticleService_);
      FakeArticleService = _FakeArticleService_;

    });
  });

  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // inject the controller scope
    $controller('ViewController', {
      $scope: scope
    });
  }));

  it('should create $scope.content and html when init', 
    function() {
      expect(scope.content).toBeDefined();
      expect(scope.html).toBeDefined();
      expect(scope.content).toEqual(FakeArticleService.lastArticle().content);
      expect(scope.html).toEqual(FakeArticleService.lastArticle().html);
  });

  it('should create $scope.content when calling newPage', 
    function() {
      scope.newPage();
      expect(scope.content).toEqual("new page");
      expect(scope.html).toEqual("<p>new page</p>");
  });

})