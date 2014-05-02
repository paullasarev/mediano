describe('Unit: NavigationController', function() {
  var FakeArticleService;
  var scope;
  var GAPI;

  beforeEach(function (){
    this.addMatchers({
      toBeFunction: function (){
        return Object.prototype.toString.call(this.actual)==='[object Function]';
      }
    });
  });

  beforeEach(module('medianoApp'));

  beforeEach(inject(function($controller, $rootScope, _FakeArticleService_, _GAPI_) {
    FakeArticleService = _FakeArticleService_;
    GAPI = _GAPI_;
    scope = $rootScope.$new();

    spyOn(GAPI, 'init');

    $controller('NavController', {
      $scope: scope,
      ArticleService: FakeArticleService,
      GAPI: _GAPI_
    });

  }));

  it('should define $scope.currentArticle()', 
    function() {
      expect(scope.currentArticle).toBeFunction();
  });

  it('cons should call GAPI.init()', 
    function() {
      expect(GAPI.init).toHaveBeenCalled();
  });

});
