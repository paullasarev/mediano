var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var Layout = require('./components/layout/layout.jsx');
var HomeFactory = require('./components/home/home.jsx');
var Login = require('./components/login/login.jsx');
var Register = require('./components/register/register.jsx');

var AuthMixin = function(auth) {
  this.statics = {
    willTransitionTo: function (transition) {
      // console.log('auth.isLoggedIn()', auth.isLoggedIn())
      if (!auth.isLoggedIn()) {
        transition.redirect('login');
      }
    }
  };
};

var RedirectToRoot = React.createClass({
  statics: {
    willTransitionTo: function (transition) {
      transition.redirect('/');
    }
  },

  render: function () {
    return null;
  }
});

function App(auth) {
  var Home = HomeFactory([new AuthMixin(auth)]);
  this.routes = (
    <Route name="layout" path="/" handler={Layout}>
      <Route name="login" handler={Login}/>
      <Route name="register" handler={Register}/>
      <DefaultRoute handler={Home}/>
      <NotFoundRoute handler={RedirectToRoot}/>
    </Route>
  );
}

      // <Redirect from="*" to="/"/>

//fix the default abort handler for wrong behaviour on server
//see https://github.com/rackt/react-router/issues/612
App.handleAbort = function (abortReason, location) {
  if (typeof location === 'string') {
    if(App.onHandleAbort) {
      App.onHandleAbort(abortReason, location);
      return;
    } else {
      throw new Error('Unhandled aborted transition! location:' +  location + ' Reason: ' + abortReason.to);
    }
  }

  if (abortReason.constructor.name ===  'Cancellation') {
    return;
  } else if (abortReason.constructor.name === 'Redirect') {
    location.replace(this.makePath(abortReason.to, abortReason.params, abortReason.query));
  } else {
    location.pop();
  }
};

App.prototype.run = function() {
  var cb;
  var config = {
    routes: this.routes,
    onAbort: App.handleAbort,
  }
  if (arguments.length>1) {
    config.location = arguments[0];
    cb = arguments[1];
  }  else {
    cb = arguments[0];
  }

  var router = Router.create(config);

  router.run(cb);
  return router;
}

App.prototype.start = function() {
  this.run(function (Handler, state) {
    React.render(<Handler />, document.getElementById('content'));
  });
}

module.exports = App;
