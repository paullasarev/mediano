describe('content-text directive', function() {
  var elm, scope;
  var changedCall;
  var ContentTextLogic;

  beforeEach(module('medianoApp'));

  beforeEach(inject(function($rootScope, $compile, directives) {
    elm = angular.element(
      '<div>' +
      '<textarea content-text/>' +
      '</div>');

    scope = $rootScope;

    scope.content = '';
    changedCall = 0;
    scope.Changed = function() {
      changedCall++;
    };

    $compile(elm)(scope);
    scope.$digest();

    ContentTextLogic = directives.ContentTextLogic;
  }));

  it('should have direcitve attr', function() {
    var dir = elm.find('textarea');

    expect(dir.attr('content-text')).toBe('');
  });

  it('should insert into textarea', function() {
    var text = 'asdf';
    scope.$broadcast('insertContent', text);
    expect(changedCall).toBe(1);
    expect(scope.content).toBe(text);
  });

  describe('logic', function() {

    it('should insert into selected textarea',  function() {
      var result = ContentTextLogic('123', 'asdf456qwe', 4, 7);
      expect(result.value).toBe('asdf123qwe');
    });
  
    it('should fix invalid startPos',  function() {
      var result = ContentTextLogic('123', 'asdf ', 6, 6);
      expect(result.value).toBe('asdf 123');
    });

    it('should subst () macro without selection',  function() {
      var result = ContentTextLogic('(123)', 'asdf ', 5, 5);
      expect(result.value).toBe('asdf 123');
    });

    it('should remove ~() macro without selection',  function() {
      var result = ContentTextLogic('(5)~(123)', 'asdf ', 5, 5);
      expect(result.value).toBe('asdf 5');
    });

    it('should subst selection to () macro',  function() {
      var result = ContentTextLogic('(123)', 'asdf456qwe', 4, 7);
      expect(result.value).toBe('asdf456qwe');
    });

    it('should presrve ~() macro with selection',  function() {
      var result = ContentTextLogic('(123)~(9)', 'asdf456qwe', 4, 7);
      expect(result.value).toBe('asdf4569qwe');
    });

    describe('add space before span subst', function() {

      it('should add without selection',  function() {
        var result = ContentTextLogic('(123)', 'asdf', 4, 4);
        expect(result.value).toBe('asdf 123');
      });
  
      it('should not add without selection if text is ended with space',  function() {
        var result = ContentTextLogic('(123)', 'asdf ', 5, 5);
        expect(result.value).toBe('asdf 123');
      });

      it('should not add without selection if text is ended with newline',  function() {
        var result = ContentTextLogic('(123)', 'asdf\n', 5, 5);
        expect(result.value).toBe('asdf\n123');
      });

      it('should not add ithout selection if text startPos is 0',  function() {
        var result = ContentTextLogic('(123)', 'asdf', 0, 0);
        expect(result.value).toBe('123asdf');
      });

    });

    describe('add newline before div subst', function() {

      it('should remove nl if startPos is 0',  function() {
        var result = ContentTextLogic('\n(123)', 'asdf', 0, 0);
        expect(result.value).toBe('123\nasdf');
      });

      it('should not remove nl if startPos > 0',  function() {
        var result = ContentTextLogic('\n(123)', 'asdf', 1, 1);
        expect(result.value).toBe('a\n123\nsdf');
      });

      it('should remove nl if startPos is after nl',  function() {
        var result = ContentTextLogic('\n(123)', 'asdf\n', 5, 5);
        expect(result.value).toBe('asdf\n123\n');
      });

      it('should add nl if endPos is not after nl',  function() {
        var result = ContentTextLogic('\n(123)', 'asdf', 2, 2);
        expect(result.value).toBe('as\n123\ndf');
      });

      it('should correct startPos to end of added div',  function() {
        var result = ContentTextLogic('\n(123)', 'asdf', 2, 2);
        expect(result.value).toBe('as\n123\ndf');
        expect(result.selectionStart).toBe(6);
      });
    });

  });
});