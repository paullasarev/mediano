
var ContentTextLogic = function(val, text, startPos, endPos) {

  if (startPos > text.length) {
    startPos = endPos = text.length;
  }

  var isSelected = false;
  if (endPos > startPos) {
    val = val.replace(/\([^)]*\)/, text.substring(startPos, endPos));
    val = val.replace(/\~\(([^)]*)\)/g, "$1");
    isSelected = true;
  } else {
    val = val.replace(/\(([^)]*)\)/, "$1");
    val = val.replace(/\~\(([^)]*)\)/g, "");
  }

  var varlenCorrection = 0;

  if (val[0] == '\n') {
    val = val.substring(1);

    if (startPos > 0 && text[startPos-1]!='\n') {
      val = '\n' + val;
    }
    valLen = val.length;
    if (text[endPos]!='\n') {
      val += '\n';
      varlenCorrection = - 1;
    }
  } else {
    if (!isSelected){
      if (startPos > 0 && text[startPos-1] != ' ' && text[startPos-1] != '\n') {
        val = ' ' + val;
      }
    }

  }

  var valLen = val.length + varlenCorrection;

  value = text.substring(0, startPos) + val + text.substring(endPos);

  return {
    selectionStart: startPos + valLen,
    selectionEnd: startPos + valLen,
    value: value,
  }
};

module.exports.ContentTextLogic = ContentTextLogic;

module.exports.ContentText = function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      $rootScope.$on('insertContent', function(ev, val) {
        var domElement = element[0];
        var scrollTop = domElement.scrollTop;

        var result = ContentTextLogic(val, domElement.value, domElement.selectionStart, domElement.selectionEnd);

        domElement.value = result.value;
        domElement.focus();
        domElement.selectionStart = result.selectionStart;
        domElement.selectionEnd = result.selectionEnd;
        domElement.scrollTop = scrollTop;

        scope.content = domElement.value;
        scope.Changed();
      });
    }
  }
};
