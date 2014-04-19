
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

  it('unknown id should create new article', 
    function() {
      var article = ArticleService.getArticle('new');
      expect(article).toBeDefined();
      expect(article.content).toBeDefined();
      expect(article.html).toBeDefined();
  });

  it('should have newPage method', 
    function() {
      var article = ArticleService.newPage('new');
      expect(article).toBeDefined();
      expect(article.content).toEqual('new page');
      expect(article.html).toEqual('<p>new page</p>\n');
      expect(article.id).toEqual('new');
  });

  it('parser should translate md to html', 
    function() {
      var content = 'md';
      var etalon = '<p>md</p>\n';
      var html = ArticleService.md2html(content);

      expect(html).toEqual(etalon);
  });

});