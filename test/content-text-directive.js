describe('content-text directive', function() {
  var elm, scope;
  var changedCall;

  beforeEach(module('medianoApp'));

  beforeEach(inject(function($rootScope, $compile) {
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
});