describe('Unit: routes', function() {
  beforeEach(module('medianoApp'));

  it('should map routes to controllers', function() {
    //module('phonecat');

    inject(function($route) {

      expect($route.routes['/view'].templateUrl).toEqual('partials/view.html');
      expect($route.routes['/view'].controller).toBe('ViewController');

      expect($route.routes['/edit'].templateUrl).toEqual('partials/edit.html');
      expect($route.routes['/edit'].controller).toBe('EditController');

      // expect($route.routes['/phones/:phoneId'].templateUrl).
      // toEqual('partials/phone-detail.html');
      // expect($route.routes['/phones/:phoneId'].controller).
      // toEqual('PhoneDetailCtrl');

      // otherwise redirect to
      expect($route.routes[null].redirectTo).toEqual('/view');
    });
  });  

});