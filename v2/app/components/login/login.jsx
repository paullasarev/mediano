var React = require('react');

var Login = React.createClass({

  render: function() {

    return (
      <div className="login">
        <div className="login__caption"/>
        <input className="login__user" placeholder="Email"/>
        <input className="login__password" placeholder="Password" type="password"/>
        <div className="login__fill"/>
        <div className="login__details">Your details were incorrect</div>
        <input type="button" className="login__submit" value="Log in"/>
        <input type="button" className="login__register" value="Sign up"/>
      </div>
    );
  }
});

module.exports = Login;
