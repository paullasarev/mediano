var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Layout = React.createClass({

  willTransitionTo: function (transition) {
    console.log('willTransitionTo', transition)
    if (!this.props.auth.isLoggedIn()) {
      transition.redirect('/login');
    }
  },

  render: function() {

    return (
      <div className="App">
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Layout;
