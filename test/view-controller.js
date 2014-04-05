describe('Unit: ViewController', function() {
  var FakeArticle = {content: 'asdf', html: '<p>asdf</p>'};
  var FakeArticleService;

  beforeEach(function(){
    module('medianoApp', function($provide){
    FakeArticleService = {
      getArticle: function(id) {
          return FakeArticle;
        },
      };

    $provide.value('ArticleService', FakeArticleService);
    });
  });

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('ViewController', {
      $scope: scope
    });
  }));

  it('should create $scope.content and html when init', 
    function() {
      expect(scope.content).toBeDefined();
      expect(scope.html).toBeDefined();
      expect(scope.content).toEqual(FakeArticle.content);
      expect(scope.html).toEqual(FakeArticle.html);
  });

  it('should create $scope.content when calling newPage', 
    function() {
      scope.newPage();
      expect(scope.content).toEqual("new page");
      expect(scope.html).toEqual("<p>new page</p>");
  });


})