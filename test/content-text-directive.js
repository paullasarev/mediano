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

  it('logic should insert into selected textarea',  function() {
    var result = ContentTextLogic('123', 'asdf123qwe', 4, 7);
    expect(result.value).toBe('asdf123qwe');
  });

});