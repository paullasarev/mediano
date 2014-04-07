describe('Unit: EditController', function() {
  // Load the module with ViewController
  //beforeEach(module('medianoApp'));
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
    ctrl = $controller('EditController', {
      $scope: scope
    });
  }));

  it('should load article from ArticleService', 
    function() {
      expect(scope.content).toBeDefined();
      expect(scope.html).toBeDefined();
      expect(scope.content).toEqual(FakeArticle.content);
      expect(scope.html).toEqual(FakeArticle.html);
  });


})