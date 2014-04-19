var marked = require('marked');
var highlight = require('highlight.js');

var renderer = new marked.Renderer();
renderer.table = function(header, body) {
  var result = '<table class="table table-bordered">\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';

  return result;
};

renderer.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

renderer.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var align = flags.header ? 'center' : flags.align;
  var tag = align
    ? '<' + type + ' class="text-' + align + '">'
    : '<' + type + '>';
  var result = tag + content + '</' + type + '>\n';
  return result;
};

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
  renderer: renderer
});


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
    return marked(content);
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
