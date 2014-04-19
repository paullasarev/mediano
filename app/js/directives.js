
module.exports.ContentText = function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      $rootScope.$on('insertContent', function(ev, theVal) {
        var domElement = element[0];
        //console.log('scope: ' + scope);
        var val = theVal;

          var startPos = domElement.selectionStart;
          var endPos = domElement.selectionEnd;
          if (startPos > domElement.value.length) {
            startPos = endPos = domElement.value.length;
          }
          var scrollTop = domElement.scrollTop;
          var text = domElement.value;

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

          domElement.value = text.substring(0, startPos) + val + text.substring(endPos);
          domElement.focus();
          domElement.selectionStart = startPos + valLen;
          domElement.selectionEnd = startPos + valLen;
          domElement.scrollTop = scrollTop;

        scope.content = domElement.value;
        scope.Changed();
      });
    }
  }
};
