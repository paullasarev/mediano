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

renderer.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0) {
      return '';
    }
  }
  //console.log('href: '+href+' title:'+title+' text:'+text);
  if (!href) {
    href = encodeURI(text);
  }
  if (!decodeURI(href).match(/(http:|https:|ftp:).*/)) {
    href = '#/' + href + '/view'; 
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

marked.setOptions({
  highlight: function (code, lang) {
    if (lang) {
      try {
        return highlight.highlight(lang, code).value;
      } catch(e) {
        return highlight.highlightAuto(code).value;
      }
    } else {
      return highlight.highlightAuto(code).value;
    }
  },
  renderer: renderer
});

module.exports = marked;
