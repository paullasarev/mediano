describe('Unit: ViewController', function() {
  // Load the module with ViewController
  beforeEach(module('medianoApp'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('ViewController', {
      $scope: scope
    });
  }));

  it('should create $scope.content when calling newPage', 
    function() {
      expect(scope.content).toBeUndefined();
      scope.newPage();
      expect(scope.content).toEqual("new page");
      expect(scope.html).toEqual("<p>new page</p>");
  });
})