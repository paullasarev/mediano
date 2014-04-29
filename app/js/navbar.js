//'use strict';

var options = {
  activeClass: 'active',
  routeAttr: 'data-match-route',
  strict: false
};

module.exports.BsNavbar =  function(/*$window,*/ $location /*, $navbar*/ ) {

  return {
    restrict: 'A',
    link: function postLink(scope, element, attr, controller) {

      // Watch for the $location
      scope.$watch(function() {

          return $location.path();

        }, function(newValue, oldValue) {
          //console.log('newvalue:'+newValue);

        var liElements = element[0].querySelectorAll('li[' + options.routeAttr + ']');

        angular.forEach(liElements, function(li) {

          var liElement = angular.element(li);
          var pattern = liElement.attr(options.routeAttr).replace('/', '\\/');
          // if(options.strict) {
          //   pattern = '^' + pattern + '$';
          // }
          var regexp = new RegExp(pattern, ['i']);

          if(regexp.test(newValue)) {
            liElement.addClass(options.activeClass);
          } else {
            liElement.removeClass(options.activeClass);
          }

        });

      });

    }
   
  };

};


