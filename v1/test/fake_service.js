var FakeArticle;

angular.module('medianoApp')
.factory('FakeArticleService', function(){
  return {
    getArticle: function(id) {
        return FakeArticle;
    },
    setArticle: function(id, cont) {
        FakeArticle = {'id':id, 'content': cont, 'html':'<p>' + cont + '</p>'};
    },
    md2html: function(content) {
        return "<p>" + content + "</p>";
    },
    newPage: function(id){
      return {content: 'new page', html: '<p>new page</p>'};
    },
    lastArticle: function(id) {
        return FakeArticle;
    },
  };
})

.factory('GAPI', function () {
  return {
    init: function() {
    }
  }
})

.factory('Drive', function () {
  return {
    listFiles: function() {
      return 'fake list';
    }
  }
})

;