describe('Unit: ArticleService', function() {
  var ArticleService;
  beforeEach(function(){
	// Load the module with ArticleService
  	module('medianoApp');

    // inject your service for testing.
    // The _underscores_ are a convenience thing
    // so you can have your variable name be the
    // same as your injected service.
    inject(function(_ArticleService_) {
      ArticleService = _ArticleService_;
    }); 	
  });

  it('should have getArticle() method', 
    function() {
      expect(angular.isFunction(ArticleService.getArticle)).toBe(true);
  });

  it('getArticle("main") should return object with content and html fields', 
    function() {
      var article = ArticleService.getArticle('main');
      expect(article).toBeDefined();
      expect(article.content).toBeDefined();
      expect(article.html).toBeDefined();
  });

});