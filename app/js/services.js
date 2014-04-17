//var showdown = require('../../bower_components/showdown/src/showdown');
var showdown = require('showdown');
var mdConverter = new showdown.converter(); 

var Articles={};

module.exports.ArticleService = function($rootScope) {
  this.getArticle = function(id) {
    var article = Articles[id];
    if (typeof(article) ==  'undefined') {
      var content = 'new page';
      article = {id:id, content:content, html:this.md2html(content)};
    }
    return article;      
  };

  this.md2html = function(content){
    return mdConverter.makeHtml(content);
  };

  this.setArticle = function(id, content) {
    var article = {id:id, content:content, html : this.md2html(content)};
    Articles[id] = article;
  };

  this.newPage = function(id) {
    var content = 'new page';
    var article = {id : id, content : content, html : this.md2html(content)};
    return article;
  };

  this.setArticle('main', 'main page');
};
