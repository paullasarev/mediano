describe('Unit: EditController', function() {
  // Load the module with ViewController
  //beforeEach(module('medianoApp'));
  var FakeArticle = {};
  var NewContent = 'new content';
  var FakeArticleService;
  var rootScope;

  beforeEach(function(){
    module('medianoApp', function($provide){
    FakeArticleService = {
      getArticle: function(id) {
          return FakeArticle;
      },
      setArticle: function(id, cont) {
          FakeArticle = {'id':id, 'content': cont, 'html':'<p>' + cont + '</p>'};
      },
      md2html: function(content) {
          return "<p>" + content + "</p>";
      },

      };

    FakeArticleService.setArticle('main', 'asdf');

    $provide.value('ArticleService', FakeArticleService);
    });

    inject(function($injector) {
      rootScope = $injector.get('$rootScope');
      spyOn(rootScope, '$broadcast');
    })   
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

  it('should save article to ArticleService', 
    function() {
      expect(scope.content).toEqual(FakeArticle.content);
      scope.content = NewContent;
      scope.SavePage();
      expect(FakeArticle.content).toEqual(NewContent);
  });

  it('CancelPage should restore article from ArticleService', 
    function() {
      expect(scope.content).toEqual(FakeArticle.content);
      scope.content = NewContent;
      scope.CancelPage();
      expect(scope.content).toEqual(FakeArticle.content);
  });

  it('Changed should turn content into html', 
    function() {
      scope.content = NewContent;
      scope.Changed();
      var etalon = FakeArticleService.md2html(NewContent);
      expect(scope.html).toEqual(etalon);
  });

  it('toolH3 should add sample text', 
    function() {
      // scope.content = '';
      scope.toolH3();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('insertContent', '\n### Header');
  });

  it('toolH2 should add sample text', 
    function() {
      // scope.content = '';
      scope.toolH2();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('insertContent', '\n## Header');
  });
})